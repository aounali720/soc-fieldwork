# SOC FIELDWORK — visual study method

Use the Visual Concept Lab to build an accurate mental model **before** memorizing event IDs and tools.

## A 10-minute loop

1. **See the diagram (2 min).** Read the title and one-sentence explanation. Select every numbered stage in order.
2. **Explain the flow (2 min).** Hide the stage explanations by looking elsewhere on the screen, then describe the sequence in your own words.
3. **Find the signal (2 min).** Read the evidence-source list. For each source, state what it can confirm *and* what it cannot confirm.
4. **Challenge an assumption (2 min).** Read the common trap. Think of an innocent explanation that would produce a similar event.
5. **Use the game (2 min).** Open a relevant case, compare its synthetic events against the concept, and make a reasoned decision.

## Suggested progression

- **Foundation:** TCP handshake → DNS resolution → HTTP/TLS → log pipeline → alert triage.
- **SOC L1:** Windows logons → password spraying → phishing → process tree → alert severity.
- **SOC L2:** Kerberos tickets → lateral movement → token abuse → incident timeline → incident response.
- **SOC L3:** Detection-engineering cycle → hypothesis-driven hunting → ATT&CK mapping → telemetry gaps.

## How to use the images

The **SVG posters** are a quick overview of typical components and relationships, not complete protocol specifications. The **clickable diagrams** explain each stage in more detail. Some lessons use a *related* diagram rather than an exact match; the lesson clearly labels that distinction. For deeper details, use the original lessons, source library and external labs.

The case **event chain** is a chronology of observations. The by-source **bar chart** counts available records; taller bars do not necessarily indicate a more severe threat. All events are synthetic.

## Interview-ready explanation structure

Explain: *what it is* → *why it matters* → *how it works* → *what logs prove* → *what remains uncertain* → *the next safe action*.

Try to deliver an answer in 60–90 seconds. A good SOC answer includes an alternative benign explanation and avoids saying a single event ID proves compromise.
