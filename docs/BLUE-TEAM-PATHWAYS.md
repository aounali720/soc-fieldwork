# Blue Team Pathways — independent offline skill expansion

SOC FIELDWORK Edition 09 adds **48 original technical field lessons**, **48 graded reasoning checks**, **16 fictional three-event investigation simulations**, and **six public curriculum-alignment maps**. Every explanation, event, question and scenario was written for this project. No provider-owned room text, paid lab data, solutions, flags, logos, credentialed content, or challenge captures are included.

## Training experience

Open **Blue Team Pathways** in the sidebar, or navigate to `#pathways`.

1. Select **Field lessons**, then filter by a broad public pathway alignment, security specialty and difficulty. Each lesson includes a technical explanation, case evidence, five-step investigation path, common false-positive risk and a reasoning question. Correct answers may be marked mastered.
2. Switch to **Scenario lab**. Read a fictional three-event timeline; select the safest analyst decision and receive a debrief and recommended handoff exercise. Successful labs are recorded locally.
3. Select **Curriculum map** to see how original fieldwork skills relate to the public topic areas described by the providers. The map is informational and does not grant or imply completion credit on any external site.

The previous learning, cases, drills, practice, manual and visual modules remain unchanged. Offline progress stays in the same `soc-fieldwork-progress-v1` browser record, with two additional optional keys (`pathwayCompleted`, `pathwayLabs`); older saved records continue to load.

## Public curriculum references and topic coverage

| Public path or training catalogue | Areas mapped into original lessons | Official outline |
| --- | --- | --- |
| TryHackMe SOC Level 1 | alert triage, SOC workbooks, web and email security, Windows/Linux, traffic, telemetry | https://tryhackme.com/path/outline/blueteam |
| TryHackMe SOC Level 2 | Active Directory, M365, cloud monitoring, detection engineering, hunting, incident response | https://tryhackme.com/path/outline/soclevel2 |
| Hack The Box Academy SOC Analyst | traffic analysis, monitoring, DFIR, attack analysis and reporting | https://academy.hackthebox.com/catalogue/paths |
| CyberDefenders Blue Team Labs | PCAP-based evidence, endpoint and cloud forensics, malware analysis | https://cyberdefenders.org/blueteam-ctf-challenges/ |
| LetsDefend SOC Analyst Path | realistic alert triage, phishing, malware and incident management | https://app.letsdefend.io/path/soc-analyst-learning-path |
| Security Blue Team BTL1 | threat intelligence, phishing, forensics, SIEM and incident response | https://securityblue.team/certifications/blue-team-level-1 |

Sources were checked against public learning-path information on October 30, 2026. Third-party course outlines and content change; these mappings are not endorsed by any of the listed providers.

## Covered skill domains

- SOC Operations: classification, priority, handoffs, containment, detections and evidence gaps
- Network & Traffic: TCP, DNS, HTTP, SMB, Zeek and data egress
- Windows & Identity: Windows authentication, PowerShell, Kerberos, PKI / AD CS and directory replication
- Email & Web: message authentication, phishing, delivery-to-execution, web shells and OAuth consent
- Endpoints & Malware: EDR alerts, LOLBins, process lineage, persistence, memory forensics and YARA
- Cloud & Containers: cloud shared responsibility, AWS IAM, Entra ID, Kubernetes audit and cloud collection scope
- Detection & Hunting: ATT&CK, intelligence confidence, SIEM queries, Sigma and hypothesis-driven hunts
- Forensics & Reporting: chain of custody, timelines, disk artifacts, incident impact and after-action reviews

## How to verify

From the project root:

```bash
npm test
node pathways-tests.mjs
```

All challenge data is illustrative, safe and fictional. The simulator does not run real offensive payloads, issue network requests to targets, or replace live provider labs. External syllabi are optional for further independent study.
