import json, pathlib, re
root=pathlib.Path(__file__).parent
chapters=[]
def add(tier, category, title, concept, sequence, evidence, example, pitfall, question, answer, command=''):
    chapters.append({'id':'fm%02d'%(len(chapters)+1),'tier':tier,'category':category,'title':title,'concept':concept,'sequence':sequence.split(' > '),'evidence':evidence.split(' ; '),'example':example,'pitfall':pitfall,'question':question,'answer':answer,'command':command})

add('Foundation','SOC basics','What actually happens during a SOC shift',
'A SOC shift is a queue of hypotheses, not a hunt for red icons. Your output is a defensible decision supported by time, scope, asset criticality and reproducible evidence. L1 handles initial validation; L2 scopes and coordinates response; L3 improves detection coverage and investigates complex behavior. Titles vary by organization.',
'Check the prior handoff and service health > Confirm SIEM ingestion, alert queues and clock synchronization > Triage by business impact plus confidence, not vendor severity alone > Pivot through independent telemetry and create a timeline > Record disposition, uncertainty, owner and next action',
'Alert record and triggering rule ; Asset owner and criticality ; Related log sources and ingestion health ; Ticket with evidence references',
'A critical sign-in alert for a testing account from a known VPN may be benign. Confirm asset identity, approved change and other sign-ins before closing; a familiar IP is a clue, not a verdict.',
'Closing a detection because the threat intelligence score is low ignores environment-specific risk.',
'What distinguishes an alert from a confirmed incident?',
'An alert is a detection hypothesis. An incident is an event assessed as requiring response under the organization’s policy; classify only after checking evidence and impact.')
add('Foundation','SOC basics','Risk, likelihood, severity and priority',
'Severity describes an event or potential impact. Priority determines what the team works on now, incorporating confidence, business context, exposure and response deadlines. A high-severity signature on a decommissioned test host can be lower priority than a modest identity anomaly on a privileged production account.',
'Identify the affected business process > Assess confirmed impact versus hypothetical impact > Measure evidence confidence and exposure > Decide urgency and assign an owner > State what could change the priority',
'Asset inventory and business tier ; Identity role and access ; Time of event and current activity ; Scope estimates',
'An internet-exposed administrator account just gained a privileged role unexpectedly. Priority may be urgent even before proof of data loss because the potential blast radius is broad.',
'Do not multiply arbitrary numbers and call them objective risk; document assumptions and what is unknown.',
'Can a low-severity alert become a high-priority case?',
'Yes. Privileged access, active exploitation, critical assets, or confirmed business impact can override the original alert severity.')
add('Foundation','Networking','OSI, TCP/IP and what a network sensor sees',
'Layered models organize how traffic moves. Ethernet operates on a local link; IP provides addressing and routing; TCP or UDP carry application messages; TLS protects application content. A firewall can record IP, port and action without seeing decrypted HTTP requests. Always know the visibility and vantage point of each sensor.',
'Identify source and destination IP > Determine transport protocol and ports > Check routing, NAT and sensor location > Correlate DNS and TLS metadata > Inspect application logs if payload visibility is required',
'Flow tuple and byte counters ; DNS query and response ; TCP flags and retransmissions ; Proxy HTTP method and URL',
'A firewall reports 203.0.113.12:51510 to 192.0.2.20:443. This proves a flow was observed, not which URL was requested or whether it was malicious.',
'Port 443 does not prove HTTPS, and a hostname in DNS does not prove a connection was made.',
'What can a NetFlow record tell you?',
'Typically source/destination, ports, protocol, timing and byte/packet counts; application content and user identity require other sources.',
'Wireshark display filter (authorized captures): tcp.flags.syn == 1 && tcp.flags.ack == 0')
add('Foundation','Networking','TCP three-way handshake and session resets',
'TCP begins with SYN, SYN/ACK and ACK, then sequence numbers and acknowledgements provide ordered delivery. RST may mean a refusal or abrupt close; retransmissions can indicate loss or blocked paths, not necessarily an attack. SOC analysts use handshake behavior to distinguish scans, failures and established sessions.',
'Find SYN from client to server > Find matching SYN/ACK from server > Check final ACK and subsequent payload > Identify retransmission, FIN or RST > Compare baseline volume and destination reachability',
'TCP flags and packet timestamps ; Source port reuse ; Firewall allow or deny ; Load balancer health events',
'A host sends SYNs to hundreds of ports but gets almost no SYN/ACK responses. That is consistent with probing but could also reflect inventory scanning; identify the initiating process.',
'A SYN packet alone is not proof of successful connectivity or exploitation.',
'What is the difference between SYN scanning and a completed connection?',
'SYN probing may not complete the handshake; a completed connection has the full exchange and subsequent session activity.',
'Wireshark display filter: tcp.flags.reset == 1')
add('Foundation','Networking','DNS resolution, caching and tunneling clues',
'A recursive resolver retrieves records from authoritative infrastructure, caches answers by TTL and may be forwarded through corporate DNS. A record can be benign even when its domain looks unusual. Data leakage by DNS can produce frequent long, high-entropy subdomains, unusual record types and large response volumes; verify legitimacy and the resolver vantage point.',
'Identify requester and resolver > Inspect queried domain, qtype and response code > Check frequency, length and entropy patterns > Compare known application traffic > Correlate with endpoint process and outbound flows',
'DNS query logs ; NXDOMAIN rate ; Process initiating lookup ; Resolver policy exceptions',
'An endpoint requests 150 TXT records containing long labels. Check whether the source is legitimate service discovery, software telemetry, or encoded data before labeling tunneling.',
'DNS query timestamps alone do not prove the remote server received the request or that data was exfiltrated.',
'What makes a DNS tunnel hypothesis stronger?',
'Repeated unusual high-entropy labels plus related process behavior, directionality and volume outside the host baseline.',
'nslookup example.test (sample domain for local investigation only)')
add('Foundation','Networking','TLS, certificates and HTTPS visibility',
'TLS negotiates secure communication and authenticates a server through certificates where validated correctly. Sensors may see a destination IP, SNI where available, certificate metadata, TLS version and traffic shape without seeing decrypted application content. TLS 1.3 and encrypted client hello can further reduce available metadata.',
'Locate network flow and endpoint process > Review TLS metadata available at the sensor > Compare certificate issuer, lifetime and domain scope > Seek proxy or server application logs > State encrypted visibility limits',
'TLS version and SNI if visible ; Certificate issuer and SAN names ; JA3/JA4-like fingerprints where collected ; Proxy URL and status',
'A recently registered domain using a valid public certificate is not automatically trustworthy; the certificate mainly supports encrypted transport and identity claims for a domain.',
'Valid certificate does not mean a website is safe, and decryption should follow organizational authorization and privacy policy.',
'Why can a firewall allow HTTPS yet not know the full URL?',
'The URL path is encrypted in TLS; the device needs authorized decryption or application-layer telemetry to see it.')
add('Foundation','Networking','HTTP request logs and status codes',
'HTTP requests contain method, URI, headers and bodies; server responses carry status and headers. 401 means authentication is needed or failed; 403 means access forbidden; 404 may indicate probing; 429 means rate-limited. Repeated 500s can be application errors rather than exploitation. Proxy and origin logs reveal different things.',
'Identify user, IP, user-agent and request ID > Group endpoints and methods by time > Separate rejected from successful requests > Correlate session or auth events > Check backend activity or WAF rule details',
'HTTP method, path and status ; Request ID ; Authentication outcome ; User agent, bytes and response time',
'A burst of 404s followed by one 200 on an admin route could be reconnaissance, a legitimate vulnerability scan, or automated site discovery. Cross-check the user/session and change record.',
'A 200 response is not proof that an attacker obtained data; inspect response size and relevant application authorization events.',
'What distinguishes 401 from 403?',
'401 generally requests valid authentication, while 403 rejects access regardless of whether a credential is present.')
add('Foundation','Networking','IPv4 subnetting, NAT and network context',
'CIDR prefix lengths define network membership and address space; a /24 has 256 IPv4 addresses, while /27 has 32. NAT translates addressing and can hide many clients behind a public IP. A log source after NAT may lack original client identity. Know the gateway and direction before drawing conclusions.',
'Calculate prefix and network range > Find internal source and public translated address > Identify the NAT session mapping > Validate zone, subnet and asset owner > Correlate proxy or endpoint user context',
'Source NAT table ; Firewall zones ; Private and public IP ; DHCP lease mapping',
'Three outbound connections share 198.51.100.17. They could be different clients behind one enterprise NAT; do not merge the identities.',
'Do not treat 10.x or 192.168.x addresses as inherently safe: adversaries also move inside trusted networks.',
'How many total IPv4 addresses are in a /26?',
'64 addresses: 2^(32-26); typical usable host count is 62 on a conventional subnet with network/broadcast addresses.')
add('Foundation','Operating systems','Linux processes, services and permissions',
'Linux exposes running processes through /proc and process tools; systemd manages many services; files have owner, group and mode permissions. Attackers and administrators both use shell, cron, SSH and package managers. The investigative question is whether behavior matches the expected account, service and task.',
'Identify process user, PID and parent > Review executable path and launch parameters > Check service and cron context > Correlate journal and auth events > Preserve evidence before disrupting service',
'journalctl and auditd if present ; process tree ; systemd unit file ; ~/.ssh/authorized_keys changes',
'A root-owned shell spawned by an app process is suspicious on a web server. First verify a maintenance task or container runtime context, then review process ancestry and network egress.',
'Linux auth logs differ between distributions and configurations; check what actually exists.',
'Which information makes an unfamiliar process more concerning?',
'Unexpected parentage, elevated context, changed persistence, rare executable paths and outbound connections together.',
'ps -eo pid,ppid,user,comm,args --forest')
add('Foundation','Operating systems','Windows process tree and session basics',
'Windows security telemetry records account logons, processes, services and tasks, but no single event source is complete. Parent-child process relationships show how execution started. Session IDs, logon IDs, process GUIDs and timing help separate activities that share the same username.',
'Find process-create event and its command line > Identify parent image and signer > Correlate logon ID to sign-in source > Inspect file writes, persistence and network events > Compare the chain to approved software behavior',
'Windows Security 4688 if enabled ; Sysmon 1 and 3 where configured ; EDR process tree ; Task Scheduler operational log',
'winword.exe launching powershell.exe may be suspicious, but managed Office add-ins can spawn helpers. Examine the command line, document origin, user action and child behavior.',
'Process IDs can be reused; use timestamps and globally unique process identifiers where available.',
'Why is a parent-child chain valuable?',
'It provides execution context; the same tool can be benign under an administrator and malicious when launched from an unexpected parent.')
add('Foundation','Operating systems','Time zones, ingestion delay and evidence chronology',
'A reliable investigation timeline distinguishes event time, log-ingestion time and analyst observation time. Time zones and clock drift can invert sequences. Prefer UTC for correlation, preserve original offsets and identify delayed event collection. Timeline uncertainty must be written in the case.',
'Normalize all observed timestamps to UTC > Note source clock and parser fields > Measure collection delay > Order events with available request/process identifiers > Mark uncertainty and missing intervals',
'EventTime and IngestTime ; NTP status ; Timezone offset ; Source-specific sequence ID',
'An EDR event ingested at 10:05 but recorded at 09:58 should be placed at 09:58 in the activity timeline; ingestion latency is still important context.',
'Never reformat timestamp strings without checking whether their timezone is included.',
'Why might an event arrive after a later event?',
'Buffering, network latency, connector retries, clock drift or different source-to-SIEM pipelines.')
add('L1','SIEM workflow','What a SIEM does and does not do',
'A SIEM collects and normalizes events, runs searches and detections, and supports correlation. It is not an EDR and it does not create missing evidence. Source coverage, parsing, retention, rule logic and ingestion health matter more than the size of an alerts dashboard.',
'Check the log source and rule > Validate raw events before normalized fields > Verify parser and time range > Join against independent identity or endpoint sources > Record gaps when a field is absent',
'Raw log and normalized schema ; Log-source health ; Retention window ; Detection query',
'A rule says five failed logons; all five records are the same event retried by the connector. Deduplication is part of validation.',
'A blank search result is not proof that the action did not occur if the source was not collected.',
'Why is parser validation important?',
'Incorrect field extraction can misidentify hosts, users and event severity, producing false correlations.')
add('L1','SIEM workflow','Splunk SPL fundamentals',
'SPL searches events, filters fields and summarizes results. A search should declare a narrow index or source, time range and expected field names. Commands such as stats, where and table transform results; field names vary by onboarding. Test against raw data and record whether accelerated indexes or data models are involved.',
'Identify actual index/sourcetype > Filter earliest/latest and key identifiers > Summarize event count by user and source > Inspect underlying raw events > Verify whether missing events reflect parser issues',
'index and sourcetype ; earliest/latest ; stats count by user ; event source and raw event',
'A failed-logon search groups by source IP and account to identify breadth. Confirm that failures are distinct and look for successful authentications afterward.',
'Do not paste reference SPL into production without adapting data model fields, indexes, permissions and retention.',
'What does stats count by src_ip tell you?',
'It aggregates matching events by source IP; it does not identify unique human users behind NAT or imply maliciousness.',
'index=windows EventCode=4625 earliest=-24h | stats count by Account_Name, Source_Network_Address | sort -count')
add('L1','SIEM workflow','Microsoft Sentinel KQL fundamentals',
'KQL composes tabular operators with pipes. where filters, project selects columns, extend calculates values, summarize aggregates and join correlates tables. Use explicit time windows and verify column types. Query behavior depends on the specific tables available in the workspace.',
'Select a real table and constrain TimeGenerated > Filter event ID and scope > Project only the necessary fields > Summarize across a meaningful window > Inspect representative rows and validate schema',
'SecurityEvent and SigninLogs (when ingested) ; TimeGenerated ; EventID ; Account and IPAddress',
'A password spray query may show many targeted accounts from one source IP, but the analyst must separate corporate proxies and authorized testing.',
'Use of join can duplicate rows if either side has many matching records; count distinct identifiers where appropriate.',
'How is summarize different from project?',
'project chooses or renames columns; summarize computes grouped aggregates such as counts.',
'SecurityEvent | where TimeGenerated > ago(24h) | where EventID == 4625 | summarize Failures=count() by Account, IpAddress | top 20 by Failures desc')
add('L1','SIEM workflow','Elastic and OpenSearch queries',
'Elastic-style platforms typically index structured documents with mappings and offer KQL-like filtering in dashboards or JSON query DSL. Exact syntax depends on product and version. Study host.name, event.code, process.command_line, and source.ip mappings before building detections.',
'Pick time range and data view > Inspect field mapping and sample documents > Filter on event.category or event.code > Add host/user constraints > Inspect original raw message for fidelity',
'event.code and event.action ; host.name and process.entity_id ; user.name ; source.ip',
'A process filter on event.code:1 may mean Sysmon process-create only if that log source was parsed with that mapping; another dataset might reuse the number.',
'KQL-style dashboard filters are not the same syntax as SQL or Elasticsearch JSON DSL.',
'What is an ECS field?',
'A common Elastic field naming convention that helps searches work across normalized data sources.',
'event.category:process and process.name:powershell.exe')
add('L1','Identity','Windows 4624, 4625 and logon types',
'Event 4624 is a successful logon; 4625 is a failed logon. The logon type provides context: 2 interactive console, 3 network, 4 batch, 5 service, 7 unlock and 10 remote interactive. Exact event contents depend on OS policy and where auditing occurs. Failed logons can reflect old passwords, services or attacks.',
'Group failures by account, host and originating IP > Compare success after failure > Check logon type and authentication package > Confirm device ownership and expected service > Expand to other users and time windows',
'Security 4624 / 4625 ; LogonType ; Source Network Address ; Account and failure status',
'Forty type-3 failures for a service account on one scheduled server may signal outdated credentials. Failures across 150 unrelated users from a single external source could suggest spraying.',
'Event 4624 does not mean the user had administrator privileges or that a remote desktop desktop session occurred.',
'Why is logon type important?',
'It distinguishes how an account authenticated; for example, type 3 network logons are not the same as type 10 RDP interactive logons.')
add('L1','Identity','Kerberos authentication: TGT and service tickets',
'Kerberos uses a Key Distribution Center to issue Ticket Granting Tickets (TGTs) and service tickets. Windows domain controllers may log 4768 for TGT activity, 4769 for service ticket requests and 4771 for pre-auth failures. Requests alone are not proof of ticket abuse; context includes encryption types, request volume, principals and target SPNs.',
'Find the requesting user and workstation > Review TGT and service ticket events > Group by service/SPN and account > Check source machine and encryption types where recorded > Correlate service access on the target',
'Domain controller Security 4768,4769,4771 ; SPN and service account ; Client address ; Target logon events',
'An account requests hundreds of tickets for many rarely used SPNs. Check legitimate service discovery and maintenance scripts; compare historical baseline before investigating Kerberoasting.',
'4769 does not by itself prove that a ticket hash was cracked or a service was accessed.',
'What is an SPN?',
'A service principal name identifies a service instance in Kerberos, allowing clients to request a ticket for that service.')
add('L1','Identity','Password spraying versus brute force',
'Brute force tends to attempt many candidate passwords against one user, while spraying tries a small number of guesses against many users. Identity providers enforce different rate-limits and lockout rules; distinguish failed password events from MFA denials and non-interactive sign-ins.',
'Count distinct accounts per source > Compare failures per account > Inspect repeated intervals and user agents > Look for subsequent successes, token creation and MFA changes > Identify approved scanners and corporate egress proxies',
'Sign-in error code ; Source IP and ASN ; Count distinct users ; MFA method/result ; Device ID',
'One IP causes 120 failed passwords for 120 accounts and later one success from an unfamiliar device. Scope all target users and begin incident response on the successful session.',
'Do not block a shared corporate proxy solely from IP aggregation without identifying originating clients.',
'Which statistic best differentiates spraying from a brute force attack?',
'Distinct targeted user count relative to failure count and password-guess frequency.')
add('L1','Identity','MFA fatigue, token theft and session hijack',
'MFA push bombing pressures a user into approving a prompt. Session token theft can bypass new password challenges entirely until the session expires or is revoked. Strong investigation separates the original authentication from downstream token use and checks device, IP, user agent and consent events.',
'Review push challenge history and approval > Compare new device/IP/session identifiers > Correlate issued tokens and privileged actions > Revoke sessions following approved procedures > Check other users and persistence like OAuth grants',
'MFA challenge result ; Device compliance ; Token/session ID ; OAuth grants ; Sign-in logs',
'A user denies six pushes, approves one, and a new session reads cloud mail. Investigate both the prompted device and subsequent session behavior.',
'Password reset alone may not revoke all sessions; validate platform-specific token controls and user impact.',
'Why might an MFA-protected account still be compromised?',
'Social engineering, real-time phishing, stolen session tokens, consent abuse or recovery-flow weaknesses can defeat the intended protection.')
add('L1','Email security','SPF, DKIM, DMARC and phishing headers',
'SPF checks authorized sending infrastructure for the envelope sender; DKIM validates a signed message; DMARC aligns authenticated identities with the visible From domain and applies policy. Authentication passes do not prove a message is harmless; a compromised legitimate account can send authentic phishing.',
'Preserve raw message and headers > Inspect From, Reply-To and Return-Path > Check authentication results and alignment > Inspect redirect chain and attachment safely > Search who else received or interacted with it',
'Authentication-Results ; Envelope sender and From ; Received header hops ; URL and attachment hashes',
'A legitimate supplier domain passes DKIM but requests an urgent payment change. Confirm through trusted channels and investigate potential supplier account compromise.',
'Do not treat SPF pass without DMARC alignment as proof the visible From identity is authenticated.',
'Why can a phishing email pass SPF and DKIM?',
'The sender may control a properly configured domain or compromise a legitimate mailbox; authentication checks ownership of sending infrastructure, not intent.')
add('L1','Endpoint','EDR investigation: process ancestry and command lines',
'EDR combines process, file, module, registry and network signals. Parent process, image path, signer, command line and user context are often more informative together than a filename. Beware executable renaming, script hosts and trusted binaries used in unexpected ways.',
'Validate process tree and parent GUID > Compare signer and expected parent > Inspect command flags and decoded/obfuscated scripts where authorized > Correlate file writes and outbound connections > Scope similar behavior across fleet',
'Process GUID and PID ; Parent image ; CommandLine ; File hash ; Network destination',
'An Office process launches PowerShell with an encoded command and an external HTTP request. Check the decoded intent in an isolated analysis environment; do not execute the command.',
'A signed binary can still be used maliciously, and a file hash alone cannot explain process behavior.',
'Which process attributes should you preserve in an escalation?',
'Host, user, UTC time, process/parent identifiers, full command line, path, hash, signer and related network/file actions.')
add('L1','Endpoint','Windows services, scheduled tasks and persistence',
'Attackers can seek reboot persistence through services, tasks, registry run keys and startup locations; administrators use the same mechanisms. Security 4697 or System 7045 may record service installation, and task-related events vary by audit configuration. Validate change owner and associated binary before response.',
'Find new service or scheduled task > Inspect executable path and account > Check signer/hash and creation context > Match change ticket and software deployment > Search for same artifact on other hosts',
'System 7045 ; Security 4697 if audited ; Security 4698/4702 if audited ; Registry and file telemetry',
'A service created under C:\\ProgramData with an uncommon binary shortly after external RDP deserves investigation, but endpoint-management deployments may look similar.',
'Event 7045 records service installation; it does not alone prove that the service started or executed malicious code.',
'How do you verify a suspicious new service?',
'Check path, signer, account, service creation context, change records, process execution and subsequent activity.')
add('L1','Endpoint','Windows event IDs analysts actually use',
'Windows auditing requires configuration and successful log forwarding. Security 4624/4625 represent logons, 4672 special privileges assigned, 4688 process create if enabled, 4720 new user, 4728/4732 privileged group additions, 4740 lockout, 4768/4769/4771 Kerberos, and 1102 Security log clearing. System 7045 reports service installation.',
'Identify event provider and machine role > Confirm event ID and subject/target fields > Decode logon type or group SID > Correlate related events and process context > Verify auditing was enabled',
'Event ID and provider ; Subject vs target account ; Domain controller or endpoint location ; Audit policy',
'A 4728 on a domain controller adding a regular account to a privileged global group should be linked to the initiating actor, ticket, and subsequent authentication.',
'Never treat the same numeric Event ID as equivalent across all Windows providers.',
'What does Event 4672 tell you?',
'A logon session received special privileges; it is common for administrative/service accounts and needs context.',
'Get-WinEvent -FilterHashtable @{LogName="Security";Id=4625;StartTime=(Get-Date).AddHours(-4)} -MaxEvents 20')
add('L1','Incident response','False positive, benign true positive, malicious true positive',
'A false positive means a detection fires without its intended behavior. A benign true positive means the behavior occurred, but it was authorized or harmless. A malicious true positive means the behavior occurred and investigation supports unauthorized intent. These classifications are crucial for tuning without blinding a rule.',
'Confirm what the rule detects > Validate that behavior in source logs > Gather business authorization context > Classify outcome and add reasoning > Recommend targeted tuning only if warranted',
'Rule condition and matching fields ; Change ticket or test schedule ; Peer behavior ; Incident disposition',
'A scheduled penetration test triggers a scanner signature. It is a true detection of scanning but may be benign within scope, not necessarily a false-positive rule.',
'Disabling the rule for every scanner IP can create future blind spots; use scoped expiry and asset controls.',
'Why is an authorized red-team scan often not a false positive?',
'The detection correctly observed scanning, but the activity may be approved; label benign true positive with evidence.')
add('L1','Incident response','Escalation notes, confidence and handoffs',
'A good handoff lets another analyst reproduce the conclusion without asking for your memory. Include affected entities, UTC timeline, exact evidence IDs, confidence and open questions. State requested action and its risk. Separate facts, interpretations and assumptions rather than presenting a hypothesis as certainty.',
'Write one-line executive summary > List affected hosts, users and earliest/latest times > Cite primary log fields and pivots > State confirmed versus unconfirmed impact > Assign owner, priority, requested action and decision deadline',
'Case ID and alert rule ; UTC timeline ; Raw event ID or query ; Evidence retention and limitations',
'Good handoff: “At 09:14 UTC account svc-build had 32 denied sign-ins, then a successful login from 203.0.113.8; device association is unknown; request identity owner validation and session review.”',
'“Suspicious activity happened, please investigate” is not actionable because it omits what, where, when, evidence and next step.',
'What three things should never be omitted from a handoff?',
'What was observed, why it matters (with uncertainty), and the precise requested next action.')
add('L2','Investigation','Scope an incident using identities, hosts and time',
'Scoping asks which principals, endpoints, services and datasets were touched. Begin with confirmed seed indicators, expand one hop at a time and distinguish observed activity from potential exposure. A user with access to 500 systems did not necessarily access all 500 during the incident.',
'Pin earliest confirmed event and UTC range > List known affected identities and endpoints > Pivot on session/process GUID and network destination > Expand to adjacent hosts and accounts > Tag confirmed, suspected and ruled-out entities',
'Identity sessions ; Process trees ; DNS/flow records ; Access logs ; Asset ownership',
'An initial compromised laptop communicates with an admin jump host. Next verify logon and process execution on the jump host rather than assuming lateral movement succeeded.',
'Unbounded pivoting produces noise and distorts the timeline; document why every new entity entered scope.',
'How do you decide when to expand scope?',
'Use corroborated behavior that links a new identity, endpoint, process or resource to confirmed events, while recording confidence.')
add('L2','Investigation','Build an incident timeline with confidence labels',
'A timeline should interleave authentication, process, network, cloud and response records using normalized timestamps. Link event identifiers, not just narrative summaries. Confidence labels clarify whether a fact was directly observed, inferred from correlation, or still a hypothesis.',
'Collect and normalize source timestamps > De-duplicate events and tag source/ID > Connect sessions and process ancestry > Identify first access, actions and last observed activity > Mark evidence gaps and incident-response actions',
'UTC timestamp, source, raw ID ; User and device/session IDs ; Process GUID ; Ingest latency and gaps',
'09:11 sign-in success [direct], 09:13 new mailbox rule [direct], 09:15 exfiltration [hypothesis] until mailbox access/download evidence is found.',
'A missing log cannot be plotted as proof nothing occurred; mark it as missing evidence.',
'Why should a timeline include response actions?',
'They may explain later activity and are essential for assessing containment, impact and evidence integrity.')
add('L2','Investigation','Lateral movement: RDP, SMB, WinRM and service execution',
'Lateral movement uses access to another host. RDP, SMB, WinRM and remote services are normal administrative tools, so detection relies on unexpected source, identity, process and remote activity. Network type-3 and type-10 logons provide different signals and should be interpreted with host roles.',
'Identify initial source host and account > Look for remote auth to target > Check target-side process/service/task events > Correlate traffic 3389,445,5985/5986 as configured > Search same identity on other assets',
'4624 type 3/10 ; 4648 explicit credentials ; 7045 service creation ; Sysmon 1 ; EDR remote process',
'An admin account authenticates from a workstation to ten servers then triggers service installation. Verify planned patching and source process before calling malicious spread.',
'Port activity alone does not prove remote code execution or a successful login.',
'Why is target-side telemetry essential?',
'It shows whether authentication led to process execution or persistence, which a source-side network flow alone cannot establish.')
add('L2','Investigation','Ransomware precursor investigation',
'Ransomware response is not limited to detecting encryption. Precursor patterns include unusual privilege use, backup tampering, defense impairment, shadow-copy changes, file-access bursts and movement. Some steps are legitimate maintenance. Evidence preservation and containment authority are urgent.',
'Find affected endpoint and first suspicious process > Correlate privilege elevation and tool execution > Look for backup/service changes and access bursts > Scope host/share access and critical assets > Escalate containment with incident commander approval',
'EDR process + file events ; Backup job and VSS logs ; Network share activity ; Identity changes',
'A backup service stops at 02:00 followed by mass rename activity on a file server. Compare backup schedule, EDR process and file-owner records before initiating host isolation.',
'Isolating a production database without coordination may worsen impact; use emergency process when supported.',
'Why investigate precursor behavior?',
'Early actions may allow containment before encryption or large-scale business disruption.')
add('L2','Investigation','Phishing to identity compromise: full chain',
'An email alert becomes an incident when evidence shows a risky interaction, credential/token compromise, or downstream account misuse. Analyze message authentication, link or attachment, click telemetry, user sign-ins, OAuth grants and mailbox activity. Keep the original message for evidentiary integrity.',
'Identify campaign and recipient set > Analyze message and URL safely > Find click/attachment execution > Examine identity sessions and MFA > Search for mailbox rules, downloads, sharing and other affected users',
'Mail headers and message ID ; URL click telemetry ; Sign-in events ; OAuth consent ; Mailbox audit',
'A user clicks an impersonated sign-in page, then a new session from an untrusted device creates forwarding rules. Revoke sessions under policy and assess whether data left.',
'A click event alone does not prove a user submitted credentials; correlating follow-on access changes confidence.',
'What logs prove downstream mailbox abuse?',
'Mailbox audit operations for reads, rule changes, sharing, downloads or forwarding, tied to identity sessions where available.')
add('L2','Investigation','Cloud identity and risky role changes',
'Cloud providers have distinct identity models, but the question is similar: who granted which privilege to whom, from where, and why? AWS CloudTrail, Azure activity/sign-in logs and GCP Cloud Audit Logs expose different semantics and coverage. Administrative API success is not proof the new privilege was used.',
'Find the role or policy modification > Identify actor/session and source context > Review before/after permissions and resource scope > Check subsequent access or key creation > Assess cross-account or service-principal trust changes',
'Cloud admin API event ; Actor principal ARN/object ID ; Role policy JSON ; Source IP/user agent ; Resource audit',
'An AWS principal adds a wildcard policy to a rarely used role, then lists secret stores. Confirm the permission change, assumed-role session and actual read events before final scope.',
'Cloud audit logging can omit data-plane events by configuration; inventory enabled event types before concluding none occurred.',
'What does an AWS AssumeRole event mean?',
'A principal requested a temporary session under a role; verify trust policy, resulting session and subsequent actions to establish risk.')
add('L2','Investigation','OAuth consent, refresh tokens and persistence',
'OAuth grants allow third-party applications delegated or application permissions; a dangerous grant can persist beyond a password change. Investigate who consented, app publisher, scope, token age, tenant policies and activity. Revoke grants and refresh sessions according to the identity platform’s approved processes.',
'Identify application/client ID and grant > Examine requested scopes and consent authority > Link identity sign-ins and token use > Inspect access to mail/files/graph APIs > Revoke and scope all affected users',
'Consent audit ; App registration ; Delegated/app scopes ; Token sign-ins ; Resource access logs',
'An unfamiliar application receives Mail.Read and offline_access permissions. Even without credential theft, the grant may enable ongoing mailbox access; verify actual use.',
'Not every unknown app is malicious; validate owner, business justification and tenancy before disruption.',
'Why is password reset not sufficient for OAuth consent abuse?',
'The malicious or risky app grant and refresh-token paths may survive until separately revoked.')
add('L2','Investigation','Linux SSH access and privilege escalation',
'Linux login traces may appear in journald, auth.log, secure, auditd or provider audit. SSH success must be tied to the source, authorized key, account and subsequent shell behavior. sudo and setuid changes can indicate privilege escalation but are also normal administration.',
'Identify successful sshd authentication > Verify account and public-key fingerprint if recorded > Correlate shell and sudo commands > Inspect authorized_keys and cron/systemd changes > Review related outbound traffic',
'SSHD logs ; sudo event and tty ; auditd execve ; ~/.ssh/authorized_keys metadata',
'An unfamiliar SSH key appears in a service account, followed by sudo to root and an external curl download. Validate key enrollment and change approval.',
'No sudo message does not mean root was never obtained; logging configuration and alternate methods matter.',
'How do you check whether an SSH login led to privilege escalation?',
'Correlate session ID, sudo/audit records, process identity and root-owned changes following login.',
'journalctl -u ssh --since "2 hours ago"  # service name may be sshd')
add('L2','Investigation','Container and Kubernetes threat signals',
'Kubernetes relies on API authorization and service accounts. The cluster audit log can show user/service-account identity, verb, resource, namespace and response status. Security incidents can involve privileged pod creation, exec into pods, secret reading or RBAC changes. Logging and admission controls vary by cluster.',
'Identify actor/service account and namespace > Inspect API verb, resource and status > Compare RBAC grants and workload spec > Examine pod process and network activity > Scope secret access and linked cloud identity',
'Kubernetes audit policy and API logs ; RBAC RoleBinding changes ; Pod spec securityContext ; Container runtime events',
'A service account in a staging namespace gains cluster-admin and creates a hostPath pod. Verify deployment automation versus anomalous permissions and host access.',
'An API request rejected with 403 does not mean the requested action succeeded.',
'What does kubectl exec imply in audit data?',
'A request to execute in a container; success, user, image and process behavior must be verified in context.')
add('L2','Investigation','Data exfiltration: establish proof and limits',
'Exfiltration is a claim about outbound transfer of information, not merely a large connection. Correlate resource access, staging, identity and egress logs. Proxy byte counts can include uploads and downloads depending on vendor definitions. Understand whether cloud data-access events were enabled.',
'Identify sensitive data source and access events > Review staging/archive activity > Resolve network direction and byte semantics > Correlate destination/domain and actual object download or upload > Quantify observed, possible and unknown data scope',
'File access audit ; DLP alert and policy ; Proxy/firewall bytes ; Cloud object access logs ; DNS destination',
'An admin host sends 4 GB to a new external domain after bulk document reads. Investigate authorized backup/export and check whether the transfer completed.',
'Large outbound bytes alone are not definitive proof of data theft; distinguish traffic type and payload.',
'How would you phrase uncertain exfiltration impact?',
'“Observed bulk read of N objects and outbound transfer to destination X; content and completion unverified pending DLP/proxy evidence.”')
add('L2','Incident response','NIST SP 800-61 Rev.3: response within risk management',
'NIST SP 800-61 Revision 3 (April 2025) supersedes Revision 2 and aligns incident response across the CSF 2.0 functions. Governance, identification and protection support preparedness; detection, response and recovery involve operations. A SOC still needs organization-specific triage, containment authority and crisis communications.',
'Prepare roles, logging and decisions before incidents > Detect and analyze evidence > Coordinate authorized containment and eradication > Restore services and validate normal operation > Feed lessons learned back into risk controls and detections',
'Incident commander and decision logs ; Technical evidence ; Containment approval ; Recovery validation ; After-action review',
'An administrator credential compromise triggers session revocation, privilege review, scoped access investigation and recovery validation rather than just marking an alert resolved.',
'Do not cite old Revision 2 phases as if they were the exact structure of Revision 3; policies may map activities differently.',
'What changed in NIST 800-61 Revision 3?',
'It integrates incident response guidance into broader organizational cybersecurity risk management using CSF 2.0, rather than treating response as an isolated cycle.')
add('L2','Incident response','Containment decision: isolate, block, revoke or observe',
'Containment actions have different blast radius and evidence implications. Host isolation, account disablement, token revocation, firewall blocks and process termination can disrupt critical services or tip off an attacker. The correct decision balances active harm, confidence, business dependencies and authority.',
'Confirm active harm and impacted systems > Choose reversible or targeted control if possible > Get emergency approval or invoke authority > Record exact change, time and expected side effects > Monitor for adversary movement and restoration conditions',
'Approved incident playbook ; Business service dependencies ; Active session list ; Change/audit log ; Validation evidence',
'A compromised API key is actively used to list secrets. Rotate/revoke the key with cloud owner coordination and verify rejected follow-up requests.',
'Quarantining a host containing the only copy of fragile evidence may complicate forensic preservation; coordinate acquisition when time permits.',
'What should you do immediately after containment?',
'Verify the control took effect, check for alternate access, document side effects and maintain monitoring.')
add('L2','Incident response','Evidence handling and chain of custody',
'Investigations must preserve original log context, acquisition timestamps, hashing and who handled evidence. Hashes establish integrity comparisons, not source authenticity. In some environments formal forensic procedures, legal holds and retention policies control what may be collected and where it can be stored.',
'Define scope and collection authority > Acquire original artifact without unnecessary modification > Record source, collector, UTC time and method > Calculate and store cryptographic hash > Restrict access and document transfer/analysis',
'Original log export ; SHA-256 digest ; Case and evidence ID ; Custodian/access ledger',
'An exported EDR triage bundle is stored read-only, hashed and linked to the case record before a copy is used for analysis.',
'Do not upload sensitive real incident artifacts to an unapproved personal account or public malware scanner.',
'Does a matching SHA-256 prove evidence is authentic?',
'It supports that two byte sequences match; provenance and chain-of-custody records establish the surrounding authenticity story.',
'sha256sum evidence.bin  # read-only local copy')
add('L3','Threat hunting','Build a falsifiable hunting hypothesis',
'Threat hunting begins with an explicit proposition based on a threat, environment weakness or telemetry anomaly. A useful hypothesis identifies behavior, expected data sources, population, time range and disconfirming evidence. Finding nothing is meaningful only when logging and coverage are known.',
'State attacker behavior and target assets > Map expected telemetry and ATT&CK technique > Design population and time window > Query and inspect counterexamples > Document result, detection gap and next hypothesis',
'Hypothesis ID ; Data inventory/health ; Query results and counterexamples ; ATT&CK mapping',
'Hypothesis: a compromised build account launched remote processes on servers outside deployment windows. Query account+target process data, then compare the legitimate CI schedule.',
'Hunting every event with “powershell” in it is a keyword search, not a falsifiable hypothesis.',
'What makes a negative hunt credible?',
'Validated data-source coverage, correctly scoped query, tested expectations and a clear statement of remaining blind spots.')
add('L3','Threat hunting','Threat intelligence: IOC, TTP and confidence',
'An IP, domain or hash is an indicator of possible compromise, but indicators expire and can be shared by many legitimate services. Tactics and techniques describe behavior and may persist longer than one IOC. Evaluate source reliability, collection date, false-positive potential and relevance to your environment.',
'Capture indicator with original context and first/last seen > Check validity date and confidence > Search internal exposure with bounded scope > Correlate behavioral evidence > Add expiry and review to block/detection decision',
'Indicator type and sighting time ; Source confidence ; Behavioral ATT&CK mapping ; Asset matches',
'A cloud CDN IP appears in a blocklist from years ago. Search host/path/certificate context before assuming every connection is malicious.',
'Never automatically block a public cloud IP solely because one historical report associated it with malware.',
'What is the advantage of TTP-based detection?',
'It targets attacker behavior that is harder to change than one hash or IP, though context and tuning still matter.')
add('L3','Detection engineering','From hypothesis to detection rule',
'Detection engineering converts a behavioral hypothesis into observable fields and a tested rule. Define required log sources, expected benign volume, selection criteria, unit tests, ownership and a review schedule. Plan whether the alert generates actionable evidence or merely duplicates another signal.',
'Specify hypothesis and threat behavior > Inventory available fields and parser limits > Build baseline and candidate rule > Test known malicious-like and benign samples > Set severity, runbook, owner, suppression and monitoring',
'Rule version and test dataset ; Required source schema ; Coverage/time window ; False-positive measurements ; Alert sample',
'Rule: flag Office spawning a script interpreter with unusual network egress, but exclude approved signed automation only after documenting the reason.',
'Generic global exclusions can suppress real malicious use of trusted admin tools.',
'What makes a detection production-ready?',
'It has validated telemetry, tested positive/negative cases, a response owner, expected alert volume and a review process.')
add('L3','Detection engineering','Sigma and cross-SIEM portability',
'Sigma is a vendor-agnostic detection rule format describing logsource, selections, conditions and metadata. Translation to SPL or KQL may lose fidelity if the target schema differs. Rules should be verified against representative events in the actual SIEM before deployment.',
'Define logsource category/product > Write selections and condition > Add ATT&CK tags and false positives > Translate to target query language > Test raw events, parser and noisy populations',
'Sigma title/id and tags ; logsource ; detection selection ; condition ; Field mapping',
'A Sigma selection for Image|endswith: powershell.exe may need a process.name or NewProcessName mapping depending on the log source.',
'Converting a Sigma YAML file to a query does not validate field existence or performance in production.',
'Why can a translated detection fail silently?',
'Field mappings, case sensitivity, time windows, or missing source telemetry can cause the query not to match expected events.')
add('L3','Detection engineering','Detection quality: precision, recall and feedback',
'Precision asks how many alerts were actionable; recall asks how much relevant malicious behavior a detector catches. In practice recall requires controlled test data or a proxy estimate because unknown attacks are not countable. Alert fatigue, detection latency and analyst effort are operational quality metrics.',
'Define ground-truth test set and limits > Measure TP, FP, FN and alert rate > Compute precision and available recall estimate > Analyze false positives by cause > Tune narrowly and retest on a holdout set',
'TP/FP/FN ; Time to detect ; Alert count per shift ; Tuning change log ; Test fixtures',
'80 actionable alerts out of 100 fired gives precision 80%; it does not tell you how many attacks the detector missed.',
'Do not report recall as 100% from a set containing only known positive fixtures.',
'How do you calculate precision?',
'TP / (TP + FP), where TP and FP definitions must be grounded in reviewed cases.')
add('L3','Detection engineering','Telemetry gaps and silent failure',
'Sensors, connectors, parsers, retention rules, storage permissions and queries can all silently fail. Monitor event volume, last-seen time, parsing-error rate and schema drift. A green ingestion connector does not guarantee coverage on every endpoint or cloud region.',
'Inventory expected assets and event types > Monitor last-seen and rate by source > Validate sample event fields > Run synthetic tests of known safe behavior > Raise coverage incidents when required evidence is missing',
'Heartbeat and connector status ; Event count trends ; Parser errors ; Asset inventory reconciliation ; Source retention',
'A Windows service telemetry rule produces zero alerts because Sysmon process creation stopped forwarding from half the fleet. The correct fix is ingestion, not rewriting the detection.',
'“No alerts today” can mean either good security or broken visibility.',
'How can you detect logging pipeline regression?',
'Baseline event volume and last-seen by sensor, compare against inventory and perform known benign test events.')
add('L3','Detection engineering','Purple-team validation and safe emulation',
'Purple teaming turns an attack-technique hypothesis into bounded tests observed by defenders. Validate authorized scope, test accounts, rollback, expected event IDs and safety controls before running anything. The goal is to prove telemetry and response behavior, not merely to execute an attack tool.',
'Agree objective, assets and approval > Map technique to expected sensor signals > Execute a non-destructive controlled test > Measure whether SIEM/EDR detected the sequence > Record blind spots, improvements and rerun',
'Approved test plan ; Expected event IDs ; SIEM alert ID ; Timeline ; Rollback record',
'A permitted scripted service creation on a lab VM tests that System 7045 reaches the SIEM and triggers the intended rule; remove the service afterward.',
'Never test on production without written authorization and impact/rollback planning.',
'What is a successful purple-team outcome?',
'An evidence-backed mapping of observed or missing telemetry, response performance and improvements validated by a rerun.')
add('L3','Cloud security','AWS CloudTrail coverage and correlation',
'CloudTrail records AWS API activity such as authentication-related actions, resource management and selected data events when configured. Management events are not equivalent to all object reads. Regional settings, organization trails, event history and lake retention affect visibility.',
'Check trail scope and enabled event types > Find principal, session and eventName > Correlate source IP, user agent and request parameters > Validate response error or success > Pivot to affected resource data events and policy changes',
'CloudTrail eventTime/eventName ; userIdentity ; sourceIPAddress ; requestParameters ; errorCode',
'An unusual PutBucketPolicy is followed by GetObject attempts. Only data-event coverage can support which objects were actually accessed.',
'Absence of a GetObject event may reflect disabled data-event logging rather than no access.',
'What is the difference between management and data events?',
'Management events describe control-plane changes; data events capture selected resource-level operations when enabled.')
add('L3','Cloud security','Azure/Microsoft Entra sign-in and audit correlation',
'Identity logs show interactive and non-interactive sign-ins, device and Conditional Access details. Audit events can show group additions, app grants and policy changes. Authentication success, token issuance and downstream resource usage may be separate records; follow user and correlation identifiers.',
'Find actor/user and sign-in context > Review device and Conditional Access outcomes > Correlate app/tenant and session ID > Inspect audit changes and token use > Scope mail/storage access where audit coverage exists',
'SigninLogs and NonInteractiveUserSignInLogs ; AuditLogs ; Risk events ; CorrelationId ; DeviceDetail',
'A new service principal credential is registered after suspicious admin sign-in. Review app ownership, privilege grants and subsequent token issuance.',
'Geo-IP location estimates are approximate and VPN/proxy locations can mislead; require multiple signals.',
'Why check non-interactive sign-ins?',
'Token refresh and automated access may occur without a fresh user-driven sign-in prompt.')
add('L3','Cloud security','GCP audit logs and IAM role scope',
'GCP uses project, folder and organization IAM policies. Cloud Audit Logs include Admin Activity and selected Data Access events, with differing default collection and cost semantics. Service account key creation, impersonation and broad role grants are high-value investigative pivots.',
'Find project/folder/organization scope > Inspect protoPayload principalEmail and methodName > Check permission changes and actor identity > Review service-account token and key events > Validate Data Access coverage and affected resources',
'Cloud Audit Logs protoPayload ; IAM policy delta ; service account impersonation ; Cloud Storage object logs',
'A service account gains storage.admin on a production project. Compare the change with deployment automation and determine whether object access occurred.',
'A project IAM view may omit inherited folder/org privileges, so examine hierarchy and effective access.',
'Why can a service account be risky without a user password?',
'Its keys or delegated tokens can be abused to call APIs with whatever roles the account has.')
add('L3','Cloud security','Kubernetes audit and RBAC drift',
'Kubernetes RBAC bindings can escalate a service account from namespace-scoped access to cluster-wide privileges. The audit pipeline, API server rules and admission events are separate signal types. Investigate resource verbs, affected namespaces, requester identity and resulting pod specifications.',
'Find binding or role modification > Identify requester and impersonation context > Compute effective permissions > Locate pod create/exec and secrets reads > Review linked cloud permissions and runtime behavior',
'audit event verb/responseStatus ; user.username ; resource/namespace ; RoleBinding subject ; pod securityContext',
'A deployment controller unexpectedly binds a workload service account to cluster-admin then launches a pod with host networking. Compare declared CI manifests and pipeline identity.',
'A successful RBAC change is not proof that the permissions were exercised.',
'Why is service-account identity important?',
'Workloads often authenticate to the API through service accounts; the grant and API actions may occur without a human sign-in.')
add('L3','Governance','Evidence, retention and privacy in SOC work',
'Log retention, access controls and evidence handling are both security and governance concerns. More collection is not always better: sensitive data can create privacy and operational risk. Set lawful purpose, role-based access, retention schedules and secure exports, and minimize exposure in tickets.',
'Classify log sensitivity and purpose > Define retention and authorized access > Redact secrets from routine tickets > Preserve incident evidence under legal/policy hold > Record deletion/export and review access',
'Data classification ; Retention configuration ; RBAC audit ; Evidence access journal ; Legal hold',
'An analyst copies full authentication tokens into a ticket while investigating suspicious sign-ins; the correct practice is to record token identifiers and secure artifact references instead.',
'Never paste live credentials, bearer tokens, private keys or personal information into public repositories or training games.',
'Why should SOC notes avoid secrets?',
'Tickets may be widely accessible and retained; include only necessary identifiers and store sensitive artifacts in approved secure systems.')
add('L3','Governance','Metrics that matter: MTTD, MTTR and quality',
'Mean time to detect and mean time to respond summarize operational behavior but can be distorted by outliers and inconsistent start clocks. Also measure false-positive workload, coverage, case completeness and containment validation. Segment by severity and incident type rather than comparing unrelated cases.',
'Define start/end timestamp semantics > Separate detections from confirmed incidents > Calculate percentile and mean times > Audit note completeness and detection health > Review trends with team and improve bottlenecks',
'Detection time ; Incident confirmation time ; Containment time ; Severity labels ; QA findings',
'Two severe incidents take 15 minutes and 12 hours to contain; the mean hides the wide distribution, so report median/percentiles and explain constraints.',
'Faster closure is not always better if cases are closed without evidence or risk acceptance.',
'Why is MTTR ambiguous without a definition?',
'Organizations may mean mean time to respond, remediate or recover; define the clock and population.')

