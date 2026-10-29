# Shift Simulation Field Guide — Edition 07

These ten synthetic shift files train the **reasoning** an L1, L2 or L3 analyst should apply during a real queue handoff. They do not connect to infrastructure and do not require live credentials or scanners.

## The five-stage method

1. **Orient** — read the brief, identify the affected asset and set the scope. An alert title is an untested hypothesis.
2. **Compare events** — record event source, timestamp semantics, originating account or process and the exact observations. Be careful about clock drift and incomplete retention.
3. **Decide** — choose three defensible actions from competing alternatives. Consider an ordinary explanation, incident severity and who has authority to contain a production system.
4. **Write the handoff** — record *observed facts*, a confidence statement, the checked time window, missing sources, impacted people/assets, an owner and your next pivot.
5. **Compare and retry** — unlock the sample handoff, revisit mistakes and repeat until you can explain the reasoning without seeing the answers.

## Sample ticket structure

**Incident ID and time window** — `shift07-06`, first to last observed event (not assumed first attacker action).

**Known** — Unrecognized AWS role assumption; observed control-plane bucket enumeration; role permissions allow object reads.

**Unknown** — Whether objects were read, because S3 data events were disabled. A missing data-event source is not proof that reads did not occur.

**Assessment** — Suspected exposed-credential misuse. Confidence: moderate to high for unauthorized role usage; undetermined for object-level access.

**Response request** — Cloud/identity owner to invalidate credentials and sessions, preserve audit trail, scope reachable resources and investigate alternative object-level access evidence. Coordinate containment to avoid breaking automation.

**Follow-up** — Ticket owner, deadline, data-source coverage exception and verification criteria.

## Cases by role

| Role | Case | Main skill |
| --- | --- | --- |
| L1 | Password spray | Distinguish a spray origin from unrelated successful login |
| L1 | Finance consent lure | Separate link click, MFA, OAuth consent and mailbox access |
| L1 | Executive travel | Document a defensible benign closure |
| L2 | Backup service stops | Correlate service tampering, process parentage and restore health |
| L2 | Payroll SPN anomaly | Avoid equating 4769 with successful credential recovery |
| L2 | DNS health checks | Distinguish periodic benign traffic from beacon hypotheses |
| L2 | CloudTrail credential exposure | Explicitly document missing object data-event visibility |
| L2 | Kubernetes privileges | Investigate unexpected RBAC and service-account token use |
| L3 | Parser went dark | Diagnose silent detection regression despite healthy input |
| L3 | Negative hunt | Correctly qualify an absence of findings across partial coverage |

## Why we do not prescribe one universal containment action

The simulation illustrates evidence-driven and *authorized* actions. A real SOC's runbooks, incident commander, legal requirements, service owners and business context determine whether host isolation, session revocation, credential rotation or a cluster policy change is appropriate.

## Reference material

- [NIST SP 800-61 Rev. 3 — Incident Response Recommendations and Considerations for Cybersecurity Risk Management (2025)](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- [MITRE ATT&CK Enterprise](https://attack.mitre.org/)
- [Microsoft Windows Security Auditing event 4625](https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4625)
- [AWS CloudTrail events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html)
- [Kubernetes audit logging](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/)

All events and identifiers in this guide are fabricated for training. Addresses are reserved documentation IPs or example domains. Threat behavior, products and schemas evolve; check primary documentation for production work.
