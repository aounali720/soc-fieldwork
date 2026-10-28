/* SOC Fieldwork Practice Arena: fictional/educational exercises, no network access. */
import { DATA } from './data.js';

// Each matching board has five distinct, auditable answer pairs. The browser randomizes
// the right-hand column while preserving stable IDs and keyboard-friendly controls.
const BOARD_SEEDS = [
['Foundation','Network essentials',[
['TCP','Connection-oriented transport with sequence numbers and retransmission'],['UDP','Connectionless datagram transport'],['DNS','Translates domain names to records'],['ARP','Resolves IPv4 addresses to local link-layer addresses'],['ICMP','Carries network control and error messages']]],
['Foundation','Common service ports',[
['53','DNS (UDP or TCP)'],['22','SSH'],['443','HTTPS'],['3389','RDP'],['445','SMB']]],
['Foundation','Security technology map',[
['SIEM','Centralized search, correlation and alerting on logs'],['EDR','Endpoint process and behavior telemetry with response options'],['IDS','Detects suspicious activity and generates findings'],['SOAR','Automates approved response workflows'],['WAF','Filters application-layer web requests']]],
['Foundation','Web protocol signals',[
['401','Authentication is required or failed'],['403','Authenticated or anonymous request is forbidden'],['404','Requested resource was not found'],['429','Rate limit response'],['500','Application server error']]],
['Foundation','Time and evidence',[
['UTC','Time standard used to correlate sources'],['NTP','Protocol for clock synchronization'],['Hash','Digest used to help verify evidence integrity'],['Baseline','Expected behavior to compare against'],['Retention','How long events remain available']]],
['L1','Windows security events',[
['4624','Successful logon'],['4625','Failed logon'],['4688','New process creation when auditing is enabled'],['4720','New local or domain user account created'],['4740','User account locked out']]],
['L1','Windows logon types',[
['Type 2','Interactive console logon'],['Type 3','Network logon'],['Type 4','Batch logon'],['Type 5','Service logon'],['Type 10','RemoteInteractive logon commonly used for RDP']]],
['L1','Sysmon event IDs',[
['1','Process creation'],['3','Network connection when enabled'],['7','Image loaded when enabled'],['8','CreateRemoteThread'],['22','DNS query']]],
['L1','Phishing email anatomy',[
['SPF','Checks permitted sending hosts for an envelope domain'],['DKIM','Validates an email signature'],['DMARC','Applies domain alignment and policy'],['Reply-To','Address receiving replies; can differ from From'],['Received','Trace of mail handling hops']]],
['L1','Triage vocabulary',[
['True positive','Alert corresponds to genuinely suspicious or malicious activity'],['False positive','Detection fired without the intended malicious activity'],['False negative','Malicious activity was missed by detection'],['Severity','Potential effect and urgency of a finding'],['Confidence','How strongly the available evidence supports an assessment']]],
['L1','Core network telemetry',[
['Zeek conn.log','Connection-level metadata'],['Zeek dns.log','DNS question and response metadata'],['Firewall log','Permitted or denied network traffic'],['Proxy log','Web requests, destinations, and policy outcomes'],['NetFlow','Aggregated flow metadata, not full packet contents']]],
['L1','Alert investigation pivots',[
['Hostname','Identify the affected endpoint'],['Account','Examine identity and login context'],['Parent PID','Trace process lineage'],['Destination IP','Pivot to external communications'],['Timestamp','Correlate events across sources']]],
['L2','Active Directory threats',[
['Kerberoasting','Offline password guessing against captured service ticket material'],['AS-REP roasting','Offline guessing when Kerberos pre-authentication is disabled'],['DCSync','Directory replication-style credential retrieval by an authorized or compromised principal'],['Golden Ticket','Forged TGT after compromise of the krbtgt key'],['Password spraying','Testing one or few candidate passwords across many accounts']]],
['L2','Kerberos protocol elements',[
['AS-REQ','Client requests initial authentication from KDC'],['AS-REP','Initial KDC reply containing TGT-related material'],['TGS-REQ','Requests service ticket using a TGT'],['TGS-REP','Response containing the service ticket'],['KDC','Key Distribution Center providing ticket services']]],
['L2','Investigating suspicious PowerShell',[
['Command line','Shows launch parameters when telemetry captures them'],['Script Block 4104','Potential script content when logging is enabled'],['Parent process','Can reveal unusual execution origin'],['Network destination','Shows likely external communication or downloads'],['User and integrity','Help determine identity and privilege context']]],
['L2','Cloud audit sources',[
['AWS CloudTrail','AWS API activity records'],['Azure Activity Log','Azure control-plane operations'],['Entra sign-in logs','Cloud identity authentication signals'],['GCP Cloud Audit Logs','Google Cloud API and admin activity'],['Kubernetes audit','Kubernetes API server request trail when enabled']]],
['L2','Cloud identity patterns',[
['AssumeRole','Temporary role credentials in AWS'],['Consent grant','Application permission authorization'],['Service principal','Non-human application identity'],['Conditional Access','Policy-based access requirements'],['Access key','Long-lived programmatic credential to govern and rotate']]],
['L2','Ransomware evidence',[
['Mass file rename','Potential encryption or staging symptom'],['Backup tampering','Attempt to weaken recovery'],['Unusual service install','Potential persistence or lateral movement'],['Outbound transfer','Possible exfiltration before encryption'],['Scheduled task','Possible persistence mechanism']]],
['L2','Incident response phases',[
['Preparation','Establish tools, plans, authorities and readiness'],['Detection and analysis','Validate indicators and establish scope'],['Containment','Limit ongoing harm using approved controls'],['Eradication','Remove root causes and adversary footholds'],['Recovery','Restore safe operation and monitor for recurrence']]],
['L3','MITRE ATT&CK concepts',[
['Tactic','Adversary objective or why'],['Technique','General method used to reach the objective'],['Sub-technique','More specific variant of a technique'],['Procedure','Concrete way an actor implemented a technique'],['Data source','Type of telemetry useful for detection or investigation']]],
['L3','Detection quality indicators',[
['Precision','Fraction of flagged items that are relevant positives'],['Recall','Fraction of actual positives that were detected'],['Detection gap','Attack behavior not adequately visible or covered'],['False-positive rate','Fraction of actual negatives incorrectly flagged'],['Mean time to detect','Delay between activity and its detection']]],
['L3','Detection engineering lifecycle',[
['Hypothesis','Behavior and threat assumption to test'],['Telemetry contract','Required source, fields and collection quality'],['Test fixture','Known benign and malicious examples for validation'],['Tuning','Reduce noise without masking critical activity'],['Regression test','Check that updates preserve expected detections']]],
['L3','Threat hunt structure',[
['Hypothesis-driven','Begins from testable adversary behavior'],['Intel-driven','Begins from credible external threat reporting'],['Analytics-driven','Begins from an anomaly or detection pattern'],['Pivot','Move from one observation to related evidence'],['Hunt handoff','Document queries, findings, limits and next actions']]],
['L3','Forensic evidence handling',[
['Chain of custody','Document possession and evidence transfers'],['Volatile memory','Data that may disappear at shutdown'],['Disk image','Forensic copy of stored data'],['Hash comparison','Help detect evidence changes'],['Acquisition log','Records tool, operator, time and source details']]],
['L3','Identity attack graph',[
['Principal','User, service or device identity'],['Privilege edge','Authorization relation between entities'],['Shortest path','Potential chain of permissions to a target'],['Tier 0','Highly privileged identity and domain-control assets'],['Blast radius','Reachable systems or identities exposed by compromise']]]
];
export const MATCH_BOARDS = BOARD_SEEDS.map(([tier,title,pairs],i)=>({id:`m${String(i+1).padStart(2,'0')}`,tier,title,pairs:pairs.map(([term,meaning])=>({term,meaning})),why:'These associations are clues, not a verdict. Correlate with timestamps, identities, configuration and neighboring evidence before closing a real case.'}));

