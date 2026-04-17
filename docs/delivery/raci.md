# RACI Matrix -- Enterprise Data Platform

> **R** = Responsible (does the work)
> **A** = Accountable (owns the outcome, one per row)
> **C** = Consulted (provides input before the work)
> **I** = Informed (notified after the work)

---

## Role Key

| Abbreviation | Role |
|--------------|------|
| DM | Delivery Manager |
| SA | Solution Architect |
| PE | Platform/DevOps Engineer |
| DE | Data Engineer |
| FS | Full-Stack Developer |
| QA | QA Engineer |
| TW | Technical Writer |
| Client-DO | Client Data Owner |
| Client-IT | Client IT/Security |
| Client-ES | Client Executive Sponsor |

---

## RACI Matrix

| # | Activity | DM | SA | PE | DE | FS | QA | TW | Client-DO | Client-IT | Client-ES |
|---|----------|----|----|----|----|----|----|----|-----------|-----------|-----------| 
| 1 | Domain selection & pipeline prioritization | A | C | I | C | I | I | I | R | C | I |
| 2 | Architecture design & ADRs | C | A | C | C | C | I | I | I | C | I |
| 3 | Infrastructure provisioning (Terraform) | I | C | A | I | I | I | I | I | R | I |
| 4 | CI/CD pipeline setup | I | C | A | C | C | C | I | I | C | I |
| 5 | Data pipeline development | C | C | I | A | I | C | I | R | I | I |
| 6 | Data quality framework setup | C | C | I | A | I | R | I | C | I | I |
| 7 | Monitoring dashboard development | I | C | R | C | A | C | I | I | C | I |
| 8 | Security hardening | C | C | A | I | I | R | I | I | R | I |
| 9 | Documentation creation | C | C | C | C | C | C | A | I | I | I |
| 10 | Training delivery | A | R | R | R | R | I | C | I | I | I |
| 11 | UAT sign-off | C | I | I | C | C | C | I | A | C | R |
| 12 | Production deployment approval | A | C | R | C | I | C | I | C | R | I |
| 13 | Migration plan for remaining pipelines | C | A | C | R | I | I | R | C | C | I |
| 14 | Operating model definition | A | R | C | C | I | I | R | C | C | I |
| 15 | AI agent platform setup | C | A | R | R | C | C | I | I | C | I |

---

## Activity Descriptions

### 1. Domain selection & pipeline prioritization
The Client Data Owner identifies the initial business domain(s) and ranks pipelines by business value, complexity, and data readiness. The Delivery Manager is accountable for ensuring the prioritization is captured and agreed upon. The Solution Architect and Data Engineers provide feasibility input.

### 2. Architecture design & ADRs
The Solution Architect owns the target-state architecture and documents all significant decisions as Architecture Decision Records (ADRs). Platform, Data, and Full-Stack engineers are consulted for domain-specific constraints. Client IT reviews for compliance with enterprise standards.

### 3. Infrastructure provisioning (Terraform)
The Platform/DevOps Engineer writes and applies all Terraform modules (VPC, EKS/ECS, S3, Glue, Redshift/Athena, etc.). Client IT is responsible for granting AWS account access, approving security group rules, and validating network configurations.

### 4. CI/CD pipeline setup
The Platform/DevOps Engineer builds the CI/CD pipelines (CodePipeline / GitHub Actions), integrating SAST, DAST, and container scanning. Engineers across the team are consulted on build and test requirements. Client IT reviews security gates.

### 5. Data pipeline development
Data Engineers build, test, and deploy data ingestion, transformation, and serving pipelines. The Client Data Owner is responsible for providing source-system access, data dictionaries, and acceptance criteria. QA is consulted on test strategy.

### 6. Data quality framework setup
Data Engineers design the framework (Great Expectations, dbt tests, or equivalent). QA is responsible for executing validation suites and reporting results. The Client Data Owner is consulted to define business-rule thresholds.

### 7. Monitoring dashboard development
The Full-Stack Developer is accountable for the observability UI (Grafana, CloudWatch dashboards, or custom). The Platform Engineer implements the underlying metrics collection. Client IT is consulted on alerting integration (PagerDuty, ServiceNow).

### 8. Security hardening
The Platform/DevOps Engineer is accountable for all hardening activities (encryption at rest/in transit, IAM least-privilege, secrets management, network segmentation). QA performs penetration/vulnerability testing. Client IT is jointly responsible for validating controls against their security framework.

### 9. Documentation creation
The Technical Writer is accountable for producing all deliverable documentation (architecture guides, runbooks, API references, operating manuals). All engineers contribute content in their areas.

### 10. Training delivery
The Delivery Manager is accountable for the training program. The Solution Architect and engineers each deliver sessions in their domain (architecture overview, pipeline operations, platform admin, monitoring).

### 11. UAT sign-off
The Client Data Owner is accountable for formal UAT acceptance. The Client Executive Sponsor provides final sign-off. QA supports test execution, and engineers address defects.

### 12. Production deployment approval
The Delivery Manager is accountable for go/no-go coordination. The Platform Engineer executes the deployment. Client IT is responsible for change-management approval (CAB/change ticket).

### 13. Migration plan for remaining pipelines
The Solution Architect is accountable for the migration roadmap covering pipelines beyond the initial scope. Data Engineers author the detailed technical plan. The Technical Writer documents the playbook. Client Data Owner and IT are consulted for domain and infra constraints.

### 14. Operating model definition
The Delivery Manager is accountable for the operating model deliverable (roles, escalation paths, SLAs, on-call rotation). The Solution Architect authors the model. The Technical Writer produces the final document. Client stakeholders are consulted for alignment with existing ITSM processes.

### 15. AI agent platform setup
The Solution Architect is accountable for the AI agent architecture (Amazon Bedrock, Claude integration, prompt pipelines). Platform and Data Engineers implement the infrastructure and data connectors. The Full-Stack Developer is consulted on UI integration. Client IT is consulted on AI/ML governance policies.

---

## Escalation Path

```
Issue identified
      |
      v
Delivery Manager (DM)
      |
      +---> Technical issues -----> Solution Architect (SA)
      |
      +---> Resourcing / timeline -> Client Executive Sponsor (Client-ES)
      |
      +---> Security / compliance -> Client IT/Security (Client-IT)
      |
      +---> Data access / quality -> Client Data Owner (Client-DO)
```

---

## Notes

1. Every row has exactly **one A** (Accountable). The accountable party cannot delegate the outcome.
2. Client roles carry R or A on activities where client-side action or approval is a dependency.
3. This matrix should be reviewed at the start of each phase and updated if roles change.
4. The QA Engineer validates security controls in addition to functional testing, reflected in rows 6 and 8.
