# The complete offline SOC field manual (Edition 08)

This is a built-in reference library for the SOC FIELDWORK game. It runs entirely in the browser; you do not need an account or a connection to third-party teaching sites. In the game, open **Complete field reference** in the navigation panel (or use `#manual`).

## How to learn without leaving the game

1. **Start with the 51 explained chapters.** Each defines the concept, walks through a real analyst workflow, lists what telemetry to find, includes a worked fictional example, warns of a common error, and asks an interview question with an answer to reveal after attempting it.
2. **Use 73 quick-reference cards** to check Windows Security and Sysmon events, common network ports, and selected MITRE ATT&CK tactics. Cards always include both the next investigative pivot and a limitation—an event ID alone is not an incident determination.
3. **Adapt 20 detection recipes** covering example SPL, Sentinel KQL, Elastic-style patterns, cloud audit SQL and platform-neutral filters. These are illustrative detection/query patterns; check your field names, tables, configured telemetry, permissions, syntax and privacy requirements before production use.
4. **Copy and fill 10 analyst templates** for shift handoff, triage, identity escalation, endpoint containment, phishing, cloud privilege review, threat hunting, detection tuning, impact assessment and after-action review.
5. **Test yourself** using the existing 580 Practice Arena questions, 77 evidence-retrieval drills, 65 incident cases, 10 shift simulations, 31 interactive concept diagrams, and 165 interview model-answer prompts.

The manual has a case-insensitive search box and Foundation/L1/L2/L3 filters. Reviewed chapters and bookmarks are saved under a *separate* browser storage key, `soc-fieldwork-manual-v1`, so older SOC FIELDWORK game progress is not overwritten.

## Reliability and interpretation

Content is originally authored for an educational, fictional SOC. It does **not** make the application an operational SIEM/EDR or replace your organization's incident command procedures. Use only on authorized systems and don't paste live API keys, bearer tokens, usernames/passwords or confidential incident evidence into public materials. Application data is static and contained locally.

Specific reference points checked during content design:

- NIST SP 800-61 Revision 3, **published April 2025**: incident-response guidance is aligned with NIST CSF 2.0 risk management. It supersedes Revision 2. Source: https://csrc.nist.gov/pubs/sp/800/61/r3/final
- MITRE ATT&CK Enterprise: tactics describe adversary objectives and techniques explain methods; mappings can change between versions. Source: https://attack.mitre.org/tactics/enterprise/
- Windows Sysmon Event IDs and fields depend on configuration. Source: https://learn.microsoft.com/en-us/windows/security/operating-system-security/sysmon/sysmon-events

These links are **optional** validation references; the explanations, investigation steps, examples and answers needed for this learning path are already included in the application.

## Offline deployment

Use GitHub Pages with the repository root. The application requires no build step and uses no external script libraries at runtime. Font appearance may vary offline because installed system font fallbacks are used. The manual data lives in `field-manual-data.js`, its interface in `field-manual-ui.js` and styling in `field-manual.css`. Run `npm test` for all unit and route checks; `node field-manual-tests.mjs` tests the new reference specifically.