const ORDER_SEEDS = [
['Foundation','DNS resolution path',['Client checks local DNS cache','Resolver queries authoritative hierarchy when needed','Authoritative DNS returns a matching record','Resolver caches the response for its TTL','Client connects using the resolved destination'],'A cache hit may skip upstream lookup. DNS resolution does not by itself establish that a domain is safe.'],
['Foundation','TCP three-way handshake',['Client sends SYN','Server replies SYN-ACK','Client acknowledges with ACK','Application data begins transferring'],'Firewalls and middleboxes can affect the observed sequence; SYN alone is not a completed connection.'],
['Foundation','SOC evidence hygiene',['Record the original alert and time','Identify affected account, asset and scope','Preserve relevant raw events and source context','Correlate independent logs','Write a reproducible finding and handoff'],'Start from the alert but avoid treating its label as established truth.'],
['L1','Triage a suspicious login',['Verify rule logic and raw event','Identify user, device and source IP','Check historical behavior and MFA context','Pivot into nearby identity and endpoint logs','Determine disposition and document next steps'],'An unfamiliar geography alone is not proof of account compromise.'],
['L1','Investigate a phishing email',['Preserve message and headers','Compare sender authentication and alignment','Analyze URLs and attachments safely','Search related mailboxes and delivery logs','Recommend approved containment and notify owners'],'Do not open suspicious attachments on a production workstation.'],
['L1','Analyze an EDR process alert',['Capture process name, path, hash and time','Inspect parent and child process tree','Check command line and identity','Correlate network and file activity','Decide whether escalation is warranted'],'A signed or familiar executable can still be abused.'],
['L1','Shift handover',['Summarize active incidents and owners','List validated findings and outstanding questions','Record assets, timelines and evidence links','Document actions taken and pending approvals','Confirm recipient understands urgency'],'A handover should allow the next analyst to resume without rediscovering context.'],
['L2','Respond to confirmed credential theft',['Validate affected principals and authentication evidence','Scope sessions, devices and granted permissions','Coordinate approved session/token revocation','Reset or rotate credentials after containment plan','Monitor reauthentication and document residual risk'],'Token revocation, key rotation and password change can require different controls.'],
['L2','Lateral movement investigation',['Find suspicious authentication to a new host','Map source, destination and initiating account','Correlate remote service or process creation','Inspect privilege changes and further hops','Build timeline and recommend containment'],'Single successful network logon event does not prove lateral movement.'],
['L2','Ransomware triage',['Identify initial confirmed destructive behavior','Assess spread and business-critical assets','Coordinate containment according to authority','Preserve artifacts while managing recovery needs','Plan eradication, restore and heightened monitoring'],'Safety, production impact and approval authority matter before isolating systems.'],
['L2','Cloud suspicious role use',['Identify API caller and temporary identity','Trace AssumeRole or equivalent credential issue','Review API actions and affected resources','Correlate source context, service logs and identity changes','Contain or narrow access with approved cloud procedures'],'Cloud control-plane logs and data-plane logs often have different coverage.'],
['L2','Web intrusion investigation',['Validate relevant web, WAF and access logs','Correlate request identifiers, IPs and sessions','Check backend errors and target resource access','Determine authentication and data access impact','Write scope and remediation recommendations'],'A blocked payload does not automatically show successful exploitation.'],
['L3','Detection rule lifecycle',['Define a behavioral threat hypothesis','Identify needed log fields and collection gaps','Implement candidate detection with test cases','Measure false positives and operational impact','Deploy with monitoring and regression testing'],'Detection-as-code needs change control, versioning and observable performance.'],
['L3','Hypothesis-driven hunt',['State the adversary behavior being hunted','Identify assets, period and telemetry needed','Run bounded queries and pivot on anomalies','Validate suspicious and benign explanations','Document coverage gaps, findings and next hunts'],'A hunt with no hits does not prove the environment is uncompromised.'],
['L3','Forensic acquisition planning',['Confirm authorization and legal/IR requirements','Decide what evidence is most volatile','Record host time, condition and acquisition context','Acquire and hash approved artifacts','Maintain custody and analysis notes'],'The exact order of live acquisition depends on volatility and operational risk.'],
['L3','Purple-team validation',['Define a narrowly scoped technique objective','Confirm authorization and production guardrails','Generate safe test telemetry','Check detection, alert routing and response','Tune and rerun the regression test'],'A successful test measures end-to-end visibility, not just a rule matching once.'],
['L3','Incident postmortem',['Collect a verified timeline and decisions','Separate observed facts from assumptions','Find root causes and control gaps','Assign measurable corrective actions and owners','Retest fixes and update playbooks'],'The goal is improvement, not blame.']
];
export const ORDER_TASKS=ORDER_SEEDS.map(([tier,title,steps,why],i)=>({id:`o${String(i+1).padStart(2,'0')}`,tier,title,steps,why}));

