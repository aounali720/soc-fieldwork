# SOC FIELDWORK — expanded edition

**A hands-on, browser-based SOC L1 → L2 → L3 training game for investigation skills and technical interviews.**

The curriculum starts with networking, operating systems, logs and identity, then progresses through alert triage, incident response, threat hunting, detection engineering and advanced cloud coverage. All events are fictional and all analysis happens locally in your browser.

## Content at a glance

| Learning area | Content | Purpose |
| --- | ---: | --- |
| Learning tracks | **116 lessons** | Foundation, L1, L2, L3 concepts, workflows and applied examples |
| Incident queue | **30 cases** / 90 decisions | Triage, correlation, scope, response, improvement |
| Evidence drills | **19 graded queries** | Retrieve the *right* synthetic events, not merely syntactically valid queries |
| Knowledge exam | **104 questions** | Self-test across the entire curriculum |
| Interview room | **105 prompts** | Model answers and common misconceptions |
| Runbooks | **34** | Shift checks and practical response checklists |
| Glossary | **167 terms** | Events, protocols, techniques and SOC vocabulary |
| SIEM query cookbook | **21 worked SPL/KQL examples** | Practice reading vendor-style query patterns |
| Sources | **15 official references** | NIST, MITRE, Microsoft, Splunk, Sigma, CISA, AWS, Kubernetes |
| Synthetic logs | **143 records** | Queryable, stable and offline |

**New in the expanded edition:** Windows audit specifics, DNS/DHCP/mail evidence, Kerberos and directory activity, OAuth consent, password spraying, identity abuse, cloud storage/SaaS audits, Linux systemd persistence, Kubernetes secrets, forensic artifact limitations, detection-as-code QA and regression testing. Mission answers are now shuffled, while grading remains based on the underlying correct option. New lessons expose *evidence to collect* and *common pitfalls*.

## Start locally

The site has no dependencies and no build step. Use any static HTTP server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. The site's ES modules may be blocked if you open `index.html` with `file://`. Internet is not required for lessons, grading, or persistence; optional online fonts fall back gracefully.

For tests, use Node.js 22 or another compatible current Node version:

```bash
npm test
```

## Publish to GitHub Pages

1. Create or open your GitHub repository, such as `aounali720/soc-fieldwork`.
2. Replace the repository files with **the contents of this folder**. Files must be at the repository root: `index.html`, `app.js`, `data.js`, `content.json`, `styles.css`, `query.js`, `.nojekyll`, `assets/`, etc. Keep your `.github/workflows/` files for validation.
3. Under **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then Save.
4. The live website is typically `https://aounali720.github.io/soc-fieldwork/` once GitHub completes deployment.

Or push from an existing clone:

```bash
cp -R /path/to/soc-fieldwork-expanded/. /path/to/your/soc-fieldwork-clone/
cd /path/to/your/soc-fieldwork-clone
git add .
git commit -m "Expand SOC Fieldwork curriculum and evidence drills"
git push origin main
```

If you use the ZIP package, **extract it first**. Uploading the ZIP as one file does not deploy a site.

## Recommended learning route

### Phase 1 — foundation

Learn TCP/IP, common ports, DNS records, TLS, HTTP, Windows Security logs, Sysmon, basic Linux auth, AD/Kerberos and identity protocols. After each lesson, explain **what the log proves and what it cannot prove**. Solve the first four L1 missions.

### Phase 2 — SOC L1 shift readiness

Work through triage, phishing, EDR, account abuse, SIEM field selection, escalation and ticket writing. Finish 10 L1/L2 Evidence Drills. Practice answering questions without revealing their answers first. Deliverable: three complete case handoffs with UTC times and an explicitly requested next step.

### Phase 3 — SOC L2 incident investigations

Connect evidence across IdP, email, endpoint, proxy, firewall and cloud. Build timelines; scope account takeover, lateral movement and suspicious cloud policy changes. Prioritize containment under approved organizational procedures and list unknowns. Deliverable: three incident timelines and two detection-rule tuning proposals.

### Phase 4 — SOC L3 engineering and hunting

Write hypotheses, test known-positive and negative events, validate telemetry, tune rules, map ATT&CK at the evidence level, and practice post-incident corrective action tracking. Deliverable: a versioned detection test case and a written threat-hunt memo with gaps and follow-up owners.

For a structured week-by-week study plan, see [`docs/INTERVIEW-STUDY-PLAN.md`](docs/INTERVIEW-STUDY-PLAN.md). Event reference is in [`docs/EVENT-ID-QUICK-REFERENCE.md`](docs/EVENT-ID-QUICK-REFERENCE.md).

## Evidence drill scoring

The local query simulator accepts case-sensitive fields with case-insensitive values:

```text
case=s01
case=s01 AND detail~FAIL
case=s08 AND detail~7045
case=s09 AND source=audit
source=sysmon | count by asset
```

`=` is exact match, `~` is text contains, logical operators are `AND` and `OR`; pipes allow `count by`, `sort` and `limit`. The simulator **is not** Splunk SPL or Sentinel KQL. In Evidence Drills, queries must return the exact target event IDs—missing or extra matches do not pass; aggregated output cannot pass. Hints and a reference filter (after two attempts) support learning.

## Persistence, privacy and safe use

- All case names, domains, accounts, logs and IP addresses are fictional or reserved example data.
- No account, backend, external SIEM connection or API key is used.
- Completions and notes are saved in `localStorage` (`soc-fieldwork-progress-v1`). This edition preserves existing v1 progress; the new `drills` bucket is added automatically.
- Export and import saved progress in **Field runbooks** before switching browsers or clearing storage.
- Never paste sensitive client telemetry into training systems; this simulator only queries embedded fictional events.
- Follow live organizational authorization, privacy and change-control rules for isolation, credential disabling, retention and evidence capture.
- Training cannot guarantee job or interview outcomes. Validate vendor-dependent fields and real security controls using official documentation.

## Layout

```text
index.html                    GitHub Pages entrypoint
styles.css                    Responsive SOC-style interface
app.js                        UI, grading, navigation, persistence
content.json                  Portable authored curriculum
/data.js                      JS module export of identical content
query.js                      Local bounded log query simulator
assets/favicon.svg            Project icon
docs/                         Study plan and event ID notes
tests.mjs                      Data, drill and parser regression tests
.github/workflows/validate.yml CI test workflow
.nojekyll                      Disable GitHub Jekyll processing
```

To update content, edit `content.json` and regenerate the JS module with:

```python
import json
from pathlib import Path
p = Path('content.json')
data = json.loads(p.read_text(encoding='utf-8'))
Path('data.js').write_text('/* Fictional educational data. */\nexport const DATA = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
```

## Primary references

- [NIST SP 800-61 Rev. 3 — April 2025](https://csrc.nist.gov/pubs/sp/800/61/r3/final): incident response recommendations aligned with NIST CSF 2.0.
- [MITRE ATT&CK Enterprise](https://attack.mitre.org/techniques/): adversary behavior taxonomy; use current details rather than treating old mappings as timeless.
- [Microsoft Sentinel hunting guidance](https://learn.microsoft.com/en-us/azure/sentinel/hunting).
- [Splunk Search Reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/).
- [Windows Security auditing](https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/).
- [Sysmon documentation](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon).
- [Kubernetes audit documentation](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/).

## License

MIT — see `LICENSE`.