print('chapters:',len(chapters))

references=[]
def ref(group, key, label, meaning, pivot, limit):references.append({'group':group,'key':key,'label':label,'meaning':meaning,'pivot':pivot,'limit':limit})
# Windows event IDs are provider-sensitive. These refer to the named provider, not global meanings.
for data in [
('4624','Successful logon','Authentication success with logon type and account context','Link Logon ID, IP, host and process','Does not prove privilege or intent'),
('4625','Failed logon','Authentication failed on the reporting Windows system','Group Status/SubStatus, user, source and type','May be stale service credentials'),
('4634','Logoff','A logged-on session ends','Compare Logon ID to session start','Does not guarantee network tokens expired'),
('4648','Explicit credentials','A process attempted sign-in using explicitly provided credentials','Check process and destination','Legitimate admin and service tools generate this'),
('4672','Special privileges','Sensitive privileges assigned to a new session','Correlate 4624 and account role','Common for administrators and services'),
('4688','Process creation','New process event if auditing is enabled','Inspect parent, command line and user','Command line collection depends on policy'),
('4697','Service installed','New service installed when audit setting produces this event','Confirm service binary and actor','System 7045 is another source'),
('4698','Scheduled task created','New task created when corresponding auditing is enabled','Inspect TaskName and TaskContent','Normal software deployment uses tasks'),
('4702','Scheduled task updated','Existing task changed','Compare previous task definition and actor','Audit policy may omit events'),
('4719','Audit policy change','Windows audit policy configuration changed','Check actor, host and baseline','Group Policy can cause authorized changes'),
('4720','User account created','New local or domain user account created','Find creator and subsequent group assignment','Check account location/provider'),
('4722','User account enabled','An existing account was enabled','Link approval and subsequent logon','Often legitimate account lifecycle'),
('4723','Password change attempt','A user attempted to change own password','Inspect actor and success/failure','Not automatically suspicious'),
('4724','Password reset attempt','An account attempted to reset another account password','Check target, actor and authorization','Admin and helpdesk use this'),
('4726','User account deleted','An account was deleted','Link lifecycle ticket and other events','Does not prove no backups or other identities'),
('4728','Member added to global group','Account added to a security-enabled global group','Inspect sensitive group and actor','Privileges depend on group meaning'),
('4732','Member added to local group','Account added to a security-enabled local group','Check local Administrators and remote origin','Not every group is privileged'),
('4738','User account changed','An account attribute was modified','Inspect change detail and correlation','May be routine directory maintenance'),
('4740','Account locked','Account lockout triggered','Correlate recent 4625 activity and caller computer','Can be stale password/service'),
('4768','Kerberos TGT requested','Ticket Granting Ticket request from DC perspective','Inspect user, client and encryption','Successful request not compromise'),
('4769','Kerberos service ticket','Ticket request for an SPN','Group by SPN and client, check subsequent access','Request alone not Kerberoasting proof'),
('4771','Kerberos preauthentication failed','Preauth failed on a domain controller','Check failure code and source','Time skew/expired passwords possible'),
('4776','NTLM authentication validation','DC validates NTLM credentials','Check workstation and NTLM usage','DC-side context differs from endpoint'),
('1102','Security audit log cleared','Security event log was cleared','Investigate actor and previous events','May be approved maintenance'),
]:ref('Windows Security',data[0],data[1],data[2],data[3],data[4])
for data in [
('7045','Service installed','Windows System Service Control Manager recorded installation','Check executable path, account and install context','Does not itself prove malicious execution'),
('1','Process Create','Sysmon process creation with GUID, image and command line','Correlate parent GUID and file hashes','Depends on Sysmon configuration'),
('3','Network connection','Sysmon network connection when enabled','Link ProcessGuid to destination','No packet payload, can be high volume'),
('7','Image loaded','Sysmon module/image load telemetry','Check module path and signature','Often disabled due to volume'),
('8','CreateRemoteThread','Sysmon thread creation in another process','Inspect source/target and context','Can be used by benign tools'),
('10','Process access','Sysmon process access request','Check accessed process and granted rights','Not proof of credential dump'),
('11','File create','Sysmon file created by process','Check directory, hash and parent process','Not all file activity appears'),
('12/13/14','Registry actions','Sysmon registry create/set/rename','Inspect persistence paths and actor','Enable matching rules and scope'),
('15','FileCreateStreamHash','Alternate data stream hash telemetry','Review origin and file path','Coverage is configuration-dependent'),
('22','DNS query','Sysmon DNS query by process','Link process and subsequent network flows','Query is not proof of connection'),
('23/26','File deletion','Sysmon file delete event modes','Inspect deleted file and process','Differs by Sysmon configuration'),
]:ref('System / Sysmon',data[0],data[1],data[2],data[3],data[4])
for data in [
('22/TCP','SSH','Remote encrypted command/session access','Correlate sshd log and source identity','Port can be changed'),
('25/TCP','SMTP','Server-to-server mail transport','Correlate mail relay and sender','May use STARTTLS'),
('53/UDP,TCP','DNS','Resolver lookups and TCP fallback/zone transfers','Query names and process attribution','DNS can use DoH/DoT on other ports'),
('67-68/UDP','DHCP','Dynamic IPv4 address leasing','Correlate lease and MAC/hostname','Leases expire or rotate'),
('80/TCP','HTTP','Unencrypted web traffic by convention','Review proxy and server logs','May redirect to HTTPS'),
('88/TCP,UDP','Kerberos','AD Kerberos authentication services','Domain controller event IDs','Usage depends on domain design'),
('123/UDP','NTP','Clock synchronization','Find time drift anomalies','Some environments use alternate time sync'),
('135/TCP','RPC Endpoint Mapper','Windows RPC service discovery','Check remote admin context','Many Windows services depend on RPC'),
('137-139','NetBIOS','Legacy SMB naming/session protocols','Check lateral access patterns','Not universal in modern networks'),
('389/TCP,UDP','LDAP','Directory queries and authentication','Review bind and directory audit','LDAP alone does not imply insecurity'),
('443/TCP','HTTPS','Encrypted web and API traffic','Proxy/TLS metadata and application logs','Port does not prove content'),
('445/TCP','SMB','Windows file share and related services','4624 type 3, share access, EDR','Used heavily by business tools'),
('464/TCP,UDP','Kerberos password change','Password change service in AD','Correlate account resets','Not equivalent to login'),
('514/UDP','Syslog','Classic unencrypted syslog forwarding','Check sender and collector','TLS syslog commonly 6514'),
('636/TCP','LDAPS','LDAP protected with TLS','Directory operation logs','TLS does not prove authorization'),
('1433/TCP','MS SQL Server','Common SQL Server endpoint','DB audit and application context','Configured ports may differ'),
('1521/TCP','Oracle DB','Common Oracle listener port','Database and network audit','Non-default ports possible'),
('2049/TCP','NFS','Network File System shares','Mount access and file audit','Permissions matter more than port'),
('3306/TCP','MySQL','Common MySQL service port','DB audit plus process/identity','Can be reconfigured'),
('3389/TCP','RDP','Windows remote interactive desktop','4624 type 10 / RDP operational logs','Can be tunneled or remapped'),
('5432/TCP','PostgreSQL','Common PostgreSQL endpoint','Server and auth audit','May sit behind proxy'),
('5985/TCP','WinRM HTTP','PowerShell remoting transport','WinRM/PowerShell operational logs','TLS variant normally 5986'),
('5986/TCP','WinRM HTTPS','Encrypted WinRM listener','Remote process execution audit','Authentication still matters'),
('6443/TCP','Kubernetes API','Common Kubernetes API server','Audit verbs and RBAC','Endpoint can differ'),
('8080/TCP','Alt HTTP','Common nonstandard web service','Application and proxy access logs','No unique protocol guarantee'),
('8443/TCP','Alt HTTPS','Common alternate HTTPS admin/web endpoint','TLS + app events','No unique protocol guarantee'),
]:ref('Network ports',data[0],data[1],data[2],data[3],data[4])
for data in [
('TA0001','Initial Access','Getting into a target environment','Correlate auth, web, email and endpoint telemetry','ATT&CK tactic describes objective, not proof'),
('TA0002','Execution','Running attacker-controlled code or commands','Analyze process lineage and command logs','Legitimate tools execute too'),
('TA0003','Persistence','Maintaining foothold across sessions','Check services, tasks, OAuth grants and keys','Persistence may be dormant'),
('TA0004','Privilege Escalation','Obtaining higher privileges','Review group/role modifications and exploit signals','Role grant need not be exercised'),
('TA0006','Credential Access','Obtaining passwords, tokens or credentials','Check process access, identity events and token use','Not all credential access logs directly'),
('TA0007','Discovery','Learning about network, accounts or environment','Inspect enumeration and API listing context','Admin tools discover routinely'),
('TA0008','Lateral Movement','Accessing other systems','Correlate source/target sessions and execution','Network connection not proof'),
('TA0009','Collection','Gathering information of interest','File access, cloud API and staging evidence','Collection not exfiltration'),
('TA0011','Command and Control','Communicating with controlled systems','DNS, proxy, EDR and egress correlation','Periodic traffic can be benign'),
('TA0010','Exfiltration','Moving information out','Correlate access and transfer proof','Outbound bytes are not definitive'),
('TA0040','Impact','Manipulating, degrading or destroying services','Ransomware/backup/process and app telemetry','Service issues may be operational'),
('TA0112','Defense Impairment','Degrading security tooling and defensive controls','Telemetry drop, agent changes, policy edits','Tool maintenance may be approved'),
]:ref('ATT&CK tactics',data[0],data[1],data[2],data[3],data[4])

