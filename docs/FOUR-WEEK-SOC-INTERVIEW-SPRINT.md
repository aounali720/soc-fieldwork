# SOC FIELDWORK · Four-week interview sprint

Use this plan to convert lesson familiarity into a real analyst's reasoning process. The entire training environment is fictional and safe to use without a SIEM account. The goal is not to memorize a vendor's interface: explain what an event does and does not prove, choose the next useful pivot, and communicate a justified action.

**Daily format (60–90 minutes):** 20 minutes training manual, 20 minutes investigation case, 15 minutes evidence drill, 15 minutes interview prompts and notebook, 10 minutes recheck misses. Record your evidence query, a one-paragraph handoff and one uncertainty for every investigation. Review your wrong answers 48 hours later.

## Week 1 — SOC L1 prerequisites

| Day | Focus | What to demonstrate |
| --- | --- | --- |
| 1 | Five-tuple, TCP state, DNS caching | Explain why a failed SYN, NXDOMAIN and 403 are not three confirmed attacks. |
| 2 | HTTP/TLS, proxies, CDN and IPv6 | Distinguish SNI, URL host, source egress and original initiating process. |
| 3 | Windows 4624/4625, logon type and 4740 | Explain how password rotation may cause failed sign-ins and lockouts. |
| 4 | Linux SSH/PAM, systemd and cron | Map a new service to creating user, process, binary and change record. |
| 5 | Kerberos, NTLM and MFA | Explain TGT/service tickets, status codes and MFA fatigue limitations. |
| 6 | Email headers, SPF/DKIM/DMARC, phishing | Scope delivery vs click vs credential theft vs execution. |
| 7 | Mock interview: L1 fundamentals | Randomly answer 15 interview prompts, 5 quiz questions and one case out loud. |

**Pass gate:** Explain at least ten telemetry terms without relying on a glossary; complete five case files and five evidence drills. For every case, name a plausible benign alternative.

## Week 2 — SOC L1 shift and escalation

| Day | Focus | What to demonstrate |
| --- | --- | --- |
| 8 | Intake queue and shift readiness | Prioritize five incidents while noting an EDR telemetry outage. |
| 9 | VPN and identity sign-in events | Attribute public IPs with session and address-pool ownership. |
| 10 | EDR processes and signatures | Reconstruct parent/child lineage and justify process context. |
| 11 | Proxy, firewall and DNS triage | Identify a suspicious destination without blocking shared infrastructure blindly. |
| 12 | E-mail triage and mail-flow scope | Produce a reproducible phishing escalation in five sentences. |
| 13 | Closure quality and SLA handoffs | Write evidence-supported benign closure and a P1 handoff. |
| 14 | Mock interview: on-shift decisions | Take two unseen L1 cases, then narrate every decision. |

**Pass gate:** Complete ten L1 cases, seven drills and at least twenty L1 interview prompts. A model response states observations, next pivot, risk and uncertainty; not just definitions.

## Week 3 — SOC L2 deeper investigations

| Day | Focus | What to demonstrate |
| --- | --- | --- |
| 15 | AD membership, Kerberos delegation and AD CS | Identify why a certificate or delegation change can open new authentication paths. |
| 16 | Scheduled tasks, services and PowerShell | Reconstruct process ancestry and execution with stable process IDs. |
| 17 | OAuth consent and token replay | Distinguish password reset from session and app-grant revocation. |
| 18 | Cloud role assumption, object reads | Trace source identity, session issuer and uncertain data transfer. |
| 19 | Kubernetes and workload identity | Interpret pod admission and secret reads in RBAC context. |
| 20 | Incident response and business criticality | Propose proportional containment, approvals and rollback. |
| 21 | Mock interview: L2 case ownership | Write an incident timeline with at least six observations and two unknowns. |

**Pass gate:** Complete ten L2 cases and six drills, then produce one 300-word incident report with scope, confidence, impact and actions. Verify each conclusion against a timestamped record.

## Week 4 — SOC L3 habits that also improve L2 interviews

| Day | Focus | What to demonstrate |
| --- | --- | --- |
| 22 | Hypothesis-driven hunting | Write a falsifiable hypothesis and a data-coverage checklist. |
| 23 | Sigma, SPL and KQL conversions | Explain why generic field mappings can create false negatives. |
| 24 | Known-positive canaries and exceptions | Test whether global suppressions hide unrelated true positives. |
| 25 | Cross-account cloud identity | Draw a role-assumption chain with trust and authorization boundaries. |
| 26 | Forensic collection and evidence gaps | Balance volatile evidence and RTO with an incident commander. |
| 27 | Purple-team validation and operations SLOs | Measure signal arrival, rule hit, analyst acknowledgement and response action. |
| 28 | Full mock interview and incident board | Explain two case files, three SPL/KQL patterns and one organizational failure. |

**Pass gate:** You can tell a realistic incident story from telemetry and clearly distinguish what is known, inferred and unknown. Rehearse a 90-second explanation of one case at L1 depth and again at L2 depth.

## Reusable case handoff template

- **Alert, UTC interval and owner:** identify rule, event window, analyst and source system.
- **Observed facts:** three concise observations with event IDs or exact log pivots.
- **Hypothesis & alternatives:** most plausible interpretation, credible benign explanation and confidence level.
- **Scope:** affected assets, accounts, applications, permissions and likely blast radius.
- **Missing data:** sensor/retention/time-zone limits and what the evidence does not establish.
- **Actions proposed/taken:** approval, containment, evidence custody and rollback considerations.
- **Next checkpoint:** responsible owner and concrete next verification step.

## Interview answer structure

1. Define the term accurately in one or two sentences.
2. Show the normal process and what could go wrong.
3. Name exact telemetry fields, IDs, or relevant sensor sources.
4. Give a reproducible query or next evidence pivot.
5. End with risk, uncertainty, escalation and documentation.

**Reality check:** Practicing these exercises does not guarantee passing an interview. Use actual labs, SIEM searches and vendor documentation to validate product-specific syntax and fields. For response in a real environment, follow authorization and incident command.
