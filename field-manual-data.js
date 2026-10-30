/* Self-contained educational field manual; offline and fictional examples. */
export const FIELD_MANUAL = {
  "version": "8.0",
  "chapters": [
    {
      "id": "fm01",
      "tier": "Foundation",
      "category": "SOC basics",
      "title": "What actually happens during a SOC shift",
      "concept": "A SOC shift is a queue of hypotheses, not a hunt for red icons. Your output is a defensible decision supported by time, scope, asset criticality and reproducible evidence. L1 handles initial validation; L2 scopes and coordinates response; L3 improves detection coverage and investigates complex behavior. Titles vary by organization.",
      "sequence": [
        "Check the prior handoff and service health",
        "Confirm SIEM ingestion, alert queues and clock synchronization",
        "Triage by business impact plus confidence, not vendor severity alone",
        "Pivot through independent telemetry and create a timeline",
        "Record disposition, uncertainty, owner and next action"
      ],
      "evidence": [
        "Alert record and triggering rule",
        "Asset owner and criticality",
        "Related log sources and ingestion health",
        "Ticket with evidence references"
      ],
      "example": "A critical sign-in alert for a testing account from a known VPN may be benign. Confirm asset identity, approved change and other sign-ins before closing; a familiar IP is a clue, not a verdict.",
      "pitfall": "Closing a detection because the threat intelligence score is low ignores environment-specific risk.",
      "question": "What distinguishes an alert from a confirmed incident?",
      "answer": "An alert is a detection hypothesis. An incident is an event assessed as requiring response under the organization’s policy; classify only after checking evidence and impact.",
      "command": ""
    },
    {
      "id": "fm02",
      "tier": "Foundation",
      "category": "SOC basics",
      "title": "Risk, likelihood, severity and priority",
      "concept": "Severity describes an event or potential impact. Priority determines what the team works on now, incorporating confidence, business context, exposure and response deadlines. A high-severity signature on a decommissioned test host can be lower priority than a modest identity anomaly on a privileged production account.",
      "sequence": [
        "Identify the affected business process",
        "Assess confirmed impact versus hypothetical impact",
        "Measure evidence confidence and exposure",
        "Decide urgency and assign an owner",
        "State what could change the priority"
      ],
      "evidence": [
        "Asset inventory and business tier",
        "Identity role and access",
        "Time of event and current activity",
        "Scope estimates"
      ],
      "example": "An internet-exposed administrator account just gained a privileged role unexpectedly. Priority may be urgent even before proof of data loss because the potential blast radius is broad.",
      "pitfall": "Do not multiply arbitrary numbers and call them objective risk; document assumptions and what is unknown.",
      "question": "Can a low-severity alert become a high-priority case?",
      "answer": "Yes. Privileged access, active exploitation, critical assets, or confirmed business impact can override the original alert severity.",
      "command": ""
    },
    {
      "id": "fm03",
      "tier": "Foundation",
      "category": "Networking",
      "title": "OSI, TCP/IP and what a network sensor sees",
      "concept": "Layered models organize how traffic moves. Ethernet operates on a local link; IP provides addressing and routing; TCP or UDP carry application messages; TLS protects application content. A firewall can record IP, port and action without seeing decrypted HTTP requests. Always know the visibility and vantage point of each sensor.",
      "sequence": [
        "Identify source and destination IP",
        "Determine transport protocol and ports",
        "Check routing, NAT and sensor location",
        "Correlate DNS and TLS metadata",
        "Inspect application logs if payload visibility is required"
      ],
      "evidence": [
        "Flow tuple and byte counters",
        "DNS query and response",
        "TCP flags and retransmissions",
        "Proxy HTTP method and URL"
      ],
      "example": "A firewall reports 203.0.113.12:51510 to 192.0.2.20:443. This proves a flow was observed, not which URL was requested or whether it was malicious.",
      "pitfall": "Port 443 does not prove HTTPS, and a hostname in DNS does not prove a connection was made.",
      "question": "What can a NetFlow record tell you?",
      "answer": "Typically source/destination, ports, protocol, timing and byte/packet counts; application content and user identity require other sources.",
      "command": "Wireshark display filter (authorized captures): tcp.flags.syn == 1 && tcp.flags.ack == 0"
    },
    {
      "id": "fm04",
      "tier": "Foundation",
      "category": "Networking",
      "title": "TCP three-way handshake and session resets",
      "concept": "TCP begins with SYN, SYN/ACK and ACK, then sequence numbers and acknowledgements provide ordered delivery. RST may mean a refusal or abrupt close; retransmissions can indicate loss or blocked paths, not necessarily an attack. SOC analysts use handshake behavior to distinguish scans, failures and established sessions.",
      "sequence": [
        "Find SYN from client to server",
        "Find matching SYN/ACK from server",
        "Check final ACK and subsequent payload",
        "Identify retransmission, FIN or RST",
        "Compare baseline volume and destination reachability"
      ],
      "evidence": [
        "TCP flags and packet timestamps",
        "Source port reuse",
        "Firewall allow or deny",
        "Load balancer health events"
      ],
      "example": "A host sends SYNs to hundreds of ports but gets almost no SYN/ACK responses. That is consistent with probing but could also reflect inventory scanning; identify the initiating process.",
      "pitfall": "A SYN packet alone is not proof of successful connectivity or exploitation.",
      "question": "What is the difference between SYN scanning and a completed connection?",
      "answer": "SYN probing may not complete the handshake; a completed connection has the full exchange and subsequent session activity.",
      "command": "Wireshark display filter: tcp.flags.reset == 1"
    },
    {
      "id": "fm05",
      "tier": "Foundation",
      "category": "Networking",
      "title": "DNS resolution, caching and tunneling clues",
      "concept": "A recursive resolver retrieves records from authoritative infrastructure, caches answers by TTL and may be forwarded through corporate DNS. A record can be benign even when its domain looks unusual. Data leakage by DNS can produce frequent long, high-entropy subdomains, unusual record types and large response volumes; verify legitimacy and the resolver vantage point.",
      "sequence": [
        "Identify requester and resolver",
        "Inspect queried domain, qtype and response code",
        "Check frequency, length and entropy patterns",
        "Compare known application traffic",
        "Correlate with endpoint process and outbound flows"
      ],
      "evidence": [
        "DNS query logs",
        "NXDOMAIN rate",
        "Process initiating lookup",
        "Resolver policy exceptions"
      ],
      "example": "An endpoint requests 150 TXT records containing long labels. Check whether the source is legitimate service discovery, software telemetry, or encoded data before labeling tunneling.",
      "pitfall": "DNS query timestamps alone do not prove the remote server received the request or that data was exfiltrated.",
      "question": "What makes a DNS tunnel hypothesis stronger?",
      "answer": "Repeated unusual high-entropy labels plus related process behavior, directionality and volume outside the host baseline.",
      "command": "nslookup example.test (sample domain for local investigation only)"
    },
    {
      "id": "fm06",
      "tier": "Foundation",
      "category": "Networking",
      "title": "TLS, certificates and HTTPS visibility",
      "concept": "TLS negotiates secure communication and authenticates a server through certificates where validated correctly. Sensors may see a destination IP, SNI where available, certificate metadata, TLS version and traffic shape without seeing decrypted application content. TLS 1.3 and encrypted client hello can further reduce available metadata.",
      "sequence": [
        "Locate network flow and endpoint process",
        "Review TLS metadata available at the sensor",
        "Compare certificate issuer, lifetime and domain scope",
        "Seek proxy or server application logs",
        "State encrypted visibility limits"
      ],
      "evidence": [
        "TLS version and SNI if visible",
        "Certificate issuer and SAN names",
        "JA3/JA4-like fingerprints where collected",
        "Proxy URL and status"
      ],
      "example": "A recently registered domain using a valid public certificate is not automatically trustworthy; the certificate mainly supports encrypted transport and identity claims for a domain.",
      "pitfall": "Valid certificate does not mean a website is safe, and decryption should follow organizational authorization and privacy policy.",
      "question": "Why can a firewall allow HTTPS yet not know the full URL?",
      "answer": "The URL path is encrypted in TLS; the device needs authorized decryption or application-layer telemetry to see it.",
      "command": ""
    },
    {
      "id": "fm07",
      "tier": "Foundation",
      "category": "Networking",
      "title": "HTTP request logs and status codes",
      "concept": "HTTP requests contain method, URI, headers and bodies; server responses carry status and headers. 401 means authentication is needed or failed; 403 means access forbidden; 404 may indicate probing; 429 means rate-limited. Repeated 500s can be application errors rather than exploitation. Proxy and origin logs reveal different things.",
      "sequence": [
        "Identify user, IP, user-agent and request ID",
        "Group endpoints and methods by time",
        "Separate rejected from successful requests",
        "Correlate session or auth events",
        "Check backend activity or WAF rule details"
      ],
      "evidence": [
        "HTTP method, path and status",
        "Request ID",
        "Authentication outcome",
        "User agent, bytes and response time"
      ],
      "example": "A burst of 404s followed by one 200 on an admin route could be reconnaissance, a legitimate vulnerability scan, or automated site discovery. Cross-check the user/session and change record.",
      "pitfall": "A 200 response is not proof that an attacker obtained data; inspect response size and relevant application authorization events.",
      "question": "What distinguishes 401 from 403?",
      "answer": "401 generally requests valid authentication, while 403 rejects access regardless of whether a credential is present.",
      "command": ""
    },
    {
      "id": "fm08",
      "tier": "Foundation",
      "category": "Networking",
      "title": "IPv4 subnetting, NAT and network context",
      "concept": "CIDR prefix lengths define network membership and address space; a /24 has 256 IPv4 addresses, while /27 has 32. NAT translates addressing and can hide many clients behind a public IP. A log source after NAT may lack original client identity. Know the gateway and direction before drawing conclusions.",
      "sequence": [
        "Calculate prefix and network range",
        "Find internal source and public translated address",
        "Identify the NAT session mapping",
        "Validate zone, subnet and asset owner",
        "Correlate proxy or endpoint user context"
      ],
      "evidence": [
        "Source NAT table",
        "Firewall zones",
        "Private and public IP",
        "DHCP lease mapping"
      ],
      "example": "Three outbound connections share 198.51.100.17. They could be different clients behind one enterprise NAT; do not merge the identities.",
      "pitfall": "Do not treat 10.x or 192.168.x addresses as inherently safe: adversaries also move inside trusted networks.",
      "question": "How many total IPv4 addresses are in a /26?",
      "answer": "64 addresses: 2^(32-26); typical usable host count is 62 on a conventional subnet with network/broadcast addresses.",
      "command": ""
    },
    {
      "id": "fm09",
      "tier": "Foundation",
      "category": "Operating systems",
      "title": "Linux processes, services and permissions",
      "concept": "Linux exposes running processes through /proc and process tools; systemd manages many services; files have owner, group and mode permissions. Attackers and administrators both use shell, cron, SSH and package managers. The investigative question is whether behavior matches the expected account, service and task.",
      "sequence": [
        "Identify process user, PID and parent",
        "Review executable path and launch parameters",
        "Check service and cron context",
        "Correlate journal and auth events",
        "Preserve evidence before disrupting service"
      ],
      "evidence": [
        "journalctl and auditd if present",
        "process tree",
        "systemd unit file",
        "~/.ssh/authorized_keys changes"
      ],
      "example": "A root-owned shell spawned by an app process is suspicious on a web server. First verify a maintenance task or container runtime context, then review process ancestry and network egress.",
      "pitfall": "Linux auth logs differ between distributions and configurations; check what actually exists.",
      "question": "Which information makes an unfamiliar process more concerning?",
      "answer": "Unexpected parentage, elevated context, changed persistence, rare executable paths and outbound connections together.",
      "command": "ps -eo pid,ppid,user,comm,args --forest"
    },
    {
      "id": "fm10",
      "tier": "Foundation",
      "category": "Operating systems",
      "title": "Windows process tree and session basics",
      "concept": "Windows security telemetry records account logons, processes, services and tasks, but no single event source is complete. Parent-child process relationships show how execution started. Session IDs, logon IDs, process GUIDs and timing help separate activities that share the same username.",
      "sequence": [
        "Find process-create event and its command line",
        "Identify parent image and signer",
        "Correlate logon ID to sign-in source",
        "Inspect file writes, persistence and network events",
        "Compare the chain to approved software behavior"
      ],
      "evidence": [
        "Windows Security 4688 if enabled",
        "Sysmon 1 and 3 where configured",
        "EDR process tree",
        "Task Scheduler operational log"
      ],
      "example": "winword.exe launching powershell.exe may be suspicious, but managed Office add-ins can spawn helpers. Examine the command line, document origin, user action and child behavior.",
      "pitfall": "Process IDs can be reused; use timestamps and globally unique process identifiers where available.",
      "question": "Why is a parent-child chain valuable?",
      "answer": "It provides execution context; the same tool can be benign under an administrator and malicious when launched from an unexpected parent.",
      "command": ""
    },
    {
      "id": "fm11",
      "tier": "Foundation",
      "category": "Operating systems",
      "title": "Time zones, ingestion delay and evidence chronology",
      "concept": "A reliable investigation timeline distinguishes event time, log-ingestion time and analyst observation time. Time zones and clock drift can invert sequences. Prefer UTC for correlation, preserve original offsets and identify delayed event collection. Timeline uncertainty must be written in the case.",
      "sequence": [
        "Normalize all observed timestamps to UTC",
        "Note source clock and parser fields",
        "Measure collection delay",
        "Order events with available request/process identifiers",
        "Mark uncertainty and missing intervals"
      ],
      "evidence": [
        "EventTime and IngestTime",
        "NTP status",
        "Timezone offset",
        "Source-specific sequence ID"
      ],
      "example": "An EDR event ingested at 10:05 but recorded at 09:58 should be placed at 09:58 in the activity timeline; ingestion latency is still important context.",
      "pitfall": "Never reformat timestamp strings without checking whether their timezone is included.",
      "question": "Why might an event arrive after a later event?",
      "answer": "Buffering, network latency, connector retries, clock drift or different source-to-SIEM pipelines.",
      "command": ""
    },
    {
      "id": "fm12",
      "tier": "L1",
      "category": "SIEM workflow",
      "title": "What a SIEM does and does not do",
      "concept": "A SIEM collects and normalizes events, runs searches and detections, and supports correlation. It is not an EDR and it does not create missing evidence. Source coverage, parsing, retention, rule logic and ingestion health matter more than the size of an alerts dashboard.",
      "sequence": [
        "Check the log source and rule",
        "Validate raw events before normalized fields",
        "Verify parser and time range",
        "Join against independent identity or endpoint sources",
        "Record gaps when a field is absent"
      ],
      "evidence": [
        "Raw log and normalized schema",
        "Log-source health",
        "Retention window",
        "Detection query"
      ],
      "example": "A rule says five failed logons; all five records are the same event retried by the connector. Deduplication is part of validation.",
      "pitfall": "A blank search result is not proof that the action did not occur if the source was not collected.",
      "question": "Why is parser validation important?",
      "answer": "Incorrect field extraction can misidentify hosts, users and event severity, producing false correlations.",
      "command": ""
    },
    {
      "id": "fm13",
      "tier": "L1",
      "category": "SIEM workflow",
      "title": "Splunk SPL fundamentals",
      "concept": "SPL searches events, filters fields and summarizes results. A search should declare a narrow index or source, time range and expected field names. Commands such as stats, where and table transform results; field names vary by onboarding. Test against raw data and record whether accelerated indexes or data models are involved.",
      "sequence": [
        "Identify actual index/sourcetype",
        "Filter earliest/latest and key identifiers",
        "Summarize event count by user and source",
        "Inspect underlying raw events",
        "Verify whether missing events reflect parser issues"
      ],
      "evidence": [
        "index and sourcetype",
        "earliest/latest",
        "stats count by user",
        "event source and raw event"
      ],
      "example": "A failed-logon search groups by source IP and account to identify breadth. Confirm that failures are distinct and look for successful authentications afterward.",
      "pitfall": "Do not paste reference SPL into production without adapting data model fields, indexes, permissions and retention.",
      "question": "What does stats count by src_ip tell you?",
      "answer": "It aggregates matching events by source IP; it does not identify unique human users behind NAT or imply maliciousness.",
      "command": "index=windows EventCode=4625 earliest=-24h | stats count by Account_Name, Source_Network_Address | sort -count"
    },
    {
      "id": "fm14",
      "tier": "L1",
      "category": "SIEM workflow",
      "title": "Microsoft Sentinel KQL fundamentals",
      "concept": "KQL composes tabular operators with pipes. where filters, project selects columns, extend calculates values, summarize aggregates and join correlates tables. Use explicit time windows and verify column types. Query behavior depends on the specific tables available in the workspace.",
      "sequence": [
        "Select a real table and constrain TimeGenerated",
        "Filter event ID and scope",
        "Project only the necessary fields",
        "Summarize across a meaningful window",
        "Inspect representative rows and validate schema"
      ],
      "evidence": [
        "SecurityEvent and SigninLogs (when ingested)",
        "TimeGenerated",
        "EventID",
        "Account and IPAddress"
      ],
      "example": "A password spray query may show many targeted accounts from one source IP, but the analyst must separate corporate proxies and authorized testing.",
      "pitfall": "Use of join can duplicate rows if either side has many matching records; count distinct identifiers where appropriate.",
      "question": "How is summarize different from project?",
      "answer": "project chooses or renames columns; summarize computes grouped aggregates such as counts.",
      "command": "SecurityEvent | where TimeGenerated > ago(24h) | where EventID == 4625 | summarize Failures=count() by Account, IpAddress | top 20 by Failures desc"
    },
    {
      "id": "fm15",
      "tier": "L1",
      "category": "SIEM workflow",
      "title": "Elastic and OpenSearch queries",
      "concept": "Elastic-style platforms typically index structured documents with mappings and offer KQL-like filtering in dashboards or JSON query DSL. Exact syntax depends on product and version. Study host.name, event.code, process.command_line, and source.ip mappings before building detections.",
      "sequence": [
        "Pick time range and data view",
        "Inspect field mapping and sample documents",
        "Filter on event.category or event.code",
        "Add host/user constraints",
        "Inspect original raw message for fidelity"
      ],
      "evidence": [
        "event.code and event.action",
        "host.name and process.entity_id",
        "user.name",
        "source.ip"
      ],
      "example": "A process filter on event.code:1 may mean Sysmon process-create only if that log source was parsed with that mapping; another dataset might reuse the number.",
      "pitfall": "KQL-style dashboard filters are not the same syntax as SQL or Elasticsearch JSON DSL.",
      "question": "What is an ECS field?",
      "answer": "A common Elastic field naming convention that helps searches work across normalized data sources.",
      "command": "event.category:process and process.name:powershell.exe"
    },
    {
      "id": "fm16",
      "tier": "L1",
      "category": "Identity",
      "title": "Windows 4624, 4625 and logon types",
      "concept": "Event 4624 is a successful logon; 4625 is a failed logon. The logon type provides context: 2 interactive console, 3 network, 4 batch, 5 service, 7 unlock and 10 remote interactive. Exact event contents depend on OS policy and where auditing occurs. Failed logons can reflect old passwords, services or attacks.",
      "sequence": [
        "Group failures by account, host and originating IP",
        "Compare success after failure",
        "Check logon type and authentication package",
        "Confirm device ownership and expected service",
        "Expand to other users and time windows"
      ],
      "evidence": [
        "Security 4624 / 4625",
        "LogonType",
        "Source Network Address",
        "Account and failure status"
      ],
      "example": "Forty type-3 failures for a service account on one scheduled server may signal outdated credentials. Failures across 150 unrelated users from a single external source could suggest spraying.",
      "pitfall": "Event 4624 does not mean the user had administrator privileges or that a remote desktop desktop session occurred.",
      "question": "Why is logon type important?",
      "answer": "It distinguishes how an account authenticated; for example, type 3 network logons are not the same as type 10 RDP interactive logons.",
      "command": ""
    },
    {
      "id": "fm17",
      "tier": "L1",
      "category": "Identity",
      "title": "Kerberos authentication: TGT and service tickets",
      "concept": "Kerberos uses a Key Distribution Center to issue Ticket Granting Tickets (TGTs) and service tickets. Windows domain controllers may log 4768 for TGT activity, 4769 for service ticket requests and 4771 for pre-auth failures. Requests alone are not proof of ticket abuse; context includes encryption types, request volume, principals and target SPNs.",
      "sequence": [
        "Find the requesting user and workstation",
        "Review TGT and service ticket events",
        "Group by service/SPN and account",
        "Check source machine and encryption types where recorded",
        "Correlate service access on the target"
      ],
      "evidence": [
        "Domain controller Security 4768,4769,4771",
        "SPN and service account",
        "Client address",
        "Target logon events"
      ],
      "example": "An account requests hundreds of tickets for many rarely used SPNs. Check legitimate service discovery and maintenance scripts; compare historical baseline before investigating Kerberoasting.",
      "pitfall": "4769 does not by itself prove that a ticket hash was cracked or a service was accessed.",
      "question": "What is an SPN?",
      "answer": "A service principal name identifies a service instance in Kerberos, allowing clients to request a ticket for that service.",
      "command": ""
    },
    {
      "id": "fm18",
      "tier": "L1",
      "category": "Identity",
      "title": "Password spraying versus brute force",
      "concept": "Brute force tends to attempt many candidate passwords against one user, while spraying tries a small number of guesses against many users. Identity providers enforce different rate-limits and lockout rules; distinguish failed password events from MFA denials and non-interactive sign-ins.",
      "sequence": [
        "Count distinct accounts per source",
        "Compare failures per account",
        "Inspect repeated intervals and user agents",
        "Look for subsequent successes, token creation and MFA changes",
        "Identify approved scanners and corporate egress proxies"
      ],
      "evidence": [
        "Sign-in error code",
        "Source IP and ASN",
        "Count distinct users",
        "MFA method/result",
        "Device ID"
      ],
      "example": "One IP causes 120 failed passwords for 120 accounts and later one success from an unfamiliar device. Scope all target users and begin incident response on the successful session.",
      "pitfall": "Do not block a shared corporate proxy solely from IP aggregation without identifying originating clients.",
      "question": "Which statistic best differentiates spraying from a brute force attack?",
      "answer": "Distinct targeted user count relative to failure count and password-guess frequency.",
      "command": ""
    },
    {
      "id": "fm19",
      "tier": "L1",
      "category": "Identity",
      "title": "MFA fatigue, token theft and session hijack",
      "concept": "MFA push bombing pressures a user into approving a prompt. Session token theft can bypass new password challenges entirely until the session expires or is revoked. Strong investigation separates the original authentication from downstream token use and checks device, IP, user agent and consent events.",
      "sequence": [
        "Review push challenge history and approval",
        "Compare new device/IP/session identifiers",
        "Correlate issued tokens and privileged actions",
        "Revoke sessions following approved procedures",
        "Check other users and persistence like OAuth grants"
      ],
      "evidence": [
        "MFA challenge result",
        "Device compliance",
        "Token/session ID",
        "OAuth grants",
        "Sign-in logs"
      ],
      "example": "A user denies six pushes, approves one, and a new session reads cloud mail. Investigate both the prompted device and subsequent session behavior.",
      "pitfall": "Password reset alone may not revoke all sessions; validate platform-specific token controls and user impact.",
      "question": "Why might an MFA-protected account still be compromised?",
      "answer": "Social engineering, real-time phishing, stolen session tokens, consent abuse or recovery-flow weaknesses can defeat the intended protection.",
      "command": ""
    },
    {
      "id": "fm20",
      "tier": "L1",
      "category": "Email security",
      "title": "SPF, DKIM, DMARC and phishing headers",
      "concept": "SPF checks authorized sending infrastructure for the envelope sender; DKIM validates a signed message; DMARC aligns authenticated identities with the visible From domain and applies policy. Authentication passes do not prove a message is harmless; a compromised legitimate account can send authentic phishing.",
      "sequence": [
        "Preserve raw message and headers",
        "Inspect From, Reply-To and Return-Path",
        "Check authentication results and alignment",
        "Inspect redirect chain and attachment safely",
        "Search who else received or interacted with it"
      ],
      "evidence": [
        "Authentication-Results",
        "Envelope sender and From",
        "Received header hops",
        "URL and attachment hashes"
      ],
      "example": "A legitimate supplier domain passes DKIM but requests an urgent payment change. Confirm through trusted channels and investigate potential supplier account compromise.",
      "pitfall": "Do not treat SPF pass without DMARC alignment as proof the visible From identity is authenticated.",
      "question": "Why can a phishing email pass SPF and DKIM?",
      "answer": "The sender may control a properly configured domain or compromise a legitimate mailbox; authentication checks ownership of sending infrastructure, not intent.",
      "command": ""
    },
    {
      "id": "fm21",
      "tier": "L1",
      "category": "Endpoint",
      "title": "EDR investigation: process ancestry and command lines",
      "concept": "EDR combines process, file, module, registry and network signals. Parent process, image path, signer, command line and user context are often more informative together than a filename. Beware executable renaming, script hosts and trusted binaries used in unexpected ways.",
      "sequence": [
        "Validate process tree and parent GUID",
        "Compare signer and expected parent",
        "Inspect command flags and decoded/obfuscated scripts where authorized",
        "Correlate file writes and outbound connections",
        "Scope similar behavior across fleet"
      ],
      "evidence": [
        "Process GUID and PID",
        "Parent image",
        "CommandLine",
        "File hash",
        "Network destination"
      ],
      "example": "An Office process launches PowerShell with an encoded command and an external HTTP request. Check the decoded intent in an isolated analysis environment; do not execute the command.",
      "pitfall": "A signed binary can still be used maliciously, and a file hash alone cannot explain process behavior.",
      "question": "Which process attributes should you preserve in an escalation?",
      "answer": "Host, user, UTC time, process/parent identifiers, full command line, path, hash, signer and related network/file actions.",
      "command": ""
    },
    {
      "id": "fm22",
      "tier": "L1",
      "category": "Endpoint",
      "title": "Windows services, scheduled tasks and persistence",
      "concept": "Attackers can seek reboot persistence through services, tasks, registry run keys and startup locations; administrators use the same mechanisms. Security 4697 or System 7045 may record service installation, and task-related events vary by audit configuration. Validate change owner and associated binary before response.",
      "sequence": [
        "Find new service or scheduled task",
        "Inspect executable path and account",
        "Check signer/hash and creation context",
        "Match change ticket and software deployment",
        "Search for same artifact on other hosts"
      ],
      "evidence": [
        "System 7045",
        "Security 4697 if audited",
        "Security 4698/4702 if audited",
        "Registry and file telemetry"
      ],
      "example": "A service created under C:\\ProgramData with an uncommon binary shortly after external RDP deserves investigation, but endpoint-management deployments may look similar.",
      "pitfall": "Event 7045 records service installation; it does not alone prove that the service started or executed malicious code.",
      "question": "How do you verify a suspicious new service?",
      "answer": "Check path, signer, account, service creation context, change records, process execution and subsequent activity.",
      "command": ""
    },
    {
      "id": "fm23",
      "tier": "L1",
      "category": "Endpoint",
      "title": "Windows event IDs analysts actually use",
      "concept": "Windows auditing requires configuration and successful log forwarding. Security 4624/4625 represent logons, 4672 special privileges assigned, 4688 process create if enabled, 4720 new user, 4728/4732 privileged group additions, 4740 lockout, 4768/4769/4771 Kerberos, and 1102 Security log clearing. System 7045 reports service installation.",
      "sequence": [
        "Identify event provider and machine role",
        "Confirm event ID and subject/target fields",
        "Decode logon type or group SID",
        "Correlate related events and process context",
        "Verify auditing was enabled"
      ],
      "evidence": [
        "Event ID and provider",
        "Subject vs target account",
        "Domain controller or endpoint location",
        "Audit policy"
      ],
      "example": "A 4728 on a domain controller adding a regular account to a privileged global group should be linked to the initiating actor, ticket, and subsequent authentication.",
      "pitfall": "Never treat the same numeric Event ID as equivalent across all Windows providers.",
      "question": "What does Event 4672 tell you?",
      "answer": "A logon session received special privileges; it is common for administrative/service accounts and needs context.",
      "command": "Get-WinEvent -FilterHashtable @{LogName=\"Security\";Id=4625;StartTime=(Get-Date).AddHours(-4)} -MaxEvents 20"
    },
    {
      "id": "fm24",
      "tier": "L1",
      "category": "Incident response",
      "title": "False positive, benign true positive, malicious true positive",
      "concept": "A false positive means a detection fires without its intended behavior. A benign true positive means the behavior occurred, but it was authorized or harmless. A malicious true positive means the behavior occurred and investigation supports unauthorized intent. These classifications are crucial for tuning without blinding a rule.",
      "sequence": [
        "Confirm what the rule detects",
        "Validate that behavior in source logs",
        "Gather business authorization context",
        "Classify outcome and add reasoning",
        "Recommend targeted tuning only if warranted"
      ],
      "evidence": [
        "Rule condition and matching fields",
        "Change ticket or test schedule",
        "Peer behavior",
        "Incident disposition"
      ],
      "example": "A scheduled penetration test triggers a scanner signature. It is a true detection of scanning but may be benign within scope, not necessarily a false-positive rule.",
      "pitfall": "Disabling the rule for every scanner IP can create future blind spots; use scoped expiry and asset controls.",
      "question": "Why is an authorized red-team scan often not a false positive?",
      "answer": "The detection correctly observed scanning, but the activity may be approved; label benign true positive with evidence.",
      "command": ""
    },
    {
      "id": "fm25",
      "tier": "L1",
      "category": "Incident response",
      "title": "Escalation notes, confidence and handoffs",
      "concept": "A good handoff lets another analyst reproduce the conclusion without asking for your memory. Include affected entities, UTC timeline, exact evidence IDs, confidence and open questions. State requested action and its risk. Separate facts, interpretations and assumptions rather than presenting a hypothesis as certainty.",
      "sequence": [
        "Write one-line executive summary",
        "List affected hosts, users and earliest/latest times",
        "Cite primary log fields and pivots",
        "State confirmed versus unconfirmed impact",
        "Assign owner, priority, requested action and decision deadline"
      ],
      "evidence": [
        "Case ID and alert rule",
        "UTC timeline",
        "Raw event ID or query",
        "Evidence retention and limitations"
      ],
      "example": "Good handoff: “At 09:14 UTC account svc-build had 32 denied sign-ins, then a successful login from 203.0.113.8; device association is unknown; request identity owner validation and session review.”",
      "pitfall": "“Suspicious activity happened, please investigate” is not actionable because it omits what, where, when, evidence and next step.",
      "question": "What three things should never be omitted from a handoff?",
      "answer": "What was observed, why it matters (with uncertainty), and the precise requested next action.",
      "command": ""
    },
    {
      "id": "fm26",
      "tier": "L2",
      "category": "Investigation",
      "title": "Scope an incident using identities, hosts and time",
      "concept": "Scoping asks which principals, endpoints, services and datasets were touched. Begin with confirmed seed indicators, expand one hop at a time and distinguish observed activity from potential exposure. A user with access to 500 systems did not necessarily access all 500 during the incident.",
      "sequence": [
        "Pin earliest confirmed event and UTC range",
        "List known affected identities and endpoints",
        "Pivot on session/process GUID and network destination",
        "Expand to adjacent hosts and accounts",
        "Tag confirmed, suspected and ruled-out entities"
      ],
      "evidence": [
        "Identity sessions",
        "Process trees",
        "DNS/flow records",
        "Access logs",
        "Asset ownership"
      ],
      "example": "An initial compromised laptop communicates with an admin jump host. Next verify logon and process execution on the jump host rather than assuming lateral movement succeeded.",
      "pitfall": "Unbounded pivoting produces noise and distorts the timeline; document why every new entity entered scope.",
      "question": "How do you decide when to expand scope?",
      "answer": "Use corroborated behavior that links a new identity, endpoint, process or resource to confirmed events, while recording confidence.",
      "command": ""
    },
    {
      "id": "fm27",
      "tier": "L2",
      "category": "Investigation",
      "title": "Build an incident timeline with confidence labels",
      "concept": "A timeline should interleave authentication, process, network, cloud and response records using normalized timestamps. Link event identifiers, not just narrative summaries. Confidence labels clarify whether a fact was directly observed, inferred from correlation, or still a hypothesis.",
      "sequence": [
        "Collect and normalize source timestamps",
        "De-duplicate events and tag source/ID",
        "Connect sessions and process ancestry",
        "Identify first access, actions and last observed activity",
        "Mark evidence gaps and incident-response actions"
      ],
      "evidence": [
        "UTC timestamp, source, raw ID",
        "User and device/session IDs",
        "Process GUID",
        "Ingest latency and gaps"
      ],
      "example": "09:11 sign-in success [direct], 09:13 new mailbox rule [direct], 09:15 exfiltration [hypothesis] until mailbox access/download evidence is found.",
      "pitfall": "A missing log cannot be plotted as proof nothing occurred; mark it as missing evidence.",
      "question": "Why should a timeline include response actions?",
      "answer": "They may explain later activity and are essential for assessing containment, impact and evidence integrity.",
      "command": ""
    },
    {
      "id": "fm28",
      "tier": "L2",
      "category": "Investigation",
      "title": "Lateral movement: RDP, SMB, WinRM and service execution",
      "concept": "Lateral movement uses access to another host. RDP, SMB, WinRM and remote services are normal administrative tools, so detection relies on unexpected source, identity, process and remote activity. Network type-3 and type-10 logons provide different signals and should be interpreted with host roles.",
      "sequence": [
        "Identify initial source host and account",
        "Look for remote auth to target",
        "Check target-side process/service/task events",
        "Correlate traffic 3389,445,5985/5986 as configured",
        "Search same identity on other assets"
      ],
      "evidence": [
        "4624 type 3/10",
        "4648 explicit credentials",
        "7045 service creation",
        "Sysmon 1",
        "EDR remote process"
      ],
      "example": "An admin account authenticates from a workstation to ten servers then triggers service installation. Verify planned patching and source process before calling malicious spread.",
      "pitfall": "Port activity alone does not prove remote code execution or a successful login.",
      "question": "Why is target-side telemetry essential?",
      "answer": "It shows whether authentication led to process execution or persistence, which a source-side network flow alone cannot establish.",
      "command": ""
    },
    {
      "id": "fm29",
      "tier": "L2",
      "category": "Investigation",
      "title": "Ransomware precursor investigation",
      "concept": "Ransomware response is not limited to detecting encryption. Precursor patterns include unusual privilege use, backup tampering, defense impairment, shadow-copy changes, file-access bursts and movement. Some steps are legitimate maintenance. Evidence preservation and containment authority are urgent.",
      "sequence": [
        "Find affected endpoint and first suspicious process",
        "Correlate privilege elevation and tool execution",
        "Look for backup/service changes and access bursts",
        "Scope host/share access and critical assets",
        "Escalate containment with incident commander approval"
      ],
      "evidence": [
        "EDR process + file events",
        "Backup job and VSS logs",
        "Network share activity",
        "Identity changes"
      ],
      "example": "A backup service stops at 02:00 followed by mass rename activity on a file server. Compare backup schedule, EDR process and file-owner records before initiating host isolation.",
      "pitfall": "Isolating a production database without coordination may worsen impact; use emergency process when supported.",
      "question": "Why investigate precursor behavior?",
      "answer": "Early actions may allow containment before encryption or large-scale business disruption.",
      "command": ""
    },
    {
      "id": "fm30",
      "tier": "L2",
      "category": "Investigation",
      "title": "Phishing to identity compromise: full chain",
      "concept": "An email alert becomes an incident when evidence shows a risky interaction, credential/token compromise, or downstream account misuse. Analyze message authentication, link or attachment, click telemetry, user sign-ins, OAuth grants and mailbox activity. Keep the original message for evidentiary integrity.",
      "sequence": [
        "Identify campaign and recipient set",
        "Analyze message and URL safely",
        "Find click/attachment execution",
        "Examine identity sessions and MFA",
        "Search for mailbox rules, downloads, sharing and other affected users"
      ],
      "evidence": [
        "Mail headers and message ID",
        "URL click telemetry",
        "Sign-in events",
        "OAuth consent",
        "Mailbox audit"
      ],
      "example": "A user clicks an impersonated sign-in page, then a new session from an untrusted device creates forwarding rules. Revoke sessions under policy and assess whether data left.",
      "pitfall": "A click event alone does not prove a user submitted credentials; correlating follow-on access changes confidence.",
      "question": "What logs prove downstream mailbox abuse?",
      "answer": "Mailbox audit operations for reads, rule changes, sharing, downloads or forwarding, tied to identity sessions where available.",
      "command": ""
    },
    {
      "id": "fm31",
      "tier": "L2",
      "category": "Investigation",
      "title": "Cloud identity and risky role changes",
      "concept": "Cloud providers have distinct identity models, but the question is similar: who granted which privilege to whom, from where, and why? AWS CloudTrail, Azure activity/sign-in logs and GCP Cloud Audit Logs expose different semantics and coverage. Administrative API success is not proof the new privilege was used.",
      "sequence": [
        "Find the role or policy modification",
        "Identify actor/session and source context",
        "Review before/after permissions and resource scope",
        "Check subsequent access or key creation",
        "Assess cross-account or service-principal trust changes"
      ],
      "evidence": [
        "Cloud admin API event",
        "Actor principal ARN/object ID",
        "Role policy JSON",
        "Source IP/user agent",
        "Resource audit"
      ],
      "example": "An AWS principal adds a wildcard policy to a rarely used role, then lists secret stores. Confirm the permission change, assumed-role session and actual read events before final scope.",
      "pitfall": "Cloud audit logging can omit data-plane events by configuration; inventory enabled event types before concluding none occurred.",
      "question": "What does an AWS AssumeRole event mean?",
      "answer": "A principal requested a temporary session under a role; verify trust policy, resulting session and subsequent actions to establish risk.",
      "command": ""
    },
    {
      "id": "fm32",
      "tier": "L2",
      "category": "Investigation",
      "title": "OAuth consent, refresh tokens and persistence",
      "concept": "OAuth grants allow third-party applications delegated or application permissions; a dangerous grant can persist beyond a password change. Investigate who consented, app publisher, scope, token age, tenant policies and activity. Revoke grants and refresh sessions according to the identity platform’s approved processes.",
      "sequence": [
        "Identify application/client ID and grant",
        "Examine requested scopes and consent authority",
        "Link identity sign-ins and token use",
        "Inspect access to mail/files/graph APIs",
        "Revoke and scope all affected users"
      ],
      "evidence": [
        "Consent audit",
        "App registration",
        "Delegated/app scopes",
        "Token sign-ins",
        "Resource access logs"
      ],
      "example": "An unfamiliar application receives Mail.Read and offline_access permissions. Even without credential theft, the grant may enable ongoing mailbox access; verify actual use.",
      "pitfall": "Not every unknown app is malicious; validate owner, business justification and tenancy before disruption.",
      "question": "Why is password reset not sufficient for OAuth consent abuse?",
      "answer": "The malicious or risky app grant and refresh-token paths may survive until separately revoked.",
      "command": ""
    },
    {
      "id": "fm33",
      "tier": "L2",
      "category": "Investigation",
      "title": "Linux SSH access and privilege escalation",
      "concept": "Linux login traces may appear in journald, auth.log, secure, auditd or provider audit. SSH success must be tied to the source, authorized key, account and subsequent shell behavior. sudo and setuid changes can indicate privilege escalation but are also normal administration.",
      "sequence": [
        "Identify successful sshd authentication",
        "Verify account and public-key fingerprint if recorded",
        "Correlate shell and sudo commands",
        "Inspect authorized_keys and cron/systemd changes",
        "Review related outbound traffic"
      ],
      "evidence": [
        "SSHD logs",
        "sudo event and tty",
        "auditd execve",
        "~/.ssh/authorized_keys metadata"
      ],
      "example": "An unfamiliar SSH key appears in a service account, followed by sudo to root and an external curl download. Validate key enrollment and change approval.",
      "pitfall": "No sudo message does not mean root was never obtained; logging configuration and alternate methods matter.",
      "question": "How do you check whether an SSH login led to privilege escalation?",
      "answer": "Correlate session ID, sudo/audit records, process identity and root-owned changes following login.",
      "command": "journalctl -u ssh --since \"2 hours ago\"  # service name may be sshd"
    },
    {
      "id": "fm34",
      "tier": "L2",
      "category": "Investigation",
      "title": "Container and Kubernetes threat signals",
      "concept": "Kubernetes relies on API authorization and service accounts. The cluster audit log can show user/service-account identity, verb, resource, namespace and response status. Security incidents can involve privileged pod creation, exec into pods, secret reading or RBAC changes. Logging and admission controls vary by cluster.",
      "sequence": [
        "Identify actor/service account and namespace",
        "Inspect API verb, resource and status",
        "Compare RBAC grants and workload spec",
        "Examine pod process and network activity",
        "Scope secret access and linked cloud identity"
      ],
      "evidence": [
        "Kubernetes audit policy and API logs",
        "RBAC RoleBinding changes",
        "Pod spec securityContext",
        "Container runtime events"
      ],
      "example": "A service account in a staging namespace gains cluster-admin and creates a hostPath pod. Verify deployment automation versus anomalous permissions and host access.",
      "pitfall": "An API request rejected with 403 does not mean the requested action succeeded.",
      "question": "What does kubectl exec imply in audit data?",
      "answer": "A request to execute in a container; success, user, image and process behavior must be verified in context.",
      "command": ""
    },
    {
      "id": "fm35",
      "tier": "L2",
      "category": "Investigation",
      "title": "Data exfiltration: establish proof and limits",
      "concept": "Exfiltration is a claim about outbound transfer of information, not merely a large connection. Correlate resource access, staging, identity and egress logs. Proxy byte counts can include uploads and downloads depending on vendor definitions. Understand whether cloud data-access events were enabled.",
      "sequence": [
        "Identify sensitive data source and access events",
        "Review staging/archive activity",
        "Resolve network direction and byte semantics",
        "Correlate destination/domain and actual object download or upload",
        "Quantify observed, possible and unknown data scope"
      ],
      "evidence": [
        "File access audit",
        "DLP alert and policy",
        "Proxy/firewall bytes",
        "Cloud object access logs",
        "DNS destination"
      ],
      "example": "An admin host sends 4 GB to a new external domain after bulk document reads. Investigate authorized backup/export and check whether the transfer completed.",
      "pitfall": "Large outbound bytes alone are not definitive proof of data theft; distinguish traffic type and payload.",
      "question": "How would you phrase uncertain exfiltration impact?",
      "answer": "“Observed bulk read of N objects and outbound transfer to destination X; content and completion unverified pending DLP/proxy evidence.”",
      "command": ""
    },
    {
      "id": "fm36",
      "tier": "L2",
      "category": "Incident response",
      "title": "NIST SP 800-61 Rev.3: response within risk management",
      "concept": "NIST SP 800-61 Revision 3 (April 2025) supersedes Revision 2 and aligns incident response across the CSF 2.0 functions. Governance, identification and protection support preparedness; detection, response and recovery involve operations. A SOC still needs organization-specific triage, containment authority and crisis communications.",
      "sequence": [
        "Prepare roles, logging and decisions before incidents",
        "Detect and analyze evidence",
        "Coordinate authorized containment and eradication",
        "Restore services and validate normal operation",
        "Feed lessons learned back into risk controls and detections"
      ],
      "evidence": [
        "Incident commander and decision logs",
        "Technical evidence",
        "Containment approval",
        "Recovery validation",
        "After-action review"
      ],
      "example": "An administrator credential compromise triggers session revocation, privilege review, scoped access investigation and recovery validation rather than just marking an alert resolved.",
      "pitfall": "Do not cite old Revision 2 phases as if they were the exact structure of Revision 3; policies may map activities differently.",
      "question": "What changed in NIST 800-61 Revision 3?",
      "answer": "It integrates incident response guidance into broader organizational cybersecurity risk management using CSF 2.0, rather than treating response as an isolated cycle.",
      "command": ""
    },
    {
      "id": "fm37",
      "tier": "L2",
      "category": "Incident response",
      "title": "Containment decision: isolate, block, revoke or observe",
      "concept": "Containment actions have different blast radius and evidence implications. Host isolation, account disablement, token revocation, firewall blocks and process termination can disrupt critical services or tip off an attacker. The correct decision balances active harm, confidence, business dependencies and authority.",
      "sequence": [
        "Confirm active harm and impacted systems",
        "Choose reversible or targeted control if possible",
        "Get emergency approval or invoke authority",
        "Record exact change, time and expected side effects",
        "Monitor for adversary movement and restoration conditions"
      ],
      "evidence": [
        "Approved incident playbook",
        "Business service dependencies",
        "Active session list",
        "Change/audit log",
        "Validation evidence"
      ],
      "example": "A compromised API key is actively used to list secrets. Rotate/revoke the key with cloud owner coordination and verify rejected follow-up requests.",
      "pitfall": "Quarantining a host containing the only copy of fragile evidence may complicate forensic preservation; coordinate acquisition when time permits.",
      "question": "What should you do immediately after containment?",
      "answer": "Verify the control took effect, check for alternate access, document side effects and maintain monitoring.",
      "command": ""
    },
    {
      "id": "fm38",
      "tier": "L2",
      "category": "Incident response",
      "title": "Evidence handling and chain of custody",
      "concept": "Investigations must preserve original log context, acquisition timestamps, hashing and who handled evidence. Hashes establish integrity comparisons, not source authenticity. In some environments formal forensic procedures, legal holds and retention policies control what may be collected and where it can be stored.",
      "sequence": [
        "Define scope and collection authority",
        "Acquire original artifact without unnecessary modification",
        "Record source, collector, UTC time and method",
        "Calculate and store cryptographic hash",
        "Restrict access and document transfer/analysis"
      ],
      "evidence": [
        "Original log export",
        "SHA-256 digest",
        "Case and evidence ID",
        "Custodian/access ledger"
      ],
      "example": "An exported EDR triage bundle is stored read-only, hashed and linked to the case record before a copy is used for analysis.",
      "pitfall": "Do not upload sensitive real incident artifacts to an unapproved personal account or public malware scanner.",
      "question": "Does a matching SHA-256 prove evidence is authentic?",
      "answer": "It supports that two byte sequences match; provenance and chain-of-custody records establish the surrounding authenticity story.",
      "command": "sha256sum evidence.bin  # read-only local copy"
    },
    {
      "id": "fm39",
      "tier": "L3",
      "category": "Threat hunting",
      "title": "Build a falsifiable hunting hypothesis",
      "concept": "Threat hunting begins with an explicit proposition based on a threat, environment weakness or telemetry anomaly. A useful hypothesis identifies behavior, expected data sources, population, time range and disconfirming evidence. Finding nothing is meaningful only when logging and coverage are known.",
      "sequence": [
        "State attacker behavior and target assets",
        "Map expected telemetry and ATT&CK technique",
        "Design population and time window",
        "Query and inspect counterexamples",
        "Document result, detection gap and next hypothesis"
      ],
      "evidence": [
        "Hypothesis ID",
        "Data inventory/health",
        "Query results and counterexamples",
        "ATT&CK mapping"
      ],
      "example": "Hypothesis: a compromised build account launched remote processes on servers outside deployment windows. Query account+target process data, then compare the legitimate CI schedule.",
      "pitfall": "Hunting every event with “powershell” in it is a keyword search, not a falsifiable hypothesis.",
      "question": "What makes a negative hunt credible?",
      "answer": "Validated data-source coverage, correctly scoped query, tested expectations and a clear statement of remaining blind spots.",
      "command": ""
    },
    {
      "id": "fm40",
      "tier": "L3",
      "category": "Threat hunting",
      "title": "Threat intelligence: IOC, TTP and confidence",
      "concept": "An IP, domain or hash is an indicator of possible compromise, but indicators expire and can be shared by many legitimate services. Tactics and techniques describe behavior and may persist longer than one IOC. Evaluate source reliability, collection date, false-positive potential and relevance to your environment.",
      "sequence": [
        "Capture indicator with original context and first/last seen",
        "Check validity date and confidence",
        "Search internal exposure with bounded scope",
        "Correlate behavioral evidence",
        "Add expiry and review to block/detection decision"
      ],
      "evidence": [
        "Indicator type and sighting time",
        "Source confidence",
        "Behavioral ATT&CK mapping",
        "Asset matches"
      ],
      "example": "A cloud CDN IP appears in a blocklist from years ago. Search host/path/certificate context before assuming every connection is malicious.",
      "pitfall": "Never automatically block a public cloud IP solely because one historical report associated it with malware.",
      "question": "What is the advantage of TTP-based detection?",
      "answer": "It targets attacker behavior that is harder to change than one hash or IP, though context and tuning still matter.",
      "command": ""
    },
    {
      "id": "fm41",
      "tier": "L3",
      "category": "Detection engineering",
      "title": "From hypothesis to detection rule",
      "concept": "Detection engineering converts a behavioral hypothesis into observable fields and a tested rule. Define required log sources, expected benign volume, selection criteria, unit tests, ownership and a review schedule. Plan whether the alert generates actionable evidence or merely duplicates another signal.",
      "sequence": [
        "Specify hypothesis and threat behavior",
        "Inventory available fields and parser limits",
        "Build baseline and candidate rule",
        "Test known malicious-like and benign samples",
        "Set severity, runbook, owner, suppression and monitoring"
      ],
      "evidence": [
        "Rule version and test dataset",
        "Required source schema",
        "Coverage/time window",
        "False-positive measurements",
        "Alert sample"
      ],
      "example": "Rule: flag Office spawning a script interpreter with unusual network egress, but exclude approved signed automation only after documenting the reason.",
      "pitfall": "Generic global exclusions can suppress real malicious use of trusted admin tools.",
      "question": "What makes a detection production-ready?",
      "answer": "It has validated telemetry, tested positive/negative cases, a response owner, expected alert volume and a review process.",
      "command": ""
    },
    {
      "id": "fm42",
      "tier": "L3",
      "category": "Detection engineering",
      "title": "Sigma and cross-SIEM portability",
      "concept": "Sigma is a vendor-agnostic detection rule format describing logsource, selections, conditions and metadata. Translation to SPL or KQL may lose fidelity if the target schema differs. Rules should be verified against representative events in the actual SIEM before deployment.",
      "sequence": [
        "Define logsource category/product",
        "Write selections and condition",
        "Add ATT&CK tags and false positives",
        "Translate to target query language",
        "Test raw events, parser and noisy populations"
      ],
      "evidence": [
        "Sigma title/id and tags",
        "logsource",
        "detection selection",
        "condition",
        "Field mapping"
      ],
      "example": "A Sigma selection for Image|endswith: powershell.exe may need a process.name or NewProcessName mapping depending on the log source.",
      "pitfall": "Converting a Sigma YAML file to a query does not validate field existence or performance in production.",
      "question": "Why can a translated detection fail silently?",
      "answer": "Field mappings, case sensitivity, time windows, or missing source telemetry can cause the query not to match expected events.",
      "command": ""
    },
    {
      "id": "fm43",
      "tier": "L3",
      "category": "Detection engineering",
      "title": "Detection quality: precision, recall and feedback",
      "concept": "Precision asks how many alerts were actionable; recall asks how much relevant malicious behavior a detector catches. In practice recall requires controlled test data or a proxy estimate because unknown attacks are not countable. Alert fatigue, detection latency and analyst effort are operational quality metrics.",
      "sequence": [
        "Define ground-truth test set and limits",
        "Measure TP, FP, FN and alert rate",
        "Compute precision and available recall estimate",
        "Analyze false positives by cause",
        "Tune narrowly and retest on a holdout set"
      ],
      "evidence": [
        "TP/FP/FN",
        "Time to detect",
        "Alert count per shift",
        "Tuning change log",
        "Test fixtures"
      ],
      "example": "80 actionable alerts out of 100 fired gives precision 80%; it does not tell you how many attacks the detector missed.",
      "pitfall": "Do not report recall as 100% from a set containing only known positive fixtures.",
      "question": "How do you calculate precision?",
      "answer": "TP / (TP + FP), where TP and FP definitions must be grounded in reviewed cases.",
      "command": ""
    },
    {
      "id": "fm44",
      "tier": "L3",
      "category": "Detection engineering",
      "title": "Telemetry gaps and silent failure",
      "concept": "Sensors, connectors, parsers, retention rules, storage permissions and queries can all silently fail. Monitor event volume, last-seen time, parsing-error rate and schema drift. A green ingestion connector does not guarantee coverage on every endpoint or cloud region.",
      "sequence": [
        "Inventory expected assets and event types",
        "Monitor last-seen and rate by source",
        "Validate sample event fields",
        "Run synthetic tests of known safe behavior",
        "Raise coverage incidents when required evidence is missing"
      ],
      "evidence": [
        "Heartbeat and connector status",
        "Event count trends",
        "Parser errors",
        "Asset inventory reconciliation",
        "Source retention"
      ],
      "example": "A Windows service telemetry rule produces zero alerts because Sysmon process creation stopped forwarding from half the fleet. The correct fix is ingestion, not rewriting the detection.",
      "pitfall": "“No alerts today” can mean either good security or broken visibility.",
      "question": "How can you detect logging pipeline regression?",
      "answer": "Baseline event volume and last-seen by sensor, compare against inventory and perform known benign test events.",
      "command": ""
    },
    {
      "id": "fm45",
      "tier": "L3",
      "category": "Detection engineering",
      "title": "Purple-team validation and safe emulation",
      "concept": "Purple teaming turns an attack-technique hypothesis into bounded tests observed by defenders. Validate authorized scope, test accounts, rollback, expected event IDs and safety controls before running anything. The goal is to prove telemetry and response behavior, not merely to execute an attack tool.",
      "sequence": [
        "Agree objective, assets and approval",
        "Map technique to expected sensor signals",
        "Execute a non-destructive controlled test",
        "Measure whether SIEM/EDR detected the sequence",
        "Record blind spots, improvements and rerun"
      ],
      "evidence": [
        "Approved test plan",
        "Expected event IDs",
        "SIEM alert ID",
        "Timeline",
        "Rollback record"
      ],
      "example": "A permitted scripted service creation on a lab VM tests that System 7045 reaches the SIEM and triggers the intended rule; remove the service afterward.",
      "pitfall": "Never test on production without written authorization and impact/rollback planning.",
      "question": "What is a successful purple-team outcome?",
      "answer": "An evidence-backed mapping of observed or missing telemetry, response performance and improvements validated by a rerun.",
      "command": ""
    },
    {
      "id": "fm46",
      "tier": "L3",
      "category": "Cloud security",
      "title": "AWS CloudTrail coverage and correlation",
      "concept": "CloudTrail records AWS API activity such as authentication-related actions, resource management and selected data events when configured. Management events are not equivalent to all object reads. Regional settings, organization trails, event history and lake retention affect visibility.",
      "sequence": [
        "Check trail scope and enabled event types",
        "Find principal, session and eventName",
        "Correlate source IP, user agent and request parameters",
        "Validate response error or success",
        "Pivot to affected resource data events and policy changes"
      ],
      "evidence": [
        "CloudTrail eventTime/eventName",
        "userIdentity",
        "sourceIPAddress",
        "requestParameters",
        "errorCode"
      ],
      "example": "An unusual PutBucketPolicy is followed by GetObject attempts. Only data-event coverage can support which objects were actually accessed.",
      "pitfall": "Absence of a GetObject event may reflect disabled data-event logging rather than no access.",
      "question": "What is the difference between management and data events?",
      "answer": "Management events describe control-plane changes; data events capture selected resource-level operations when enabled.",
      "command": ""
    },
    {
      "id": "fm47",
      "tier": "L3",
      "category": "Cloud security",
      "title": "Azure/Microsoft Entra sign-in and audit correlation",
      "concept": "Identity logs show interactive and non-interactive sign-ins, device and Conditional Access details. Audit events can show group additions, app grants and policy changes. Authentication success, token issuance and downstream resource usage may be separate records; follow user and correlation identifiers.",
      "sequence": [
        "Find actor/user and sign-in context",
        "Review device and Conditional Access outcomes",
        "Correlate app/tenant and session ID",
        "Inspect audit changes and token use",
        "Scope mail/storage access where audit coverage exists"
      ],
      "evidence": [
        "SigninLogs and NonInteractiveUserSignInLogs",
        "AuditLogs",
        "Risk events",
        "CorrelationId",
        "DeviceDetail"
      ],
      "example": "A new service principal credential is registered after suspicious admin sign-in. Review app ownership, privilege grants and subsequent token issuance.",
      "pitfall": "Geo-IP location estimates are approximate and VPN/proxy locations can mislead; require multiple signals.",
      "question": "Why check non-interactive sign-ins?",
      "answer": "Token refresh and automated access may occur without a fresh user-driven sign-in prompt.",
      "command": ""
    },
    {
      "id": "fm48",
      "tier": "L3",
      "category": "Cloud security",
      "title": "GCP audit logs and IAM role scope",
      "concept": "GCP uses project, folder and organization IAM policies. Cloud Audit Logs include Admin Activity and selected Data Access events, with differing default collection and cost semantics. Service account key creation, impersonation and broad role grants are high-value investigative pivots.",
      "sequence": [
        "Find project/folder/organization scope",
        "Inspect protoPayload principalEmail and methodName",
        "Check permission changes and actor identity",
        "Review service-account token and key events",
        "Validate Data Access coverage and affected resources"
      ],
      "evidence": [
        "Cloud Audit Logs protoPayload",
        "IAM policy delta",
        "service account impersonation",
        "Cloud Storage object logs"
      ],
      "example": "A service account gains storage.admin on a production project. Compare the change with deployment automation and determine whether object access occurred.",
      "pitfall": "A project IAM view may omit inherited folder/org privileges, so examine hierarchy and effective access.",
      "question": "Why can a service account be risky without a user password?",
      "answer": "Its keys or delegated tokens can be abused to call APIs with whatever roles the account has.",
      "command": ""
    },
    {
      "id": "fm49",
      "tier": "L3",
      "category": "Cloud security",
      "title": "Kubernetes audit and RBAC drift",
      "concept": "Kubernetes RBAC bindings can escalate a service account from namespace-scoped access to cluster-wide privileges. The audit pipeline, API server rules and admission events are separate signal types. Investigate resource verbs, affected namespaces, requester identity and resulting pod specifications.",
      "sequence": [
        "Find binding or role modification",
        "Identify requester and impersonation context",
        "Compute effective permissions",
        "Locate pod create/exec and secrets reads",
        "Review linked cloud permissions and runtime behavior"
      ],
      "evidence": [
        "audit event verb/responseStatus",
        "user.username",
        "resource/namespace",
        "RoleBinding subject",
        "pod securityContext"
      ],
      "example": "A deployment controller unexpectedly binds a workload service account to cluster-admin then launches a pod with host networking. Compare declared CI manifests and pipeline identity.",
      "pitfall": "A successful RBAC change is not proof that the permissions were exercised.",
      "question": "Why is service-account identity important?",
      "answer": "Workloads often authenticate to the API through service accounts; the grant and API actions may occur without a human sign-in.",
      "command": ""
    },
    {
      "id": "fm50",
      "tier": "L3",
      "category": "Governance",
      "title": "Evidence, retention and privacy in SOC work",
      "concept": "Log retention, access controls and evidence handling are both security and governance concerns. More collection is not always better: sensitive data can create privacy and operational risk. Set lawful purpose, role-based access, retention schedules and secure exports, and minimize exposure in tickets.",
      "sequence": [
        "Classify log sensitivity and purpose",
        "Define retention and authorized access",
        "Redact secrets from routine tickets",
        "Preserve incident evidence under legal/policy hold",
        "Record deletion/export and review access"
      ],
      "evidence": [
        "Data classification",
        "Retention configuration",
        "RBAC audit",
        "Evidence access journal",
        "Legal hold"
      ],
      "example": "An analyst copies full authentication tokens into a ticket while investigating suspicious sign-ins; the correct practice is to record token identifiers and secure artifact references instead.",
      "pitfall": "Never paste live credentials, bearer tokens, private keys or personal information into public repositories or training games.",
      "question": "Why should SOC notes avoid secrets?",
      "answer": "Tickets may be widely accessible and retained; include only necessary identifiers and store sensitive artifacts in approved secure systems.",
      "command": ""
    },
    {
      "id": "fm51",
      "tier": "L3",
      "category": "Governance",
      "title": "Metrics that matter: MTTD, MTTR and quality",
      "concept": "Mean time to detect and mean time to respond summarize operational behavior but can be distorted by outliers and inconsistent start clocks. Also measure false-positive workload, coverage, case completeness and containment validation. Segment by severity and incident type rather than comparing unrelated cases.",
      "sequence": [
        "Define start/end timestamp semantics",
        "Separate detections from confirmed incidents",
        "Calculate percentile and mean times",
        "Audit note completeness and detection health",
        "Review trends with team and improve bottlenecks"
      ],
      "evidence": [
        "Detection time",
        "Incident confirmation time",
        "Containment time",
        "Severity labels",
        "QA findings"
      ],
      "example": "Two severe incidents take 15 minutes and 12 hours to contain; the mean hides the wide distribution, so report median/percentiles and explain constraints.",
      "pitfall": "Faster closure is not always better if cases are closed without evidence or risk acceptance.",
      "question": "Why is MTTR ambiguous without a definition?",
      "answer": "Organizations may mean mean time to respond, remediate or recover; define the clock and population.",
      "command": ""
    }
  ],
  "references": [
    {
      "group": "Windows Security",
      "key": "4624",
      "label": "Successful logon",
      "meaning": "Authentication success with logon type and account context",
      "pivot": "Link Logon ID, IP, host and process",
      "limit": "Does not prove privilege or intent"
    },
    {
      "group": "Windows Security",
      "key": "4625",
      "label": "Failed logon",
      "meaning": "Authentication failed on the reporting Windows system",
      "pivot": "Group Status/SubStatus, user, source and type",
      "limit": "May be stale service credentials"
    },
    {
      "group": "Windows Security",
      "key": "4634",
      "label": "Logoff",
      "meaning": "A logged-on session ends",
      "pivot": "Compare Logon ID to session start",
      "limit": "Does not guarantee network tokens expired"
    },
    {
      "group": "Windows Security",
      "key": "4648",
      "label": "Explicit credentials",
      "meaning": "A process attempted sign-in using explicitly provided credentials",
      "pivot": "Check process and destination",
      "limit": "Legitimate admin and service tools generate this"
    },
    {
      "group": "Windows Security",
      "key": "4672",
      "label": "Special privileges",
      "meaning": "Sensitive privileges assigned to a new session",
      "pivot": "Correlate 4624 and account role",
      "limit": "Common for administrators and services"
    },
    {
      "group": "Windows Security",
      "key": "4688",
      "label": "Process creation",
      "meaning": "New process event if auditing is enabled",
      "pivot": "Inspect parent, command line and user",
      "limit": "Command line collection depends on policy"
    },
    {
      "group": "Windows Security",
      "key": "4697",
      "label": "Service installed",
      "meaning": "New service installed when audit setting produces this event",
      "pivot": "Confirm service binary and actor",
      "limit": "System 7045 is another source"
    },
    {
      "group": "Windows Security",
      "key": "4698",
      "label": "Scheduled task created",
      "meaning": "New task created when corresponding auditing is enabled",
      "pivot": "Inspect TaskName and TaskContent",
      "limit": "Normal software deployment uses tasks"
    },
    {
      "group": "Windows Security",
      "key": "4702",
      "label": "Scheduled task updated",
      "meaning": "Existing task changed",
      "pivot": "Compare previous task definition and actor",
      "limit": "Audit policy may omit events"
    },
    {
      "group": "Windows Security",
      "key": "4719",
      "label": "Audit policy change",
      "meaning": "Windows audit policy configuration changed",
      "pivot": "Check actor, host and baseline",
      "limit": "Group Policy can cause authorized changes"
    },
    {
      "group": "Windows Security",
      "key": "4720",
      "label": "User account created",
      "meaning": "New local or domain user account created",
      "pivot": "Find creator and subsequent group assignment",
      "limit": "Check account location/provider"
    },
    {
      "group": "Windows Security",
      "key": "4722",
      "label": "User account enabled",
      "meaning": "An existing account was enabled",
      "pivot": "Link approval and subsequent logon",
      "limit": "Often legitimate account lifecycle"
    },
    {
      "group": "Windows Security",
      "key": "4723",
      "label": "Password change attempt",
      "meaning": "A user attempted to change own password",
      "pivot": "Inspect actor and success/failure",
      "limit": "Not automatically suspicious"
    },
    {
      "group": "Windows Security",
      "key": "4724",
      "label": "Password reset attempt",
      "meaning": "An account attempted to reset another account password",
      "pivot": "Check target, actor and authorization",
      "limit": "Admin and helpdesk use this"
    },
    {
      "group": "Windows Security",
      "key": "4726",
      "label": "User account deleted",
      "meaning": "An account was deleted",
      "pivot": "Link lifecycle ticket and other events",
      "limit": "Does not prove no backups or other identities"
    },
    {
      "group": "Windows Security",
      "key": "4728",
      "label": "Member added to global group",
      "meaning": "Account added to a security-enabled global group",
      "pivot": "Inspect sensitive group and actor",
      "limit": "Privileges depend on group meaning"
    },
    {
      "group": "Windows Security",
      "key": "4732",
      "label": "Member added to local group",
      "meaning": "Account added to a security-enabled local group",
      "pivot": "Check local Administrators and remote origin",
      "limit": "Not every group is privileged"
    },
    {
      "group": "Windows Security",
      "key": "4738",
      "label": "User account changed",
      "meaning": "An account attribute was modified",
      "pivot": "Inspect change detail and correlation",
      "limit": "May be routine directory maintenance"
    },
    {
      "group": "Windows Security",
      "key": "4740",
      "label": "Account locked",
      "meaning": "Account lockout triggered",
      "pivot": "Correlate recent 4625 activity and caller computer",
      "limit": "Can be stale password/service"
    },
    {
      "group": "Windows Security",
      "key": "4768",
      "label": "Kerberos TGT requested",
      "meaning": "Ticket Granting Ticket request from DC perspective",
      "pivot": "Inspect user, client and encryption",
      "limit": "Successful request not compromise"
    },
    {
      "group": "Windows Security",
      "key": "4769",
      "label": "Kerberos service ticket",
      "meaning": "Ticket request for an SPN",
      "pivot": "Group by SPN and client, check subsequent access",
      "limit": "Request alone not Kerberoasting proof"
    },
    {
      "group": "Windows Security",
      "key": "4771",
      "label": "Kerberos preauthentication failed",
      "meaning": "Preauth failed on a domain controller",
      "pivot": "Check failure code and source",
      "limit": "Time skew/expired passwords possible"
    },
    {
      "group": "Windows Security",
      "key": "4776",
      "label": "NTLM authentication validation",
      "meaning": "DC validates NTLM credentials",
      "pivot": "Check workstation and NTLM usage",
      "limit": "DC-side context differs from endpoint"
    },
    {
      "group": "Windows Security",
      "key": "1102",
      "label": "Security audit log cleared",
      "meaning": "Security event log was cleared",
      "pivot": "Investigate actor and previous events",
      "limit": "May be approved maintenance"
    },
    {
      "group": "System / Sysmon",
      "key": "7045",
      "label": "Service installed",
      "meaning": "Windows System Service Control Manager recorded installation",
      "pivot": "Check executable path, account and install context",
      "limit": "Does not itself prove malicious execution"
    },
    {
      "group": "System / Sysmon",
      "key": "1",
      "label": "Process Create",
      "meaning": "Sysmon process creation with GUID, image and command line",
      "pivot": "Correlate parent GUID and file hashes",
      "limit": "Depends on Sysmon configuration"
    },
    {
      "group": "System / Sysmon",
      "key": "3",
      "label": "Network connection",
      "meaning": "Sysmon network connection when enabled",
      "pivot": "Link ProcessGuid to destination",
      "limit": "No packet payload, can be high volume"
    },
    {
      "group": "System / Sysmon",
      "key": "7",
      "label": "Image loaded",
      "meaning": "Sysmon module/image load telemetry",
      "pivot": "Check module path and signature",
      "limit": "Often disabled due to volume"
    },
    {
      "group": "System / Sysmon",
      "key": "8",
      "label": "CreateRemoteThread",
      "meaning": "Sysmon thread creation in another process",
      "pivot": "Inspect source/target and context",
      "limit": "Can be used by benign tools"
    },
    {
      "group": "System / Sysmon",
      "key": "10",
      "label": "Process access",
      "meaning": "Sysmon process access request",
      "pivot": "Check accessed process and granted rights",
      "limit": "Not proof of credential dump"
    },
    {
      "group": "System / Sysmon",
      "key": "11",
      "label": "File create",
      "meaning": "Sysmon file created by process",
      "pivot": "Check directory, hash and parent process",
      "limit": "Not all file activity appears"
    },
    {
      "group": "System / Sysmon",
      "key": "12/13/14",
      "label": "Registry actions",
      "meaning": "Sysmon registry create/set/rename",
      "pivot": "Inspect persistence paths and actor",
      "limit": "Enable matching rules and scope"
    },
    {
      "group": "System / Sysmon",
      "key": "15",
      "label": "FileCreateStreamHash",
      "meaning": "Alternate data stream hash telemetry",
      "pivot": "Review origin and file path",
      "limit": "Coverage is configuration-dependent"
    },
    {
      "group": "System / Sysmon",
      "key": "22",
      "label": "DNS query",
      "meaning": "Sysmon DNS query by process",
      "pivot": "Link process and subsequent network flows",
      "limit": "Query is not proof of connection"
    },
    {
      "group": "System / Sysmon",
      "key": "23/26",
      "label": "File deletion",
      "meaning": "Sysmon file delete event modes",
      "pivot": "Inspect deleted file and process",
      "limit": "Differs by Sysmon configuration"
    },
    {
      "group": "Network ports",
      "key": "22/TCP",
      "label": "SSH",
      "meaning": "Remote encrypted command/session access",
      "pivot": "Correlate sshd log and source identity",
      "limit": "Port can be changed"
    },
    {
      "group": "Network ports",
      "key": "25/TCP",
      "label": "SMTP",
      "meaning": "Server-to-server mail transport",
      "pivot": "Correlate mail relay and sender",
      "limit": "May use STARTTLS"
    },
    {
      "group": "Network ports",
      "key": "53/UDP,TCP",
      "label": "DNS",
      "meaning": "Resolver lookups and TCP fallback/zone transfers",
      "pivot": "Query names and process attribution",
      "limit": "DNS can use DoH/DoT on other ports"
    },
    {
      "group": "Network ports",
      "key": "67-68/UDP",
      "label": "DHCP",
      "meaning": "Dynamic IPv4 address leasing",
      "pivot": "Correlate lease and MAC/hostname",
      "limit": "Leases expire or rotate"
    },
    {
      "group": "Network ports",
      "key": "80/TCP",
      "label": "HTTP",
      "meaning": "Unencrypted web traffic by convention",
      "pivot": "Review proxy and server logs",
      "limit": "May redirect to HTTPS"
    },
    {
      "group": "Network ports",
      "key": "88/TCP,UDP",
      "label": "Kerberos",
      "meaning": "AD Kerberos authentication services",
      "pivot": "Domain controller event IDs",
      "limit": "Usage depends on domain design"
    },
    {
      "group": "Network ports",
      "key": "123/UDP",
      "label": "NTP",
      "meaning": "Clock synchronization",
      "pivot": "Find time drift anomalies",
      "limit": "Some environments use alternate time sync"
    },
    {
      "group": "Network ports",
      "key": "135/TCP",
      "label": "RPC Endpoint Mapper",
      "meaning": "Windows RPC service discovery",
      "pivot": "Check remote admin context",
      "limit": "Many Windows services depend on RPC"
    },
    {
      "group": "Network ports",
      "key": "137-139",
      "label": "NetBIOS",
      "meaning": "Legacy SMB naming/session protocols",
      "pivot": "Check lateral access patterns",
      "limit": "Not universal in modern networks"
    },
    {
      "group": "Network ports",
      "key": "389/TCP,UDP",
      "label": "LDAP",
      "meaning": "Directory queries and authentication",
      "pivot": "Review bind and directory audit",
      "limit": "LDAP alone does not imply insecurity"
    },
    {
      "group": "Network ports",
      "key": "443/TCP",
      "label": "HTTPS",
      "meaning": "Encrypted web and API traffic",
      "pivot": "Proxy/TLS metadata and application logs",
      "limit": "Port does not prove content"
    },
    {
      "group": "Network ports",
      "key": "445/TCP",
      "label": "SMB",
      "meaning": "Windows file share and related services",
      "pivot": "4624 type 3, share access, EDR",
      "limit": "Used heavily by business tools"
    },
    {
      "group": "Network ports",
      "key": "464/TCP,UDP",
      "label": "Kerberos password change",
      "meaning": "Password change service in AD",
      "pivot": "Correlate account resets",
      "limit": "Not equivalent to login"
    },
    {
      "group": "Network ports",
      "key": "514/UDP",
      "label": "Syslog",
      "meaning": "Classic unencrypted syslog forwarding",
      "pivot": "Check sender and collector",
      "limit": "TLS syslog commonly 6514"
    },
    {
      "group": "Network ports",
      "key": "636/TCP",
      "label": "LDAPS",
      "meaning": "LDAP protected with TLS",
      "pivot": "Directory operation logs",
      "limit": "TLS does not prove authorization"
    },
    {
      "group": "Network ports",
      "key": "1433/TCP",
      "label": "MS SQL Server",
      "meaning": "Common SQL Server endpoint",
      "pivot": "DB audit and application context",
      "limit": "Configured ports may differ"
    },
    {
      "group": "Network ports",
      "key": "1521/TCP",
      "label": "Oracle DB",
      "meaning": "Common Oracle listener port",
      "pivot": "Database and network audit",
      "limit": "Non-default ports possible"
    },
    {
      "group": "Network ports",
      "key": "2049/TCP",
      "label": "NFS",
      "meaning": "Network File System shares",
      "pivot": "Mount access and file audit",
      "limit": "Permissions matter more than port"
    },
    {
      "group": "Network ports",
      "key": "3306/TCP",
      "label": "MySQL",
      "meaning": "Common MySQL service port",
      "pivot": "DB audit plus process/identity",
      "limit": "Can be reconfigured"
    },
    {
      "group": "Network ports",
      "key": "3389/TCP",
      "label": "RDP",
      "meaning": "Windows remote interactive desktop",
      "pivot": "4624 type 10 / RDP operational logs",
      "limit": "Can be tunneled or remapped"
    },
    {
      "group": "Network ports",
      "key": "5432/TCP",
      "label": "PostgreSQL",
      "meaning": "Common PostgreSQL endpoint",
      "pivot": "Server and auth audit",
      "limit": "May sit behind proxy"
    },
    {
      "group": "Network ports",
      "key": "5985/TCP",
      "label": "WinRM HTTP",
      "meaning": "PowerShell remoting transport",
      "pivot": "WinRM/PowerShell operational logs",
      "limit": "TLS variant normally 5986"
    },
    {
      "group": "Network ports",
      "key": "5986/TCP",
      "label": "WinRM HTTPS",
      "meaning": "Encrypted WinRM listener",
      "pivot": "Remote process execution audit",
      "limit": "Authentication still matters"
    },
    {
      "group": "Network ports",
      "key": "6443/TCP",
      "label": "Kubernetes API",
      "meaning": "Common Kubernetes API server",
      "pivot": "Audit verbs and RBAC",
      "limit": "Endpoint can differ"
    },
    {
      "group": "Network ports",
      "key": "8080/TCP",
      "label": "Alt HTTP",
      "meaning": "Common nonstandard web service",
      "pivot": "Application and proxy access logs",
      "limit": "No unique protocol guarantee"
    },
    {
      "group": "Network ports",
      "key": "8443/TCP",
      "label": "Alt HTTPS",
      "meaning": "Common alternate HTTPS admin/web endpoint",
      "pivot": "TLS + app events",
      "limit": "No unique protocol guarantee"
    },
    {
      "group": "ATT&CK tactics",
      "key": "TA0001",
      "label": "Initial Access",
      "meaning": "Getting into a target environment",
      "pivot": "Correlate auth, web, email and endpoint telemetry",
      "limit": "ATT&CK tactic describes objective, not proof"
    },
    {
      "group": "ATT&CK tactics",
      "key": "TA0002",
      "label": "Execution",
      "meaning": "Running attacker-controlled code or commands",
      "pivot": "Analyze process lineage and command logs",
      "limit": "Legitimate tools execute too"
    },
    {
      "group": "ATT&CK tactics",
      "key": "TA0003",
      "label": "Persistence",
      "meaning": "Maintaining foothold across sessions",
      "pivot": "Check services, tasks, OAuth grants and keys",
      "limit": "Persistence may be dormant"
    },
    {
      "group": "ATT&CK tactics",
      "key": "TA0004",
      "label": "Privilege Escalation",
      "meaning": "Obtaining higher privileges",
      "pivot": "Review group/role modifications and exploit signals",
      "limit": "Role grant need not be exercised"
    },
    {
      "group": "ATT&CK tactics",
      "key": "TA0006",
      "label": "Credential Access",
      "meaning": "Obtaining passwords, tokens or credentials",
      "pivot": "Check process access, identity events and token use",
      "limit": "Not all credential access logs directly"
    },
    {
      "group": "ATT&CK tactics",
      "key": "TA0007",
      "label": "Discovery",
      "meaning": "Learning about network, accounts or environment",
      "pivot": "Inspect enumeration and API listing context",
      "limit": "Admin tools discover routinely"
    },
    {
      "group": "ATT&CK tactics",
      "key": "TA0008",
      "label": "Lateral Movement",
      "meaning": "Accessing other systems",
      "pivot": "Correlate source/target sessions and execution",
      "limit": "Network connection not proof"
    },
    {
      "group": "ATT&CK tactics",
      "key": "TA0009",
      "label": "Collection",
      "meaning": "Gathering information of interest",
      "pivot": "File access, cloud API and staging evidence",
      "limit": "Collection not exfiltration"
    },
    {
      "group": "ATT&CK tactics",
      "key": "TA0011",
      "label": "Command and Control",
      "meaning": "Communicating with controlled systems",
      "pivot": "DNS, proxy, EDR and egress correlation",
      "limit": "Periodic traffic can be benign"
    },
    {
      "group": "ATT&CK tactics",
      "key": "TA0010",
      "label": "Exfiltration",
      "meaning": "Moving information out",
      "pivot": "Correlate access and transfer proof",
      "limit": "Outbound bytes are not definitive"
    },
    {
      "group": "ATT&CK tactics",
      "key": "TA0040",
      "label": "Impact",
      "meaning": "Manipulating, degrading or destroying services",
      "pivot": "Ransomware/backup/process and app telemetry",
      "limit": "Service issues may be operational"
    },
    {
      "group": "ATT&CK tactics",
      "key": "TA0112",
      "label": "Defense Impairment",
      "meaning": "Degrading security tooling and defensive controls",
      "pivot": "Telemetry drop, agent changes, policy edits",
      "limit": "Tool maintenance may be approved"
    }
  ],
  "recipes": [
    {
      "id": "rq01",
      "tier": "L1",
      "title": "Failed logons by account and source",
      "platform": "Splunk SPL",
      "hypothesis": "Concentrated or distributed failed authentications need contextual validation",
      "query": "index=windows EventCode=4625 earliest=-24h | stats count by Account_Name, Source_Network_Address | sort -count",
      "interpret": "Group failures; investigate both high count per account and high distinct account count per source.",
      "pivot": "Check follow-up successes, logon type, source asset and lockout policy."
    },
    {
      "id": "rq02",
      "tier": "L1",
      "title": "Failed Windows logons with KQL",
      "platform": "Sentinel KQL",
      "hypothesis": "Review failures by account and originating address",
      "query": "SecurityEvent | where TimeGenerated > ago(24h) | where EventID == 4625 | summarize Failures=count() by Account, IpAddress | top 25 by Failures desc",
      "interpret": "Aggregated counts can hide shared gateways and legitimate password resets.",
      "pivot": "Correlate 4624, account roles, device ID and approved maintenance."
    },
    {
      "id": "rq03",
      "tier": "L1",
      "title": "Successful login after failure burst",
      "platform": "Sentinel KQL",
      "hypothesis": "Check whether authentication failures led to success",
      "query": "let F=SecurityEvent | where TimeGenerated > ago(1d) and EventID==4625 | summarize Failed=count() by Account; SecurityEvent | where TimeGenerated > ago(1d) and EventID==4624 | join kind=inner F on Account | project TimeGenerated, Account, Failed, Computer",
      "interpret": "This is illustrative account-level correlation, not proof the same source succeeded; add time/source and logon-type constraints.",
      "pivot": "Confirm successful session source, user, application and subsequent actions."
    },
    {
      "id": "rq04",
      "tier": "L1",
      "title": "Unusual PowerShell launches",
      "platform": "Splunk SPL",
      "hypothesis": "Identify script interpreters with unusual parents or flags",
      "query": "index=edr process_name=\"powershell.exe\" | table _time host user parent_process command_line",
      "interpret": "Inspect parent process, user, signing and exact command intent.",
      "pivot": "Link process GUID to network connections and file writes."
    },
    {
      "id": "rq05",
      "tier": "L1",
      "title": "DNS NXDOMAIN spikes",
      "platform": "Sentinel KQL",
      "hypothesis": "Rapid failed DNS lookups may indicate misconfiguration or algorithmic domains",
      "query": "DnsEvents | where TimeGenerated > ago(2h) and ResponseCode == \"NXDOMAIN\" | summarize NX=count(), Domains=dcount(Name) by ClientIP | top 20 by NX desc",
      "interpret": "High rates may come from browsers, typos, software updates or DGA; inspect query names.",
      "pivot": "Tie client IP to endpoint process and outbound activity."
    },
    {
      "id": "rq06",
      "tier": "L1",
      "title": "HTTP error burst",
      "platform": "Splunk SPL",
      "hypothesis": "A client generating frequent 401/403/404 may be enumerating or misconfigured",
      "query": "index=proxy (status=401 OR status=403 OR status=404) earliest=-1h | stats count dc(uri_path) as paths by src_ip | sort -count",
      "interpret": "Count unique paths and compare sanctioned scanners or monitoring.",
      "pivot": "Look for later 200 on sensitive routes and backend authorization logs."
    },
    {
      "id": "rq07",
      "tier": "L2",
      "title": "Suspicious privileged group changes",
      "platform": "Splunk SPL",
      "hypothesis": "New group members may change effective domain permissions",
      "query": "index=windows (EventCode=4728 OR EventCode=4732) earliest=-7d | table _time host SubjectUserName MemberName TargetUserName",
      "interpret": "Use group SID and name to determine actual privilege; event fields vary by source.",
      "pivot": "Check change approval, actor logon, account creation and follow-on resource access."
    },
    {
      "id": "rq08",
      "tier": "L2",
      "title": "Service installation deviations",
      "platform": "Splunk SPL",
      "hypothesis": "Unexpected service installation can indicate remote execution or authorized deployment",
      "query": "index=windows EventCode=7045 earliest=-72h | stats count values(Service_File_Name) as Binaries by Computer, Service_Name",
      "interpret": "Compare paths and maintenance schedule.",
      "pivot": "Find installer process, related 4624, source machine and service start."
    },
    {
      "id": "rq09",
      "tier": "L2",
      "title": "Office launches a shell",
      "platform": "Sentinel KQL",
      "hypothesis": "Office-to-script process lineage may indicate malicious document execution",
      "query": "DeviceProcessEvents | where Timestamp > ago(24h) | where InitiatingProcessFileName in~ (\"WINWORD.EXE\",\"EXCEL.EXE\",\"OUTLOOK.EXE\") and FileName in~ (\"powershell.exe\",\"cmd.exe\",\"wscript.exe\") | project Timestamp,DeviceName,FileName,ProcessCommandLine,InitiatingProcessFileName",
      "interpret": "Office automation can cause legitimate matches; investigate command, document origin and child activity.",
      "pivot": "Pivot to file hashes, destination URLs and message ID."
    },
    {
      "id": "rq10",
      "tier": "L2",
      "title": "Remote administrative movement",
      "platform": "Sentinel KQL",
      "hypothesis": "Remote interactive or network logons from unfamiliar sources may indicate lateral activity",
      "query": "SecurityEvent | where TimeGenerated > ago(24h) and EventID==4624 and LogonType in (3,10) | summarize Hosts=dcount(Computer), Examples=make_set(Computer,10) by Account, IpAddress | where Hosts > 3",
      "interpret": "Network logons are common for shares and management; baseline accounts and jump servers.",
      "pivot": "Check target-side service/process creation and privileged group membership."
    },
    {
      "id": "rq11",
      "tier": "L2",
      "title": "CloudTrail role changes",
      "platform": "CloudTrail Lake SQL (illustrative)",
      "hypothesis": "Unexpected policy attachment or role trust change can enable escalation",
      "query": "SELECT eventTime,eventName,userIdentity.arn,sourceIPAddress FROM event_data_store WHERE eventName IN ('AttachRolePolicy','PutRolePolicy','UpdateAssumeRolePolicy') ORDER BY eventTime DESC LIMIT 100",
      "interpret": "Adapt store/table/schema to your account. Changes do not prove role use.",
      "pivot": "Look for AssumeRole then sensitive API actions and approved change records."
    },
    {
      "id": "rq12",
      "tier": "L2",
      "title": "Cloud object access validation",
      "platform": "CloudTrail Lake SQL (illustrative)",
      "hypothesis": "Data exposure needs actual data-plane evidence when logging is enabled",
      "query": "SELECT eventTime,eventName,userIdentity.arn,requestParameters FROM event_data_store WHERE eventName IN ('GetObject','ListObjectsV2') ORDER BY eventTime DESC LIMIT 100",
      "interpret": "CloudTrail S3 data events must be enabled for object operations; event names and schemas vary.",
      "pivot": "Correlate object sensitivity, source principal and network egress."
    },
    {
      "id": "rq13",
      "tier": "L2",
      "title": "Kubernetes risky API verbs",
      "platform": "Kubernetes audit / JSON filter",
      "hypothesis": "A service account modifying RBAC or secrets needs review",
      "query": "{verb in [\"create\",\"patch\",\"update\",\"get\"] AND objectRef.resource in [\"clusterrolebindings\",\"rolebindings\",\"secrets\"]}",
      "interpret": "Pseudocode filter, not a runnable API query; adapt to log pipeline.",
      "pivot": "Check responseStatus, role binding, workload image and ticket."
    },
    {
      "id": "rq14",
      "tier": "L2",
      "title": "OAuth app consent changes",
      "platform": "Sentinel KQL",
      "hypothesis": "Unexpected consent grants may persist beyond password changes",
      "query": "AuditLogs | where TimeGenerated > ago(7d) | where OperationName has_any (\"Consent\", \"Add service principal\") | project TimeGenerated, OperationName, InitiatedBy, TargetResources",
      "interpret": "Verify exact tenant audit operation names before use; client IDs and scope matter.",
      "pivot": "Look for resource reads and noninteractive token use."
    },
    {
      "id": "rq15",
      "tier": "L3",
      "title": "Stale or missing sources",
      "platform": "Sentinel KQL",
      "hypothesis": "Silent gaps in telemetry invalidate negative conclusions",
      "query": "Heartbeat | summarize LastSeen=max(TimeGenerated) by Computer | where LastSeen < ago(2h)",
      "interpret": "A healthy agent may still miss individual event types; cross-check source inventory.",
      "pivot": "Compare source volume, ingestion pipeline and parser failures."
    },
    {
      "id": "rq16",
      "tier": "L3",
      "title": "Rare parent-child pairs",
      "platform": "Sentinel KQL",
      "hypothesis": "Anomalous process relationships help rank unusual execution",
      "query": "DeviceProcessEvents | where Timestamp > ago(14d) | summarize Runs=count(), Devices=dcount(DeviceName) by InitiatingProcessFileName,FileName | where Runs < 5 | sort by Runs asc",
      "interpret": "Rarity is not maliciousness; deploy only with baseline/allowlist context.",
      "pivot": "Link to command line, user, signer and network behavior."
    },
    {
      "id": "rq17",
      "tier": "L3",
      "title": "Cloud role session anomaly",
      "platform": "CloudTrail Lake SQL (illustrative)",
      "hypothesis": "Unexpected role assumption can grant new lateral access",
      "query": "SELECT eventTime,userIdentity.arn,sourceIPAddress,eventName FROM event_data_store WHERE eventName='AssumeRole' ORDER BY eventTime DESC LIMIT 200",
      "interpret": "Queries are illustrative; STS session behavior and field schema vary.",
      "pivot": "Trace subsequent API operations made under the assumed session."
    },
    {
      "id": "rq18",
      "tier": "L3",
      "title": "Data source volume regression",
      "platform": "Splunk SPL",
      "hypothesis": "A sensor or parser outage can resemble a drop in malicious activity",
      "query": "index=security earliest=-24h | timechart span=1h count by sourcetype",
      "interpret": "Compare against fleet inventory and historical day/time baseline.",
      "pivot": "Check collectors, missing endpoints and field extraction drift."
    },
    {
      "id": "rq19",
      "tier": "L3",
      "title": "Network beaconing hypothesis",
      "platform": "Splunk SPL",
      "hypothesis": "Periodic destination connections may indicate automation or command and control",
      "query": "index=proxy earliest=-24h | stats count min(_time) as first max(_time) as last by src_ip dest_host | where count>20",
      "interpret": "Periodic traffic alone is frequently benign; assess interval regularity and process attribution.",
      "pivot": "Check new domains, abnormal process, user agent and data volume."
    },
    {
      "id": "rq20",
      "tier": "L3",
      "title": "Sensitive data sharing grants",
      "platform": "Sentinel KQL",
      "hypothesis": "Unusual access changes can precede data loss",
      "query": "AuditLogs | where TimeGenerated > ago(3d) | where OperationName has_any (\"Add member\", \"Add app role assignment\") | project TimeGenerated, OperationName, InitiatedBy, TargetResources",
      "interpret": "This is a starting point for Entra changes, not complete SharePoint/Drive audit.",
      "pivot": "Follow application-specific data and resource events."
    }
  ],
  "sheets": [
    {
      "id": "sh01",
      "title": "Shift handoff",
      "who": "L1 → L1",
      "when": "At start/end of shift",
      "body": "SHIFT (UTC): ______\nCoverage health: [healthy / degraded / unknown] — sources and times ______\nOpen critical cases (IDs, owners, due): ______\nActive containment changes (what / approved by / rollback): ______\nOutstanding evidence requests: ______\nMonitoring exceptions and scheduled tests: ______\nDecisions made and why: ______\nNext analyst confirmation: ______"
    },
    {
      "id": "sh02",
      "title": "Alert triage record",
      "who": "L1 → L2",
      "when": "For each actionable alert",
      "body": "Case / detection / raw event ID: ______\nObserved time (UTC) and ingest time: ______\nAffected identity, host, service, business owner: ______\nTrigger logic and exact source fields: ______\nIndependent corroboration: ______\nKnown benign context / approved change: ______\nAssessment: [true positive / false positive / benign true positive / uncertain]\nImpact [confirmed / potential], confidence, priority: ______\nEvidence gaps and requested next action: ______"
    },
    {
      "id": "sh03",
      "title": "Identity compromise escalation",
      "who": "L1/L2 → Identity team",
      "when": "After credential/token risk is supported",
      "body": "Case ID and contact: ______\nUser / identity type / privilege: ______\nFirst and last suspicious events (UTC): ______\nSign-in, MFA and token/session IDs: ______\nSource IP/device/client and uncertainty: ______\nDownstream changes (roles, app grants, mail rules): ______\nOther affected identities: ______\nSuggested action and impact (revoke, disable, reset): ______\nApprover/owner and validation plan: ______"
    },
    {
      "id": "sh04",
      "title": "Endpoint containment approval",
      "who": "L2 → Incident commander",
      "when": "Before impactful host isolation",
      "body": "Host / business service / owner: ______\nConfirmed behavior and time: ______\nActive malicious action vs hypothesis: ______\nProposed containment: [isolate / process block / firewall rule / other]\nService impact and rollback time: ______\nForensic collection completed/pending: ______\nAuthorization reference and emergency authority: ______\nVerification signal and observer: ______"
    },
    {
      "id": "sh05",
      "title": "Phishing campaign case",
      "who": "L1/L2 → Messaging team",
      "when": "On malicious mail/click discovery",
      "body": "Original message ID and header artifact: ______\nSender, Reply-To, authentication alignment: ______\nAttachment hash/URL chain (do not activate links): ______\nRecipient count, delivered/quarantined count: ______\nKnown clicks/credential submissions (confirmed vs inferred): ______\nIdentity sessions and mailbox actions: ______\nContainment decision and user notification owner: ______"
    },
    {
      "id": "sh06",
      "title": "Cloud IAM role-change review",
      "who": "L2 → Cloud owner",
      "when": "On unexpected high privilege grant",
      "body": "Tenant/account/project and role: ______\nActor, source session, MFA and device: ______\nExact API action / UTC time / request ID: ______\nBefore/after permissions and resource scope: ______\nAffected secrets, buckets, storage and keys: ______\nAudit coverage (management/data events): ______\nConfirmed subsequent access and unknowns: ______\nApproval/change ticket and response owner: ______"
    },
    {
      "id": "sh07",
      "title": "Threat-hunting hypothesis",
      "who": "L3 → Detection engineering",
      "when": "Before a hunt",
      "body": "Hypothesis ID / ATT&CK mapping: ______\nBehavior to test (falsifiable): ______\nPopulation, window and safe exclusions: ______\nExpected events and required fields: ______\nLog source health and coverage check: ______\nQuery and sample results: ______\nCounterexamples / alternate explanations: ______\nResult [supported / not supported / inconclusive]: ______\nDetection or telemetry improvement: ______"
    },
    {
      "id": "sh08",
      "title": "Detection change request",
      "who": "L3 → Engineering",
      "when": "Before enabling/tuning alerts",
      "body": "Rule name/version/owner: ______\nBehavior and threat relevance: ______\nRequired events, fields and retention: ______\nPositive test fixtures and expected matches: ______\nNegative fixtures and expected non-matches: ______\nEstimated daily volume and analyst effort: ______\nException scope and expiration: ______\nRollback and post-deployment health check: ______"
    },
    {
      "id": "sh09",
      "title": "Incident impact assessment",
      "who": "L2 → Incident commander",
      "when": "During scoping and after containment",
      "body": "Confirmed impacted assets and identities: ______\nPotentially exposed assets (not yet verified): ______\nKnown entry point and first observed time: ______\nObserved persistence and privilege changes: ______\nData access/transfer evidence and gaps: ______\nBusiness availability/integrity effects: ______\nContainment state and remaining alternate paths: ______\nConfidence and next proof required: ______"
    },
    {
      "id": "sh10",
      "title": "Lessons learned",
      "who": "IR team",
      "when": "After recovery validation",
      "body": "Incident and owner: ______\nWhat detected and what was missed: ______\nTime between first activity, detection and response: ______\nWhat slowed triage or decisions: ______\nTelemetry gaps and parser errors: ______\nPlaybook/policy failure or success: ______\nImprovement owner, measurable acceptance test and due date: ______\nRetest result and closure approval: ______"
    }
  ],
  "notes": {
    "scope": "All fictional examples, no live target access, no secrets or client data. Commands are reference examples; adapt fields, privileges, and authorization to your environment.",
    "nist": "NIST SP 800-61 Revision 3 (April 2025) supersedes Revision 2.",
    "attack": "ATT&CK taxonomy evolves; tactics explain why and techniques how; examples here are selected educational mappings, not complete coverage."
  }
};
