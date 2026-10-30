# SOC FIELDWORK / Edition 08

**An offline-first, interactive SOC analyst training desk, from the first shift to threat hunting and detection engineering.**

A GitHub Pages–ready application. No server, API key, account, tracker, external database, or live-target access required. It runs entirely in the browser with fictional, educational data and persists progress locally.

## Complete field reference — Edition 08

The built-in **Complete field reference** (`#manual`) contains **51 fully explained chapters, 73 searchable evidence reference cards, 20 adaptable detection recipes and 10 analyst templates**. Chapters cover foundational networking and host behavior, L1 alerts and authentication triage, L2 incident correlation/containment and L3 hunting, detection engineering, cloud and governance. Every chapter provides an investigation sequence, evidence to collect, a worked fictional case, a warning about a common mistake and a self-check interview explanation. Reading progress and bookmarks stay local and do not overwrite previous game progress.

The **[offline field manual study guide](docs/OFFLINE-SOC-FIELD-MANUAL.md)** explains how to use it without leaving the game. External source links are optional verification references, not prerequisites.

## What is inside

| Training material | Edition 08 |
| --- | ---: |
| Step-by-step lessons | **219** |
| New detailed manual chapters | **51** |
| New event/port/tactic reference cards | **73** |
| New detection recipes | **20** |
| New copy-ready operational templates | **10** |
| Original interactive concept maps | **31** |
| Illustrated SVG reference images | **7** |
| Multi-stage investigation files | **65** |
| Original knowledge exam questions with coaching | **176** |
| Practice Arena MCQs (176 curriculum + 68 additional) | **244** |
| Matching boards / individual term pairings | **33 boards / 165 pairs** |
| Sequencing challenges | **22** |
| Myth-or-fact statements | **46** |
| Fill-in-the-gap questions | **40** |
| Scenario-based analyst decisions from cases | **195** |
| Additional multi-source shift simulations | **10** |
| Shift-simulation evidence records | **60** |
| Shift-simulation graded decisions | **30** |
| 10-question interview sprints | **Unlimited, locally scored** |
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
- **Practice Arena** — six different exercise modes: 244 MCQs, 33 interactive column-matching boards, 22 reorder-the-steps challenges, 46 true/false checks, 40 typed term recall questions and 195 simulated case decisions. Includes explanations, retry/skip, career-tier filters, locally saved mastery and a 10-question sprint with a detailed end review.
- **Shift Simulations (NEW in Edition 08)** — ten deep incident files with six events each, source filtering, timelines, three decisions per file, a locally saved handoff editor, confidence pitfalls and an unlockable example report. Topics include identity abuse, phishing, ransomware precursors, AD service tickets, cloud evidence gaps, Kubernetes RBAC, benign network health checks, detection regression and negative hunts. See the [Shift Simulation Field Guide](docs/SHIFT-SIMULATION-GUIDE.md).
- **Knowledge Exams & Interview Prep** — answer practice, model responses and explanation of frequent interview mistakes.
- **Action Playbooks** — realistic escalation, identity, endpoint, cloud, hunting and detection workflows.
- **Signal Atlas** — searchable Windows Event IDs, Sysmon, cloud, DNS, identity and operations cards showing meaning, limitations and pivots.
- **Event Chronicle** — visual time-ordered synthetic log timelines with source filtering, linked directly to investigation case files.
- **Term Index and Source Library** — practical reference cards and links to primary sources.

## Deployment

1. Create or open the `soc-fieldwork` GitHub repository.
2. Place the full project at the repository root (`index.html`, `app.js`, `data.js`, `styles.css`, **`design-v3.css`**, **`design-v5.css`**, **`visuals.js`**, **`practice-ui.js`**, **`practice-data.js`**, **`practice.css`**, **`practice-pack-v7.js`**, **`shift-sim-data.js`**, **`shift-sim-ui.js`**, **`shift-sim.css`**, `content.json`, `query.js`, assets, etc.).
3. In **Settings → Pages**, select **Deploy from a branch**, branch `main`, folder `/(root)`.
4. Open `https://<github-username>.github.io/soc-fieldwork/` after Pages finishes deployment.

There is **no build step**. To run locally, serve the folder over HTTP (`python -m http.server 8000`) and open the local address. Module imports are not reliably supported by `file://` pages.

## Edition 08 — evidence-rich shift simulations and expanded practice

- Added 10 original simulations, each with six timestamped events, three defensible analyst decisions, a concrete knowledge pitfall, uncertainty, next steps and a sample ticket report.
- The new **Shift Simulations** view provides source-filterable evidence timelines, source-composition charts, answer grading and a write-your-own escalation notebook with model debriefs unlocked after grading.
- Added **61 additional practical exercises**: 28 MCQs, 8 five-pair matching boards, 5 sequencing exercises, 10 myth/fact checks and 10 fill-in-the-gap prompts. There are now **580 Practice Arena exercises**, plus the new shift simulation content.
- Updated scoring and progress export/import without changing the original `soc-fieldwork-progress-v1` key. Existing local learning history remains compatible.
- Upgraded automated checks to 15 routes with a full shift-simulation behavioral test suite.
- All fictional evidence is scoped to documentation IP ranges and example domains. New content emphasizes verified evidence, source coverage, cautious judgment and safe response authority.

See the [shift simulation guide](docs/SHIFT-SIMULATION-GUIDE.md) for a reliable daily practice method.

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

Tests validate dataset structure, question answers, data consistency, query evaluation, safe query rejections, atlas uniqueness, and all fifteen application view renderers including atlas and chronology interactions.

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


## Edition 06 — Practice Arena

A new interactive `#practice` route turns the visual SOC curriculum into active recall:

| Mode | How it works | Scoring |
| --- | --- | --- |
| MCQ Challenge | Select from four shuffled answers; 216 questions total | Correct answer earns first-time mastery |
| Match the Columns | Select a term and its meaning in shuffled right column | All five pairs must be correct |
| Put It in Order | Move cards up/down to reconstruct an investigation or protocol sequence | Exact sequence, with solution feedback |
| Myth or Fact? | Determine whether a common SOC claim is true | Answer plus explanation |
| Fill the Gap | Type a security term, event ID or acronym | Normalized exact synonyms, no AI guessing |
| Analyst Decisions | Make a decision from case-specific synthetic SOC context | Best choice plus evidence-based rationale |
| Interview Sprint | Answer ten mixed-difficulty MCQs without hints | End-of-round 0–10 score and full answer review |

All exercises use fictional educational material. Matching and ordering work with keyboard and touch-friendly buttons (drag and drop is not required). Progress is stored in the existing `soc-fieldwork-progress-v1` local profile to retain earlier lesson and investigation completions. New mastery records are placed under `practice`, and sprint results under `practiceExams`. Existing exports/imports remain compatible. Correct solutions earn +20 XP per exercise once; repeated attempts do not farm XP. A sprint does not separately award mastery XP.

Run `npm test` to check curriculum data, visuals, Practice Arena answer grading, scoring, and all fourteen routes. Note that browser screenshots are not a substitute for browser verification, especially where local web navigation is blocked by the environment.