const TRUE_FALSE_SEEDS = [
['Foundation','HTTPS means the website itself is trustworthy.',false,'TLS encrypts transport and authenticates endpoints under its trust model; it does not certify business legitimacy.'],
['Foundation','DNS queries can reveal suspicious destination infrastructure even when the subsequent HTTPS content is encrypted.',true,'DNS metadata can reveal names and query timing, subject to encrypted DNS and visibility gaps.'],
['Foundation','A single IP address always identifies exactly one human user.',false,'NAT, shared devices, proxies, VPNs and cloud services complicate attribution.'],
['Foundation','UDP traffic requires a three-way handshake before data can flow.',false,'The classic three-way handshake applies to TCP, not UDP.'],
['Foundation','An alert is evidence of a rule firing, not automatically proof of compromise.',true,'Validate the underlying events and independent corroboration.'],
['Foundation','NTP synchronization helps correlate incidents across multiple log sources.',true,'Clock drift can make correct events appear out of order.'],
['L1','Windows Event 4625 indicates a failed logon attempt.',true,'Interpret it with logon type, status and surrounding activity.'],
['L1','Every Windows Event 4624 is evidence of malicious access.',false,'4624 records successful logons, most of which are routine.'],
['L1','A successful SPF result always means the visible From address is authentic.',false,'SPF checks an envelope identity; DMARC alignment helps connect it to the visible domain.'],
['L1','MFA approval fatigue can be suspicious even when a user eventually accepts one challenge.',true,'Review prompting sequence, client context and session behavior.'],
['L1','A single firewall deny record proves an attacker penetrated the network.',false,'A deny can mean a control worked; assess surrounding activity.'],
['L1','Endpoint process ancestry can help distinguish legitimate automation from unusual execution.',true,'Parent/child relationships provide context but are not conclusive.'],
['L1','The absence of a Sysmon event proves no suspicious activity occurred.',false,'Sysmon might not be installed, enabled or configured for that event.'],
['L1','A blocked phishing URL still warrants checking whether the same message reached other users.',true,'Tenant-wide scope is important even if one interaction was blocked.'],
['L1','UTC normalization reduces ambiguity when combining cloud, endpoint and identity timestamps.',true,'Always verify source time-zone semantics and clock accuracy.'],
['L1','Incident severity and detection confidence always mean the same thing.',false,'Severity addresses potential impact/urgency; confidence addresses strength of evidence.'],
['L2','Kerberoasting targets material related to service tickets and weak service account passwords.',true,'Captured service ticket data can enable offline password guessing for some configurations.'],
['L2','A successful DCSync-style event can occur only from a domain controller.',false,'A principal with directory replication permissions may be able to invoke replication remotely.'],
['L2','Deleting a phishing email from one mailbox guarantees all users are protected.',false,'Search tenant-wide, review other copies and address credentials or sessions if exposed.'],
['L2','The presence of an outbound connection is enough to declare confirmed exfiltration.',false,'Correlate transfer size, content, destination context and approved activity.'],
['L2','Revoking web sessions and rotating a password are equivalent security actions.',false,'Session/token validity may persist independently of a password.'],
['L2','Cloud API audit logs always contain every object read and write by default.',false,'Some platforms require explicit data-event or detailed logging configuration.'],
['L2','An EDR isolation action can affect critical production services.',true,'Containment should reflect authority, business impact and incident severity.'],
['L2','Multiple failed logins followed by success can deserve investigation, but can have benign causes.',true,'Investigate account, origin, timing and device context.'],
['L2','Signed binaries can be misused for living-off-the-land activity.',true,'Authenticity of a binary does not determine intent of execution.'],
['L2','A clean malware scan proves an investigated device was never compromised.',false,'No single telemetry or scan offers complete historical certainty.'],
['L3','Detection precision and recall capture different aspects of rule quality.',true,'Precision relates to positive-alert relevance; recall to captured real positives.'],
['L3','A detection rule that passes synthetic tests will always perform well in production.',false,'Real-world data quality, baseline, throughput and drift can change results.'],
['L3','A hunt that finds no matching events proves the hypothesis false.',false,'Collection gaps, timing, scope and query limitations may explain no matches.'],
['L3','ATT&CK tactics describe the adversary objective rather than a specific command.',true,'Techniques and procedures explain methods and implementations.'],
['L3','Changing a parser can silently break downstream detections.',true,'Schema and normalization changes require regression testing.'],
['L3','Forensic hashes by themselves establish every link in chain of custody.',false,'Hashes help integrity but handling and transfers still require documentation.'],
['L3','Purple-team exercises benefit from explicit authorization, safety limits and measurable outcomes.',true,'Defined objectives and guardrails keep testing meaningful and controlled.'],
['L3','Removing all noisy rules always improves security monitoring.',false,'Tuning should preserve coverage and consider detection gaps.'],
['L3','A metric for detection latency can reveal pipeline degradation.',true,'Time-to-detect trends help find collection, parsing or correlation problems.'],
['L3','An admin account must be compromised merely because it used a privileged API.',false,'Legitimate automated operations exist; corroborate context and authority.']
];
export const TRUTH_CHECKS=TRUE_FALSE_SEEDS.map(([tier,statement,answer,why],i)=>({id:`t${String(i+1).padStart(2,'0')}`,tier,statement,answer,why}));