recipes=[]
def recipe(tier,name,platform,hypothesis,query,interpret,pivot):recipes.append({'id':'rq%02d'%(len(recipes)+1),'tier':tier,'title':name,'platform':platform,'hypothesis':hypothesis,'query':query,'interpret':interpret,'pivot':pivot})
recipe('L1','Failed logons by account and source','Splunk SPL','Concentrated or distributed failed authentications need contextual validation', 'index=windows EventCode=4625 earliest=-24h | stats count by Account_Name, Source_Network_Address | sort -count', 'Group failures; investigate both high count per account and high distinct account count per source.', 'Check follow-up successes, logon type, source asset and lockout policy.')
recipe('L1','Failed Windows logons with KQL','Sentinel KQL','Review failures by account and originating address', 'SecurityEvent | where TimeGenerated > ago(24h) | where EventID == 4625 | summarize Failures=count() by Account, IpAddress | top 25 by Failures desc', 'Aggregated counts can hide shared gateways and legitimate password resets.', 'Correlate 4624, account roles, device ID and approved maintenance.')
recipe('L1','Successful login after failure burst','Sentinel KQL','Check whether authentication failures led to success', 'let F=SecurityEvent | where TimeGenerated > ago(1d) and EventID==4625 | summarize Failed=count() by Account; SecurityEvent | where TimeGenerated > ago(1d) and EventID==4624 | join kind=inner F on Account | project TimeGenerated, Account, Failed, Computer', 'This is illustrative account-level correlation, not proof the same source succeeded; add time/source and logon-type constraints.', 'Confirm successful session source, user, application and subsequent actions.')
recipe('L1','Unusual PowerShell launches','Splunk SPL','Identify script interpreters with unusual parents or flags', 'index=edr process_name="powershell.exe" | table _time host user parent_process command_line', 'Inspect parent process, user, signing and exact command intent.', 'Link process GUID to network connections and file writes.')
recipe('L1','DNS NXDOMAIN spikes','Sentinel KQL','Rapid failed DNS lookups may indicate misconfiguration or algorithmic domains','DnsEvents | where TimeGenerated > ago(2h) and ResponseCode == "NXDOMAIN" | summarize NX=count(), Domains=dcount(Name) by ClientIP | top 20 by NX desc','High rates may come from browsers, typos, software updates or DGA; inspect query names.','Tie client IP to endpoint process and outbound activity.')
recipe('L1','HTTP error burst','Splunk SPL','A client generating frequent 401/403/404 may be enumerating or misconfigured','index=proxy (status=401 OR status=403 OR status=404) earliest=-1h | stats count dc(uri_path) as paths by src_ip | sort -count','Count unique paths and compare sanctioned scanners or monitoring.','Look for later 200 on sensitive routes and backend authorization logs.')
recipe('L2','Suspicious privileged group changes','Splunk SPL','New group members may change effective domain permissions','index=windows (EventCode=4728 OR EventCode=4732) earliest=-7d | table _time host SubjectUserName MemberName TargetUserName','Use group SID and name to determine actual privilege; event fields vary by source.','Check change approval, actor logon, account creation and follow-on resource access.')
recipe('L2','Service installation deviations','Splunk SPL','Unexpected service installation can indicate remote execution or authorized deployment','index=windows EventCode=7045 earliest=-72h | stats count values(Service_File_Name) as Binaries by Computer, Service_Name','Compare paths and maintenance schedule.','Find installer process, related 4624, source machine and service start.')
recipe('L2','Office launches a shell','Sentinel KQL','Office-to-script process lineage may indicate malicious document execution','DeviceProcessEvents | where Timestamp > ago(24h) | where InitiatingProcessFileName in~ ("WINWORD.EXE","EXCEL.EXE","OUTLOOK.EXE") and FileName in~ ("powershell.exe","cmd.exe","wscript.exe") | project Timestamp,DeviceName,FileName,ProcessCommandLine,InitiatingProcessFileName','Office automation can cause legitimate matches; investigate command, document origin and child activity.','Pivot to file hashes, destination URLs and message ID.')
recipe('L2','Remote administrative movement','Sentinel KQL','Remote interactive or network logons from unfamiliar sources may indicate lateral activity','SecurityEvent | where TimeGenerated > ago(24h) and EventID==4624 and LogonType in (3,10) | summarize Hosts=dcount(Computer), Examples=make_set(Computer,10) by Account, IpAddress | where Hosts > 3','Network logons are common for shares and management; baseline accounts and jump servers.','Check target-side service/process creation and privileged group membership.')
recipe('L2','CloudTrail role changes','CloudTrail Lake SQL (illustrative)','Unexpected policy attachment or role trust change can enable escalation', 'SELECT eventTime,eventName,userIdentity.arn,sourceIPAddress FROM event_data_store WHERE eventName IN (\'AttachRolePolicy\',\'PutRolePolicy\',\'UpdateAssumeRolePolicy\') ORDER BY eventTime DESC LIMIT 100', 'Adapt store/table/schema to your account. Changes do not prove role use.', 'Look for AssumeRole then sensitive API actions and approved change records.')
recipe('L2','Cloud object access validation','CloudTrail Lake SQL (illustrative)','Data exposure needs actual data-plane evidence when logging is enabled','SELECT eventTime,eventName,userIdentity.arn,requestParameters FROM event_data_store WHERE eventName IN (\'GetObject\',\'ListObjectsV2\') ORDER BY eventTime DESC LIMIT 100','CloudTrail S3 data events must be enabled for object operations; event names and schemas vary.','Correlate object sensitivity, source principal and network egress.')
recipe('L2','Kubernetes risky API verbs','Kubernetes audit / JSON filter','A service account modifying RBAC or secrets needs review','{verb in ["create","patch","update","get"] AND objectRef.resource in ["clusterrolebindings","rolebindings","secrets"]}','Pseudocode filter, not a runnable API query; adapt to log pipeline.','Check responseStatus, role binding, workload image and ticket.')
recipe('L2','OAuth app consent changes','Sentinel KQL','Unexpected consent grants may persist beyond password changes','AuditLogs | where TimeGenerated > ago(7d) | where OperationName has_any ("Consent", "Add service principal") | project TimeGenerated, OperationName, InitiatedBy, TargetResources','Verify exact tenant audit operation names before use; client IDs and scope matter.','Look for resource reads and noninteractive token use.')
recipe('L3','Stale or missing sources','Sentinel KQL','Silent gaps in telemetry invalidate negative conclusions','Heartbeat | summarize LastSeen=max(TimeGenerated) by Computer | where LastSeen < ago(2h)','A healthy agent may still miss individual event types; cross-check source inventory.','Compare source volume, ingestion pipeline and parser failures.')
recipe('L3','Rare parent-child pairs','Sentinel KQL','Anomalous process relationships help rank unusual execution','DeviceProcessEvents | where Timestamp > ago(14d) | summarize Runs=count(), Devices=dcount(DeviceName) by InitiatingProcessFileName,FileName | where Runs < 5 | sort by Runs asc','Rarity is not maliciousness; deploy only with baseline/allowlist context.','Link to command line, user, signer and network behavior.')
recipe('L3','Cloud role session anomaly','CloudTrail Lake SQL (illustrative)','Unexpected role assumption can grant new lateral access','SELECT eventTime,userIdentity.arn,sourceIPAddress,eventName FROM event_data_store WHERE eventName=\'AssumeRole\' ORDER BY eventTime DESC LIMIT 200','Queries are illustrative; STS session behavior and field schema vary.','Trace subsequent API operations made under the assumed session.')
recipe('L3','Data source volume regression','Splunk SPL','A sensor or parser outage can resemble a drop in malicious activity','index=security earliest=-24h | timechart span=1h count by sourcetype','Compare against fleet inventory and historical day/time baseline.','Check collectors, missing endpoints and field extraction drift.')
recipe('L3','Network beaconing hypothesis','Splunk SPL','Periodic destination connections may indicate automation or command and control','index=proxy earliest=-24h | stats count min(_time) as first max(_time) as last by src_ip dest_host | where count>20','Periodic traffic alone is frequently benign; assess interval regularity and process attribution.','Check new domains, abnormal process, user agent and data volume.')
recipe('L3','Sensitive data sharing grants','Sentinel KQL','Unusual access changes can precede data loss','AuditLogs | where TimeGenerated > ago(3d) | where OperationName has_any ("Add member", "Add app role assignment") | project TimeGenerated, OperationName, InitiatedBy, TargetResources','This is a starting point for Entra changes, not complete SharePoint/Drive audit.','Follow application-specific data and resource events.')

