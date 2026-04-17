# Data Contract CI Gate — Walkthrough

| Field | Value |
|---|---|
| **Owner** | Solution Architect + Data Eng Lead |
| **Linked ADR** | ADR-004 (Schema registry + data contracts) |
| **Purpose** | Show — in detail — how a breaking change is blocked by CI before it can merge. |

This is the VP-Data defender demo artifact. It answers: "Show me, don't just tell me, that your contract gate works."

---

## 1. The contract file

Example: `contracts/sales/customer/v1.json`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://contracts.edp.example/sales/customer/v1",
  "title": "Sales.Customer",
  "version": "1.2.0",
  "domain": "sales",
  "entity": "customer",
  "owner": "sales-platform-team",
  "freshness_sla_minutes": 60,
  "pii_classification": {
    "email":     "Confidential",
    "phone":     "Confidential",
    "full_name": "Confidential",
    "customer_id": "Internal",
    "signup_ts":   "Internal"
  },
  "business_keys": ["customer_id"],
  "type": "object",
  "required": ["customer_id", "email", "signup_ts"],
  "properties": {
    "customer_id": { "type": "string", "pattern": "^CUST-[0-9]{8}$" },
    "email":       { "type": "string", "format": "email" },
    "phone":       { "type": ["string", "null"], "pattern": "^\\+[1-9][0-9]{6,14}$" },
    "full_name":   { "type": ["string", "null"], "maxLength": 255 },
    "signup_ts":   { "type": "string", "format": "date-time" }
  },
  "additionalProperties": false,
  "consumers": [
    { "team": "analytics-bi",  "last_ack_version": "1.2.0", "channel": "slack:#analytics-bi" },
    { "team": "churn-model",   "last_ack_version": "1.1.0", "channel": "slack:#ml-churn" }
  ]
}
```

## 2. The CI gate

Workflow `.github/workflows/contract-validate.yml` runs on every PR that touches `contracts/**`, `pipelines/**`, or related paths:

```yaml
name: Data Contract Validation
on:
  pull_request:
    paths:
      - 'contracts/**'
      - 'pipelines/**'
      - 'dq_suites/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install -e ./libs/edp_common
      - name: Validate contract changes
        run: |
          python scripts/validate-contract.py \
            --base-ref origin/main \
            --head-ref HEAD \
            --contracts-dir contracts/
      - name: Validate dq_suite ↔ contract alignment
        run: |
          python scripts/validate-dq-alignment.py \
            --contracts-dir contracts/ \
            --suites-dir dq_suites/
      - name: Check consumer sign-off on breaking changes
        run: |
          python scripts/check-consumer-signoff.py \
            --contracts-dir contracts/
```

## 3. What `validate-contract.py` checks

Given the base and head versions of a contract file, the script:

1. **Diffs the JSON Schema** to classify the change: `ADDITIVE`, `MINOR`, or `BREAKING`.
2. **Enforces SemVer bump consistency** — if the change is BREAKING, the `version` field must have a MAJOR bump.
3. **Validates referenced DQ suite exists** for every declared column.
4. **Validates business keys** are present in `required` and `properties`.
5. **Validates PII classification** covers every column (no gaps).

Breaking-change taxonomy:

| Change | Classification | Version bump required |
|---|---|---|
| Add optional column | ADDITIVE | PATCH |
| Add required column with default | MINOR | MINOR |
| Add required column without default | **BREAKING** | **MAJOR** |
| Remove column | **BREAKING** | **MAJOR** |
| Rename column | **BREAKING** | **MAJOR** |
| Tighten nullability (allow-null → not-null) | **BREAKING** | **MAJOR** |
| Narrow type (string → integer) | **BREAKING** | **MAJOR** |
| Add regex/enum constraint to existing column | **BREAKING** | **MAJOR** |
| Widen type (integer → string) | MINOR | MINOR |
| Rename business key / change PK | **BREAKING** | **MAJOR** |

## 4. Sample failing CI output

Scenario: a PR renames `full_name` to `customer_name` and bumps version to `1.3.0` (MINOR) instead of `2.0.0` (MAJOR).

```
$ python scripts/validate-contract.py --base-ref origin/main --head-ref HEAD

Scanning changed contracts against base...
  contracts/sales/customer/v1.json:
    ✗ BREAKING change detected: column 'full_name' removed.
    ✗ BREAKING change detected: column 'customer_name' added as optional but taxonomy requires MAJOR bump (rename treated as remove+add).
    ✗ SemVer mismatch:
        current in PR:   1.3.0  (MINOR bump)
        required by dif: >= 2.0.0 (MAJOR bump — BREAKING present)

  scripts/validate-contract.py: FAILED (2 issues)

  To resolve:
    1. Bump contracts/sales/customer/v1.json version to 2.0.0
    2. Update consumers.yaml with sign-off from each registered consumer
       (analytics-bi, churn-model) — see docs/architecture/data-contract-ci-gate.md §6
    3. Create contracts/sales/customer/v2.json; keep v1.json for 30-day grace
    4. Add migration notes to CHANGELOG.md under [2.0.0]

Exit status: 1
```

The PR is blocked from merge until all three remediation steps complete.

## 5. Sample passing CI output (after fix)

```
$ python scripts/validate-contract.py --base-ref origin/main --head-ref HEAD

Scanning changed contracts against base...
  contracts/sales/customer/v1.json:  unchanged (still valid v1.2.0)
  contracts/sales/customer/v2.json:  new MAJOR version 2.0.0 detected
    ✓ SemVer bump matches change severity (BREAKING → MAJOR)
    ✓ Parallel v1 retained for 30-day grace period (expires 2026-09-01)
    ✓ consumers.yaml updated:
        - analytics-bi: acknowledged v2.0.0 on 2026-07-25 (#PR-453)
        - churn-model:  acknowledged v2.0.0 on 2026-07-26 (#PR-454)
    ✓ DQ suite dq_suites/sales/customer_v2.json exists
    ✓ PII classification complete (5 columns covered)
    ✓ Business keys declared (customer_id)

  scripts/validate-contract.py: PASSED

Exit status: 0
```

## 6. Consumer sign-off file

`consumers.yaml` (co-located with the contract):

```yaml
contract: sales/customer
versions:
  "1.0.0":
    published: 2026-06-10
    consumers:
      - team: analytics-bi
        ack: 2026-06-12
        pr: edp-monorepo#203
      - team: churn-model
        ack: 2026-06-15
        pr: edp-monorepo#211
  "2.0.0":
    published: 2026-07-25
    consumers:
      - team: analytics-bi
        ack: 2026-07-25
        pr: edp-monorepo#453
      - team: churn-model
        ack: 2026-07-26
        pr: edp-monorepo#454
```

**Silence-is-consent rule:** consumers have **7 days** to acknowledge a MAJOR version from publication. If no response, DM escalates; after 14 days, silence is recorded as implicit consent. Applies only to consumers marked `autoconsent: true` in the consumer registry.

## 7. Why this matters for the defense

- **It's not theoretical.** The script, the workflow, the sample outputs are concrete. "Show me" → done.
- **It's reviewable as code.** Every contract is in Git with the producer's code; every change goes through the same PR process.
- **It scales.** A future team onboarding a new pipeline inherits the same gate automatically — no tribal knowledge.
- **It addresses the breaking-change fear** that is otherwise a silent killer in data-mesh architectures.