const FILL_SEEDS = [
['Foundation','The transport protocol with SYN, SYN-ACK, ACK is ____.',['tcp'],'TCP'],
['Foundation','A record that maps a domain name to an IPv4 address is type ____.',['a'],'A record'],
['Foundation','The standard name for an IPv6 address DNS record is ____.',['aaaa'],'AAAA record'],
['Foundation','The IP protocol that tests reachability with echo requests is ____.',['icmp'],'ICMP'],
['Foundation','A DNS resolver commonly caches responses according to their ____.',['ttl','time to live'],'TTL'],
['Foundation','Centralized log correlation is commonly performed in a ____.',['siem'],'SIEM'],
['L1','Windows Security event ____ often records a failed logon.',['4625'],'4625'],
['L1','Windows Security event ____ often records a successful logon.',['4624'],'4624'],
['L1','Sysmon event ID ____ logs process creation.',['1','event 1'],'Sysmon Event ID 1'],
['L1','The mail standard used with SPF and DKIM domain alignment is ____.',['dmarc'],'DMARC'],
['L1','In a SIEM, a detection that fires on harmless activity is a false ____.',['positive'],'False positive'],
['L1','A process that launched another process is its ____ process.',['parent'],'Parent'],
['L1','The protocol commonly used for remote Windows graphical logon is ____.',['rdp'],'RDP'],
['L1','An explicit record of an investigation handoff is an escalation ____.',['ticket','case','record'],'Escalation ticket'],
['L2','The Kerberos service that issues tickets is the ____.',['kdc','key distribution center'],'KDC'],
['L2','A forged Kerberos TGT associated with krbtgt compromise is a ____ ticket.',['golden'],'Golden ticket'],
['L2','The Windows technique involving remote directory replication for secrets is ____.',['dcsync'],'DCSync'],
['L2','In AWS, the event service that records API activity is ____.',['cloudtrail','aws cloudtrail'],'AWS CloudTrail'],
['L2','The cloud identity model of granting only the necessary privileges is least ____.',['privilege'],'Least privilege'],
['L2','A malicious login using a previously stolen authentication token is token ____.',['replay'],'Token replay'],
['L2','The initial scope-reducing incident response phase is ____.',['containment'],'Containment'],
['L2','An untrusted program that creates outbound C2 traffic may be detected in ____ telemetry.',['edr','endpoint'],'EDR'],
['L3','A test that ensures code changes do not break existing detections is a ____ test.',['regression'],'Regression test'],
['L3','The ATT&CK term for an adversary objective is a ____.',['tactic'],'Tactic'],
['L3','The metric measuring relevant positive alerts divided by all positive alerts is ____.',['precision'],'Precision'],
['L3','The metric measuring detected real positives divided by all real positives is ____.',['recall'],'Recall'],
['L3','An investigative question that can be tested with evidence is a ____.',['hypothesis'],'Hypothesis'],
['L3','Documentation of evidence possession and transfers is called chain of ____.',['custody'],'Chain of custody'],
['L3','A missing or inadequate analytic capability is a detection ____.',['gap'],'Detection gap'],
['L3','A defined expectation for telemetry availability and latency is a telemetry ____.',['slo','service level objective'],'Telemetry SLO']
];
export const FILL_GAPS=FILL_SEEDS.map(([tier,prompt,answers,solution],i)=>({id:`f${String(i+1).padStart(2,'0')}`,tier,prompt,answers,solution,hint:`Think of the standard security operations term or protocol.`,why:`Reference term: ${solution}. Check relevant telemetry and context when applying this concept in an investigation.`}));