sheets=[]
def sheet(name,who,when,body):sheets.append({'id':'sh%02d'%(len(sheets)+1),'title':name,'who':who,'when':when,'body':body})
sheet('Shift handoff','L1 → L1','At start/end of shift','SHIFT (UTC): ______\nCoverage health: [healthy / degraded / unknown] — sources and times ______\nOpen critical cases (IDs, owners, due): ______\nActive containment changes (what / approved by / rollback): ______\nOutstanding evidence requests: ______\nMonitoring exceptions and scheduled tests: ______\nDecisions made and why: ______\nNext analyst confirmation: ______')
sheet('Alert triage record','L1 → L2','For each actionable alert','Case / detection / raw event ID: ______\nObserved time (UTC) and ingest time: ______\nAffected identity, host, service, business owner: ______\nTrigger logic and exact source fields: ______\nIndependent corroboration: ______\nKnown benign context / approved change: ______\nAssessment: [true positive / false positive / benign true positive / uncertain]\nImpact [confirmed / potential], confidence, priority: ______\nEvidence gaps and requested next action: ______')
sheet('Identity compromise escalation','L1/L2 → Identity team','After credential/token risk is supported','Case ID and contact: ______\nUser / identity type / privilege: ______\nFirst and last suspicious events (UTC): ______\nSign-in, MFA and token/session IDs: ______\nSource IP/device/client and uncertainty: ______\nDownstream changes (roles, app grants, mail rules): ______\nOther affected identities: ______\nSuggested action and impact (revoke, disable, reset): ______\nApprover/owner and validation plan: ______')
sheet('Endpoint containment approval','L2 → Incident commander','Before impactful host isolation','Host / business service / owner: ______\nConfirmed behavior and time: ______\nActive malicious action vs hypothesis: ______\nProposed containment: [isolate / process block / firewall rule / other]\nService impact and rollback time: ______\nForensic collection completed/pending: ______\nAuthorization reference and emergency authority: ______\nVerification signal and observer: ______')
sheet('Phishing campaign case','L1/L2 → Messaging team','On malicious mail/click discovery','Original message ID and header artifact: ______\nSender, Reply-To, authentication alignment: ______\nAttachment hash/URL chain (do not activate links): ______\nRecipient count, delivered/quarantined count: ______\nKnown clicks/credential submissions (confirmed vs inferred): ______\nIdentity sessions and mailbox actions: ______\nContainment decision and user notification owner: ______')
sheet('Cloud IAM role-change review','L2 → Cloud owner','On unexpected high privilege grant','Tenant/account/project and role: ______\nActor, source session, MFA and device: ______\nExact API action / UTC time / request ID: ______\nBefore/after permissions and resource scope: ______\nAffected secrets, buckets, storage and keys: ______\nAudit coverage (management/data events): ______\nConfirmed subsequent access and unknowns: ______\nApproval/change ticket and response owner: ______')
sheet('Threat-hunting hypothesis','L3 → Detection engineering','Before a hunt','Hypothesis ID / ATT&CK mapping: ______\nBehavior to test (falsifiable): ______\nPopulation, window and safe exclusions: ______\nExpected events and required fields: ______\nLog source health and coverage check: ______\nQuery and sample results: ______\nCounterexamples / alternate explanations: ______\nResult [supported / not supported / inconclusive]: ______\nDetection or telemetry improvement: ______')
sheet('Detection change request','L3 → Engineering','Before enabling/tuning alerts','Rule name/version/owner: ______\nBehavior and threat relevance: ______\nRequired events, fields and retention: ______\nPositive test fixtures and expected matches: ______\nNegative fixtures and expected non-matches: ______\nEstimated daily volume and analyst effort: ______\nException scope and expiration: ______\nRollback and post-deployment health check: ______')
sheet('Incident impact assessment','L2 → Incident commander','During scoping and after containment','Confirmed impacted assets and identities: ______\nPotentially exposed assets (not yet verified): ______\nKnown entry point and first observed time: ______\nObserved persistence and privilege changes: ______\nData access/transfer evidence and gaps: ______\nBusiness availability/integrity effects: ______\nContainment state and remaining alternate paths: ______\nConfidence and next proof required: ______')
sheet('Lessons learned','IR team','After recovery validation','Incident and owner: ______\nWhat detected and what was missed: ______\nTime between first activity, detection and response: ______\nWhat slowed triage or decisions: ______\nTelemetry gaps and parser errors: ______\nPlaybook/policy failure or success: ______\nImprovement owner, measurable acceptance test and due date: ______\nRetest result and closure approval: ______')

library={'version':'8.0','chapters':chapters,'references':references,'recipes':recipes,'sheets':sheets,'notes':{'scope':'All fictional examples, no live target access, no secrets or client data. Commands are reference examples; adapt fields, privileges, and authorization to your environment.','nist':'NIST SP 800-61 Revision 3 (April 2025) supersedes Revision 2.','attack':'ATT&CK taxonomy evolves; tactics explain why and techniques how; examples here are selected educational mappings, not complete coverage.'}}
for name in ('chapters','references','recipes','sheets'):
  assert len(library[name])==len({i['id'] if 'id' in i else (i['group'],i['key']) for i in library[name]}),name
print('reference:',len(references),'recipes:',len(recipes),'templates:',len(sheets))
(root/'field-manual-data.js').write_text('/* Self-contained educational field manual; offline and fictional examples. */\nexport const FIELD_MANUAL = '+json.dumps(library,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
(root/'field-manual-data.json').write_text(json.dumps(library,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
