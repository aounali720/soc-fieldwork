# SOC FIELDWORK / Edition 05

**An offline-first, interactive SOC analyst training desk, from the first shift to threat hunting and detection engineering.**

A GitHub Pages–ready application. No server, API key, account, tracker, external database, or live-target access required. It runs entirely in the browser with fictional, educational data and persists progress locally.

## What is inside

| Training material | Edition 05 |
| --- | ---: |
| Step-by-step lessons | **219** |
| Original interactive concept maps | **31** |
| Illustrated SVG reference images | **7** |
| Multi-stage investigation files | **65** |
| Quiz questions with coaching | **176** |
| Interview questions with model answers and common mistakes | **165** |
| Graded evidence-retrieval drills | **77** |
| Realistic synthetic log records | **341** |
| Shift runbooks | **64** |
| Glossary terms | **231** |
| Production SPL/KQL *reference patterns* | **45** |
| Signal Atlas cards | **46** |
| Primary reference links | **18** |

### The experience

- **Briefing Desk** — redesigned visual-first home screen, tier pathway, shift-start discipline, current cases, progress.
- **Visual Concept Lab** — 31 original, clickable diagrams of DNS, TLS, TCP, Kerberos, OAuth, Windows Event IDs, phishing, process trees, cloud IAM, detection engineering, hunting and incident response. Each teaches the mental model, the actual sequence, analyst log sources, common misconceptions and an interview question.
- **Training Manual** — prerequisite and tier-specific lessons covering networks, identity, Windows, Linux, email, cloud, SIEM, EDR, IR, forensics, hunting, detection-as-code and communication. Earlier content editions added deeper work on OAuth, PKI/AD CS, collection blind spots, Kerberos, WinRM, detection SLOs and cloud token chains.
- **Incident Case Files** — now also offer a visual event chain and event-source distribution graphic before the raw evidence. The charts show what was observed, not automatic proof of compromise. Realistic synthetic evidence, three decision gates per case, justifications, notebook and exportable handoffs; 23 new cases include a detailed debrief revealed after submission.
- **Query Workbench** — safe in-browser filter/query language over case logs (not real SPL/KQL).
- **Evidence Drills** — 77 graded queries comparing the **exact event set**, so overly broad queries don't pass.
- **Knowledge Exams & Interview Prep** — answer practice, model responses and explanation of frequent interview mistakes.
- **Action Playbooks** — realistic escalation, identity, endpoint, cloud, hunting and detection workflows.
- **Signal Atlas** — searchable Windows Event IDs, Sysmon, cloud, DNS, identity and operations cards showing meaning, limitations and pivots.
- **Event Chronicle** — visual time-ordered synthetic log timelines with source filtering, linked directly to investigation case files.
- **Term Index and Source Library** — practical reference cards and links to primary sources.

## Deployment

1. Create or open the `soc-fieldwork` GitHub repository.
2. Place the full project at the repository root (`index.html`, `app.js`, `data.js`, `styles.css`, **`design-v3.css`**, **`design-v5.css`**, **`visuals.js`**, `content.json`, `query.js`, assets, etc.).
3. In **Settings → Pages**, select **Deploy from a branch**, branch `main`, folder `/(root)`.
4. Open `https://<github-username>.github.io/soc-fieldwork/` after Pages finishes deployment.

There is **no build step**. To run locally, serve the folder over HTTP (`python -m http.server 8000`) and open the local address. Module imports are not reliably supported by `file://` pages.

## Edition 05 — visual learning redesign

- Rebuilt the interface around an illustrated study desk, with higher-contrast teal/navy navigation and improved reading layouts.
- Added 31 step-by-step SVG concepts with selectable stages, analogies, relevant telemetry, interview prompts and explicitly stated misconceptions.
- Created 7 original, accessible SVG teaching illustrations for networking, identity, email, endpoint, cloud and triage; these require no third-party image hosting.
- Embedded relevant diagrams (or explicitly labeled related models) into the complete lesson catalog.
- Added event-chain visualizations and evidence-source count bar graphs to the investigation cases.
- Kept every previous lesson, case, drill, glossary term and local progress record compatible.

See the [visual study guide](docs/VISUAL-STUDY-GUIDE.md) for a short method to absorb and explain concepts.

## Edition 04 — content expansion retained

- 68 new topic-focused technical lessons with observable telemetry, alternative explanations, investigation pivots, and common errors.
- 23 synthetic case files containing 138 multi-source evidence events and 69 case-specific decision questions; every new case includes an after-submission debrief.
- 46 additional exact-evidence log-search drills, 40 knowledge questions, 30 interview challenges, 18 actionable runbooks, and expanded signal/reference material.
- A scenario pack mixing confirmed risk, ambiguous telemetry, benign changes, cloud-identity abuse, data-loss investigation, operational safety decisions and detection failures.
- The same local progress key remains unchanged. No server or live infrastructure is needed.

See the [four-week SOC interview sprint](docs/FOUR-WEEK-SOC-INTERVIEW-SPRINT.md) for day-by-day practice using the expanded game.

## Tests

Requires Node.js 18+:

```bash
npm test
```

Tests validate dataset structure, question answers, data consistency, query evaluation, safe query rejections, atlas uniqueness, and all thirteen application view renderers including atlas and chronology interactions.

## Storage and portability

Progress, grades and case notebooks are stored only in your browser via `localStorage`, retaining the original `soc-fieldwork-progress-v1` key to preserve earlier progress. Export from **Action Playbooks** before clearing browser data. Import previously exported JSON to restore. The app does not send it anywhere.

## Learning and reference caveats

- Every security event is **fictional**. All example IPs are from RFC 5737 TEST-NET ranges and example domains are reserved.
- SPL and KQL examples illustrate investigation approaches; verify syntax, available tables, ingestion schemas, permissions and field names in your deployment before using them.
- Event IDs, service behaviors and ATT&CK technique mappings vary by environment/version; always verify against vendor documentation.
- This tool teaches SOC reasoning; it does not guarantee interview performance or replace production SIEM/EDR labs. Respond in real environments only with authorization and according to policy.

Selected references include [NIST SP 800-61 Rev. 3](https://csrc.nist.gov/pubs/sp/800/61/r3/final) (final April 2025) and [MITRE ATT&CK Enterprise](https://attack.mitre.org/tactics/enterprise/). These resources are not affiliated with this project.

## License

See [LICENSE](./LICENSE).