const MCQ_SEEDS = [
['Foundation','A DNS lookup returns an unexpected IP for a corporate domain. What should you verify FIRST?',['Immediately blacklist every returned IP','Compare trusted resolver results, TTL and network context','Reboot all user laptops','Disable DNS logging'],1,'DNS answers can legitimately vary due to CDNs and geo-routing. Confirm the observation before acting.'],
['Foundation','Which evidence best supports that TCP transport established a connection?',['A lone SYN packet','A completed SYN, SYN-ACK and ACK sequence','One DNS query','An ARP broadcast'],1,'The three-way handshake establishes TCP connectivity. It does not confirm application-layer authentication.'],
['Foundation','What is the main benefit of time synchronization for SOC investigations?',['Stops attackers','Makes all logs equally detailed','Allows event sequences from different systems to be correlated','Replaces SIEM normalization'],2,'Aligned clocks help correlate events; each source still needs parsing and time-zone validation.'],
['Foundation','Which statement about logs is most defensible?',['No log means no event','All event fields exist in every product','Field availability depends on configuration, licensing and data source','A log always reveals attacker intent'],2,'Absence may reflect collection gaps rather than absence of activity.'],
['Foundation','A firewall allowed a connection to port 443. What does this establish?',['Credential theft occurred','HTTPS content was malicious','A connection was permitted under observed policy','The user visited a trusted website'],2,'An allow alone proves little about application content or intent.'],
['Foundation','Which field can connect a DNS event with an endpoint alert most reliably?',['Username only','Combined host, timestamp and queried domain','Random ticket number','Alert severity alone'],1,'Use multiple stable pivots rather than relying on one indicator.'],
['Foundation','You see an unknown executable hash. What is the appropriate first interpretation?',['Unknown always means malware','Compare provenance, reputation, prevalence and process context','Ignore any file without detections','Run it on a domain controller'],1,'Reputation is one signal; endpoint behavior and provenance determine next steps.'],
['Foundation','What best describes an IOC compared with an IOA?',['IOC is an observed artifact; IOA describes suspicious behavior pattern','Both only refer to IP addresses','IOA guarantees an attack','IOC is always permanent'],0,'Indicators of attack emphasize behavior, but both require contextual validation.'],
['Foundation','Which item is most useful for verifying a web response truly came from a service?',['HTTP status alone','Request/response IDs correlated with reverse proxy and backend logs','User guess','Icon shape'],1,'Correlating identifiers across layers reduces ambiguity.'],
['Foundation','When correlating logs from two systems, what should you check before ordering events?',['Whether one host is expensive','Time zone, clock drift and timestamp meaning','Only alert count','Font size'],1,'Ingestion time and event time can differ, especially in cloud or offline devices.'],
['L1','A user received ten MFA prompts they did not initiate. What is the most helpful next step?',['Tell them to accept one','Inspect sign-in sequence, challenge results and session issuance','Delete all EDR logs','Assume travel caused it'],1,'MFA fatigue needs authentication context and an appropriate identity escalation.'],
['L1','A phish is marked SPF pass but DMARC fail. What matters?',['SPF guarantees From authenticity','Potential failure of alignment with visible From domain','Attachments cannot be malicious','Mail has already been deleted'],1,'SPF and DKIM authentication are not the same as DMARC identifier alignment.'],
['L1','What should be included in an alert escalation?',['Only a screenshot of severity','Evidence timeline, asset/account scope, confidence and unresolved questions','A guess of attacker identity','Only the final label'],1,'A reproducible handoff lets the next responder act.'],
['L1','A single 4624 Type 3 event appears on a file server. Best judgment?',['Confirmed lateral movement','Routine network logon is possible; inspect origin, account and related signals','Ignore any successful login','Shut down the server'],1,'Network logons are normal in enterprise settings; seek independent evidence.'],
['L1','Which is the stronger correlation for a suspicious PowerShell alert?',['Binary filename alone','Parent process, command line, user and network activity','A green dashboard','Alert priority'],1,'Behavior and ancestry are stronger than one superficial field.'],
['L1','How should an analyst handle an unfamiliar destination IP?',['Label as C2 immediately','Check DNS, ownership, frequency, purpose and other telemetry','Block the entire country','Ignore if HTTPS'],1,'Network context helps separate business services from infrastructure of concern.'],
['L1','An alert query returned no events after a data pipeline outage. What is defensible?',['The attack stopped','The environment is clean','Coverage is uncertain; verify ingestion health and look for alternate sources','Disable the alert'],2,'A quiet SIEM may indicate a blind spot.'],
['L1','Two users report the same phishing email. What expands scope?',['Only examine first mailbox','Search mail trace and related artifacts for other recipients','Ignore the second report','Clear browser cache'],1,'Phishing is often a campaign rather than a one-user problem.'],
['L1','A new service appeared near a suspicious remote logon. What is the best next pivot?',['Service creation log, binary path and originating identity','Delete the service immediately','Ignore it because Windows creates services','Only check browser history'],0,'Cross-host process and service evidence helps confirm lateral execution.'],
['L1','You cannot validate whether a ransomware alert is real. What should you communicate?',['Confirmed ransomware anyway','Unverified high-impact signal, evidence gaps, priority and escalation path','Silence until certain','Disable monitoring'],1,'Uncertainty must be explicit without delaying necessary escalation.'],
['L2','Multiple accounts fail authentication from one origin, then one succeeds. Best next step?',['Assume an admin test','Examine password-spray hypothesis, successful session context and affected hosts','Delete all failures','Only check geo-IP'],1,'Correlate temporal pattern and follow-on activity before deciding.'],
['L2','CloudTrail shows AssumeRole from a newly observed source. What evidence matters?',['Only region name','Caller, role trust policy, session context and API actions','File extension','DNS TTL alone'],1,'A role event requires principal and permission context, not just origin.'],
['L2','A user clicked a malicious link and then granted OAuth consent. What do you assess?',['Only browser cache','App permissions, tokens, affected mail/data and revocation options','Antivirus signatures only','Firewall ports 22'],1,'Consent abuse can create durable access even without a known password theft.'],
['L2','Which action reduces evidence loss when you need to isolate a host?',['Always power it off immediately','Coordinate containment and preserve volatile evidence when safe and authorized','Delete the user profile','Disable logging'],1,'Volatility, criticality and urgency must shape containment.'],
['L2','An EDR alert shows a signed system binary downloading a script. Best conclusion?',['Signed binary means safe','Potential living-off-the-land activity; inspect command line, ancestry and resulting actions','Guaranteed attacker attribution','Ignore network telemetry'],1,'Signed binaries can be abused, so focus on behavior.'],
['L2','Large outbound data volume appears on a known backup service. What is needed?',['Automatic declaration of exfiltration','Compare schedule, identities, objects, destinations and approved jobs','Ignore because backup is allowed','Block all storage'],1,'A spike is a clue; validate expected business processes and content scope.'],
['L2','A domain account has replication privileges unexpectedly. What risk should be evaluated?',['DNS amplification only','DCSync-style credential replication and identity blast radius','Broken SMTP only','Disk wear'],1,'Replication rights may enable credential access outside normal DC operations.'],
['L2','A Kerberos service ticket anomaly appears. What helps determine relevance?',['Ticket count alone','Requested service, account, encryption type, host, baseline and surrounding auth','Keyboard layout','Email subject'],1,'Kerberos traffic is common; focus on context and behavior.'],
['L2','What should an incident timeline distinguish?',['Network vs endpoint names only','Observed facts from hypotheses and remediation decisions','Only severe alerts','Only user actions'],1,'Clarity avoids accidentally presenting assumptions as facts.'],
['L2','A cloud audit trail lacks data events. What should the report say?',['No object was accessed','Visibility limited; data-level access cannot be ruled out from these logs','AWS blocked all reads','No incident'],1,'Data events may require enablement, and the gap belongs in the assessment.'],
['L3','A detection has high precision but very low recall. What is the trade-off?',['Captures most attacks with little noise','Alerts are usually relevant, but many positives may be missed','It is perfectly tuned','The SIEM is offline'],1,'Precision and recall reflect different failure modes.'],
['L3','A detection regression test fails after schema changes. Best next action?',['Suppress the test','Inspect parser/field mapping, fix, then rerun both positive and negative fixtures','Delete historic logs','Raise every alert priority'],1,'Detection engineering relies on schema contracts and repeatable tests.'],
['L3','What belongs in a threat-hunt report with zero findings?',['Only “no threats”','Hypothesis, query scope, time window, available telemetry, limitations and next tests','No details','A claim that the actor is absent'],1,'Negative results remain bounded by visibility and scope.'],
['L3','Which approach best validates an ATT&CK-mapped analytic?',['Check the label only','Generate authorized test behavior, review raw events and evaluate end-to-end alerting','Search the internet for screenshots','Only update documentation'],1,'Testing should cover telemetry generation, normalization, detection and routing.'],
['L3','What is a detection content change-control requirement?',['Anyone can push directly to production','Versioning, peer review, fixture tests and rollback plan','Only a color theme','Weekly dashboard screenshot'],1,'Operational safety extends beyond rule syntax.'],
['L3','You see an abrupt decline in daily EDR events. What should be investigated?',['Assume improved security','Collection coverage, agent state, ingestion pipeline, parser and inventory drift','Delete all old rules','Announce no threats'],1,'Telemetry health is a prerequisite for meaningful detection metrics.'],
['L3','How should a hunting team prioritize a new hypothesis?',['Only by novelty','Threat relevance, business exposure, testability, telemetry quality and expected impact','Always by source IP alphabetically','Only by global IOC count'],1,'Hunt planning should connect risk to observable behaviors and evidence.'],
['L3','What is the safest posture for production purple-team testing?',['Unannounced high-impact payloads','Agreed scope, clear safety guardrails, monitoring and rollback contacts','No documentation','Disable EDR first'],1,'Controlled exercises avoid accidentally creating real disruption.'],
['L3','How do you distinguish a detection rule fix from a broader program improvement?',['Fixing a regex solves all gaps','Validate root cause, source coverage, tuning, ownership and future regression monitoring','Only rename it','Raise score'],1,'Detection failures can originate in collection and operations rather than logic.'],
['L3','What most improves long-term forensic reproducibility?',['Memory alone','Acquisition methods, timestamps, hashes, chain-of-custody and analysis notes','Only screenshots','One analyst account'],1,'Repeatable, documented evidence handling supports reliable conclusions.']
];
export const NEW_MCQ = MCQ_SEEDS.map(([tier,question,options,answer,why],i)=>({id:`p${String(i+1).padStart(3,'0')}`,tier,question,options,answer,why}));

