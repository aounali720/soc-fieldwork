# SOC FIELDWORK

**An interactive security operations training game for the path from SOC L1 to L2 to L3.**

No backend. No sign-up. No build step. All case artifacts are synthetic. The site runs on GitHub Pages and saves progress in your browser. Built to practice the actual mental habits of analysts: validate the signal, identify the entity, test competing hypotheses, document evidence, choose proportional next steps, and explain your reasoning in an interview.

## What's inside

| Area | What you can do |
| --- | --- |
| Learning tracks | **64 lessons** spanning prerequisites, L1 triage, L2 investigations and response, and L3 threat hunting/engineering |
| Incident queue | **16 interactive cases**, **48 graded decisions**, synthetic endpoint/cloud/identity/web logs, evidence-based explanations |
| Log lab | Filter, count, sort and analyze **70+ synthetic records** with a tiny, documented training DSL |
| SIEM notebook | **8 worked SPL/KQL examples** with context and caveats |
| Knowledge exam | **60 graded questions** with shuffled choice order and explanations |
| Interview room | **67 Q&A prompts** plus typical misconceptions; reveal, practice aloud and self-assess |
| Field runbooks | **16 operational checklists** covering start-of-shift, triage, escalation, phishing, malware, identity, cloud, response and hunting |
| Glossary | **123 practical SOC terms** |
| Dashboard | XP, local achievements, tier progress and daily shift checklist |
| Reference library | Official links to NIST, MITRE, Microsoft, Splunk, Sigma and other technical references |

## Quick start

Open `index.html` for a basic local preview, or run a local static server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. Browsers generally require HTTP for ES module imports; opening `file://` may prevent the app from loading.

The site consists of plain HTML, CSS and JavaScript modules. No `npm install` is needed. Tests require Node.js 22 or a compatible modern Node version:

```bash
npm test
```

## Publish on GitHub Pages

1. Create a **public** repository, for example `soc-fieldwork`, on your GitHub account.
2. Upload **the contents of this project folder to the repository root** (including the `index.html`, `app.js`, `data.js`, `query.js`, `styles.css`, `assets` and `.nojekyll`). Do **not** upload a ZIP file as a single asset and expect it to be served as the website.
3. In **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, then **main** and **/(root)**. Save.
4. Your site will appear at `https://YOUR-USERNAME.github.io/soc-fieldwork/` when GitHub Pages completes publishing.

Or, after creating the empty repository, using Git:

```bash
git init
git add .
git commit -m "Launch SOC Fieldwork training game"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/soc-fieldwork.git
git push -u origin main
```

The site uses relative assets and supports repository subpaths, such as `/soc-fieldwork/`. The `.nojekyll` file prevents unnecessary Jekyll processing.

## Recommended learning route

**Prerequisites (Foundation):** Networking (TCP/IP, subnetting, DNS, HTTP/TLS), Windows/Linux logs, identity, Active Directory, security vocabulary, ATT&CK and time normalization.

**SOC L1:** Shift handover, connector health, prioritization, event IDs, phishing, malware, login anomalies, firewall/WAF, SIEM filtering, safe triage, evidence-based tickets and escalation. Start with case 01, then follow cases 02–08.

**SOC L2:** Timelines, competing hypotheses, account takeover, ransomware, cloud IAM, C2 and lateral movement, approved containment, evidence handling, Sigma and detection tuning. Work cases 09–13.

**SOC L3:** Threat hunting, detection engineering, purple teaming, forensic fundamentals, container monitoring, coverage gaps, post-incident review and metrics. Work cases 14–16.

**Interview prep:** After each topic, use the Knowledge Exam and try the corresponding tier in the Interview Room. Respond aloud using **definition → context → evidence → action**. A strong answer identifies what remains unknown, not merely a threat label.

### Suggested 4-week L1/L2 revision rhythm

| Week | Focus | Deliverable |
| --- | --- | --- |
| 1 | Foundation, common protocols, event IDs, Windows/Linux logs | Explain DNS, TCP, 4624/4625, Sysmon 1/3/22; solve 1–3 |
| 2 | SIEM, phishing, EDR, detection triage and escalation | Complete L1 track; solve 4–8; write 3 polished tickets |
| 3 | Incident scoping, cloud identity, threat hunting basics | Complete L2 track; solve 9–13; build two UTC incident timelines |
| 4 | Review failed questions, detection engineering and interviews | Practice 20 random interview prompts aloud; solve 14–16 |

This is a training aid and **cannot guarantee any interview outcome**. Use actual vendor training, authorized labs and real-world mentorship to deepen operational competence.

## The log lab language

The log workbench is a **tiny, safe simulator**, not an implementation of Splunk SPL or KQL. It accepts field filters with exact `=` or case-insensitive contains `~`, connected by `AND` or `OR`, and three pipe operations:

```
source=edr
detail~4624
source=idp AND detail~FAIL
asset~WKSTN | sort time desc | limit 10
source=sysmon | count by asset
```

Fields: `time`, `source`, `asset`, `detail`, `tier`, `case`, `event`. Operators: `count by`, `sort`, `limit`. Results come only from hard-coded fictional events; code is never evaluated and no requests are sent to a live SIEM.

## Data, privacy and safety

- All names, domains, IP addresses, messages and hosts in cases are **invented**. Many IPs fall in reserved documentation ranges.
- No telemetry is collected and there is no server account. Progress is stored in browser `localStorage` under `soc-fieldwork-progress-v1`. It can be **exported or imported** from Field Runbooks.
- Never paste confidential SOC logs into the training console; it only searches local synthetic events.
- Destructive response actions must be authorized and handled under real production runbooks.
- Online fonts are optional; the UI has system font fallbacks and works without the font service.

## Architecture

```text
index.html                 Entrypoint
styles.css                 Responsive UI, diagrams, radar animation
data.js                    64 lessons, cases, questions, interviews, glossary, checklists
query.js                   Bounded search/filter/count/sort training engine
app.js                     Application views, grading, persistence, routing
content.json               Portable copy of educational content
assets/favicon.svg         Project identity
.github/workflows/          Data/query validation on push and pull request
tests.mjs                  Content integrity and query unit tests
```

Edit the curriculum in `data.js` and keep `content.json` synchronized when modifying learning content. No packages, database or API credentials are required.

## Study references and currency

The course uses **NIST SP 800-61 Revision 3** (finalized April 2025, replaces Revision 2), **MITRE ATT&CK Enterprise v20.0** (October 2026), and current public documentation for Microsoft Sentinel, Windows events, Splunk, Sigma and Sysmon. These sources evolve; confirm versions when using this material professionally. Complete links are in the application's Source Library.

## Contributing

Keep scenarios synthetic and ethically safe. Prefer evidence-led reasoning, relevant timestamps, clearly specified assumptions, verified event semantics and precise corrections over large but vague lists. Please add positive and negative query tests when changing the parser.

## License

MIT. See `LICENSE`.
