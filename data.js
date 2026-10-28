/* Fictional educational data. Reserved example domains and test-net addresses. */
export const DATA = {
  "lessons": [
    {
      "id": "c01",
      "tier": "Foundation",
      "domain": "SOC orientation",
      "title": "What a SOC actually does",
      "summary": "A Security Operations Center continuously collects signals, separates noise from risk, coordinates response, and improves detection coverage. Analysts are evidence-driven, not alert-closing machines.",
      "details": [
        "Monitoring means observing; detection means recognizing suspicious patterns; response means controlling an incident",
        "A detection is a hypothesis, not proof of compromise",
        "Every action should be traceable in a ticket with timestamps and supporting artifacts"
      ],
      "workflow": [
        "Identify the business asset and owner",
        "Understand alert source, rule logic and timeframe",
        "Check evidence, determine impact and document the result"
      ],
      "example": "An impossible-travel alert alone is weak; correlate sign-ins, MFA method, device and IP before escalating.",
      "minutes": 8
    },
    {
      "id": "c02",
      "tier": "Foundation",
      "domain": "SOC orientation",
      "title": "L1 vs L2 vs L3 responsibilities",
      "summary": "L1 validates alerts and follows playbooks; L2 conducts scoping, deeper correlation and response; L3 handles complex investigations, threat hunting, detection engineering and mentoring. Exact job boundaries vary by organization.",
      "details": [
        "L1: triage, enrichment, severity, escalation, shift notes",
        "L2: timeline reconstruction, identity/endpoint pivoting, containment proposals, incident coordination",
        "L3: hypothesis hunts, custom detection development, attack simulation, root-cause analysis"
      ],
      "workflow": [
        "State the evidence and confidence level",
        "Escalate based on impact, scope, privilege and policy",
        "Hand off with what was checked, what was not and next actions"
      ],
      "example": "A likely stolen admin session is escalated to L2 immediately; L3 later creates a new detection for the observed token-abuse pattern.",
      "minutes": 11
    },
    {
      "id": "c03",
      "tier": "Foundation",
      "domain": "SOC orientation",
      "title": "A complete SOC shift",
      "summary": "A repeatable shift starts with handover, sensor health, backlog and intelligence review, then prioritizes alerts and maintains accurate case updates.",
      "details": [
        "Critical outstanding incidents take priority over fresh low-fidelity alerts",
        "Missing logs and dead sensors are security issues, not just IT tickets",
        "SLA and escalation timers vary by company"
      ],
      "workflow": [
        "Read prior shift handover and open incidents",
        "Confirm key telemetry ingesting; inspect urgent queues",
        "Work highest-risk alerts, communicate, and write the next handover"
      ],
      "example": "At shift start, the EDR connector stopped sending logs 40 minutes ago; open a collection-gap incident before declaring hosts quiet.",
      "minutes": 14
    },
    {
      "id": "c04",
      "tier": "Foundation",
      "domain": "Networking",
      "title": "OSI, TCP/IP and encapsulation",
      "summary": "Traffic is packaged across link, IP, transport and application layers. Understanding where a signal belongs helps isolate malicious behavior from ordinary connectivity issues.",
      "details": [
        "IP routes packets between networks; TCP or UDP distinguishes transport behavior",
        "TCP sessions use flags, sequence and acknowledgement numbers",
        "DNS and HTTP are application protocols carried by lower layers"
      ],
      "workflow": [
        "Identify source, destination, protocol and ports",
        "Decide which device or log can observe the behavior",
        "Check whether capture covers both directions"
      ],
      "example": "A firewall sees TCP 443 but cannot infer the URL path without relevant TLS inspection or proxy logs.",
      "minutes": 17
    },
    {
      "id": "c05",
      "tier": "Foundation",
      "domain": "Networking",
      "title": "IP addresses, CIDR and NAT",
      "summary": "IPv4 addresses identify interfaces; CIDR masks define network boundaries. NAT rewrites addresses and sometimes ports, so public IP alone may not identify an internal device.",
      "details": [
        "RFC1918 private ranges are 10/8, 172.16/12 and 192.168/16",
        "A /24 has 256 addresses, conventionally 254 usable hosts on a typical subnet",
        "Source port plus translation logs may be necessary to attribute shared egress"
      ],
      "workflow": [
        "Convert source and destination to private/public scope",
        "Check subnet membership and routing",
        "When NAT is involved, request timestamped translation records"
      ],
      "example": "An external service records 203.0.113.9; the NAT gateway maps its source port to workstation 10.10.8.24.",
      "minutes": 20
    },
    {
      "id": "c06",
      "tier": "Foundation",
      "domain": "Networking",
      "title": "Ports and common services",
      "summary": "Ports identify transport endpoints; the protocol and application content determine the real service. Unusual ports can be normal and default ports can carry malicious traffic.",
      "details": [
        "DNS 53 TCP/UDP, HTTP 80 TCP, HTTPS 443 TCP or UDP/QUIC",
        "SSH 22, SMB 445, RDP 3389, LDAP 389, LDAPS 636",
        "Kerberos 88, SMTP 25/587, NTP 123, DHCP 67/68"
      ],
      "workflow": [
        "Verify protocol not just port number",
        "Compare destination to allowed business services",
        "Inspect DNS, proxy or application context"
      ],
      "example": "Outbound 445 to the internet from an office endpoint deserves investigation even if firewall prevented the connection.",
      "minutes": 8
    },
    {
      "id": "c07",
      "tier": "Foundation",
      "domain": "Networking",
      "title": "TCP handshake, flags and resets",
      "summary": "TCP uses SYN → SYN/ACK → ACK to establish state. Flags, retransmits and RST packets help explain scanning, failed connections and disruption.",
      "details": [
        "SYN without replies may indicate filtering, loss or unreachable hosts",
        "Repeated SYNs to sequential ports may be scanning but can also be monitoring",
        "A reset terminates a connection; context decides whether it is malicious"
      ],
      "workflow": [
        "Build a chronological packet timeline",
        "Compare number of destinations, ports and attempts",
        "Validate with firewall and endpoint process information"
      ],
      "example": "A burst of SYN packets across 1,000 ports from one workstation after office hours suggests reconnaissance.",
      "minutes": 11
    },
    {
      "id": "c08",
      "tier": "Foundation",
      "domain": "Networking",
      "title": "DNS from query to answer",
      "summary": "A resolver looks up records, caches responses based on TTL and can query authoritative servers. DNS logs expose destinations and sometimes command-and-control patterns.",
      "details": [
        "A/AAAA map hosts to IPs; CNAME aliases; MX handles mail",
        "NXDOMAIN means the name does not exist; repeated failures can suggest domain-generation activity",
        "TXT, SRV and PTR records have legitimate uses and can be abused"
      ],
      "workflow": [
        "Inspect query, response, timestamp and client",
        "Measure volume, length, entropy and NXDOMAIN ratio",
        "Correlate unusual domains with processes and network flows"
      ],
      "example": "A workstation queries dozens of random-looking subdomains every 10 seconds; compare against normal telemetry before labeling tunneling.",
      "minutes": 14
    },
    {
      "id": "c09",
      "tier": "Foundation",
      "domain": "Networking",
      "title": "HTTP, HTTPS, headers and status codes",
      "summary": "Web requests include methods, paths, headers and bodies. TLS hides content from observers without decryption, but certificates, destination and metadata can still be useful.",
      "details": [
        "200 success; 301/302 redirect; 401 authentication required; 403 forbidden",
        "404 not found; 429 rate limited; 500 server error",
        "User-Agent and referrer can support investigation but are easily spoofed"
      ],
      "workflow": [
        "Review method, URL path, status, user agent and response size",
        "Look for patterns across requests rather than one suspicious string",
        "Check identity and endpoint telemetry"
      ],
      "example": "A POST to /upload with a large body after suspicious login is worth reviewing against approved application behavior.",
      "minutes": 17
    },
    {
      "id": "c10",
      "tier": "Foundation",
      "domain": "Networking",
      "title": "TLS and certificates",
      "summary": "TLS protects data in transit using authenticated key exchange and symmetric encryption. Certificate validation authenticates a claimed server identity but does not make a site trustworthy.",
      "details": [
        "SNI may expose hostname unless encrypted client hello is in use",
        "The certificate chain, validity and SAN matter during verification",
        "A valid certificate is compatible with phishing, malware and command-and-control"
      ],
      "workflow": [
        "Review client and server TLS metadata",
        "Check certificate issuer, age, SAN and expected hostname",
        "Correlate with DNS and proxy observations"
      ],
      "example": "A freshly registered host with a valid Let's Encrypt certificate is not automatically safe or malicious.",
      "minutes": 20
    },
    {
      "id": "c11",
      "tier": "Foundation",
      "domain": "Systems",
      "title": "Linux essentials for analysts",
      "summary": "Processes, permissions, services and logs reveal system behavior. Knowing common directories and commands shortens response time.",
      "details": [
        "/var/log contains many service logs, but locations depend on distro",
        "sudo, su, cron, systemd and SSH leave useful traces",
        "Processes, sockets and service configurations should be collected carefully"
      ],
      "workflow": [
        "Inspect journalctl, auth logs and process tree",
        "Check systemd timers, cron and active sockets",
        "Preserve output with timestamps and case references"
      ],
      "example": "A new systemd service executes a binary in /tmp at startup; investigate provenance and owner.",
      "minutes": 8
    },
    {
      "id": "c12",
      "tier": "Foundation",
      "domain": "Systems",
      "title": "Windows internals and event logs",
      "summary": "Windows generates security, system, application and other telemetry. Processes, services, tasks, registry keys and authentication all provide investigative pivots.",
      "details": [
        "4624 successful logon; 4625 failed logon; 4688 process creation when enabled",
        "7045 often indicates a new service; 1102 indicates Security log cleared",
        "Sysmon provides additional optional process, network and other event visibility"
      ],
      "workflow": [
        "Check time synchronization and enabled audit policy",
        "Correlate user, Logon ID, host and parent-child process",
        "Search related hosts for similar activity"
      ],
      "example": "An encoded PowerShell process launched by a document application is suspicious when the user denies running scripts.",
      "minutes": 11
    },
    {
      "id": "c13",
      "tier": "Foundation",
      "domain": "Systems",
      "title": "Identity, AD, LDAP and Kerberos",
      "summary": "In Active Directory, users, groups, computers and domain controllers govern access. Kerberos tickets and LDAP queries are normal operations that also appear in attacks.",
      "details": [
        "A TGT enables a client to request service tickets; a TGS authorizes access to a service",
        "Group membership and delegated privileges determine access boundaries",
        "Kerberos failures have many causes; distinguish user typo from attack by volume and pattern"
      ],
      "workflow": [
        "Understand source host, account, target and logon type",
        "Check privileged group membership and recent changes",
        "Pivot into DC security logs and sign-in activity"
      ],
      "example": "A service account suddenly requests tickets for many unfamiliar SPNs; investigate whether the application changed before claiming Kerberoasting.",
      "minutes": 14
    },
    {
      "id": "c14",
      "tier": "Foundation",
      "domain": "Systems",
      "title": "Processes, hashes and digital signatures",
      "summary": "An executable's path, lineage, signer, hash, command line and prevalence give context. A file hash identifies exact bytes, not intent.",
      "details": [
        "SHA-256 can correlate identical file content across hosts",
        "A signed binary can be abused as a living-off-the-land tool",
        "An unsigned binary is not necessarily malicious"
      ],
      "workflow": [
        "Inspect process tree and full command line",
        "Check signature, hash reputation and known-good baselines",
        "Find the same hash or behavior across the environment"
      ],
      "example": "A signed rundll32.exe launched from an unusual parent with odd arguments may warrant more scrutiny than unsigned test software.",
      "minutes": 17
    },
    {
      "id": "c15",
      "tier": "Foundation",
      "domain": "Security fundamentals",
      "title": "CIA, AAA and least privilege",
      "summary": "Confidentiality, integrity and availability describe security goals. Authentication proves a claim, authorization controls actions and accounting records activity.",
      "details": [
        "MFA reduces password-only risk but does not stop all session theft",
        "Least privilege limits blast radius from compromised identities",
        "Service accounts need controlled credentials and scoped permissions"
      ],
      "workflow": [
        "Identify which CIA property is at risk",
        "Check account role and resource sensitivity",
        "Recommend least-privilege remediation"
      ],
      "example": "A compromised read-only account is not equivalent in severity to compromised tenant-wide administrator access.",
      "minutes": 20
    },
    {
      "id": "c16",
      "tier": "Foundation",
      "domain": "Security fundamentals",
      "title": "Threats, vulnerabilities, risk and IOCs",
      "summary": "A vulnerability is a weakness; an exploit abuses it; an IOC is an observable artifact; a TTP describes behavior. Risk combines likelihood, exposure and impact.",
      "details": [
        "IP and hash indicators can be brittle; behavior often lasts longer",
        "CVE identifiers catalog publicly disclosed vulnerabilities, not proof of compromise",
        "Severity ratings like CVSS need environmental context"
      ],
      "workflow": [
        "Separate technical observation from inference",
        "Assess exploitability, exposure, business impact and compensating controls",
        "Corroborate IOC hits with related activity"
      ],
      "example": "A critical CVE on an isolated test server may be less urgent than an exploited medium-rated flaw on an exposed authentication gateway.",
      "minutes": 8
    },
    {
      "id": "c17",
      "tier": "Foundation",
      "domain": "Security fundamentals",
      "title": "MITRE ATT&CK and the kill chain",
      "summary": "ATT&CK organizes observed adversary tactics and techniques; a kill-chain model summarizes phases. Neither proves an incident by itself.",
      "details": [
        "Tactics describe why adversaries act; techniques describe how",
        "One command can map to multiple techniques depending on context",
        "Defense coverage should consider prevention, visibility and detection"
      ],
      "workflow": [
        "Identify suspicious behavior before picking a technique",
        "Map it to supported ATT&CK technique IDs",
        "List the telemetry needed to confirm the hypothesis"
      ],
      "example": "Credential dumping behavior maps to T1003; the supporting evidence is process, access and security product telemetry, not merely a label.",
      "minutes": 11
    },
    {
      "id": "c18",
      "tier": "Foundation",
      "domain": "Security fundamentals",
      "title": "Telemetry quality and time normalization",
      "summary": "The SOC can only investigate what it can see. Ingest delay, parsing failure, clock drift and retention gaps distort incident reconstruction.",
      "details": [
        "UTC timestamps avoid daylight-saving ambiguity",
        "Source time, ingestion time and event time may differ",
        "Missing fields can invalidate correlation logic"
      ],
      "workflow": [
        "Check connector freshness and parsing coverage",
        "Normalize times before comparing products",
        "Flag blind spots and limits in conclusions"
      ],
      "example": "A VPN login seems to precede a phishing click until one log source is converted from local time to UTC.",
      "minutes": 14
    },
    {
      "id": "c19",
      "tier": "L1",
      "domain": "Triage",
      "title": "The first five minutes of an alert",
      "summary": "Triage means deciding whether an alert is real, relevant and urgent enough for action. A fast, repeatable sequence improves consistency.",
      "details": [
        "Alert rule logic and data source are part of the evidence",
        "True positive does not always mean a confirmed security incident",
        "Do not run destructive actions solely because a detection fired"
      ],
      "workflow": [
        "Validate alert timestamps, affected entity and signal",
        "Check asset criticality, identity privilege and historical baseline",
        "Pivot to related telemetry and record next step"
      ],
      "example": "A malware label without an execution event is not the same as confirmed ransomware on a production file server.",
      "minutes": 17
    },
    {
      "id": "c20",
      "tier": "L1",
      "domain": "Triage",
      "title": "True positive, false positive and benign positive",
      "summary": "A true positive correctly matches the detection; a benign positive is an expected but suspicious-pattern behavior; a false positive is inaccurate rule logic or parsing. Labels vary across SOC platforms.",
      "details": [
        "A legitimate admin action may trigger an accurate detector",
        "Incident disposition should record rationale, not just label",
        "Don't suppress a noisy detection without understanding what it would miss"
      ],
      "workflow": [
        "Reconstruct exactly what the rule matched",
        "Determine whether observed activity was authorized and harmful",
        "Document decision with business context and verification"
      ],
      "example": "A planned vulnerability scan triggers port-scan detection: accurate detection, authorized activity, typically benign positive.",
      "minutes": 20
    },
    {
      "id": "c21",
      "tier": "L1",
      "domain": "Triage",
      "title": "Severity, priority and escalation",
      "summary": "Severity reflects impact/technical seriousness; priority reflects urgency relative to business context, SLA and competing cases. Frameworks differ by employer.",
      "details": [
        "Production outages, privileged compromise and active spread increase urgency",
        "Confidence is distinct from severity: high impact with low confidence still needs careful escalation",
        "Actions must follow authorization and incident-handling playbooks"
      ],
      "workflow": [
        "Evaluate asset criticality, user privilege, scope and activity status",
        "Assign severity with a transparent justification",
        "Escalate with artifact links, timeline and requested action"
      ],
      "example": "A compromised domain admin account gets priority even if initial evidence is incomplete, because the potential blast radius is large.",
      "minutes": 8
    },
    {
      "id": "c22",
      "tier": "L1",
      "domain": "Triage",
      "title": "A high-quality ticket and handoff",
      "summary": "A useful ticket lets the next analyst continue without repeating work. Evidence, analytical judgment and uncertainty should be clearly separated.",
      "details": [
        "Include who/what/where/when/how, detection and correlation ID",
        "Record negative checks and limitations, not only positive hits",
        "Preserve links or snapshots of volatile telemetry"
      ],
      "workflow": [
        "Write a one-sentence summary and business impact",
        "Add timeline, IOCs, evidence, hypotheses and confidence",
        "Document containment performed or recommended and owner/next action"
      ],
      "example": "Case 1042: 09:12 UTC suspicious inbox rule; 09:20 correlated new sign-in from unusual ASN; session revocation requested, awaiting IAM approval.",
      "minutes": 11
    },
    {
      "id": "c23",
      "tier": "L1",
      "domain": "Log analysis",
      "title": "Windows sign-in events",
      "summary": "Successful and failed authentication events must be interpreted with logon type, status, account and source. One failed login is usually ordinary.",
      "details": [
        "4624 includes logon types: 2 interactive, 3 network, 10 remote interactive",
        "4625 has failure details and source metadata when present",
        "4740 identifies account lockouts; 4768/4769/4771 support Kerberos analysis"
      ],
      "workflow": [
        "Group by account and source over time",
        "Compare failure bursts with success and geography/ASN",
        "Verify service accounts and known scanners"
      ],
      "example": "Thirty 4625 failures followed by a 4624 from the same external jump host is more concerning than routine typos.",
      "minutes": 14
    },
    {
      "id": "c24",
      "tier": "L1",
      "domain": "Log analysis",
      "title": "Sysmon process and network events",
      "summary": "Sysmon enriches Windows visibility. Event IDs depend on installed configuration, and not all endpoints collect all event types.",
      "details": [
        "Sysmon 1 process creation; 3 network connection if enabled",
        "Sysmon 7 image load, 11 file creation, 22 DNS query when configured",
        "Parent and grandparent context often matter more than filename alone"
      ],
      "workflow": [
        "Inspect process lineage, image path, hash and command line",
        "Cross-check DNS and connection events for the same process GUID",
        "Validate whether activity is normal on that host"
      ],
      "example": "winword.exe → powershell.exe → network connection is stronger evidence than powershell.exe alone.",
      "minutes": 17
    },
    {
      "id": "c25",
      "tier": "L1",
      "domain": "Log analysis",
      "title": "Email headers and phishing",
      "summary": "Phishing investigations evaluate sender authentication, lookalike domains, URLs, attachments and user interaction. SPF, DKIM and DMARC outcomes are signals, not guarantees of safety.",
      "details": [
        "SPF checks sending host authorization, DKIM checks cryptographic signature, DMARC aligns identities and sets policy",
        "Display name can differ from envelope and header addresses",
        "Check whether the user clicked, downloaded, entered credentials or approved MFA"
      ],
      "workflow": [
        "Inspect full headers, URLs and attachment metadata",
        "Search message trace for all recipients",
        "Check sign-in activity after delivery and recommend containment"
      ],
      "example": "A payroll-themed message passes SPF but redirects through a new domain to a fake login page.",
      "minutes": 20
    },
    {
      "id": "c26",
      "tier": "L1",
      "domain": "Log analysis",
      "title": "Firewall, proxy and DNS correlation",
      "summary": "One log source rarely tells the full story. Firewall indicates flows; proxy shows HTTP context; DNS shows attempted name resolution.",
      "details": [
        "Blocked traffic does not establish a successful compromise",
        "Allow/deny decisions need policy context",
        "Proxy status and bytes can reveal transfers but require baselines"
      ],
      "workflow": [
        "Start with source IP, destination and time window",
        "Cross-check DNS resolution and proxy requests",
        "Enrich with endpoint process and identity details"
      ],
      "example": "Suspicious DNS request followed by HTTPS POST and unusual uploaded bytes suggests deeper review.",
      "minutes": 8
    },
    {
      "id": "c27",
      "tier": "L1",
      "domain": "Log analysis",
      "title": "EDR alerts and endpoint isolation",
      "summary": "Endpoint Detection and Response correlates processes, file and network behavior and offers containment actions. Isolation is impactful and usually requires approval.",
      "details": [
        "EDR prevention events may show blocked execution with no successful compromise",
        "Sensor offline does not mean host is clean",
        "Isolation can disrupt servers and remote support"
      ],
      "workflow": [
        "Read detection graph and prevention status",
        "Check file, command line, persistence and lateral movement",
        "Recommend approved containment with impact and rollback plan"
      ],
      "example": "An EDR alert says malicious script blocked; verify whether any child process or persistence succeeded before asserting containment.",
      "minutes": 11
    },
    {
      "id": "c28",
      "tier": "L1",
      "domain": "Log analysis",
      "title": "Authentication and cloud sign-in logs",
      "summary": "Cloud and SaaS sign-in investigations require identity, device, application, conditional access and token context. Geolocation alone can be misleading.",
      "details": [
        "VPN exits and mobile carriers create misleading travel patterns",
        "Successful MFA may be attacker-induced through push fatigue or token theft",
        "OAuth consent and app permissions can persist after password resets"
      ],
      "workflow": [
        "Review interactive/noninteractive sign-ins and device trust",
        "Check MFA details, consent grants and session history",
        "Identify sensitive resources accessed after suspicious sign-in"
      ],
      "example": "A foreign IP sign-in via known corporate VPN on managed hardware may be benign; new app consent plus mailbox access is not.",
      "minutes": 14
    },
    {
      "id": "c29",
      "tier": "L1",
      "domain": "SIEM skills",
      "title": "What a SIEM really does",
      "summary": "A SIEM ingests and normalizes logs, enriches them, correlates events, and supports searches, alerts, dashboards and investigations. Garbage input creates bad detections.",
      "details": [
        "SIEM is not a guarantee of complete coverage",
        "Deduplication and parsing can lose fields",
        "Detection rules have schedules, lookback windows and thresholds"
      ],
      "workflow": [
        "Identify native data source and normalized schema",
        "Explain rule conditions and suppression",
        "Confirm searches use correct time range and fields"
      ],
      "example": "A correlation rule misses failures because source logs use username while normalized events use user.name.",
      "minutes": 17
    },
    {
      "id": "c30",
      "tier": "L1",
      "domain": "SIEM skills",
      "title": "Splunk SPL patterns",
      "summary": "SPL supports searching, transforming and aggregating machine data. Field names vary by sourcetype and environment.",
      "details": [
        "index= and sourcetype= narrow the dataset",
        "stats count by field groups events; where filters evaluated expressions",
        "timechart shows time buckets; dedup and sort change displayed results"
      ],
      "workflow": [
        "Start narrowly with index, timeframe and core indicator",
        "Extract relevant fields and aggregate",
        "Check raw events before interpreting summarized counts"
      ],
      "example": "index=windows EventCode=4625 | stats count by src_ip, user | sort - count",
      "minutes": 20
    },
    {
      "id": "c31",
      "tier": "L1",
      "domain": "SIEM skills",
      "title": "KQL fundamentals for Sentinel",
      "summary": "Kusto Query Language uses table expressions and operators such as where, project, extend, summarize and join. Table names depend on ingestion connector.",
      "details": [
        "ago(1h) expresses a time filter; has and contains have different token semantics",
        "summarize count() by groups rows; bin() buckets time",
        "join can explode results when keys are not unique"
      ],
      "workflow": [
        "Identify the target table and timestamp column",
        "Filter early and project only needed fields",
        "Aggregate, examine outliers and pivot into raw events"
      ],
      "example": "SigninLogs | where TimeGenerated > ago(1d) | summarize Failures=countif(ResultType != \"0\") by UserPrincipalName",
      "minutes": 8
    },
    {
      "id": "c32",
      "tier": "L1",
      "domain": "SIEM skills",
      "title": "Query pitfalls and baselines",
      "summary": "An outlier is not automatically malicious. High quality queries compare relevant periods, prevent wrong joins and handle case normalization.",
      "details": [
        "Count unique hosts/users rather than just event volume when appropriate",
        "Absence of logs can be a data gap instead of absence of activity",
        "Overly broad regex and tiny time windows cause misleading results"
      ],
      "workflow": [
        "Validate raw event counts and time range",
        "Compare host role, shift hours and seasonal baseline",
        "Document assumptions before converting searches to alerts"
      ],
      "example": "A backup server makes many SMB connections at 02:00; a workstation doing so for the first time is different.",
      "minutes": 11
    },
    {
      "id": "c33",
      "tier": "L1",
      "domain": "Detection patterns",
      "title": "Password spraying and brute force",
      "summary": "Spraying tests a few passwords across many accounts; brute force generally tests many candidates against one account. Detection depends on distribution and timeframe.",
      "details": [
        "Distributed attacks can spread attempts across many IPs",
        "Failures alone may reflect bad app configuration",
        "Successes and MFA failures help raise confidence"
      ],
      "workflow": [
        "Count distinct accounts per IP or ASN and time window",
        "Compare success, lockouts and unusual devices",
        "Check whether attacks are ongoing and protect exposed identities"
      ],
      "example": "One IP has three failures across 80 accounts followed by one success and a new MFA registration.",
      "minutes": 14
    },
    {
      "id": "c34",
      "tier": "L1",
      "domain": "Detection patterns",
      "title": "Suspicious PowerShell",
      "summary": "PowerShell is legitimate automation but also frequently abused. Analyze parent process, encoded input, network destinations and resulting behaviors without relying on one keyword.",
      "details": [
        "-EncodedCommand may be used by benign management tools",
        "Script block logging (4104) can show executed code if enabled",
        "ExecutionPolicy is not a security boundary"
      ],
      "workflow": [
        "Decode and inspect script content in a safe environment",
        "Check parent-child lineage and script origin",
        "Pivot into downloads, file writes, persistence and execution"
      ],
      "example": "A spreadsheet macro launching hidden PowerShell with a download command needs urgent review.",
      "minutes": 17
    },
    {
      "id": "c35",
      "tier": "L1",
      "domain": "Detection patterns",
      "title": "Malware, persistence and LOLBins",
      "summary": "Attackers may use scheduled tasks, services, startup folders and signed Windows tools for persistence or execution. Intent comes from behavior and context.",
      "details": [
        "schtasks.exe and rundll32.exe have many valid uses",
        "Registry Run keys and Windows services can establish persistence",
        "One alert does not identify patient zero or full compromise scope"
      ],
      "workflow": [
        "Check autoruns/tasks/services changed near execution",
        "Investigate new files, parent process and signer",
        "Search fleet for related file hash and behavior"
      ],
      "example": "A new task runs mshta.exe against an external URL each hour on a finance workstation.",
      "minutes": 20
    },
    {
      "id": "c36",
      "tier": "L1",
      "domain": "Detection patterns",
      "title": "Network scanning and lateral movement",
      "summary": "Scanning discovers targets; lateral movement uses access to other hosts. SMB, RDP, WinRM and remote service creation are common pivots, not proof on their own.",
      "details": [
        "Scanning commonly shows many ports or destinations per source",
        "Lateral movement often produces authentication and remote process artifacts",
        "Maintenance tools and vulnerability scanners create similar noise"
      ],
      "workflow": [
        "Check rate, target diversity and asset role",
        "Join authentication events to network flow timeline",
        "Look for remote execution or privilege changes"
      ],
      "example": "An ordinary desktop authenticates to 18 servers using one privileged credential at 03:00.",
      "minutes": 8
    },
    {
      "id": "c37",
      "tier": "L1",
      "domain": "Detection patterns",
      "title": "Web alerts and WAF triage",
      "summary": "Web Application Firewalls detect requests matching rule patterns. An alert may show a blocked probe, an application bug, or attempted exploitation.",
      "details": [
        "Payload text is not proof the backend executed it",
        "HTTP status 200 does not by itself prove successful SQL injection",
        "Correlate WAF rule, upstream response, application log and server behavior"
      ],
      "workflow": [
        "Inspect route, parameter, payload and response sequence",
        "Determine blocked, challenged, forwarded or successful outcome",
        "Search same source and target for later actions"
      ],
      "example": "Multiple traversal attempts blocked with 403 do not establish data theft; a later 200 plus file-access logs might.",
      "minutes": 11
    },
    {
      "id": "c38",
      "tier": "L1",
      "domain": "Detection patterns",
      "title": "IOC enrichment and reputation",
      "summary": "Reputation sources add context to IPs, domains, hashes and URLs but can be wrong or outdated. Do not upload private customer data to public scanners.",
      "details": [
        "Shared hosting and CDNs make IP reputation unreliable alone",
        "Hash reputation is exact-file specific and may miss variants",
        "Passive DNS, WHOIS and domain age are context, not conclusions"
      ],
      "workflow": [
        "Use approved intelligence services",
        "Cross-check indicator with event behavior and timing",
        "Record confidence, source, age and handling restrictions"
      ],
      "example": "An IOC feed labels a shared CDN IP malicious; the actual requested host belongs to a legitimate update service.",
      "minutes": 14
    },
    {
      "id": "c39",
      "tier": "L1",
      "domain": "Communication",
      "title": "Writing incident summaries",
      "summary": "A good summary separates observations, assessment, impact and next steps. Use concise operational language and avoid unsupported certainty.",
      "details": [
        "Evidence is what logs show; inference is what it may mean",
        "Cite timestamps, time zones, accounts and hostnames consistently",
        "Recommendations should have an owner, urgency and verification method"
      ],
      "workflow": [
        "Open with incident type and current status",
        "Describe timeline and confirmed impact",
        "Note open questions and proposed actions"
      ],
      "example": "Observed: three anomalous logins; assessed: possible stolen credentials (medium confidence); action: revoke sessions pending IAM approval.",
      "minutes": 17
    },
    {
      "id": "c40",
      "tier": "L2",
      "domain": "Investigation",
      "title": "Hypothesis-driven investigations",
      "summary": "A hypothesis connects observations to a falsifiable explanation. L2 analysts should seek both supporting and disconfirming evidence to avoid tunnel vision.",
      "details": [
        "The same activity can have competing benign and malicious explanations",
        "A pivot should answer a specific investigative question",
        "Keep an explicit distinction between not observed and ruled out"
      ],
      "workflow": [
        "Write hypothesis and alternative explanation",
        "Find independent data sources that can discriminate them",
        "Update confidence as evidence appears"
      ],
      "example": "Hypothesis: attacker used VPN account for remote access; alternate: employee traveling; test device registration, ticket and access sequence.",
      "minutes": 20
    },
    {
      "id": "c41",
      "tier": "L2",
      "domain": "Investigation",
      "title": "Build a defensible incident timeline",
      "summary": "An incident timeline aligns endpoint, identity, network and cloud evidence. The goal is explaining sequence, scope and gaps, not only collecting IOCs.",
      "details": [
        "UTC and raw timestamps must be preserved",
        "Process IDs can be reused; GUIDs and start times improve joins",
        "Log retention and late ingestion produce uncertainty"
      ],
      "workflow": [
        "Create normalized chronological event list",
        "Tag each event with source and reliability",
        "Highlight initial access, execution, persistence, movement and impact"
      ],
      "example": "08:01 phish delivered → 08:14 user clicked → 08:17 new sign-in → 08:23 inbox rule created.",
      "minutes": 8
    },
    {
      "id": "c42",
      "tier": "L2",
      "domain": "Investigation",
      "title": "Phishing-to-account-takeover chain",
      "summary": "Account takeover investigations span message delivery, credentials/session use, MFA, mailbox access, rules, OAuth grants and potential business email compromise.",
      "details": [
        "Password reset alone may not invalidate existing tokens",
        "Mailbox forwarding and app grants persist independently",
        "A user can be the victim and an outbound phishing source"
      ],
      "workflow": [
        "Search all recipients and clicks",
        "Examine sign-ins, session/token artifacts and mailbox operations",
        "Coordinate credential reset, session revocation and tenant cleanup"
      ],
      "example": "A fraudulent invoice message is followed by new forwarding rule and financial-team mailbox search.",
      "minutes": 11
    },
    {
      "id": "c43",
      "tier": "L2",
      "domain": "Investigation",
      "title": "Ransomware incident triage",
      "summary": "Potential ransomware demands quick containment coordination, proof collection and scoping. Do not disable forensic telemetry casually or assume one encrypted file means fleet-wide spread.",
      "details": [
        "Mass file modification, shadow copy deletion and ransom notes are suspicious together",
        "Backups and domain controller access change response urgency",
        "Recovery choices belong to authorized incident leadership"
      ],
      "workflow": [
        "Confirm process and affected hosts using EDR and file events",
        "Determine spread and privileged access",
        "Recommend containment, preserve artifacts and hand off to response lead"
      ],
      "example": "A file server shows thousands of renames, vssadmin execution and suspicious remote admin login.",
      "minutes": 14
    },
    {
      "id": "c44",
      "tier": "L2",
      "domain": "Investigation",
      "title": "Lateral movement reconstruction",
      "summary": "Track how an identity or process moved across systems, distinguishing legitimate administration from unauthorized use.",
      "details": [
        "WinRM, PsExec-like services, RDP and SMB leave different evidence",
        "Account use does not prove the human owner performed the action",
        "Local and domain admin rights alter scope"
      ],
      "workflow": [
        "Join authentication, EDR and network connection events",
        "Trace source and destination hosts with time ordering",
        "Identify credentials, sessions and systems requiring remediation"
      ],
      "example": "A stolen helpdesk token is used to launch a remote service on payroll and then a database host.",
      "minutes": 17
    },
    {
      "id": "c45",
      "tier": "L2",
      "domain": "Investigation",
      "title": "Cloud IAM and audit trails",
      "summary": "Cloud incident investigations examine identities, role assumptions, API calls, workload changes and data access. Logging may be account-, project- or region-specific.",
      "details": [
        "AWS CloudTrail logs management operations; data events need relevant configuration",
        "Azure activity and sign-in logs answer different questions",
        "GCP Cloud Audit Logs distinguish activity categories and resource context"
      ],
      "workflow": [
        "Determine principal, source IP, action, resource and result",
        "Look for persistence via keys, policies or new identities",
        "Scope storage reads, egress and role expansion"
      ],
      "example": "A workload key creates a new access key and exports data from a sensitive bucket.",
      "minutes": 20
    },
    {
      "id": "c46",
      "tier": "L2",
      "domain": "Investigation",
      "title": "DNS tunneling and C2 hypotheses",
      "summary": "Command-and-control can hide in seemingly normal web and DNS traffic. Analysts use periodicity, data volume and process correlation, not just a domain name.",
      "details": [
        "High-entropy long labels and TXT records can be benign",
        "Regular beacon intervals can arise from software updates",
        "Tunneling claims require evidence of encoded traffic and transfer behavior"
      ],
      "workflow": [
        "Group queries by source, domain and time",
        "Check query lengths, record types, failures and periodicity",
        "Correlate endpoint process with egress and proxy"
      ],
      "example": "An endpoint makes many long unique TXT queries to one unapproved domain immediately after script execution.",
      "minutes": 8
    },
    {
      "id": "c47",
      "tier": "L2",
      "domain": "Investigation",
      "title": "Threat intelligence and ATT&CK mapping",
      "summary": "Threat intelligence should inform a local testable hypothesis, not dictate attribution. ATT&CK mapping helps coverage review and evidence organization.",
      "details": [
        "A shared tool or IP seldom identifies a specific threat group",
        "Technique IDs should map to observed behavior",
        "Confidence, source reliability and recency matter"
      ],
      "workflow": [
        "Read report for behaviors and telemetry requirements",
        "Hunt for the behavior in local environment",
        "Document results, gaps and detection opportunities"
      ],
      "example": "A report describes scheduled-task persistence; hunt for newly registered tasks following suspicious script execution.",
      "minutes": 11
    },
    {
      "id": "c48",
      "tier": "L2",
      "domain": "Response",
      "title": "Containment, eradication and recovery",
      "summary": "Response balances stopping harm with business continuity and forensic needs. NIST SP 800-61r3 aligns response with CSF 2.0 and broader organizational risk management.",
      "details": [
        "Containment isolates or limits activity; eradication removes cause and persistence",
        "Recovery verifies clean return to service and monitoring",
        "Decisions require delegated authority, legal/business coordination and rollback planning"
      ],
      "workflow": [
        "Confirm incident scope and critical systems",
        "Propose actions, dependencies and evidence preservation",
        "Verify outcomes and search for recurrence"
      ],
      "example": "Before isolating a production domain controller, incident leadership evaluates continuity, scope and alternative containment.",
      "minutes": 14
    },
    {
      "id": "c49",
      "tier": "L2",
      "domain": "Response",
      "title": "Evidence preservation and chain of custody",
      "summary": "Evidence is useful only if investigators know its origin, integrity and handling. Practical SOC work emphasizes repeatable export, timestamps and restricted access.",
      "details": [
        "Capture tool, operator, time, source, hash and storage location",
        "Volatile state can disappear when systems reboot or isolate",
        "Do not alter original evidence while analyzing copies"
      ],
      "workflow": [
        "Record acquisition method and case reference",
        "Hash exported artifacts where appropriate",
        "Restrict access, preserve originals and document transfers"
      ],
      "example": "A memory image stored with SHA-256 and a signed transfer log is easier to defend than an untracked screenshot.",
      "minutes": 17
    },
    {
      "id": "c50",
      "tier": "L2",
      "domain": "Response",
      "title": "Incident communications and stakeholders",
      "summary": "Responders coordinate technical action with affected service owners, leadership, IAM, legal and communications. Reporting should be accurate and need-to-know.",
      "details": [
        "Share confirmed facts and current uncertainty separately",
        "Avoid naming perpetrators without supporting evidence",
        "Choose update frequency based on severity and stakeholder needs"
      ],
      "workflow": [
        "Issue initial status and impact summary",
        "Track action owners and approvals",
        "Provide updates, closure criteria and lessons learned"
      ],
      "example": "For suspected SaaS exfiltration, legal and data protection stakeholders are notified according to policy, not automatically by every L1 analyst.",
      "minutes": 20
    },
    {
      "id": "c51",
      "tier": "L2",
      "domain": "Detection",
      "title": "Tuning noisy rules without losing coverage",
      "summary": "Detection tuning improves precision while preserving true-positive recall. A suppression should have owner, expiration and compensating visibility.",
      "details": [
        "A whitelist based on one broad IP range is often risky",
        "Precision=TP/(TP+FP); recall=TP/(TP+FN)",
        "Sampling confirmed benign and malicious events helps evaluate changes"
      ],
      "workflow": [
        "Collect true and false positive examples",
        "Propose narrow exclusions with justification",
        "Test against historical cases and monitor misses"
      ],
      "example": "Exclude only a signed enterprise updater on managed hosts, rather than all PowerShell executions.",
      "minutes": 8
    },
    {
      "id": "c52",
      "tier": "L2",
      "domain": "Detection",
      "title": "Sigma rules and detection portability",
      "summary": "Sigma describes log detections in YAML with title, logsource, detection and optional metadata. Backends translate to platform-specific queries with field mapping limitations.",
      "details": [
        "selection and condition express match logic",
        "Logsource product/service/category describes expected telemetry",
        "A Sigma rule is not automatically portable without schema and pipeline mapping"
      ],
      "workflow": [
        "Identify required event source and fields",
        "Write selection and condition",
        "Test against real benign and malicious samples"
      ],
      "example": "A Sigma rule for suspicious service installation must verify the Windows Event ID and source-specific field names.",
      "minutes": 11
    },
    {
      "id": "c53",
      "tier": "L3",
      "domain": "Hunting",
      "title": "Structured threat hunting",
      "summary": "Hunting proactively tests a hypothesis against available telemetry, records gaps, and turns repeatable findings into detections. It is not simply running random IOC searches.",
      "details": [
        "Intel-driven, hypothesis-driven and analytics-driven hunts start differently",
        "Document scope, population, timeframe, exclusions and result",
        "Negative findings are only meaningful when data coverage is adequate"
      ],
      "workflow": [
        "Form a threat behavior hypothesis",
        "Translate it to observable events and queries",
        "Investigate hits, record gaps and propose new control"
      ],
      "example": "Hunt: unexpected process accesses LSASS on workstations during last 14 days; validate EDR telemetry retention first.",
      "minutes": 14
    },
    {
      "id": "c54",
      "tier": "L3",
      "domain": "Hunting",
      "title": "Behavioral analytics and anomalies",
      "summary": "Behavioral detections use peer groups, baselines, features and thresholds. An anomaly is a starting point for investigation, not a verdict.",
      "details": [
        "Account role and host function matter to baselines",
        "Rare does not mean malicious; common does not mean safe",
        "Seasonality, data drift and missingness affect model output"
      ],
      "workflow": [
        "Define feature and normal population",
        "Build comparable time-based baseline",
        "Validate anomalies using independent signals"
      ],
      "example": "A finance user normally downloads 30 MB/day; 8 GB to an unknown cloud host after suspicious OAuth grant changes the risk story.",
      "minutes": 17
    },
    {
      "id": "c55",
      "tier": "L3",
      "domain": "Hunting",
      "title": "Detection engineering lifecycle",
      "summary": "Engineering includes threat model, telemetry contract, query, test cases, deployment, monitoring and maintenance. Every detection needs an owner.",
      "details": [
        "Detection-as-code enables review and version control",
        "Simulated adversary tests can measure known behavior but not all evasions",
        "Detection metadata should include ATT&CK mapping, triage guide and data dependencies"
      ],
      "workflow": [
        "Write a clear behavioral hypothesis",
        "Build and test representative positive/negative examples",
        "Deploy with rollback and review alert quality"
      ],
      "example": "A rule identifies new remote services followed by suspicious binary execution, with automated unit examples and weekly false-positive review.",
      "minutes": 20
    },
    {
      "id": "c56",
      "tier": "L3",
      "domain": "Hunting",
      "title": "ATT&CK coverage gaps and purple teaming",
      "summary": "Coverage matrices expose which behaviors are detected and which are only logged or prevented. Purple teaming tests controls collaboratively with defined authorization.",
      "details": [
        "A mapped rule is not evidence of effective coverage",
        "Test design needs prerequisites, expected telemetry and success criteria",
        "Document detections, misses, detection delay and remediation"
      ],
      "workflow": [
        "Pick business-relevant threat scenario",
        "Map expected behaviors and data sources",
        "Run an approved safe test, review logs and improve rules"
      ],
      "example": "A sanctioned credential-access emulation tests whether an EDR alert reaches the SIEM and whether L1 can correctly triage it.",
      "minutes": 8
    },
    {
      "id": "c57",
      "tier": "L3",
      "domain": "Hunting",
      "title": "Digital forensics and memory concepts",
      "summary": "Host forensics connects disk artifacts, process state and volatile memory while preserving integrity. Analysts must know limitations and avoid unapproved collection.",
      "details": [
        "RAM may contain process/network artifacts absent from disk",
        "Prefetch, Amcache and Shimcache have caveats and cannot independently prove execution timing",
        "Forensic images and timelines demand documented provenance"
      ],
      "workflow": [
        "Define the investigative question before collecting",
        "Choose appropriate volatile and nonvolatile artifacts",
        "Correlate independent sources and articulate limitations"
      ],
      "example": "A suspicious executable was deleted; prefetch plus EDR and browser download records help reconstruct its activity.",
      "minutes": 11
    },
    {
      "id": "c58",
      "tier": "L3",
      "domain": "Hunting",
      "title": "Malware analysis workflow",
      "summary": "Malware triage progresses from metadata and static inspection to controlled dynamic analysis when authorized. Never run suspect samples on a normal workstation.",
      "details": [
        "Hashes and signatures establish identity, not maliciousness",
        "Imports, strings and sections offer hints but are easy to obfuscate",
        "Behavioral sandbox observations require a suitable isolated environment"
      ],
      "workflow": [
        "Preserve sample and hash in approved storage",
        "Inspect metadata, strings and public reputation",
        "Escalate to isolated dynamic analysis if permitted"
      ],
      "example": "A purported PDF is a Windows PE executable with suspicious import table and persistence behavior in a sandbox.",
      "minutes": 14
    },
    {
      "id": "c59",
      "tier": "L3",
      "domain": "Hunting",
      "title": "Identity attack paths and BloodHound",
      "summary": "Graph analysis maps how identities and privileges combine into reachable attack paths. Paths indicate opportunities and must be validated against live permissions and policy.",
      "details": [
        "Attack paths depend on freshness of collection and scope",
        "Nested group membership, delegation and local admin rights matter",
        "Graph reachability alone does not prove an attacker exploited anything"
      ],
      "workflow": [
        "Define target assets and privileged roles",
        "Collect approved permissions and relationships",
        "Prioritize choke points and remediation owners"
      ],
      "example": "A helpdesk group can reset password of an application owner with broad permissions; reduce unintended delegation.",
      "minutes": 17
    },
    {
      "id": "c60",
      "tier": "L3",
      "domain": "Cloud and containers",
      "title": "Container and Kubernetes monitoring",
      "summary": "Containers share the host kernel; Kubernetes adds API, RBAC, admission, audit and workload concerns. SOC analysts correlate runtime alerts with deployment context.",
      "details": [
        "Container image vulnerabilities do not prove runtime exploitation",
        "Service accounts and Kubernetes RBAC can enable lateral movement",
        "Runtime namespace/process behavior differs from host context"
      ],
      "workflow": [
        "Identify pod, image digest, namespace and service account",
        "Check API audit, container runtime and node events",
        "Scope credentials and affected workloads"
      ],
      "example": "A pod with unexpected shell execution also makes Kubernetes API requests using a newly mounted token.",
      "minutes": 20
    },
    {
      "id": "c61",
      "tier": "L3",
      "domain": "Cloud and containers",
      "title": "Cloud detection engineering",
      "summary": "Cloud detections should model API behavior, privilege context, expected infrastructure-as-code changes and account boundaries.",
      "details": [
        "Role assumption, policy modifications and key creation are high-value behaviors",
        "Legitimate CI/CD often performs sensitive API calls",
        "Multi-account observability and log retention are frequent blind spots"
      ],
      "workflow": [
        "Correlate principal, session and source network",
        "Join changes to approved deployments and ticket IDs",
        "Alert on suspicious sequence or unusual principal-context combination"
      ],
      "example": "A new access key is immediately used from an unseen ASN to disable audit logging and enumerate object storage.",
      "minutes": 8
    },
    {
      "id": "c62",
      "tier": "L3",
      "domain": "Leadership",
      "title": "Root cause analysis and post-incident review",
      "summary": "An effective review explains how the incident happened, why controls failed, and how improvements will be measured without blaming individuals.",
      "details": [
        "Distinguish initial cause from contributing factors",
        "Action items should be specific, owned and dated",
        "Measure time-to-detect, time-to-contain and recurrence using clear definitions"
      ],
      "workflow": [
        "Build factual timeline with evidence",
        "Identify control and process gaps",
        "Assign corrective actions, validation and follow-up"
      ],
      "example": "A phishing incident showed weak token revocation and insufficient audit retention; those become measurable engineering tasks.",
      "minutes": 11
    },
    {
      "id": "c63",
      "tier": "L3",
      "domain": "Leadership",
      "title": "Metrics, SLAs and SOC maturity",
      "summary": "Operational metrics should improve decisions, not reward premature closures. A high number of closed alerts can conceal poor detection quality.",
      "details": [
        "MTTD and MTTR definitions depend on start/stop event rules",
        "Backlog age, escalation quality and detection coverage add context",
        "Precision and false-positive rate are different measures"
      ],
      "workflow": [
        "Define metric and source consistently",
        "Segment by severity and incident class",
        "Review trends alongside case quality and missing telemetry"
      ],
      "example": "The team reduced alert queue by 40% but failed to detect identity compromise due to disabled log ingestion: a misleading success.",
      "minutes": 14
    },
    {
      "id": "c64",
      "tier": "L3",
      "domain": "Leadership",
      "title": "Threat modeling and architecture review",
      "summary": "Threat models connect business assets, trust boundaries, potential attacker actions and feasible controls. SOC feedback should shape architecture.",
      "details": [
        "Data flows expose choke points and logging needs",
        "STRIDE is one model for categorizing threat types",
        "Trust boundaries and privilege transitions are good places for detection controls"
      ],
      "workflow": [
        "Draw assets, identities and data flows",
        "Identify attacker objectives and abuse paths",
        "Propose prioritized prevention, logging and detections"
      ],
      "example": "A public upload API can store files in cloud storage; model unauthenticated input, scanning, IAM and audit trail requirements.",
      "minutes": 17
    }
  ],
  "interviews": [
    {
      "id": "i001",
      "tier": "L1",
      "category": "Fundamentals",
      "question": "What is the SOC's primary purpose?",
      "answer": "Continuously detect, investigate and coordinate response to threats, using evidence from telemetry and business context.",
      "trap": "Saying the goal is to block every attack ignores incident coordination and risk."
    },
    {
      "id": "i002",
      "tier": "L1",
      "category": "Fundamentals",
      "question": "Explain confidentiality, integrity and availability.",
      "answer": "Confidentiality restricts disclosure; integrity protects correctness; availability keeps services accessible. Give an example for each.",
      "trap": "Treating availability as only backup quality."
    },
    {
      "id": "i003",
      "tier": "L1",
      "category": "Fundamentals",
      "question": "What is the difference between vulnerability, exploit and threat?",
      "answer": "A vulnerability is a weakness, an exploit is a way to abuse it, and a threat is a potential cause of harm.",
      "trap": "Confusing a CVE finding with confirmed exploitation."
    },
    {
      "id": "i004",
      "tier": "L1",
      "category": "Fundamentals",
      "question": "What are indicators of compromise versus TTPs?",
      "answer": "IOCs are observable artifacts such as hashes/domains; TTPs describe adversary behaviors and procedures. Use both, but behavior often generalizes better.",
      "trap": "Assuming an IP hit proves malicious intent."
    },
    {
      "id": "i005",
      "tier": "L1",
      "category": "Fundamentals",
      "question": "How do you explain a SIEM?",
      "answer": "It collects and normalizes log data, supports searching and correlation, and produces detections, dashboards and investigation context.",
      "trap": "Assuming SIEM automatically blocks attacks."
    },
    {
      "id": "i006",
      "tier": "L1",
      "category": "Fundamentals",
      "question": "What is EDR versus antivirus?",
      "answer": "Traditional antivirus often emphasizes file/signature detection; EDR provides richer process telemetry, behavioral detection, investigation and response capabilities. Vendors overlap.",
      "trap": "Claiming antivirus never detects behavior."
    },
    {
      "id": "i007",
      "tier": "L1",
      "category": "Fundamentals",
      "question": "What is MITRE ATT&CK?",
      "answer": "An evolving knowledge base of adversary tactics and techniques based on observations, useful for organizing investigations and detection coverage.",
      "trap": "Calling it an incident response lifecycle."
    },
    {
      "id": "i008",
      "tier": "L1",
      "category": "Networking",
      "question": "Walk me through a DNS lookup.",
      "answer": "Client asks resolver; cache may answer; otherwise recursive resolution reaches authoritative name servers, returns record with TTL and client connects as appropriate.",
      "trap": "Saying DNS always uses UDP only."
    },
    {
      "id": "i009",
      "tier": "L1",
      "category": "Networking",
      "question": "TCP versus UDP?",
      "answer": "TCP is connection-oriented with reliability and ordering; UDP is datagram-based without those inherent guarantees. Apps can add controls, and QUIC uses UDP.",
      "trap": "Claiming UDP cannot be secure."
    },
    {
      "id": "i010",
      "tier": "L1",
      "category": "Networking",
      "question": "What happens in a TCP three-way handshake?",
      "answer": "SYN, SYN/ACK, ACK establish negotiated sequence state for TCP communication.",
      "trap": "Confusing ACK with the last step of teardown."
    },
    {
      "id": "i011",
      "tier": "L1",
      "category": "Networking",
      "question": "Name common ports useful to an analyst.",
      "answer": "53 DNS, 80/443 web, 445 SMB, 3389 RDP, 22 SSH, 88 Kerberos, 389/636 LDAP, 25/587 SMTP. Verify actual protocol.",
      "trap": "Judging activity solely on the port number."
    },
    {
      "id": "i012",
      "tier": "L1",
      "category": "Networking",
      "question": "What does a 403 mean compared with a 401?",
      "answer": "401 means authentication is required or failed; 403 indicates the server understood the request but refuses authorization. Implementation varies.",
      "trap": "Claiming 403 always means WAF blocked an exploit."
    },
    {
      "id": "i013",
      "tier": "L1",
      "category": "Networking",
      "question": "How does NAT complicate attribution?",
      "answer": "Many internal clients may share one public IP; need timestamp, source port, NAT translation and other logs.",
      "trap": "Treating external IP as an individual endpoint."
    },
    {
      "id": "i014",
      "tier": "L1",
      "category": "Networking",
      "question": "What is a proxy and why do analysts care?",
      "answer": "A proxy intermediates requests and can log destination URL, method, user, bytes and policy decisions with visibility dependent on deployment.",
      "trap": "Assuming encrypted body is always visible."
    },
    {
      "id": "i015",
      "tier": "L1",
      "category": "Windows",
      "question": "What is Event ID 4624?",
      "answer": "A successful Windows logon; logon type, account, source and context determine meaning.",
      "trap": "Calling every 4624 an interactive local login."
    },
    {
      "id": "i016",
      "tier": "L1",
      "category": "Windows",
      "question": "What is Event ID 4625?",
      "answer": "A failed Windows logon; aggregate counts, user/source distribution and nearby successful logons.",
      "trap": "Treating any single failure as brute force."
    },
    {
      "id": "i017",
      "tier": "L1",
      "category": "Windows",
      "question": "What is Event ID 4688?",
      "answer": "Process creation in Windows Security logs when relevant auditing is enabled; enhanced command line needs proper policy.",
      "trap": "Assuming command lines are always included."
    },
    {
      "id": "i018",
      "tier": "L1",
      "category": "Windows",
      "question": "What do Sysmon Events 1, 3 and 22 indicate?",
      "answer": "When configured: process creation, network connection and DNS query respectively.",
      "trap": "Assuming all Sysmon configurations collect all three."
    },
    {
      "id": "i019",
      "tier": "L1",
      "category": "Windows",
      "question": "What is an unusual process chain?",
      "answer": "A parent-child process relationship inconsistent with normal workflow, e.g., a document app spawning script interpreter with network egress. Needs context.",
      "trap": "Calling powershell.exe inherently malicious."
    },
    {
      "id": "i020",
      "tier": "L1",
      "category": "Linux",
      "question": "Where would you investigate SSH failures?",
      "answer": "Use auth journal/log files appropriate to distro, sshd service events and source/user aggregation. Check logging configuration.",
      "trap": "Assuming /var/log/auth.log exists everywhere."
    },
    {
      "id": "i021",
      "tier": "L1",
      "category": "Linux",
      "question": "How do you check listening services?",
      "answer": "Use ss -tulpn with appropriate privileges; correlate services with process owner and known change requests.",
      "trap": "Assuming any unfamiliar open port is malicious."
    },
    {
      "id": "i022",
      "tier": "L1",
      "category": "Triage",
      "question": "What are the first steps after a critical alert?",
      "answer": "Validate signal and timestamp, identify asset/user, assess active impact, consult playbook, correlate evidence and escalate urgently with clear findings.",
      "trap": "Isolating production assets without approval."
    },
    {
      "id": "i023",
      "tier": "L1",
      "category": "Triage",
      "question": "How do you decide severity?",
      "answer": "Consider impact, asset importance, affected identity privileges, scope, attacker activity, confidence and organizational severity matrix.",
      "trap": "Equating number of alerts to severity."
    },
    {
      "id": "i024",
      "tier": "L1",
      "category": "Triage",
      "question": "Difference between false positive and benign positive?",
      "answer": "False positive reflects detector mismatch; benign positive accurately identifies matching but authorized/harmless behavior. Labels vary across teams.",
      "trap": "Calling all approved scanner alerts false positives."
    },
    {
      "id": "i025",
      "tier": "L1",
      "category": "Triage",
      "question": "What belongs in an escalation ticket?",
      "answer": "Who, what, when (timezone), affected assets/accounts, evidence, investigation steps, confidence, business impact and requested actions.",
      "trap": "Writing 'suspicious, please check' without pivots."
    },
    {
      "id": "i026",
      "tier": "L1",
      "category": "Triage",
      "question": "How do you handle a noisy alert?",
      "answer": "Validate representative hits, use business context, identify tuning candidate, then follow change/review process rather than blindly suppressing it.",
      "trap": "Disabling a rule due only to alert count."
    },
    {
      "id": "i027",
      "tier": "L1",
      "category": "Triage",
      "question": "What should a shift handover include?",
      "answer": "Outstanding high-priority cases, status, owners, blockers, next actions, connector gaps and deadlines.",
      "trap": "Only reporting closed ticket counts."
    },
    {
      "id": "i028",
      "tier": "L1",
      "category": "Identity",
      "question": "What is password spraying?",
      "answer": "Low-volume attempts against many users, often to avoid account lockout; compare distinct users, source distribution and any success.",
      "trap": "Calling all multiple failures brute force."
    },
    {
      "id": "i029",
      "tier": "L1",
      "category": "Identity",
      "question": "What is an impossible-travel alert?",
      "answer": "Sign-ins from geographically distant locations in an unlikely time; verify VPN, shared exits, device/session and token activity.",
      "trap": "Treating IP geolocation as exact."
    },
    {
      "id": "i030",
      "tier": "L1",
      "category": "Identity",
      "question": "What are MFA fatigue signs?",
      "answer": "Repeated unexpected push prompts, denial then acceptance, changes to MFA methods and suspicious session context.",
      "trap": "Assuming MFA success is proof of legitimate user."
    },
    {
      "id": "i031",
      "tier": "L1",
      "category": "Identity",
      "question": "What is Kerberos used for?",
      "answer": "Ticket-based authentication in domain environments; TGT and service tickets support authenticated access without sending passwords to every service.",
      "trap": "Saying Kerberos encrypts all subsequent SMB file traffic automatically."
    },
    {
      "id": "i032",
      "tier": "L1",
      "category": "Email",
      "question": "How do SPF, DKIM and DMARC differ?",
      "answer": "SPF validates authorized sender infrastructure, DKIM signs messages, DMARC aligns authenticated identifiers and states domain policy.",
      "trap": "Assuming passing SPF proves a message is safe."
    },
    {
      "id": "i033",
      "tier": "L1",
      "category": "Email",
      "question": "How do you triage a reported phishing email?",
      "answer": "Collect headers and URLs safely, check sender auth and brand impersonation, search recipients, confirm user interaction, correlate sign-ins and recommend response.",
      "trap": "Clicking a suspicious URL on your main workstation."
    },
    {
      "id": "i034",
      "tier": "L1",
      "category": "Email",
      "question": "What indicators distinguish BEC from ordinary spam?",
      "answer": "Contextual account compromise, payment diversion, unusual mailbox rules, impersonation and changes to established business process.",
      "trap": "Relying only on a suspicious attachment."
    },
    {
      "id": "i035",
      "tier": "L1",
      "category": "Web",
      "question": "What is SQL injection in interview terms?",
      "answer": "Untrusted input changes the structure or semantics of a database query; parameterized queries reduce risk. Log requests alone do not prove execution.",
      "trap": "Claiming a WAF alert confirms database exfiltration."
    },
    {
      "id": "i036",
      "tier": "L1",
      "category": "Web",
      "question": "What is XSS?",
      "answer": "Untrusted content is executed in another user's browser due to unsafe output handling; relevant kinds include reflected, stored and DOM-based.",
      "trap": "Confusing it with server-side code execution."
    },
    {
      "id": "i037",
      "tier": "L1",
      "category": "Web",
      "question": "What is SSRF?",
      "answer": "An application can be tricked into making unintended server-side requests, potentially reaching internal or cloud metadata resources.",
      "trap": "Assuming SSRF always grants RCE."
    },
    {
      "id": "i038",
      "tier": "L1",
      "category": "SIEM",
      "question": "Show a basic Splunk failed-login query.",
      "answer": "index=windows EventCode=4625 | stats count by src_ip, user | sort - count; adjust to actual sourcetype and fields.",
      "trap": "Pretending field names are universal."
    },
    {
      "id": "i039",
      "tier": "L1",
      "category": "SIEM",
      "question": "Explain KQL summarize.",
      "answer": "It groups rows and computes aggregates such as count() by UserPrincipalName, optionally after a where time filter.",
      "trap": "Equating summarize with rendering a chart."
    },
    {
      "id": "i040",
      "tier": "L1",
      "category": "SIEM",
      "question": "What is an alert's data source versus detection logic?",
      "answer": "Source is the telemetry generating events; detection logic is the condition/aggregation identifying matches. Both must be validated.",
      "trap": "Blaming the rule when source logs are missing."
    },
    {
      "id": "i041",
      "tier": "L2",
      "category": "Investigation",
      "question": "How do you form a hypothesis?",
      "answer": "Write a falsifiable claim explaining evidence, identify alternatives, then find independent telemetry to support or reject each.",
      "trap": "Cherry-picking only confirming data."
    },
    {
      "id": "i042",
      "tier": "L2",
      "category": "Investigation",
      "question": "How do you reconstruct an attack timeline?",
      "answer": "Normalize to UTC, join reliable identifiers and capture source/evidence for initial access, execution, persistence, lateral movement and impact.",
      "trap": "Assuming ingest time equals event time."
    },
    {
      "id": "i043",
      "tier": "L2",
      "category": "Investigation",
      "question": "How would you investigate suspected account takeover?",
      "answer": "Review sign-ins and device/MFA context, investigate session and OAuth activity, assess accessed resources and mailbox rules, coordinate authorized revocation.",
      "trap": "Resetting password and assuming stolen sessions are gone."
    },
    {
      "id": "i044",
      "tier": "L2",
      "category": "Investigation",
      "question": "How would you scope ransomware?",
      "answer": "Confirm malicious process/files, find host set and spread path, check privileged access and backups, preserve evidence, coordinate rapid authorized containment.",
      "trap": "Rebooting all endpoints before collecting evidence."
    },
    {
      "id": "i045",
      "tier": "L2",
      "category": "Investigation",
      "question": "How can you detect lateral movement?",
      "answer": "Correlate remote logons, network SMB/WinRM/RDP, remote service/task creation, privileged account use and endpoint process trees.",
      "trap": "Calling every SMB connection lateral movement."
    },
    {
      "id": "i046",
      "tier": "L2",
      "category": "Investigation",
      "question": "How do you evaluate DNS tunneling?",
      "answer": "Look at long/high-entropy subdomains, TXT activity, periodicity, volume and process/network correlation; test normal explanations.",
      "trap": "Labeling any long DNS name malicious."
    },
    {
      "id": "i047",
      "tier": "L2",
      "category": "Investigation",
      "question": "What does a 200 HTTP response prove?",
      "answer": "It proves the server returned a successful status, not that an injection succeeded or sensitive data was stolen. Need app and backend evidence.",
      "trap": "Concluding compromise from 200 alone."
    },
    {
      "id": "i048",
      "tier": "L2",
      "category": "Investigation",
      "question": "How do you assess cloud key abuse?",
      "answer": "Identify key/principal, API actions, origin, resource, privilege, time and deviations; correlate IaC changes and data access.",
      "trap": "Assuming all admin API calls are hostile."
    },
    {
      "id": "i049",
      "tier": "L2",
      "category": "Response",
      "question": "Difference between containment, eradication and recovery?",
      "answer": "Containment limits threat, eradication removes malicious cause/persistence, recovery restores services with verification and monitoring.",
      "trap": "Treating isolation as eradication."
    },
    {
      "id": "i050",
      "tier": "L2",
      "category": "Response",
      "question": "What is chain of custody?",
      "answer": "Documented handling and transfers showing artifact origin, integrity, dates, persons and storage; often supported by hashing.",
      "trap": "Using hashes as a substitute for access logs."
    },
    {
      "id": "i051",
      "tier": "L2",
      "category": "Response",
      "question": "How do you decide whether to isolate a host?",
      "answer": "Consider active threat, asset criticality, connectivity, evidence, business continuity, containment alternatives and policy/approval.",
      "trap": "Always isolating a domain controller automatically."
    },
    {
      "id": "i052",
      "tier": "L2",
      "category": "Response",
      "question": "How do you communicate to incident leadership?",
      "answer": "State verified facts, impact, confidence, decisions needed, action owners and next update; avoid unsupported attribution.",
      "trap": "Confusing guesses with observed data."
    },
    {
      "id": "i053",
      "tier": "L2",
      "category": "Detection",
      "question": "Explain precision versus recall.",
      "answer": "Precision is TP/(TP+FP); recall is TP/(TP+FN). Tuning must weigh analyst load against missed detections.",
      "trap": "Claiming fewer alerts always means better detection."
    },
    {
      "id": "i054",
      "tier": "L2",
      "category": "Detection",
      "question": "How would you tune a noisy detection?",
      "answer": "Analyze examples, form narrow exclusions, test historical malicious cases, use change control and monitor outcomes.",
      "trap": "Whitelisting entire organizational networks."
    },
    {
      "id": "i055",
      "tier": "L2",
      "category": "Detection",
      "question": "What is Sigma?",
      "answer": "A generic YAML detection rule format describing log source and match conditions; backends need accurate field mappings to work.",
      "trap": "Assuming Sigma YAML runs directly in every SIEM."
    },
    {
      "id": "i056",
      "tier": "L3",
      "category": "Hunting",
      "question": "What is threat hunting versus triage?",
      "answer": "Triage responds to detections; hunting proactively tests behavior hypotheses across telemetry, documents negative results and proposes detection improvements.",
      "trap": "Treating IOC search as the only form of hunting."
    },
    {
      "id": "i057",
      "tier": "L3",
      "category": "Hunting",
      "question": "What makes a useful hunting hypothesis?",
      "answer": "Threat behavior, affected scope, required observable events, falsification criteria and timeframe, grounded in intelligence or local risk.",
      "trap": "Searching first and making a hypothesis after seeing results."
    },
    {
      "id": "i058",
      "tier": "L3",
      "category": "Hunting",
      "question": "How do you measure coverage?",
      "answer": "Map critical behaviors to prevention, log collection and validated detection, then test with approved emulation and measure outcome.",
      "trap": "Claiming ATT&CK IDs on rules prove coverage."
    },
    {
      "id": "i059",
      "tier": "L3",
      "category": "Engineering",
      "question": "Describe detection-as-code.",
      "answer": "Detections live in version control with metadata, reviews, tests and deploy/rollback processes; deployment is observable.",
      "trap": "Skipping realistic negative test cases."
    },
    {
      "id": "i060",
      "tier": "L3",
      "category": "Engineering",
      "question": "What does a strong detection specification include?",
      "answer": "Behavior hypothesis, sources/fields, logic, known benign cases, threshold, tests, ATT&CK reference, triage guide and owner.",
      "trap": "Starting with only a regex."
    },
    {
      "id": "i061",
      "tier": "L3",
      "category": "Engineering",
      "question": "How do you validate a new rule?",
      "answer": "Run on positive and negative examples, historical log windows, check data sources and review performance and false-positive rate before production.",
      "trap": "Assuming one successful test covers variants."
    },
    {
      "id": "i062",
      "tier": "L3",
      "category": "Engineering",
      "question": "What is a detection coverage gap?",
      "answer": "Required adversary behavior lacks prevention, reliable telemetry or validated alerting for relevant assets and circumstances.",
      "trap": "Confusing no alerts with good coverage."
    },
    {
      "id": "i063",
      "tier": "L3",
      "category": "Forensics",
      "question": "Why preserve volatile evidence?",
      "answer": "Memory, processes and network state may disappear with shutdown/reboot; collect safely with legal and business approval.",
      "trap": "Assuming every host should be live-imaged regardless of impact."
    },
    {
      "id": "i064",
      "tier": "L3",
      "category": "Forensics",
      "question": "Why is hash matching insufficient for malware hunting?",
      "answer": "Minor binary changes alter hashes; behavior, relationships and semantic features can detect related variants.",
      "trap": "Assuming a negative hash search means clean."
    },
    {
      "id": "i065",
      "tier": "L3",
      "category": "Cloud",
      "question": "What signs suggest Kubernetes credential abuse?",
      "answer": "Unexpected service-account-token use, abnormal API calls, role bindings, pod execution or secrets access, correlated with workloads and deployment changes.",
      "trap": "Claiming any kubectl exec is hostile."
    },
    {
      "id": "i066",
      "tier": "L3",
      "category": "Leadership",
      "question": "How do you conduct a blameless PIR?",
      "answer": "Reconstruct verified timeline, identify contributing control/process failures, assign measurable fixes and verify outcomes without personal blame.",
      "trap": "Ending with only more user awareness training."
    },
    {
      "id": "i067",
      "tier": "L3",
      "category": "Leadership",
      "question": "Which SOC metrics matter?",
      "answer": "Well-defined detection/response times, backlog age, escalation quality, alert precision, coverage and ingest health, segmented by severity.",
      "trap": "Maximizing closed alerts as the main KPI."
    }
  ],
  "cases": [
    {
      "id": "s01",
      "tier": "L1",
      "name": "The Monday Login Storm",
      "kind": "Identity",
      "difficulty": "Starter",
      "attack": "T1110.003",
      "host": "IDP / VPN",
      "summary": "A burst of failed sign-ins appears across multiple employee accounts. One account later logs in successfully.",
      "mission": "Determine whether the alert is a spray, what to investigate next, and how urgently to escalate.",
      "events": [
        {
          "time": "08:04:12",
          "source": "idp",
          "asset": "198.51.100.24",
          "detail": "user=a.chen result=FAIL reason=bad_password"
        },
        {
          "time": "08:04:20",
          "source": "idp",
          "asset": "198.51.100.24",
          "detail": "user=b.patel result=FAIL reason=bad_password"
        },
        {
          "time": "08:04:24",
          "source": "idp",
          "asset": "198.51.100.24",
          "detail": "user=c.smith result=FAIL reason=bad_password"
        },
        {
          "time": "08:05:01",
          "source": "idp",
          "asset": "198.51.100.24",
          "detail": "user=d.khan result=FAIL reason=bad_password"
        },
        {
          "time": "08:05:18",
          "source": "idp",
          "asset": "198.51.100.24",
          "detail": "user=b.patel result=SUCCESS mfa=NOT_REQUIRED"
        },
        {
          "time": "08:06:30",
          "source": "idp",
          "asset": "198.51.100.24",
          "detail": "user=b.patel result=TOKEN_ISSUED device=unmanaged"
        }
      ],
      "questions": [
        {
          "prompt": "Which behavior best fits?",
          "options": [
            "Password spraying across users",
            "Normal password rotation",
            "A DNS amplification attack"
          ],
          "answer": 0,
          "why": "A single origin tests credentials against several identities, then gains access."
        },
        {
          "prompt": "What is the highest-value next pivot?",
          "options": [
            "Only reverse-DNS lookup",
            "Inspect successful session, MFA and sensitive actions",
            "Close because most attempts failed"
          ],
          "answer": 1,
          "why": "The success and unmanaged device raise urgency. Review post-authentication activity."
        },
        {
          "prompt": "What is your disposition?",
          "options": [
            "Benign routine login",
            "Escalate potential account compromise promptly",
            "Confirmed tenant-wide ransomware"
          ],
          "answer": 1,
          "why": "Possible compromised account, but not evidence of ransomware or full-tenant scope."
        }
      ]
    },
    {
      "id": "s02",
      "tier": "L1",
      "name": "Payroll Attachment",
      "kind": "Email",
      "difficulty": "Starter",
      "attack": "T1566.001",
      "host": "MAIL / ENDPOINT",
      "summary": "An employee reported an unusual payroll email. Message authentication passes, yet a disguised executable was downloaded.",
      "mission": "Follow the user and endpoint evidence rather than trusting one mail control.",
      "events": [
        {
          "time": "09:00:11",
          "source": "email",
          "asset": "mail-gw",
          "detail": "sender=payroll-update@payroll-demo.example spf=pass dkim=pass dmarc=pass"
        },
        {
          "time": "09:02:41",
          "source": "proxy",
          "asset": "10.10.8.24",
          "detail": "GET https://payroll-demo.example/docs/payroll.pdf.exe status=200"
        },
        {
          "time": "09:02:47",
          "source": "edr",
          "asset": "10.10.8.24",
          "detail": "process=payroll.pdf.exe parent=explorer.exe execution=blocked"
        },
        {
          "time": "09:03:15",
          "source": "edr",
          "asset": "10.10.8.24",
          "detail": "child_processes=0 connections=0"
        }
      ],
      "questions": [
        {
          "prompt": "What does passing DMARC establish?",
          "options": [
            "The link is safe",
            "Sender domain authentication/alignment checks passed",
            "The attachment was vetted"
          ],
          "answer": 1,
          "why": "Domain authentication does not establish content safety."
        },
        {
          "prompt": "What has endpoint telemetry confirmed?",
          "options": [
            "Execution was blocked with no observed child activity",
            "Privilege escalation succeeded",
            "Data left the network"
          ],
          "answer": 0,
          "why": "Blocking is supported by evidence; there is no evidence here of later execution."
        },
        {
          "prompt": "What should happen next?",
          "options": [
            "Verify no other recipients clicked and document outcome",
            "Ignore reported email since it passed DMARC",
            "Reimage every corporate machine"
          ],
          "answer": 0,
          "why": "Recipient scoping and validation are proportionate next steps."
        }
      ]
    },
    {
      "id": "s03",
      "tier": "L1",
      "name": "Office Macro Chain",
      "kind": "Endpoint",
      "difficulty": "Intermediate",
      "attack": "T1059.001",
      "host": "WKSTN-041",
      "summary": "A document reader unexpectedly launches PowerShell and a remote HTTP request.",
      "mission": "Interpret lineage, command context and process behavior.",
      "events": [
        {
          "time": "10:14:05",
          "source": "sysmon",
          "asset": "WKSTN-041",
          "detail": "EventID=1 Image=winword.exe Parent=explorer.exe"
        },
        {
          "time": "10:14:09",
          "source": "sysmon",
          "asset": "WKSTN-041",
          "detail": "EventID=1 Image=powershell.exe Parent=winword.exe cmd=-NoP -EncodedCommand [redacted]"
        },
        {
          "time": "10:14:11",
          "source": "sysmon",
          "asset": "WKSTN-041",
          "detail": "EventID=3 Image=powershell.exe dst=203.0.113.77:443"
        },
        {
          "time": "10:14:12",
          "source": "edr",
          "asset": "WKSTN-041",
          "detail": "detection=SuspiciousScript action=alert_only"
        },
        {
          "time": "10:14:48",
          "source": "sysmon",
          "asset": "WKSTN-041",
          "detail": "EventID=11 Image=powershell.exe TargetFilename=C:\\ProgramData\\cache.dat"
        }
      ],
      "questions": [
        {
          "prompt": "Strongest initial suspicious relationship?",
          "options": [
            "Word spawning PowerShell with encoded content",
            "Explorer launching Word",
            "Network traffic uses port 443"
          ],
          "answer": 0,
          "why": "Parent-child context plus encoding and network activity drives the hypothesis."
        },
        {
          "prompt": "Why does EDR status matter?",
          "options": [
            "Alert-only means execution was not necessarily blocked",
            "Alert-only always means false positive",
            "A log entry means the host is isolated"
          ],
          "answer": 0,
          "why": "Review prevention vs detection state."
        },
        {
          "prompt": "Best next action?",
          "options": [
            "Review script safely, file write, persistence and related hosts",
            "Delete raw logs",
            "Assume full domain compromise"
          ],
          "answer": 0,
          "why": "Investigate scope and request containment based on policy."
        }
      ]
    },
    {
      "id": "s04",
      "tier": "L1",
      "name": "A Quiet DNS Signal",
      "kind": "Network",
      "difficulty": "Intermediate",
      "attack": "T1071.004",
      "host": "ENG-LAP-09",
      "summary": "A workstation produces unusually frequent long DNS labels to one domain.",
      "mission": "Differentiate a tunneling hypothesis from proof, using DNS and host context.",
      "events": [
        {
          "time": "11:00:00",
          "source": "dns",
          "asset": "ENG-LAP-09",
          "detail": "qname=a18dbf.hello-cdn.example qtype=TXT rcode=NOERROR"
        },
        {
          "time": "11:00:12",
          "source": "dns",
          "asset": "ENG-LAP-09",
          "detail": "qname=8ea4bc.hello-cdn.example qtype=TXT rcode=NOERROR"
        },
        {
          "time": "11:00:24",
          "source": "dns",
          "asset": "ENG-LAP-09",
          "detail": "qname=d91cfa.hello-cdn.example qtype=TXT rcode=NOERROR"
        },
        {
          "time": "11:00:25",
          "source": "edr",
          "asset": "ENG-LAP-09",
          "detail": "process=python.exe cmd=python sync_worker.py"
        },
        {
          "time": "11:00:38",
          "source": "dns",
          "asset": "ENG-LAP-09",
          "detail": "qname=abca88.hello-cdn.example qtype=TXT rcode=NOERROR"
        }
      ],
      "questions": [
        {
          "prompt": "What is most defensible?",
          "options": [
            "Possible DNS C2 or tunneling behavior",
            "Proven data exfiltration",
            "Normal because there is no NXDOMAIN"
          ],
          "answer": 0,
          "why": "The pattern is unusual, but transfer intent and content are not established."
        },
        {
          "prompt": "Most useful additional telemetry?",
          "options": [
            "Process ownership, DNS volume and network egress",
            "Wallpaper history",
            "Monitor resolution"
          ],
          "answer": 0,
          "why": "Correlate runtime and transfer details."
        },
        {
          "prompt": "Why not close immediately?",
          "options": [
            "Periodic TXT queries and unique labels warrant validation",
            "TXT records are always malicious",
            "Any Python process is malware"
          ],
          "answer": 0,
          "why": "Multiple weak indicators combine into a testable hypothesis."
        }
      ]
    },
    {
      "id": "s05",
      "tier": "L1",
      "name": "The Approved Scanner",
      "kind": "Network",
      "difficulty": "Starter",
      "attack": "T1046",
      "host": "VULN-SCAN-01",
      "summary": "A source probes many hosts over SMB and SSH, but a maintenance change might explain it.",
      "mission": "Avoid false escalation without removing signal.",
      "events": [
        {
          "time": "02:01:04",
          "source": "firewall",
          "asset": "VULN-SCAN-01",
          "detail": "dst=10.10.5.10:445 decision=allow"
        },
        {
          "time": "02:01:09",
          "source": "firewall",
          "asset": "VULN-SCAN-01",
          "detail": "dst=10.10.5.11:22 decision=allow"
        },
        {
          "time": "02:01:13",
          "source": "firewall",
          "asset": "VULN-SCAN-01",
          "detail": "dst=10.10.5.12:445 decision=allow"
        },
        {
          "time": "02:05:00",
          "source": "change",
          "asset": "VULN-SCAN-01",
          "detail": "CHG-431 approved_scanner=VULN-SCAN-01 window=02:00-04:00"
        }
      ],
      "questions": [
        {
          "prompt": "Best classification given the change record?",
          "options": [
            "Benign positive after validating scanner ownership",
            "Confirmed worm",
            "False positive because rule did not match"
          ],
          "answer": 0,
          "why": "Detection correctly identified scanning, but evidence supports authorized activity."
        },
        {
          "prompt": "What should you verify?",
          "options": [
            "Change owner and actual scope",
            "The scan username alone",
            "Whether DNS can resolve Google"
          ],
          "answer": 0,
          "why": "Business authorization is part of evidence."
        },
        {
          "prompt": "How to tune?",
          "options": [
            "Targeted approved-scan exception with review",
            "Suppress every scan alert forever",
            "Delete scanner logs"
          ],
          "answer": 0,
          "why": "Keep detection for unapproved sources."
        }
      ]
    },
    {
      "id": "s06",
      "tier": "L1",
      "name": "Impossible Travel, Maybe",
      "kind": "Identity",
      "difficulty": "Intermediate",
      "attack": "T1078",
      "host": "SAAS / IDP",
      "summary": "An employee appears to sign in from two countries within minutes.",
      "mission": "Investigate impossible travel in the presence of VPN and session factors.",
      "events": [
        {
          "time": "12:20:00",
          "source": "idp",
          "asset": "SAAS",
          "detail": "user=n.ali geo=Pakistan ip=198.51.100.10 device=managed mfa=pass"
        },
        {
          "time": "12:24:00",
          "source": "idp",
          "asset": "SAAS",
          "detail": "user=n.ali geo=Netherlands ip=203.0.113.40 device=managed mfa=pass"
        },
        {
          "time": "12:24:02",
          "source": "vpn",
          "asset": "VPN",
          "detail": "ip=203.0.113.40 gateway=corporate-exit-NL"
        },
        {
          "time": "12:24:11",
          "source": "idp",
          "asset": "SAAS",
          "detail": "user=n.ali app=calendar device_id=DEVICE-441"
        }
      ],
      "questions": [
        {
          "prompt": "What weakens malicious hypothesis?",
          "options": [
            "Second IP is a documented corporate VPN exit",
            "IP locations differ",
            "MFA is enabled"
          ],
          "answer": 0,
          "why": "Corporate egress often explains geographic conflicts."
        },
        {
          "prompt": "What else helps?",
          "options": [
            "Compare device/session and subsequent resource actions",
            "Disable all SIEM rules",
            "Block all Netherlands traffic"
          ],
          "answer": 0,
          "why": "Validate common device and actions."
        },
        {
          "prompt": "Most reasonable assessment?",
          "options": [
            "Likely benign after confirming VPN/session consistency",
            "Always severe breach",
            "Proven MFA bypass"
          ],
          "answer": 0,
          "why": "The evidence does not support a breach without additional anomalies."
        }
      ]
    },
    {
      "id": "s07",
      "tier": "L1",
      "name": "A Web Firewall Alert",
      "kind": "Web",
      "difficulty": "Intermediate",
      "attack": "T1190",
      "host": "APP-PUBLIC-01",
      "summary": "Several suspicious URL paths are blocked, but a later request behaves differently.",
      "mission": "Assess whether an exploit was attempted, blocked, or possibly successful.",
      "events": [
        {
          "time": "13:10:00",
          "source": "waf",
          "asset": "APP-PUBLIC-01",
          "detail": "path=/../../etc/passwd action=block http=403"
        },
        {
          "time": "13:11:00",
          "source": "waf",
          "asset": "APP-PUBLIC-01",
          "detail": "path=/api/export?file=../../etc/passwd action=block http=403"
        },
        {
          "time": "13:12:00",
          "source": "waf",
          "asset": "APP-PUBLIC-01",
          "detail": "path=/api/export?file=reports.csv action=allow http=200"
        },
        {
          "time": "13:12:01",
          "source": "app",
          "asset": "APP-PUBLIC-01",
          "detail": "route=/api/export file=reports.csv user=anon result=unauthorized"
        }
      ],
      "questions": [
        {
          "prompt": "What can be confirmed?",
          "options": [
            "Blocked traversal attempts; later allowed request not proof of exploit",
            "Sensitive file theft proven",
            "Server compromise proven"
          ],
          "answer": 0,
          "why": "Response must be tied to actual backend operations."
        },
        {
          "prompt": "Best investigation pivot?",
          "options": [
            "Inspect application file access and response content/size",
            "Only the 200 status",
            "Delete WAF logs"
          ],
          "answer": 0,
          "why": "Correlate app logs for server-side outcome."
        },
        {
          "prompt": "How to report?",
          "options": [
            "Attempted traversal blocked; no evidence of successful sensitive read in provided logs",
            "Full database leak",
            "Normal browsing only"
          ],
          "answer": 0,
          "why": "State observed actions and evidence limits."
        }
      ]
    },
    {
      "id": "s08",
      "tier": "L1",
      "name": "Service Installed Overnight",
      "kind": "Windows",
      "difficulty": "Intermediate",
      "attack": "T1543.003",
      "host": "FIN-APP-03",
      "summary": "A new Windows service appears shortly after a remote admin login.",
      "mission": "Correlate account, process, change ticket and file signature.",
      "events": [
        {
          "time": "01:13:32",
          "source": "security",
          "asset": "FIN-APP-03",
          "detail": "EventID=4624 LogonType=3 Account=svc_backup Source=10.10.2.19"
        },
        {
          "time": "01:14:01",
          "source": "system",
          "asset": "FIN-APP-03",
          "detail": "EventID=7045 ServiceName=UpdateCache ImagePath=C:\\Users\\Public\\update.exe"
        },
        {
          "time": "01:14:04",
          "source": "edr",
          "asset": "FIN-APP-03",
          "detail": "file=update.exe signer=unknown reputation=rare"
        },
        {
          "time": "01:15:11",
          "source": "security",
          "asset": "FIN-APP-03",
          "detail": "EventID=4672 Account=svc_backup SpecialPrivileges=assigned"
        }
      ],
      "questions": [
        {
          "prompt": "Why is this concerning?",
          "options": [
            "New service in user-writable path after remote logon",
            "Every Event 4624 means malware",
            "Unsigned files are illegal"
          ],
          "answer": 0,
          "why": "Persistence-like behavior and unusual execution path warrant scoping."
        },
        {
          "prompt": "Next evidence?",
          "options": [
            "Account owner, process tree and approved maintenance change",
            "Only screenshot filename",
            "Wait until next week"
          ],
          "answer": 0,
          "why": "Establish authorization and behavior."
        },
        {
          "prompt": "Priority?",
          "options": [
            "Prompt escalation if service or credential is unrecognized",
            "Automatically close",
            "Erase host now"
          ],
          "answer": 0,
          "why": "A potentially privileged persistence mechanism may need rapid response."
        }
      ]
    },
    {
      "id": "s09",
      "tier": "L2",
      "name": "Inbox Rule After the Click",
      "kind": "Identity",
      "difficulty": "Intermediate",
      "attack": "T1114.003",
      "host": "M365 / MAIL",
      "summary": "A suspicious email was clicked, and a mailbox forwarding rule was created after a new sign-in.",
      "mission": "Reconstruct account takeover and scope exposure.",
      "events": [
        {
          "time": "08:02:00",
          "source": "email",
          "asset": "M365",
          "detail": "recipient=finance@example.com sender=vendor-help@billing-demo.example"
        },
        {
          "time": "08:06:23",
          "source": "proxy",
          "asset": "FIN-LAP-04",
          "detail": "user=finance click=https://billing-demo.example/login"
        },
        {
          "time": "08:11:03",
          "source": "idp",
          "asset": "M365",
          "detail": "user=finance login_success ip=203.0.113.91 device=unknown"
        },
        {
          "time": "08:12:45",
          "source": "audit",
          "asset": "M365",
          "detail": "user=finance Operation=New-InboxRule ForwardTo=external@outside-demo.example"
        },
        {
          "time": "08:13:08",
          "source": "audit",
          "asset": "M365",
          "detail": "user=finance Operation=MailItemsAccessed count=127"
        }
      ],
      "questions": [
        {
          "prompt": "Strongest compromise signal?",
          "options": [
            "New external forwarding rule after anomalous login",
            "Receiving a single email",
            "SPF result alone"
          ],
          "answer": 0,
          "why": "Sequence supports possible account takeover and data exposure."
        },
        {
          "prompt": "What must be scoped?",
          "options": [
            "Session, OAuth grants, mailbox access and forwarding recipients",
            "Only the original sender",
            "Only laptop battery"
          ],
          "answer": 0,
          "why": "Account compromise can persist beyond password changes."
        },
        {
          "prompt": "Recommended response?",
          "options": [
            "Coordinate authorized session revocation, credential/MFA reset and rule removal",
            "Only delete the email",
            "Wait for mail server restart"
          ],
          "answer": 0,
          "why": "Contain access and persistence, preserve evidence and assess accessed data."
        }
      ]
    },
    {
      "id": "s10",
      "tier": "L2",
      "name": "The Ransomware Precursor",
      "kind": "Endpoint",
      "difficulty": "Advanced",
      "attack": "T1490",
      "host": "FS-PROD-02",
      "summary": "A production file server shows suspicious preparation activity and file modification spikes.",
      "mission": "Prioritize containment while preserving evidence and business continuity.",
      "events": [
        {
          "time": "02:21:01",
          "source": "security",
          "asset": "FS-PROD-02",
          "detail": "EventID=4624 Account=ops-admin Source=10.10.7.44 LogonType=3"
        },
        {
          "time": "02:23:09",
          "source": "edr",
          "asset": "FS-PROD-02",
          "detail": "process=vssadmin.exe args=Delete Shadows /All /Quiet parent=cmd.exe"
        },
        {
          "time": "02:24:10",
          "source": "fs",
          "asset": "FS-PROD-02",
          "detail": "file_renames_60s=948 baseline=14"
        },
        {
          "time": "02:24:31",
          "source": "fs",
          "asset": "FS-PROD-02",
          "detail": "ransom_note_files=16"
        },
        {
          "time": "02:25:02",
          "source": "edr",
          "asset": "FS-PROD-02",
          "detail": "suspicious_binary action=not_blocked"
        }
      ],
      "questions": [
        {
          "prompt": "Best current assessment?",
          "options": [
            "Active likely ransomware affecting a production server",
            "Unrelated backup cleanup only",
            "Only a login problem"
          ],
          "answer": 0,
          "why": "Shadow deletion, mass renames and ransom notes form strong combined evidence."
        },
        {
          "prompt": "Most urgent next step?",
          "options": [
            "Follow high-priority response protocol and coordinate authorized containment",
            "Run updates before preserving logs",
            "Ignore until daily report"
          ],
          "answer": 0,
          "why": "Active impact means urgent containment decisions with service owner/IR lead."
        },
        {
          "prompt": "What is a response pitfall?",
          "options": [
            "Rebooting and destroying volatile evidence without a plan",
            "Tracking affected file shares",
            "Correlating privileged logon"
          ],
          "answer": 0,
          "why": "Preserve evidence without delaying necessary response."
        }
      ]
    },
    {
      "id": "s11",
      "tier": "L2",
      "name": "Remote Service Trail",
      "kind": "Lateral movement",
      "difficulty": "Advanced",
      "attack": "T1021.002",
      "host": "AD / ENDPOINT",
      "summary": "An administrative account touches several machines and deploys a temporary service.",
      "mission": "Trace source, direction, affected hosts and legitimacy.",
      "events": [
        {
          "time": "03:00:04",
          "source": "security",
          "asset": "WKSTN-17",
          "detail": "EventID=4624 Account=helpdesk-admin LogonType=3 Source=10.10.2.7"
        },
        {
          "time": "03:01:11",
          "source": "system",
          "asset": "WKSTN-17",
          "detail": "EventID=7045 ServiceName=svc_tmp ImagePath=C:\\Windows\\Temp\\svc.exe"
        },
        {
          "time": "03:03:22",
          "source": "security",
          "asset": "PAYROLL-DB",
          "detail": "EventID=4624 Account=helpdesk-admin LogonType=3 Source=WKSTN-17"
        },
        {
          "time": "03:03:27",
          "source": "system",
          "asset": "PAYROLL-DB",
          "detail": "EventID=7045 ServiceName=svc_tmp ImagePath=C:\\Windows\\Temp\\svc.exe"
        }
      ],
      "questions": [
        {
          "prompt": "What activity is indicated?",
          "options": [
            "Possible remote-service lateral movement",
            "Only DNS lookups",
            "Confirmed physical intrusion"
          ],
          "answer": 0,
          "why": "Network logon and matching service install across hosts are consistent with remote execution."
        },
        {
          "prompt": "Best scope question?",
          "options": [
            "Where else did the account authenticate and what ran?",
            "What color was the monitor?",
            "Was there a 404 error?"
          ],
          "answer": 0,
          "why": "Privilege and affected systems determine blast radius."
        },
        {
          "prompt": "What else must be checked?",
          "options": [
            "Approved deployment/ticket and binary provenance",
            "Only the service name spelling",
            "Whether the host responds to ping"
          ],
          "answer": 0,
          "why": "Administrative tooling may legitimately resemble attacks."
        }
      ]
    },
    {
      "id": "s12",
      "tier": "L2",
      "name": "Cloud Access Key Escalation",
      "kind": "Cloud",
      "difficulty": "Advanced",
      "attack": "T1098.001",
      "host": "AWS / IAM",
      "summary": "A new cloud access key is followed by unauthorized permissions and sensitive storage enumeration.",
      "mission": "Correlate API caller, session and subsequent resource access.",
      "events": [
        {
          "time": "14:05:12",
          "source": "cloudtrail",
          "asset": "AWS",
          "detail": "event=CreateAccessKey user=automation-role source=198.51.100.62"
        },
        {
          "time": "14:07:33",
          "source": "cloudtrail",
          "asset": "AWS",
          "detail": "event=AttachUserPolicy target=automation-role policy=AdministratorAccess"
        },
        {
          "time": "14:09:02",
          "source": "cloudtrail",
          "asset": "AWS",
          "detail": "event=ListBuckets principal=automation-role"
        },
        {
          "time": "14:09:44",
          "source": "cloudtrail",
          "asset": "AWS",
          "detail": "event=GetObject bucket=finance-backups count=75"
        },
        {
          "time": "14:10:01",
          "source": "change",
          "asset": "AWS",
          "detail": "approved_change=none related_to=automation-role"
        }
      ],
      "questions": [
        {
          "prompt": "Strongest chain?",
          "options": [
            "Key creation, privilege expansion and storage reads",
            "CloudTrail was enabled",
            "One successful API call"
          ],
          "answer": 0,
          "why": "Behavior sequence and missing change approval raise confidence."
        },
        {
          "prompt": "What needs verification?",
          "options": [
            "Principal/role assumptions, origin and object-level data event coverage",
            "Only public IP country",
            "Only policy name"
          ],
          "answer": 0,
          "why": "Establish identity and data scope with logging caveats."
        },
        {
          "prompt": "Recommended action?",
          "options": [
            "Coordinate key disable/revoke and IAM rollback with cloud response owner",
            "Delete all buckets",
            "Ignore because automation accounts are allowed"
          ],
          "answer": 0,
          "why": "Control credential and permissions while preserving evidence."
        }
      ]
    },
    {
      "id": "s13",
      "tier": "L2",
      "name": "A Slow Beacon",
      "kind": "Network",
      "difficulty": "Advanced",
      "attack": "T1071.001",
      "host": "WKSTN-069",
      "summary": "A desktop reaches the same rare host approximately every minute with small outbound payloads.",
      "mission": "Differentiate ordinary telemetry from possible C2.",
      "events": [
        {
          "time": "17:00:02",
          "source": "proxy",
          "asset": "WKSTN-069",
          "detail": "dst=updates-static.example path=/v1/ping bytes_out=342"
        },
        {
          "time": "17:01:01",
          "source": "proxy",
          "asset": "WKSTN-069",
          "detail": "dst=updates-static.example path=/v1/ping bytes_out=336"
        },
        {
          "time": "17:02:02",
          "source": "proxy",
          "asset": "WKSTN-069",
          "detail": "dst=updates-static.example path=/v1/ping bytes_out=350"
        },
        {
          "time": "17:02:03",
          "source": "sysmon",
          "asset": "WKSTN-069",
          "detail": "process=AppData\\Local\\Temp\\diag.exe signer=none"
        },
        {
          "time": "17:03:02",
          "source": "proxy",
          "asset": "WKSTN-069",
          "detail": "dst=updates-static.example path=/v1/ping bytes_out=344"
        }
      ],
      "questions": [
        {
          "prompt": "What supports a beacon hypothesis?",
          "options": [
            "Regular periodicity, rare destination and unusual process",
            "Port 443 alone",
            "Small bytes alone"
          ],
          "answer": 0,
          "why": "Correlated behavioral features matter more than a single attribute."
        },
        {
          "prompt": "Best validation?",
          "options": [
            "Inspect process lineage, binary and peer prevalence",
            "Block all HTTP",
            "Assume HTTPS means safe"
          ],
          "answer": 0,
          "why": "Determine what creates the traffic and whether expected."
        },
        {
          "prompt": "How should you communicate?",
          "options": [
            "Suspected C2 with supporting observations, not proof of attacker identity",
            "Specific named threat group confirmed",
            "Completely harmless because payload is small"
          ],
          "answer": 0,
          "why": "Attribution requires stronger evidence."
        }
      ]
    },
    {
      "id": "s14",
      "tier": "L3",
      "name": "Build a Better Detection",
      "kind": "Detection engineering",
      "difficulty": "Advanced",
      "attack": "T1543.003",
      "host": "SOC / SIEM",
      "summary": "A detector alerts whenever any Windows service starts. The SOC receives thousands of benign hits.",
      "mission": "Propose a narrow behavior-focused detection with documented coverage.",
      "events": [
        {
          "time": "10:02:00",
          "source": "metrics",
          "asset": "SOC",
          "detail": "rule=AnyServiceStart daily_alerts=2100 benign=2090"
        },
        {
          "time": "10:02:30",
          "source": "cases",
          "asset": "SOC",
          "detail": "true_positive=10 false_or_benign=2090"
        },
        {
          "time": "10:03:00",
          "source": "engineering",
          "asset": "SOC",
          "detail": "available_fields=service_name,image_path,signer,parent,change_window"
        },
        {
          "time": "10:05:00",
          "source": "coverage",
          "asset": "SOC",
          "detail": "goal=detect_unusual_remote_service_creation"
        }
      ],
      "questions": [
        {
          "prompt": "Most effective improvement?",
          "options": [
            "Combine new service with suspicious image path, source and context",
            "Disable all service detections",
            "Alert every service twice"
          ],
          "answer": 0,
          "why": "Focus on threat behavior while maintaining meaningful coverage."
        },
        {
          "prompt": "Required test?",
          "options": [
            "Historical positives, normal deployment negatives and mapping validation",
            "Only test on a single fake positive",
            "No tests if rule is written in Sigma"
          ],
          "answer": 0,
          "why": "A detector must be validated against both classes."
        },
        {
          "prompt": "What belongs in its metadata?",
          "options": [
            "Log source, owner, ATT&CK mapping, playbook and dependencies",
            "Only severity and emoji",
            "Only regex"
          ],
          "answer": 0,
          "why": "Operational content is part of the detection."
        }
      ]
    },
    {
      "id": "s15",
      "tier": "L3",
      "name": "The Missing Sensor",
      "kind": "Coverage and resilience",
      "difficulty": "Advanced",
      "attack": "DETECTION-GAP",
      "host": "SIEM / EDR",
      "summary": "The dashboard reports no new suspicious PowerShell events, but a security sensor quietly stopped reporting.",
      "mission": "Avoid concluding the estate is safe from absent detections.",
      "events": [
        {
          "time": "05:00:01",
          "source": "health",
          "asset": "SOC",
          "detail": "source=WKSTN-FLEET connector=EDR last_event=04:02"
        },
        {
          "time": "05:30:01",
          "source": "health",
          "asset": "SOC",
          "detail": "source=WKSTN-FLEET connector=EDR lag_minutes=88"
        },
        {
          "time": "05:31:11",
          "source": "siem",
          "asset": "SOC",
          "detail": "query=PowerShell detection count=0"
        },
        {
          "time": "05:32:10",
          "source": "health",
          "asset": "SOC",
          "detail": "other_source=identity status=healthy"
        }
      ],
      "questions": [
        {
          "prompt": "What is the central issue?",
          "options": [
            "Telemetry coverage gap invalidates negative finding",
            "Proof there were no attacks",
            "Normality due to zero alerts"
          ],
          "answer": 0,
          "why": "Zero alert count cannot establish absence when collection is down."
        },
        {
          "prompt": "Appropriate action?",
          "options": [
            "Escalate connector failure and use alternative telemetry where possible",
            "Disable all alerting",
            "Mark all hosts safe"
          ],
          "answer": 0,
          "why": "Restore coverage and document uncertainty."
        },
        {
          "prompt": "Long-term engineering fix?",
          "options": [
            "Alert on ingest health with tested thresholds and owner",
            "Never measure log delay",
            "Raise severity of every event"
          ],
          "answer": 0,
          "why": "Sensor health is foundational for detection quality."
        }
      ]
    },
    {
      "id": "s16",
      "tier": "L3",
      "name": "Post-Incident Evidence Review",
      "kind": "Leadership",
      "difficulty": "Advanced",
      "attack": "IR-REVIEW",
      "host": "SOC / IR",
      "summary": "An incident was contained but detection was delayed because cloud audit events were never enabled.",
      "mission": "Turn a missed signal into measurable engineering improvements.",
      "events": [
        {
          "time": "09:00:00",
          "source": "review",
          "asset": "SOC",
          "detail": "initial_access=2026-10-12T01:00Z"
        },
        {
          "time": "09:00:01",
          "source": "review",
          "asset": "SOC",
          "detail": "detection=2026-10-12T08:00Z"
        },
        {
          "time": "09:00:02",
          "source": "review",
          "asset": "SOC",
          "detail": "root_gap=cloud_data_events_disabled"
        },
        {
          "time": "09:00:03",
          "source": "review",
          "asset": "SOC",
          "detail": "corrective_owner=cloud_platform_team"
        }
      ],
      "questions": [
        {
          "prompt": "Best problem statement?",
          "options": [
            "Cloud data events were unavailable, delaying detection",
            "Analyst failed because they should have guessed",
            "Everything worked correctly"
          ],
          "answer": 0,
          "why": "Identify systemic, evidence-backed contribution."
        },
        {
          "prompt": "Strong corrective action?",
          "options": [
            "Enable scoped audit data events, validate ingestion and assign deadline/owner",
            "Tell analysts to be more careful",
            "Only buy a new SIEM"
          ],
          "answer": 0,
          "why": "Action must be measurable and owned."
        },
        {
          "prompt": "What metric validates remediation?",
          "options": [
            "Test event appears end to end and alert latency is measured",
            "Meeting attendance alone",
            "Number of closed cases"
          ],
          "answer": 0,
          "why": "Measure control effectiveness, not paperwork."
        }
      ]
    }
  ],
  "runbooks": [
    {
      "id": "r01",
      "title": "Shift start",
      "tier": "All",
      "steps": [
        "Check handover and ongoing P1/P2 events",
        "Verify SIEM, EDR, identity, cloud and mail log freshness",
        "Review SLA breaches, analyst assignments and escalations",
        "Check recent change windows and threat intel relevant to the environment",
        "Document current data gaps and ownership"
      ]
    },
    {
      "id": "r02",
      "title": "Initial alert triage",
      "tier": "L1",
      "steps": [
        "Open raw signal, rule name and source/ingest timestamps",
        "Identify entity and affected critical assets or privileged roles",
        "Validate detection logic and recent related events",
        "Enrich with known change activity, reputation and process context",
        "Classify with evidence, escalate or close with justification"
      ]
    },
    {
      "id": "r03",
      "title": "Escalation ticket",
      "tier": "L1",
      "steps": [
        "One-line issue statement and current status",
        "UTC timeline, affected hosts, accounts, IPs and evidence URLs",
        "What was confirmed, what was ruled out and what remains unknown",
        "Severity with business impact and confidence level",
        "Recommended next action, owner, approval and due time"
      ]
    },
    {
      "id": "r04",
      "title": "Phishing report",
      "tier": "L1",
      "steps": [
        "Preserve original message and headers; avoid visiting links casually",
        "Check SPF, DKIM, DMARC, URL redirects and attachment metadata",
        "Find matching delivery and all recipient/click evidence",
        "Investigate sign-ins, devices and mailbox changes after interaction",
        "Escalate account compromise, notify mail team and document removal"
      ]
    },
    {
      "id": "r05",
      "title": "Identity compromise",
      "tier": "L2",
      "steps": [
        "Validate sign-in chain, MFA device changes and session events",
        "Enumerate OAuth grants, mailbox rules and suspicious resources accessed",
        "Scope all associated accounts, endpoints, IPs and app actions",
        "Arrange session revocation, credential reset and authenticator remediation",
        "Validate control outcomes and monitor for recurrence"
      ]
    },
    {
      "id": "r06",
      "title": "Malware/EDR alert",
      "tier": "L1",
      "steps": [
        "Confirm alert was blocked, quarantined, detected only or incomplete",
        "Inspect process tree, command lines, signer and file hash",
        "Review network, downloads, persistence and sibling hosts",
        "Identify user role, host criticality and abnormal spread",
        "Escalate for authorized isolation if active compromise is likely"
      ]
    },
    {
      "id": "r07",
      "title": "Ransomware",
      "tier": "L2",
      "steps": [
        "Open high-severity response and notify response lead immediately",
        "Validate affected hosts, rename spike, ransom notes, shadow copies",
        "Trace privileged logons and network propagation path",
        "Coordinate containment with business owners and preservation plan",
        "Assess backup integrity, recovery dependencies and monitoring"
      ]
    },
    {
      "id": "r08",
      "title": "Suspicious network egress",
      "tier": "L1",
      "steps": [
        "Capture source, dest, DNS/proxy/firewall time window",
        "Identify originating endpoint process, user and normal asset role",
        "Check transfer size, cadence, protocol and blocks versus allows",
        "Scope same destinations and behavior across other assets",
        "Document whether egress occurred, was blocked or is unknown"
      ]
    },
    {
      "id": "r09",
      "title": "Cloud IAM anomaly",
      "tier": "L2",
      "steps": [
        "Collect principal, role/session, source IP and API request IDs",
        "Review new keys, policy changes, role assumptions and logging changes",
        "Check resource reads, public exposure and cross-account scope",
        "Correlate activity to deployments and approved change windows",
        "Coordinate key revocation/policy rollback and preserve audit records"
      ]
    },
    {
      "id": "r10",
      "title": "Detection tuning",
      "tier": "L2",
      "steps": [
        "Record detection hypothesis and current performance",
        "Collect representative benign and confirmed-malicious examples",
        "Design narrow contextual exclusion with expiration",
        "Run tests and historical regression checks",
        "Use review/approval and monitor recall or misses after deploy"
      ]
    },
    {
      "id": "r11",
      "title": "Threat hunt",
      "tier": "L3",
      "steps": [
        "State behavior hypothesis, business scope and timeframe",
        "Confirm source telemetry coverage and retention",
        "Design search patterns, peer baselines and negative checks",
        "Investigate hits and preserve query/result notes",
        "Create reusable detection or document coverage gap"
      ]
    },
    {
      "id": "r12",
      "title": "Shift handover",
      "tier": "All",
      "steps": [
        "List open high-priority cases with case ID and contact",
        "Write latest known state, outstanding actions and evidence",
        "Capture SLA deadline, risk, dependencies and approvals",
        "Report sensor/ingest failures and other visibility limits",
        "Obtain next shift acknowledgement according to policy"
      ]
    },
    {
      "id": "r13",
      "title": "Cloud storage exfiltration",
      "tier": "L2",
      "steps": [
        "Verify object-level access logging and permission scope",
        "Assess identity/session used, download volumes and baselines",
        "Identify sensitive datasets, egress destinations and time range",
        "Preserve logs and coordinate with data owners and IR leadership",
        "Apply approved access restrictions and assess notification obligations"
      ]
    },
    {
      "id": "r14",
      "title": "Windows remote execution",
      "tier": "L2",
      "steps": [
        "Correlate 4624/4672 with 7045/4698/4688 and Sysmon when available",
        "Link source and target hosts with timestamps and Logon IDs",
        "Inspect binaries, remote command lines and administrative tooling",
        "Scope privileged account reach and lateral propagation",
        "Distinguish sanctioned management from unauthorized access"
      ]
    },
    {
      "id": "r15",
      "title": "Evidence acquisition",
      "tier": "L2",
      "steps": [
        "Define collection objective and legal/organizational authorization",
        "Preserve source timestamps and original artifact metadata",
        "Record acquisition utility, version, operator and time",
        "Hash and store securely with access log and chain of custody",
        "Analyze copies and note completeness/limitations"
      ]
    },
    {
      "id": "r16",
      "title": "Detection deployment",
      "tier": "L3",
      "steps": [
        "Document data contract and normalization fields",
        "Write behavioral detection with owner, runbook and ATT&CK mapping",
        "Construct positive and negative test fixtures",
        "Test performance, tuning and missing data behavior",
        "Deploy via change control; monitor and maintain version history"
      ]
    }
  ],
  "glossary": [
    {
      "term": "Alert",
      "definition": "A notification that a detection rule or security sensor observed suspicious or notable behavior."
    },
    {
      "term": "Incident",
      "definition": "An event or series of events that actually or potentially jeopardizes security and needs coordinated handling."
    },
    {
      "term": "Event",
      "definition": "A recorded observation from a system or service."
    },
    {
      "term": "Detection rule",
      "definition": "Logic that marks events or patterns as important."
    },
    {
      "term": "Triage",
      "definition": "Rapid evidence-led validation, contextualization and prioritization of alerts."
    },
    {
      "term": "Escalation",
      "definition": "Handing off a case with sufficient evidence and urgency to the appropriate owner."
    },
    {
      "term": "Disposition",
      "definition": "Recorded conclusion about alert outcome, such as true, false or benign positive."
    },
    {
      "term": "Severity",
      "definition": "Assessment of potential or actual technical and business impact."
    },
    {
      "term": "Priority",
      "definition": "Operational urgency after considering impact, activity, SLA and other work."
    },
    {
      "term": "Confidence",
      "definition": "How strongly available evidence supports an assessment."
    },
    {
      "term": "SLA",
      "definition": "Service Level Agreement; a defined service obligation including response or resolution time."
    },
    {
      "term": "MTTD",
      "definition": "Mean Time To Detect, requiring an explicit definition of incident start and detection time."
    },
    {
      "term": "MTTR",
      "definition": "Mean Time To Respond or Resolve depending on team definition; define it before comparing."
    },
    {
      "term": "False positive",
      "definition": "A detector fired incorrectly relative to its stated matching intent."
    },
    {
      "term": "Benign positive",
      "definition": "A correct suspicious-pattern match with a legitimate explanation."
    },
    {
      "term": "IOC",
      "definition": "Indicator of compromise: observable such as suspicious hash, URL, domain or IP."
    },
    {
      "term": "TTP",
      "definition": "Tactics, Techniques and Procedures: how an adversary operates."
    },
    {
      "term": "ATT&CK tactic",
      "definition": "An adversary objective such as credential access or lateral movement."
    },
    {
      "term": "ATT&CK technique",
      "definition": "A documented way adversaries achieve a tactic."
    },
    {
      "term": "Correlation",
      "definition": "Linking separate events by meaningful keys and time."
    },
    {
      "term": "Enrichment",
      "definition": "Adding context such as asset ownership, identity privilege and intelligence."
    },
    {
      "term": "Telemetry",
      "definition": "Recorded data about behavior, activity and health of systems."
    },
    {
      "term": "Log ingestion",
      "definition": "Transferring source records into an analytics system."
    },
    {
      "term": "Normalization",
      "definition": "Mapping multiple data formats to a usable common structure."
    },
    {
      "term": "Parsing",
      "definition": "Extracting fields from original log text or structured records."
    },
    {
      "term": "Retention",
      "definition": "How long records are stored and available for investigation."
    },
    {
      "term": "SIEM",
      "definition": "Security Information and Event Management for logging, correlation, detection and search."
    },
    {
      "term": "SOAR",
      "definition": "Security Orchestration, Automation and Response workflows and integrations."
    },
    {
      "term": "EDR",
      "definition": "Endpoint Detection and Response: endpoint telemetry, detection and investigation/response."
    },
    {
      "term": "XDR",
      "definition": "Extended Detection and Response: correlated detection and response across multiple sources."
    },
    {
      "term": "NDR",
      "definition": "Network Detection and Response based on network telemetry and analytics."
    },
    {
      "term": "IDS",
      "definition": "Intrusion Detection System; produces alerts for suspicious activity."
    },
    {
      "term": "IPS",
      "definition": "Intrusion Prevention System; can prevent or block matching activity."
    },
    {
      "term": "WAF",
      "definition": "Web Application Firewall: inspects and acts on web request patterns."
    },
    {
      "term": "Firewall",
      "definition": "Network or host control enforcing allowed and denied communications."
    },
    {
      "term": "Proxy",
      "definition": "Intermediary handling requests, potentially logging web context."
    },
    {
      "term": "NAT",
      "definition": "Network Address Translation; rewrites IP and/or port at boundary."
    },
    {
      "term": "CIDR",
      "definition": "Classless Inter-Domain Routing; compact representation of IP networks."
    },
    {
      "term": "TCP",
      "definition": "Reliable ordered transport protocol based on a connection and sequence acknowledgements."
    },
    {
      "term": "UDP",
      "definition": "Datagram transport without built-in delivery or ordering assurances."
    },
    {
      "term": "SYN",
      "definition": "TCP flag used to begin connection establishment."
    },
    {
      "term": "RST",
      "definition": "TCP flag for resetting a connection."
    },
    {
      "term": "DNS",
      "definition": "Domain Name System: distributed service for resolving domain-related records."
    },
    {
      "term": "TTL",
      "definition": "Time To Live; DNS cache lifetime or IP hop limit depending on context."
    },
    {
      "term": "A record",
      "definition": "DNS record mapping a hostname to an IPv4 address."
    },
    {
      "term": "AAAA record",
      "definition": "DNS record mapping a hostname to an IPv6 address."
    },
    {
      "term": "CNAME",
      "definition": "DNS canonical name alias record."
    },
    {
      "term": "MX record",
      "definition": "DNS record routing mail for a domain."
    },
    {
      "term": "TXT record",
      "definition": "DNS text record used for many purposes including mail authentication."
    },
    {
      "term": "NXDOMAIN",
      "definition": "DNS response indicating the queried name does not exist."
    },
    {
      "term": "HTTP",
      "definition": "Hypertext Transfer Protocol used for web requests and responses."
    },
    {
      "term": "HTTPS",
      "definition": "HTTP protected with TLS, typically on port 443."
    },
    {
      "term": "TLS",
      "definition": "Transport Layer Security, providing authenticated encrypted transport."
    },
    {
      "term": "SNI",
      "definition": "Server Name Indication in TLS for communicating intended hostname in applicable handshakes."
    },
    {
      "term": "JA4",
      "definition": "A network fingerprinting technique derived from client TLS/HTTP characteristics; not a verdict."
    },
    {
      "term": "Certificate",
      "definition": "Digital credential binding public key information to a subject under a trust model."
    },
    {
      "term": "SPF",
      "definition": "Sender Policy Framework; domain authorizes sending IPs."
    },
    {
      "term": "DKIM",
      "definition": "DomainKeys Identified Mail; verifies digital signatures on mail."
    },
    {
      "term": "DMARC",
      "definition": "Mail policy/alignment mechanism built on SPF and/or DKIM."
    },
    {
      "term": "BEC",
      "definition": "Business Email Compromise, social engineering targeting financial/business transactions."
    },
    {
      "term": "Phishing",
      "definition": "Deceptive message trying to induce harmful action or disclose information."
    },
    {
      "term": "MFA",
      "definition": "Multi-Factor Authentication using distinct categories of verification factors."
    },
    {
      "term": "MFA fatigue",
      "definition": "Repeated push prompts intended to trick or pressure a user into approval."
    },
    {
      "term": "SSO",
      "definition": "Single Sign-On: access multiple services through one identity flow."
    },
    {
      "term": "OAuth",
      "definition": "Framework for delegated authorization; grants and tokens require careful scoping."
    },
    {
      "term": "Token",
      "definition": "Credential-like data representing a session or delegated authorization."
    },
    {
      "term": "Conditional Access",
      "definition": "Policies evaluating authentication and device/context to permit or restrict access."
    },
    {
      "term": "IAM",
      "definition": "Identity and Access Management for authentication, roles and access policy."
    },
    {
      "term": "Active Directory",
      "definition": "Microsoft directory service for identities and domain policy."
    },
    {
      "term": "Domain Controller",
      "definition": "Server providing Active Directory domain services and authentication."
    },
    {
      "term": "LDAP",
      "definition": "Directory access protocol used by systems including Active Directory."
    },
    {
      "term": "Kerberos",
      "definition": "Ticket-based network authentication protocol."
    },
    {
      "term": "TGT",
      "definition": "Kerberos Ticket Granting Ticket used to request service tickets."
    },
    {
      "term": "TGS",
      "definition": "Ticket Granting Service; provides service tickets in Kerberos."
    },
    {
      "term": "NTLM",
      "definition": "Microsoft authentication protocol family still present in some environments."
    },
    {
      "term": "SPN",
      "definition": "Service Principal Name associated with a Kerberos service identity."
    },
    {
      "term": "Password spraying",
      "definition": "Attempts one or few passwords against many accounts."
    },
    {
      "term": "Brute force",
      "definition": "Repeated guessing of credentials, commonly concentrated on an account or secret."
    },
    {
      "term": "Credential stuffing",
      "definition": "Using previously exposed username/password pairs on other services."
    },
    {
      "term": "Pass-the-Hash",
      "definition": "Authentication technique abusing NTLM hash material instead of a plaintext password."
    },
    {
      "term": "LSASS",
      "definition": "Windows process responsible for security policy and authentication-related secrets."
    },
    {
      "term": "Sysmon",
      "definition": "System Monitor; configurable Windows event telemetry tool from Microsoft Sysinternals."
    },
    {
      "term": "Event ID 4624",
      "definition": "Windows successful logon audit event."
    },
    {
      "term": "Event ID 4625",
      "definition": "Windows failed logon audit event."
    },
    {
      "term": "Event ID 4688",
      "definition": "Windows process creation audit event when configured."
    },
    {
      "term": "Event ID 7045",
      "definition": "Windows System event commonly indicating new service installation."
    },
    {
      "term": "Event ID 1102",
      "definition": "Windows Security audit log was cleared."
    },
    {
      "term": "Event ID 4104",
      "definition": "PowerShell script block logging event when configured."
    },
    {
      "term": "Sysmon Event 1",
      "definition": "Process creation event when collected."
    },
    {
      "term": "Sysmon Event 3",
      "definition": "Network connection event when collected."
    },
    {
      "term": "Sysmon Event 22",
      "definition": "DNS query event when collected."
    },
    {
      "term": "Process lineage",
      "definition": "Parent-child relationships between processes."
    },
    {
      "term": "LOLBins",
      "definition": "Legitimate operating system binaries that can be abused by attackers."
    },
    {
      "term": "Persistence",
      "definition": "Technique for maintaining access across time, logouts or reboots."
    },
    {
      "term": "Privilege escalation",
      "definition": "Obtaining a higher level of permissions."
    },
    {
      "term": "Lateral movement",
      "definition": "Moving from one system or security context to another."
    },
    {
      "term": "Command and control",
      "definition": "Communication channel used to direct compromised systems."
    },
    {
      "term": "Beaconing",
      "definition": "Repeated client communication that may indicate scheduled C2 activity."
    },
    {
      "term": "Exfiltration",
      "definition": "Unauthorized transfer of data out of a security boundary."
    },
    {
      "term": "Ransomware",
      "definition": "Malware or intrusion activity that encrypts/denies access and demands payment."
    },
    {
      "term": "SPL",
      "definition": "Splunk Search Processing Language for data exploration and analysis."
    },
    {
      "term": "KQL",
      "definition": "Kusto Query Language used in platforms such as Microsoft Sentinel."
    },
    {
      "term": "Sigma",
      "definition": "Generic YAML-based SIEM detection rule format with translation pipelines."
    },
    {
      "term": "YARA",
      "definition": "Rule language for classifying file or memory patterns, subject to configuration."
    },
    {
      "term": "Baseline",
      "definition": "Expected behavior established from comparable historic observations."
    },
    {
      "term": "Hunt hypothesis",
      "definition": "Testable statement predicting observable adversary behavior."
    },
    {
      "term": "Detection engineering",
      "definition": "Designing, implementing, testing and maintaining reliable detections."
    },
    {
      "term": "Detection-as-code",
      "definition": "Version-controlled, tested and deployable detection content."
    },
    {
      "term": "Precision",
      "definition": "Among positive detector results, fraction that are true positives."
    },
    {
      "term": "Recall",
      "definition": "Among actual malicious positives, fraction the detector identified."
    },
    {
      "term": "Chain of custody",
      "definition": "Documented evidence acquisition, storage, access and transfers."
    },
    {
      "term": "Forensic image",
      "definition": "Preserved copy of digital media or memory made with documented method."
    },
    {
      "term": "Containment",
      "definition": "Action to limit an incident's current or future spread/impact."
    },
    {
      "term": "Eradication",
      "definition": "Removing malicious access, persistence and cause after containment."
    },
    {
      "term": "Recovery",
      "definition": "Restoring services and verifying they remain secure."
    },
    {
      "term": "Post-incident review",
      "definition": "Structured learning process examining sequence, impacts and control improvements."
    },
    {
      "term": "Threat modeling",
      "definition": "Identifying possible adversary actions and controls within a system design."
    },
    {
      "term": "STRIDE",
      "definition": "Threat-modeling categories: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege."
    },
    {
      "term": "Kill chain",
      "definition": "High-level representation of stages in an attack or intrusion."
    },
    {
      "term": "CloudTrail",
      "definition": "AWS API audit logging service; supported event categories require configuration."
    },
    {
      "term": "Kubernetes RBAC",
      "definition": "Role-Based Access Control for Kubernetes API permissions."
    },
    {
      "term": "Service account",
      "definition": "Non-human identity used by a workload or automated service."
    },
    {
      "term": "Container image",
      "definition": "Packaged filesystem/config used to instantiate container processes."
    }
  ],
  "questions": [
    {
      "id": "q001",
      "tier": "Foundation",
      "question": "A /24 IPv4 subnet normally contains how many address slots?",
      "options": [
        "256",
        "254",
        "128",
        "512"
      ],
      "answer": 0,
      "why": "It has 2^(32-24) = 256 total addresses; classic /24 gives 254 usable host addresses."
    },
    {
      "id": "q002",
      "tier": "Foundation",
      "question": "Which range is private IPv4?",
      "options": [
        "172.16.0.0/12",
        "172.32.0.0/12",
        "8.8.8.0/24",
        "203.0.113.0/24"
      ],
      "answer": 0,
      "why": "RFC1918 specifies 10/8, 172.16/12 and 192.168/16."
    },
    {
      "id": "q003",
      "tier": "Foundation",
      "question": "Which happens first during a TCP connection handshake?",
      "options": [
        "SYN",
        "FIN",
        "RST",
        "ACK after close"
      ],
      "answer": 0,
      "why": "SYN begins a standard TCP three-way handshake."
    },
    {
      "id": "q004",
      "tier": "Foundation",
      "question": "A firewall log shows HTTPS but not the URL path. Why?",
      "options": [
        "TLS encrypts HTTP contents",
        "DNS blocks it",
        "NAT strips all hostnames",
        "TCP has no ports"
      ],
      "answer": 0,
      "why": "Without decryption or proxy access, the path is usually encrypted."
    },
    {
      "id": "q005",
      "tier": "Foundation",
      "question": "What DNS response means a name does not exist?",
      "options": [
        "NXDOMAIN",
        "SERVFAIL",
        "NOERROR",
        "REFUSED"
      ],
      "answer": 0,
      "why": "NXDOMAIN means the queried DNS name does not exist."
    },
    {
      "id": "q006",
      "tier": "Foundation",
      "question": "What is the best interpretation of a valid TLS certificate?",
      "options": [
        "Identity validation under a certificate chain, not safety",
        "The site cannot be malicious",
        "The app has no SQLi",
        "The domain has no spoofing"
      ],
      "answer": 0,
      "why": "Phishing websites can obtain certificates."
    },
    {
      "id": "q007",
      "tier": "Foundation",
      "question": "Which is an authentication factor?",
      "options": [
        "Hardware security key",
        "A user account name",
        "An IP address",
        "A browser version"
      ],
      "answer": 0,
      "why": "A hardware authenticator can prove possession."
    },
    {
      "id": "q008",
      "tier": "Foundation",
      "question": "What does least privilege reduce?",
      "options": [
        "Potential impact of abused access",
        "All software bugs",
        "Need for logging",
        "All DDoS traffic"
      ],
      "answer": 0,
      "why": "It constrains authorized actions and blast radius."
    },
    {
      "id": "q009",
      "tier": "Foundation",
      "question": "What is a hash useful for in incident response?",
      "options": [
        "Exact-file matching and integrity checks",
        "Proof a file is malicious",
        "Identifying the human author",
        "Decrypting payloads"
      ],
      "answer": 0,
      "why": "Hash is content-derived and does not establish intent."
    },
    {
      "id": "q010",
      "tier": "Foundation",
      "question": "A public IP shared by employees maps to a suspicious connection. What is missing?",
      "options": [
        "NAT logs and port/time context",
        "The CEO email",
        "Keyboard layout",
        "A CVSS score"
      ],
      "answer": 0,
      "why": "IP-only attribution is unreliable under shared egress."
    },
    {
      "id": "q011",
      "tier": "Foundation",
      "question": "What is a log ingestion gap?",
      "options": [
        "Missing or delayed security telemetry",
        "A harmless duplicate record",
        "Strong evidence of no attacks",
        "A closed incident"
      ],
      "answer": 0,
      "why": "Absence of records may indicate collection failure."
    },
    {
      "id": "q012",
      "tier": "Foundation",
      "question": "Which is a tactic in MITRE ATT&CK?",
      "options": [
        "Lateral movement",
        "TCP",
        "SHA-256",
        "CVSS"
      ],
      "answer": 0,
      "why": "Tactics describe adversary objectives."
    },
    {
      "id": "q013",
      "tier": "L1",
      "question": "An alert says PowerShell ran. Best next question?",
      "options": [
        "What launched it and what did it do?",
        "Which color is the desktop?",
        "Can we disable all PowerShell?",
        "Did the WAF block it?"
      ],
      "answer": 0,
      "why": "Parent process, command line, network and follow-on activity supply context."
    },
    {
      "id": "q014",
      "tier": "L1",
      "question": "Which event normally signifies successful Windows logon?",
      "options": [
        "4624",
        "4625",
        "7045",
        "1102"
      ],
      "answer": 0,
      "why": "Windows Security Event 4624 reports a successful logon."
    },
    {
      "id": "q015",
      "tier": "L1",
      "question": "Which event normally reports failed logon?",
      "options": [
        "4625",
        "4688",
        "7045",
        "4104"
      ],
      "answer": 0,
      "why": "Windows Security Event 4625 records a failed logon."
    },
    {
      "id": "q016",
      "tier": "L1",
      "question": "New Windows service installation commonly appears as?",
      "options": [
        "7045",
        "4624",
        "4768",
        "5156"
      ],
      "answer": 0,
      "why": "Event 7045 in System log reports installation of a service."
    },
    {
      "id": "q017",
      "tier": "L1",
      "question": "Sysmon Event 1 commonly records?",
      "options": [
        "Process creation",
        "Network connection",
        "DNS query",
        "File deletion"
      ],
      "answer": 0,
      "why": "When configured, Sysmon Event ID 1 is process creation."
    },
    {
      "id": "q018",
      "tier": "L1",
      "question": "Sysmon Event 3 commonly records?",
      "options": [
        "Network connection",
        "Email delivery",
        "Windows reboot",
        "Service logon"
      ],
      "answer": 0,
      "why": "Event ID 3 is network connection when enabled."
    },
    {
      "id": "q019",
      "tier": "L1",
      "question": "Sysmon Event 22 commonly records?",
      "options": [
        "DNS query",
        "Service creation",
        "User password reset",
        "New registry hive"
      ],
      "answer": 0,
      "why": "Sysmon 22 records DNS query events when configured."
    },
    {
      "id": "q020",
      "tier": "L1",
      "question": "Several users get one failed sign-in each from one IP. Best initial hypothesis?",
      "options": [
        "Password spraying",
        "DNS tunneling",
        "Ransomware",
        "Backups"
      ],
      "answer": 0,
      "why": "Few attempts across many accounts indicate spraying."
    },
    {
      "id": "q021",
      "tier": "L1",
      "question": "What makes an impossible-travel alert less convincing?",
      "options": [
        "Known corporate VPN exit",
        "Unmanaged device",
        "Impossible token activity",
        "New privileged grant"
      ],
      "answer": 0,
      "why": "VPN egress often shifts apparent geographic origin."
    },
    {
      "id": "q022",
      "tier": "L1",
      "question": "What does SPF validate?",
      "options": [
        "Authorized sending infrastructure for envelope identity",
        "All links are safe",
        "All attachments scanned",
        "Recipient signed contents"
      ],
      "answer": 0,
      "why": "SPF covers source IP authorization for a sending domain."
    },
    {
      "id": "q023",
      "tier": "L1",
      "question": "What does DKIM add?",
      "options": [
        "Cryptographic mail signature validation",
        "Mandatory malware scanning",
        "Domain owner identity verification",
        "Perfect encryption"
      ],
      "answer": 0,
      "why": "DKIM can validate integrity and claimed signing domain."
    },
    {
      "id": "q024",
      "tier": "L1",
      "question": "DMARC fundamentally deals with?",
      "options": [
        "Mail authentication alignment and domain policy",
        "Packet filtering",
        "Endpoint antivirus",
        "Network address translation"
      ],
      "answer": 0,
      "why": "DMARC aligns identifiers with SPF/DKIM and publishes policies."
    },
    {
      "id": "q025",
      "tier": "L1",
      "question": "What should you do with a reported suspicious URL?",
      "options": [
        "Use approved safe inspection methods",
        "Open it on your work laptop",
        "Forward it to everyone",
        "Assume it is harmless if HTTPS"
      ],
      "answer": 0,
      "why": "Use isolated or approved analysis and preserve evidence."
    },
    {
      "id": "q026",
      "tier": "L1",
      "question": "An EDR alert indicates a script was blocked. What can you conclude?",
      "options": [
        "Reported prevention occurred, verify follow-on activity",
        "All hosts are clean",
        "Attacker exfiltrated data",
        "The IOC is invalid"
      ],
      "answer": 0,
      "why": "A block does not prove no other stage succeeded."
    },
    {
      "id": "q027",
      "tier": "L1",
      "question": "An approved scan triggered the scan detector. Most accurate?",
      "options": [
        "Correct alert, likely benign positive",
        "Definite false positive",
        "Confirmed worm",
        "Missing source log"
      ],
      "answer": 0,
      "why": "Detection matched the behavior; authorization changes impact assessment."
    },
    {
      "id": "q028",
      "tier": "L1",
      "question": "What should be in a high-quality escalation?",
      "options": [
        "Evidence, timeline, scope, confidence and next action",
        "Only an alert screenshot",
        "Only a reputation score",
        "Only analyst opinion"
      ],
      "answer": 0,
      "why": "The receiving analyst needs reproducible pivots."
    },
    {
      "id": "q029",
      "tier": "L1",
      "question": "What does HTTP 403 alone show?",
      "options": [
        "Request was refused by server/policy",
        "Attack definitely succeeded",
        "User definitely logged in",
        "WAF definitely blocked SQLi"
      ],
      "answer": 0,
      "why": "403 doesn't identify why unless correlated with application/WAF logs."
    },
    {
      "id": "q030",
      "tier": "L1",
      "question": "Which is a safer interpretation of a WAF SQLi alert?",
      "options": [
        "Request matched a suspicious pattern, verify backend impact",
        "Data theft proven",
        "Database breached",
        "TLS failed"
      ],
      "answer": 0,
      "why": "Rule hit is not proof of successful exploit."
    },
    {
      "id": "q031",
      "tier": "L1",
      "question": "What is the most valuable next pivot after a suspicious successful sign-in?",
      "options": [
        "Subsequent sensitive actions and session context",
        "Random reverse lookup only",
        "Wait for another alert",
        "Close because user exists"
      ],
      "answer": 0,
      "why": "Activity after authentication can support or weaken compromise hypothesis."
    },
    {
      "id": "q032",
      "tier": "L1",
      "question": "What does Splunk stats count by user do?",
      "options": [
        "Groups records by user and counts each group",
        "Removes all duplicates",
        "Generates firewall rules",
        "Blocks login"
      ],
      "answer": 0,
      "why": "stats aggregates event data."
    },
    {
      "id": "q033",
      "tier": "L1",
      "question": "What does KQL summarize count() by Account do?",
      "options": [
        "Count records grouped by account",
        "Show 1 raw event only",
        "Join every table",
        "Set retention"
      ],
      "answer": 0,
      "why": "summarize is aggregation."
    },
    {
      "id": "q034",
      "tier": "L1",
      "question": "When do you mark a SIEM alert false positive?",
      "options": [
        "When evidence indicates detection logic or data is inaccurate",
        "Whenever activity is authorized",
        "Whenever a user says it is fine",
        "Every time no IOC reputation hit"
      ],
      "answer": 0,
      "why": "Authorized activity matching correctly may be benign positive."
    },
    {
      "id": "q035",
      "tier": "L1",
      "question": "What should an SOC shift start include?",
      "options": [
        "Handover, urgent queues and telemetry health",
        "Only dashboard theme check",
        "Only malware news",
        "Only coffee and ticket count"
      ],
      "answer": 0,
      "why": "Security posture depends on both open incidents and visibility."
    },
    {
      "id": "q036",
      "tier": "L2",
      "question": "Which statement best defines a hypothesis?",
      "options": [
        "Falsifiable explanation linked to evidence",
        "A threat group name",
        "A certainty before data",
        "A list of IPs only"
      ],
      "answer": 0,
      "why": "Alternative explanations and tests distinguish disciplined investigation."
    },
    {
      "id": "q037",
      "tier": "L2",
      "question": "Why normalize event times to UTC?",
      "options": [
        "Accurate cross-source ordering",
        "UTC makes all events malicious",
        "It decrypts payloads",
        "It prevents token theft"
      ],
      "answer": 0,
      "why": "Different local time zones otherwise distort timeline."
    },
    {
      "id": "q038",
      "tier": "L2",
      "question": "What is NOT guaranteed by resetting a compromised password?",
      "options": [
        "Revocation of all previously stolen tokens",
        "Changing credential secret",
        "User needing new sign-in",
        "New password policy check"
      ],
      "answer": 0,
      "why": "Persistent sessions and app grants may require separate actions."
    },
    {
      "id": "q039",
      "tier": "L2",
      "question": "Which trio strongly suggests ransomware?",
      "options": [
        "Mass renames, shadow deletion, ransom notes",
        "One VPN failure, email open, DNS answer",
        "Normal backups, Windows update, browser use",
        "Three 404 errors"
      ],
      "answer": 0,
      "why": "Combined behaviors imply active encryption and recovery sabotage."
    },
    {
      "id": "q040",
      "tier": "L2",
      "question": "What is the best lateral movement evidence?",
      "options": [
        "Remote logon plus service/task execution on another host",
        "SMB port seen once",
        "Same user on two laptops legally",
        "A blocked DNS request"
      ],
      "answer": 0,
      "why": "Behavior across hosts and credentials matters."
    },
    {
      "id": "q041",
      "tier": "L2",
      "question": "A proxy shows repeated 60s contacts to unknown domain. Next?",
      "options": [
        "Correlate endpoint process, prevalence and bytes",
        "Assert C2 is confirmed",
        "Ignore small packets",
        "Block all TLS"
      ],
      "answer": 0,
      "why": "Beaconing is a hypothesis needing context."
    },
    {
      "id": "q042",
      "tier": "L2",
      "question": "Most useful to assess possible cloud exfiltration?",
      "options": [
        "Object-level access logs and data volume",
        "Only role description",
        "Only billing amount",
        "Only user display name"
      ],
      "answer": 0,
      "why": "Management logging alone may not show object reads."
    },
    {
      "id": "q043",
      "tier": "L2",
      "question": "What does containment aim to do?",
      "options": [
        "Limit current or future spread and impact",
        "Remove every root cause permanently",
        "Approve legal notification",
        "Restore backup only"
      ],
      "answer": 0,
      "why": "Eradication and recovery are distinct phases."
    },
    {
      "id": "q044",
      "tier": "L2",
      "question": "What is chain of custody?",
      "options": [
        "Recorded evidence provenance and transfers",
        "A password vault",
        "A type of MITRE tactic",
        "The same as SHA-256 alone"
      ],
      "answer": 0,
      "why": "Evidence handling includes who, when, where and integrity."
    },
    {
      "id": "q045",
      "tier": "L2",
      "question": "What does precision measure?",
      "options": [
        "TP/(TP+FP)",
        "TP/(TP+FN)",
        "FP/(FP+TN)",
        "TN/(TN+FN)"
      ],
      "answer": 0,
      "why": "Precision measures correctness of positive detections."
    },
    {
      "id": "q046",
      "tier": "L2",
      "question": "What does recall measure?",
      "options": [
        "TP/(TP+FN)",
        "TP/(TP+FP)",
        "FP/(FP+TN)",
        "FN/(TP+FP)"
      ],
      "answer": 0,
      "why": "Recall measures fraction of actual positives detected."
    },
    {
      "id": "q047",
      "tier": "L2",
      "question": "What is a risky tuning strategy?",
      "options": [
        "Ignore all events from a large IP range",
        "Use narrow approved exceptions",
        "Regression-test against malicious cases",
        "Review exclusion expiration"
      ],
      "answer": 0,
      "why": "Broad exclusions cause avoidable detection blind spots."
    },
    {
      "id": "q048",
      "tier": "L2",
      "question": "What is Sigma best described as?",
      "options": [
        "Generic YAML detection specification needing mapping",
        "A built-in endpoint isolation tool",
        "An email signing standard",
        "A network transport protocol"
      ],
      "answer": 0,
      "why": "Backend and field translation need testing."
    },
    {
      "id": "q049",
      "tier": "L2",
      "question": "What should a hypothesis-driven case note include?",
      "options": [
        "Alternative explanations and tests",
        "Only confirming evidence",
        "Guess at actor identity",
        "Only an emoji"
      ],
      "answer": 0,
      "why": "Avoid confirmation bias."
    },
    {
      "id": "q050",
      "tier": "L2",
      "question": "Why might an incident require legal stakeholder coordination?",
      "options": [
        "Data exposure, regulation and notification requirements vary",
        "Every alert is a lawsuit",
        "Every incident needs public announcement",
        "EDR requires a lawyer to search logs"
      ],
      "answer": 0,
      "why": "Legal/compliance obligations depend on organization and jurisdiction."
    },
    {
      "id": "q051",
      "tier": "L3",
      "question": "What differentiates hunting from reactive triage?",
      "options": [
        "Proactively testing hypotheses against telemetry",
        "Every hunt must start with IOC list",
        "Hunting is always malware reverse engineering",
        "Hunting requires scanning public IPs"
      ],
      "answer": 0,
      "why": "Threat hunting begins without a necessarily existing alert."
    },
    {
      "id": "q052",
      "tier": "L3",
      "question": "When is a negative hunt result trustworthy?",
      "options": [
        "Data coverage and search assumptions were verified",
        "The query ran without syntax errors",
        "The dashboard had no red alerts",
        "The hunt had no IOCs"
      ],
      "answer": 0,
      "why": "Visibility and test validity are essential."
    },
    {
      "id": "q053",
      "tier": "L3",
      "question": "What proves ATT&CK detection coverage?",
      "options": [
        "Tested telemetry and rules detect behavior in scope",
        "Putting T numbers in dashboard",
        "Having many Sigma YAML files",
        "Showing a heatmap only"
      ],
      "answer": 0,
      "why": "Empirical validation is necessary."
    },
    {
      "id": "q054",
      "tier": "L3",
      "question": "What should detection-as-code include?",
      "options": [
        "Review, tests, versioning and rollback",
        "Only a rule name",
        "Only an IP blocklist",
        "Only a screenshot"
      ],
      "answer": 0,
      "why": "Engineering manages lifecycle not just query writing."
    },
    {
      "id": "q055",
      "tier": "L3",
      "question": "Which is a strong negative test for a service-creation rule?",
      "options": [
        "Legitimate deployment that looks similar",
        "Same malicious test repeated",
        "An unrelated DNS query",
        "A blank file"
      ],
      "answer": 0,
      "why": "Check benign behavior doesn't incorrectly fire."
    },
    {
      "id": "q056",
      "tier": "L3",
      "question": "A host has no EDR events for hours. Most justified statement?",
      "options": [
        "Telemetry gap requires investigation",
        "No compromise happened",
        "The host is offline for sure",
        "All SIEM rules work"
      ],
      "answer": 0,
      "why": "Collection failure is not evidence of safety."
    },
    {
      "id": "q057",
      "tier": "L3",
      "question": "What is the primary goal of a post-incident review?",
      "options": [
        "Improve controls through verified contributing factors",
        "Find one person to blame",
        "Close incidents without evidence",
        "Generate longer dashboards"
      ],
      "answer": 0,
      "why": "Focus on operational learning and measurable fixes."
    },
    {
      "id": "q058",
      "tier": "L3",
      "question": "A container runs suspicious code. Which context is essential?",
      "options": [
        "Pod, image digest, service account and Kubernetes audit",
        "Only terminal color",
        "Only the host wallpaper",
        "Only project name"
      ],
      "answer": 0,
      "why": "Workload identity and orchestration context guide scope."
    },
    {
      "id": "q059",
      "tier": "L3",
      "question": "A hash search yields no hits. What does that mean?",
      "options": [
        "Exact hash not seen in available data; variants may exist",
        "Family not present anywhere",
        "No malware can run",
        "Network is secure"
      ],
      "answer": 0,
      "why": "Coverage and hash specificity limit conclusions."
    },
    {
      "id": "q060",
      "tier": "L3",
      "question": "SOC closed 50% more alerts this month. Is security improved?",
      "options": [
        "Not necessarily: evaluate quality, risk, coverage and impact",
        "Yes by definition",
        "Always worse",
        "Only depends on night shift"
      ],
      "answer": 0,
      "why": "Closure volume is an output, not an effectiveness measure."
    }
  ],
  "queries": [
    {
      "title": "Failed logons by user & source",
      "language": "SPL",
      "code": "index=windows EventCode=4625 earliest=-24h\n| stats count as failures by user, src_ip\n| sort - failures",
      "meaning": "Investigate repeated failed authentication attempts; field names depend on the parser."
    },
    {
      "title": "New service installation",
      "language": "SPL",
      "code": "index=windows EventCode=7045 earliest=-7d\n| table _time host ServiceName ImagePath AccountName",
      "meaning": "Review new services and unusual image paths on critical endpoints."
    },
    {
      "title": "Suspicious child processes",
      "language": "SPL",
      "code": "index=sysmon EventCode=1 (ParentImage=\"*\\WINWORD.EXE\" OR ParentImage=\"*\\EXCEL.EXE\")\n| table _time host Image ParentImage CommandLine",
      "meaning": "Find Office processes launching child programs; tune with known legitimate workflows."
    },
    {
      "title": "Cloud sign-in failures",
      "language": "KQL",
      "code": "SigninLogs\n| where TimeGenerated > ago(1d)\n| summarize Failures=countif(ResultType != \"0\"), Successes=countif(ResultType == \"0\") by UserPrincipalName, IPAddress\n| where Failures >= 5\n| order by Failures desc",
      "meaning": "Find identity-source clusters, then review successful access, devices and MFA."
    },
    {
      "title": "Rare remote logons",
      "language": "KQL",
      "code": "SecurityEvent\n| where TimeGenerated > ago(7d)\n| where EventID == 4624 and LogonType == 10\n| summarize Hosts=dcount(Computer), Events=count() by Account\n| order by Hosts desc",
      "meaning": "Demonstrates a pivot for remote interactive sessions; check schema and baseline."
    },
    {
      "title": "Cloud management privilege change",
      "language": "KQL",
      "code": "AzureActivity\n| where TimeGenerated > ago(7d)\n| where OperationNameValue has_any (\"roleAssignments/write\", \"policyAssignments/write\")\n| project TimeGenerated, Caller, OperationNameValue, ActivityStatusValue, ResourceGroup",
      "meaning": "Look for cloud role/policy changes; actual provider fields and operation IDs vary."
    },
    {
      "title": "One host scanning many ports",
      "language": "SPL",
      "code": "index=firewall action=allowed earliest=-2h\n| stats dc(dest_port) as ports dc(dest_ip) as hosts by src_ip\n| where ports > 20 OR hosts > 30\n| sort - ports",
      "meaning": "Hypothesis for unusual destination diversity, requiring asset-role baselines."
    },
    {
      "title": "Domain frequency & unusual labels",
      "language": "KQL",
      "code": "DnsEvents\n| where TimeGenerated > ago(1d)\n| summarize Requests=count(), Names=dcount(Name) by ClientIP, QueryType\n| order by Requests desc",
      "meaning": "Illustrative custom DNS schema: adapt table and field names in your environment."
    }
  ],
  "references": [
    {
      "name": "NIST SP 800-61 Rev. 3",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
      "desc": "Current incident-response guidance aligned with CSF 2.0."
    },
    {
      "name": "MITRE ATT&CK Enterprise",
      "url": "https://attack.mitre.org/matrices/enterprise/",
      "desc": "Tactics, techniques and detection context. Version 20.0 current in Oct 2026."
    },
    {
      "name": "Microsoft Learn: Sentinel hunting",
      "url": "https://learn.microsoft.com/en-us/azure/sentinel/hunting",
      "desc": "Hypothesis-driven hunts and KQL operators."
    },
    {
      "name": "Splunk Search Manual",
      "url": "https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/WhatsInThisManual",
      "desc": "SPL syntax and query reference."
    },
    {
      "name": "Sigma specification",
      "url": "https://sigmahq.io/docs/basics/rules.html",
      "desc": "Generic detection rule structure and field mapping considerations."
    },
    {
      "name": "Windows Security Auditing",
      "url": "https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4624",
      "desc": "Windows logon event fields and caveats."
    },
    {
      "name": "Sysmon documentation",
      "url": "https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon",
      "desc": "Configurable endpoint event monitoring."
    },
    {
      "name": "CISA Incident & Vulnerability Response Playbooks",
      "url": "https://www.cisa.gov/resources-tools/resources/federal-government-cybersecurity-incident-and-vulnerability-response-playbooks",
      "desc": "Practical coordination and response playbooks."
    }
  ]
};