// Existing multi-step SOC cases provide scenario decisions with context and a full rationale.
export const TRIAGE_CARDS=DATA.cases.flatMap(c=>c.questions.map((q,i)=>({id:`${c.id}-${i+1}`,tier:c.tier,caseId:c.id,caseName:c.name,asset:c.host,summary:c.summary,question:q.question,options:q.options,answer:q.answer,why:q.why})));
export const PRACTICE_BANKS={mcq:[...DATA.questions,...NEW_MCQ],match:MATCH_BOARDS,order:ORDER_TASKS,truth:TRUTH_CHECKS,fill:FILL_GAPS,triage:TRIAGE_CARDS};
export const PRACTICE_MODES=[
 {id:'mcq',title:'MCQ challenge',icon:'A/B/C',description:'Choose the strongest answer; learn why the alternatives fail.'},
 {id:'match',title:'Match the columns',icon:'↔',description:'Pair security terms with their real meanings.'},
 {id:'order',title:'Put it in order',icon:'↕',description:'Arrange investigation and protocol steps correctly.'},
 {id:'truth',title:'Myth or fact?',icon:'T/F',description:'Spot dangerous assumptions before they reach a ticket.'},
 {id:'fill',title:'Fill the gap',icon:'__',description:'Retrieve concepts from memory without prompts.'},
 {id:'triage',title:'Analyst decisions',icon:'SOC',description:'Make the call using context from simulated case files.'}
];
export const TIER_OPTIONS=['All','Foundation','L1','L2','L3'];
export function normalizedAnswer(v){return String(v??'').toLowerCase().trim().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ');}
export function checkFill(task,answer){return task.answers.some(a=>normalizedAnswer(a)===normalizedAnswer(answer));}
export function checkMatching(board,matches){return board.pairs.every((_,i)=>Number(matches[i])===i);}
export function countMatching(board,matches){return board.pairs.filter((_,i)=>Number(matches[i])===i).length;}
export function checkOrder(task,order){return task.steps.every((_,i)=>Number(order[i])===i);}
export function seededOrder(seed,n){let a=Array.from({length:n},(_,i)=>i),s=Array.from(String(seed)).reduce((z,c)=>(Math.imul(z,31)+c.charCodeAt(0))>>>0,987654321);for(let i=n-1;i>0;i--){s=(Math.imul(s,1664525)+1013904223)>>>0;const j=s%(i+1);[a[i],a[j]]=[a[j],a[i]];}if(n>1&&a.every((x,i)=>x===i))a.reverse();return a;}
export function pool(mode,tier='All'){const items=PRACTICE_BANKS[mode]||[];return tier==='All'?items:items.filter(x=>x.tier===tier);}
