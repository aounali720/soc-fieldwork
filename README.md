# SOC FIELDWORK / Edition 03

**An offline-first, interactive SOC analyst training desk, from the first shift to threat hunting and detection engineering.**

A GitHub Pages–ready application. No server, API key, account, tracker, external database, or live-target access required. It runs entirely in the browser with fictional, educational data and persists progress locally.

## What is inside

| Training material | Edition 03 |
| --- | ---: |
| Step-by-step lessons | **151** |
| Multi-stage investigation files | **42** |
| Quiz questions with coaching | **136** |
| Interview questions with model answers and common mistakes | **135** |
| Graded evidence-retrieval drills | **31** |
| Realistic synthetic log records | **203** |
| Shift runbooks | **46** |
| Glossary terms | **192** |
| Production SPL/KQL *reference patterns* | **33** |
| Signal Atlas cards | **32** |
| Primary reference links | **16** |

### The experience

- **Briefing Desk** — redesigned editorial incident-workspace home screen, tier pathway, shift-start discipline, current cases, progress.
- **Training Manual** — prerequisite and tier-specific lessons covering networks, identity, Windows, Linux, email, cloud, SIEM, EDR, IR, forensics, hunting, detection-as-code and communication.
- **Incident Case Files** — realistic synthetic evidence, three decision gates per case, justifications, notebook and exportable handoffs.
- **Query Workbench** — safe in-browser filter/query language over case logs (not real SPL/KQL).
- **Evidence Drills** — 31 graded queries comparing the **exact event set**, so overly broad queries don't pass.
- **Knowledge Exams & Interview Prep** — answer practice, model responses and explanation of frequent interview mistakes.
- **Action Playbooks** — realistic escalation, identity, endpoint, cloud, hunting and detection workflows.
- **Signal Atlas** — searchable Windows Event IDs, Sysmon, cloud, DNS, identity and operations cards showing meaning, limitations and pivots.
- **Event Chronicle** — visual time-ordered synthetic log timelines with source filtering, linked directly to investigation case files.
- **Term Index and Source Library** — practical reference cards and links to primary sources.

## Deployment

1. Create or open the `soc-fieldwork` GitHub repository.
2. Place the full project at the repository root (`index.html`, `app.js`, `data.js`, `styles.css`, **`design-v3.css`**, `content.json`, `query.js`, assets, etc.).
3. In **Settings → Pages**, select **Deploy from a branch**, branch `main`, folder `/(root)`.
4. Open `https://<github-username>.github.io/soc-fieldwork/` after Pages finishes deployment.

There is **no build step**. To run locally, serve the folder over HTTP (`python -m http.server 8000`) and open the local address. Module imports are not reliably supported by `file://` pages.

## Tests

Requires Node.js 18+:

```bash
npm test
node smoke.mjs
```

Tests validate dataset structure, question answers, data consistency, query evaluation, safe query rejections, atlas uniqueness, and all twelve application view renderers including atlas and chronology interactions.

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
