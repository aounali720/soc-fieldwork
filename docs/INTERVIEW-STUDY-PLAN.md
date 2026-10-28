# SOC FIELDWORK — 8-week L1/L2 interview and operations plan

Use this as a repeatable structure, not a promise of hiring success. Practice answers aloud and write incident notes from evidence. One lesson counts as mastered only when you can explain it without reading the text.

| Week | Topics | Daily practical tasks | Proof of readiness |
| --- | --- | --- | --- |
| 1 | SOC triage, TCP/IP, CIDR, common ports, DNS, HTTP/TLS, NAT | Explain a request path; label 5 traffic or resolver events; do one quiz | Explain DNS resolution and TCP handshake in 90 seconds |
| 2 | Windows events, Linux auth, Sysmon, process lineage | Compare 4624/4625/4688/7045; review 3 process trees; inspect synthetic log lab | Reconstruct two evidence chains correctly |
| 3 | Identity, AD, Kerberos, cloud sign-in, phishing headers | Investigate failed sign-ins; explain OAuth consent; triage two phish cases | Write two escalation notes with evidence and unknowns |
| 4 | SOC L1 daily shift, severity, EDR, WAF, firewall, proxy, SIEM SPL/KQL | Complete L1 cases; solve L1 evidence drills; review 10 interview prompts daily | Complete 3 L1 cases without using model answers |
| 5 | L2 threat analysis: ransomware, lateral movement, persistence and DNS C2 | Build incident timelines from three cases; map ATT&CK based on behaviors | Distinguish attempted, blocked and confirmed impact correctly |
| 6 | L2 incident response: scoping, chain of custody, cloud privileges, SaaS | Work L2 cases and evidence drills; propose proportional containment | Write a clear handoff for a cloud IAM incident |
| 7 | Detection tuning, Sigma, threat hunting, detection-as-code | Examine 5 query examples; practice test-positive/test-negative thinking | Draft rule hypothesis and false-positive test examples |
| 8 | Interview simulations, missed questions, weak topics | 20 timed questions over L1/L2; redo failed cases and drills | Deliver concise definition → context → evidence → action answers |

## Daily 90-minute training routine

1. **20 minutes fundamentals:** read two short lessons and explain them from memory.
2. **30 minutes investigation:** one mission or two evidence drills. Keep the notes hypothesis → confirmed evidence → affected entities → unknowns → actions.
3. **20 minutes queries:** write a log filter, then translate the intent into a vendor-native SPL or KQL sketch; verify field names in actual documentation.
4. **20 minutes interview practice:** answer five questions verbally, reveal the model answers, track the weakest concepts.

## Example L1 interview answers

**What will you do with a suspicious login alert?** First verify log-source freshness and entity. Read origin IP, user, device, authentication method, time and result. Review failed attempts and follow-on actions. Determine whether VPN/SSO or approved context explains it. Record evidence, risk, unknowns and escalation.

**What if EDR blocks the file?** Verify prevention action/result. Scope download and delivery, check whether processes or connections occurred before the block, look for peer endpoints and close only with an evidence-based disposition.

**What is a false positive?** An alert that does not correspond to the detection behavior or security significance claimed by the rule; differentiate it from a benign positive, where behavior is real but authorized.

**What is your first action in a P1 incident?** Verify scope and active impact quickly, own the ticket, notify the designated incident lead and follow approved containment playbooks. Do not take unauthorized disruptive actions.

## Example L2 interview answers

**Suspected lateral movement?** Correlate remote logon source, account and destination, 7045 service creation or remote task process evidence, asset roles, and change schedule. Search same source account and binary across the fleet, form a timeline and recommend authorized containment where supported.

**Suspected cloud data exposure?** Audit principal/session, privilege and bucket-policy changes, object-level data events where available, access duration, object sensitivity and downstream access. Missing data events limit conclusions. Coordinate approval for access revocation and notifications.

**Detection is noisy?** Inspect representative confirmed benign and malicious matches, tune with narrow contextual logic and exceptions with owner/expiry, then replay positive and negative tests and measure rule quality.

## Your own pass criteria

- Can explain 4624, 4625, 4688, 7045 and key Sysmon events without mixing channels.
- Can write a short SPL or KQL filter and explain what data/schema assumptions it makes.
- Can distinguish alarm, detection, confirmed incident, containment request and actual successful containment.
- Can summarize a case without unsupported claims.
- Can explain one full account takeover or ransomware chain with timestamps and alternative explanations.
- Can identify at least three gaps or limitations of the evidence used.
