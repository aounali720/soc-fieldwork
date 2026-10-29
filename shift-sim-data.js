/* SOC FIELDWORK — shift simulations. All organisations, people, IPs and events are fictional.
 * Addresses belong to reserved documentation ranges; example domains are not targets. */
export const SHIFT_SIMULATIONS = [
  {
    id:'shift07-01',tier:'L1',domain:'Identity',title:'The service-desk password spray',difficulty:'Foundational',asset:'IdP + VPN',
    objective:'Determine what is known, what is not known, and whether an account needs immediate attention.',
    background:'A shared VPN gateway triggers 43 failed sign-ins in nine minutes. An account succeeds later, but the sign-in came through an approved managed device.',
    evidence:[
      {time:'09:02:13',source:'IdP',entity:'203.0.113.42',event:'Sign-in failed for 11 distinct users; invalid password; client=legacy-auth'},
      {time:'09:03:26',source:'IdP',entity:'203.0.113.42',event:'Repeated failures for 19 additional users; MFA not reached'},
      {time:'09:08:43',source:'VPN',entity:'c.rao',event:'Successful MFA from 192.0.2.64; registered device=corp-lap-21'},
      {time:'09:09:11',source:'IdP',entity:'c.rao',event:'Login succeeded via compliant device, different source than spray'},
      {time:'09:10:00',source:'Threat Intel',entity:'203.0.113.42',event:'No current confidence rating; no enrichment result'},
      {time:'09:11:29',source:'IdP',entity:'203.0.113.42',event:'No successes observed in searched 30-minute time window'}],
    decisions:[
      {prompt:'What is the strongest initial characterization?',options:['Confirmed takeover of c.rao','Likely password spraying, with no observed success from the spray IP','Routine typo by one employee','Proof that MFA is compromised'],answer:1,why:'One origin failed across many users; a different successful sign-in is not automatically related. Separate the two sequences.'},
      {prompt:'Which evidence should you request next?',options:['Historical source and account-level sign-in context, legacy-auth policy and risk status','Delete all identity logs','A list of every employee password','Only the gateway geo-IP'],answer:0,why:'Confirm the pattern against the identity baseline and determine whether legacy authentication bypasses controls.'},
      {prompt:'What is the safest ticket disposition?',options:['Close as benign because there were no successes','Escalate suspected spray for preventive controls and scoped review, while documenting the lack of observed takeover','Disable the entire VPN immediately without approval','Declare all users compromised'],answer:1,why:'Suspicious spray can require control changes without a confirmed compromise. State the confidence limit.'}],
    pitfall:'A success after failures does not establish a compromise unless the account, source, session and time sequence align.',
    missing:'Check identity risk events, complete source history and whether the IdP captures legacy-auth failures.',
    next:'Review source IP reputation with uncertainty, block abusive origin under policy, enforce authentication restrictions, and check for later matched successes.',
    report:'Observed 30 distinct accounts receiving failed legacy-auth sign-ins from a single documentation IP over nine minutes. No success attributable to that origin in the checked interval. A later successful VPN sign-in belongs to a compliant corporate device and separate origin. Recommend identity-team review of legacy-auth exposure, source-level safeguards, and monitoring for related successes. Confidence: moderate; scope limited to available IdP and VPN logs.'
  },
  {
    id:'shift07-02',tier:'L1',domain:'Email',title:'Finance mailbox consent request',difficulty:'Foundational',asset:'Mail + cloud identity',
    objective:'Differentiate suspicious mail delivery from successful OAuth consent and mailbox compromise.',
    background:'A finance employee reports a message requesting document approval. The browser launched a consent page, but no user-consent event appears in the identity audit sample.',
    evidence:[
      {time:'10:14:00',source:'Mail',entity:'finance@example.org',event:'External sender; DMARC fail; header From uses display-name lookalike'},
      {time:'10:14:07',source:'Secure Email',entity:'msg-781',event:'Message delivered; URL was rewritten by secure email gateway'},
      {time:'10:15:30',source:'Proxy',entity:'corp-lap-08',event:'Browser followed link to login-example.invalid / consent landing page'},
      {time:'10:16:14',source:'IdP',entity:'finance@example.org',event:'Interactive sign-in from managed device; MFA success'},
      {time:'10:17:22',source:'Cloud Audit',entity:'finance@example.org',event:'No consent grant event in sampled 20-minute window'},
      {time:'10:18:00',source:'Mail',entity:'msg-781',event:'Recipient reported message and preserved original headers'}],
    decisions:[
      {prompt:'What can the available audit trail establish?',options:['The attacker read the full mailbox','A suspicious link was opened; no consent grant is visible in the sampled logs','No suspicious activity happened','MFA failure proves takeover'],answer:1,why:'A link click and MFA-success do not independently establish application permission grant.'},
      {prompt:'Which pivot best closes the main evidence gap?',options:['Cloud application consent and service-principal audit, plus sign-in token context','Public follower count of the sender','Only the email subject line','Random malware hash search'],answer:0,why:'A malicious app-consent attempt needs the app ID, consent event and granted permissions to assess actual access.'},
      {prompt:'What action should the SOC recommend?',options:['Ignore user report because there was no grant event','Preserve mail, assess any connected app grants with identity team, and warn other targeted users under policy','Reset every corporate password without scoping','Delete the evidence before the ticket'],answer:1,why:'The mail is suspicious, but user/app access needs independent verification before broad containment.'}],
    pitfall:'Do not equate a sign-in or consent page visit with completed OAuth authorization.',
    missing:'Full app-consent audit retention, app ID, any access token issuance and mailbox access audit.',
    next:'Search for related recipients and application grants; revoke unauthorized consent if confirmed through approved response workflow.',
    report:'External finance-themed message failed DMARC alignment and led the user to a consent-themed page. The proxy recorded navigation and the identity provider recorded a managed-device sign-in with MFA. No app-consent grant is present in the sampled window. Treat as a phishing attempt, preserve the message and verify app grants across the full audit window before claiming mailbox access.'
  },
  {
    id:'shift07-03',tier:'L2',domain:'Endpoint',title:'A backup service stops unexpectedly',difficulty:'Intermediate',asset:'EDR + Windows service logs',
    objective:'Determine whether backup disruption and file activity warrant ransomware containment.',
    background:'A file server displays backup service configuration changes and rapid archive writes. A scheduled maintenance ticket also exists.',
    evidence:[
      {time:'12:41:02',source:'Change System',entity:'CHG-201',event:'Approved backup-agent update window scheduled for 13:00–14:00; owner=operations'},
      {time:'12:43:00',source:'Windows',entity:'filesrv-02',event:'7040: backupsvc start type changed from auto to disabled'},
      {time:'12:43:09',source:'EDR',entity:'filesrv-02',event:'Parent=cmd.exe; child=sc.exe; user=svc-web; service config changed'},
      {time:'12:44:15',source:'File Audit',entity:'filesrv-02',event:'High-volume writes to shared data path; archive extensions newly seen'},
      {time:'12:45:07',source:'EDR',entity:'filesrv-02',event:'Unsigned executable launched from temporary directory; abnormal parent'},
      {time:'12:46:55',source:'Backup',entity:'filesrv-02',event:'Latest recovery point two hours old; current backup health=degraded'}],
    decisions:[
      {prompt:'Which observation most increases concern?',options:['Any backup change means malware','Unapproved service change by a web identity before maintenance and abnormal file writes','Presence of a maintenance ticket','An archive file exists'],answer:1,why:'Sequence, execution origin and identity context together contradict the planned maintenance.'},
      {prompt:'Which first response is most defensible?',options:['Collect core evidence, notify incident lead, and request approved isolation of the affected file server','Restore immediately and erase disk evidence','Shut down the whole data center','Declare it planned change'],answer:0,why:'Possible destructive activity can demand rapid containment, but the action must follow authority and consider critical service impact.'},
      {prompt:'What must the escalation include?',options:['Only a malware-family guess','Identity, process parentage, change-window mismatch, backup state and recovery dependencies','A screenshot of the GUI only','Only extension count'],answer:1,why:'Operations needs both evidence and business impact to safely decide containment and recovery.'}],
    pitfall:'A planned maintenance ticket does not legitimize a change performed before the window by an unrelated service identity.',
    missing:'Full process command lines, binary provenance, SMB origin, approved change owner confirmation and backup integrity test.',
    next:'Initiate incident coordination, preserve volatile and forensic evidence, check lateral spread, and plan recovery with backup owners.',
    report:'File server backup service was disabled before the approved maintenance window by an unexpected service account lineage. Subsequent abnormal shared-file writes and execution from a temporary directory raise concern for destructive activity. Backup health is degraded. Recommend urgent L2/IR review, scoped containment through approved authority, process and SMB correlation, and validation of restore points before recovery.'
  },
  {
    id:'shift07-04',tier:'L2',domain:'Active Directory',title:'A service-ticket anomaly on payroll',difficulty:'Intermediate',asset:'Domain controller + endpoint',
    objective:'Correlate ticket issuance with account privileges and avoid treating every 4769 event as Kerberoasting.',
    background:'Security monitoring flags a burst of Kerberos service ticket requests for the payroll service principal.',
    evidence:[
      {time:'14:01:20',source:'Windows DC',entity:'dc-01',event:'4769 requests for HTTP/payroll-app (account=svc-payroll); count=2 usual baseline'},
      {time:'14:02:55',source:'Windows DC',entity:'dc-01',event:'4769 count=85 over four minutes; clients include workstation-77'},
      {time:'14:03:00',source:'Asset Inventory',entity:'workstation-77',event:'Assigned to HR contractor; not a payroll integration host'},
      {time:'14:03:12',source:'EDR',entity:'workstation-77',event:'Unapproved process queried many SPNs; user=contractor12'},
      {time:'14:05:00',source:'IAM',entity:'svc-payroll',event:'SPN mapped to service account; password-age=920 days; privilege review overdue'},
      {time:'14:06:20',source:'Windows DC',entity:'dc-01',event:'No administrative logon or privilege escalation directly observed in sampled events'}],
    decisions:[
      {prompt:'What is a defensible initial finding?',options:['Ticket issuance always equals credential compromise','Pattern could reflect service-ticket enumeration consistent with Kerberoasting preparation','The service account has already been cracked','No risk because 4769 is normal'],answer:1,why:'High-volume anomalous SPN requests and endpoint context support investigation but do not prove offline cracking.'},
      {prompt:'What additional context changes priority?',options:['Service account privilege, encryption type, originating process and affected service impact','User desktop wallpaper','Number of browser tabs','Only the SPN length'],answer:0,why:'Password hygiene, crypto settings and account reachability affect risk, while process evidence strengthens attribution.'},
      {prompt:'How should mitigation be handled?',options:['Coordinate credential remediation and endpoint investigation with the service owner after validating dependencies','Rotate all service credentials blind','Delete all SPNs','Assume DC compromise'],answer:0,why:'Service-account changes can break applications. Identity response must account for owner and dependencies.'}],
    pitfall:'4769 is routine; the number, origin, baseline, process and encryption context provide the signal.',
    missing:'Original event XML including encryption types, SPN owner details, service dependencies and scope of requests.',
    next:'Investigate originating endpoint, review service account permissions, coordinate credential hardening and expand search for misuse.',
    report:'A contractor workstation issued an abnormal burst of service-ticket requests for payroll SPNs, with process telemetry showing broad SPN querying. This pattern suggests possible service-ticket enumeration and potential offline credential-attack preparation. There is no direct evidence of password recovery or service access in the sampled logs. Escalate to identity and endpoint owners for scoped investigation and coordinated service-account remediation.'
  },
  {
    id:'shift07-05',tier:'L2',domain:'Network',title:'DNS beacon or health check?',difficulty:'Intermediate',asset:'DNS + network flow',
    objective:'Distinguish periodic application health checks from command-and-control hypotheses.',
    background:'A single host queries an unfamiliar subdomain every five minutes. A new monitoring agent was deployed yesterday.',
    evidence:[
      {time:'15:00:00',source:'DNS',entity:'ops-mon-04',event:'A query api.status-check.example.org; response=192.0.2.75; TTL=300'},
      {time:'15:05:00',source:'DNS',entity:'ops-mon-04',event:'A query api.status-check.example.org; response=192.0.2.75'},
      {time:'15:10:00',source:'DNS',entity:'ops-mon-04',event:'A query api.status-check.example.org; response=192.0.2.75'},
      {time:'15:10:03',source:'Flow',entity:'ops-mon-04',event:'TCP 443 to 192.0.2.75; small bidirectional transfer; repeated'},
      {time:'15:12:00',source:'Deployment',entity:'ops-mon-04',event:'Approved monitoring-agent package installed yesterday by automation'},
      {time:'15:13:00',source:'EDR',entity:'ops-mon-04',event:'Signed monitoring binary invoked via system service; no anomalous child process'}],
    decisions:[
      {prompt:'Which hypothesis is best supported now?',options:['Confirmed covert channel','Likely expected health-check traffic; verify domain ownership and deployment configuration','Proof of data exfiltration','Confirmed DNS tunneling'],answer:1,why:'Periodicity alone is weak; deployment and signed process context support a benign hypothesis.'},
      {prompt:'What would materially strengthen a malicious-beacon theory?',options:['Unexpected unsigned process, unrelated domain and inconsistent deployment ownership','The domain has a dot','Queries have TTL 300','The traffic uses HTTPS'],answer:0,why:'Process provenance and configuration mismatch are higher-value evidence than timing alone.'},
      {prompt:'What should the ticket record?',options:['Closed with no details','Verified expected activity or remaining gaps, with asset, process and change-ticket evidence','An attacker campaign name','DNS is harmless'],answer:1,why:'A benign closure should be evidence-backed and bounded by what was checked.'}],
    pitfall:'Fixed intervals are common in automation and monitoring. Detection logic must consider asset roles and change context.',
    missing:'Deployment manifest, certificate/SNI, DNS owner, proxy URL path, full application logs.',
    next:'Validate agent owner and destination, document expected behavior, and tune only the narrow known-benign signature.',
    report:'Five-minute periodic DNS and HTTPS activity aligns with the approved monitoring deployment. The originating binary is signed and launched through a service, with no anomalous child process observed. Current evidence favors expected health checks, subject to final destination ownership verification. Recommend documenting the source/agent relationship before any narrowly scoped detection tuning.'
  },
  {
    id:'shift07-06',tier:'L2',domain:'Cloud',title:'CloudTrail key exposure, but no read events',difficulty:'Intermediate',asset:'AWS audit + application logs',
    objective:'Assess exposed cloud credentials while recognizing the limits of control-plane audit evidence.',
    background:'A build repository briefly exposed a credential string. CloudTrail management events show role assumption; object-level data events were not enabled.',
    evidence:[
      {time:'16:20:00',source:'CI Audit',entity:'build-ops',event:'Potential credential in job output; restricted log view revoked'},
      {time:'16:23:19',source:'CloudTrail',entity:'iam/BuildRole',event:'AssumeRole from IP 198.51.100.88; userAgent unfamiliar'},
      {time:'16:24:05',source:'CloudTrail',entity:'iam/BuildRole',event:'ListBuckets and GetBucketLocation API calls observed'},
      {time:'16:26:44',source:'CloudTrail',entity:'iam/BuildRole',event:'No GetObject in available management events; S3 data events disabled'},
      {time:'16:29:00',source:'IAM',entity:'iam/BuildRole',event:'Session permitted s3:GetObject for billing-exports bucket'},
      {time:'16:30:05',source:'CI Audit',entity:'build-ops',event:'Build owner confirms no authorized testing from the observed IP'}],
    decisions:[
      {prompt:'What cannot be inferred from this evidence?',options:['Role assumption occurred','Credential misuse is plausible','No object was read','Build role could access the bucket'],answer:2,why:'Missing S3 data events mean absence of GetObject in control-plane logs cannot rule out object access.'},
      {prompt:'What is the most urgent coordinated action?',options:['Disable all AWS accounts immediately','Invalidate exposed credentials/sessions and scope permissions with cloud owner; preserve available audit records','Delete audit logs to reduce cost','Wait for another alert'],answer:1,why:'Known exposed credentials and unrecognized role use warrant prompt, authorized containment with audit preservation.'},
      {prompt:'Which limitation belongs in the report?',options:['We confirmed no exfiltration','Object-level access cannot be determined from existing management event coverage','S3 blocks every data read','CloudTrail has no value'],answer:1,why:'Explicitly report visibility gaps; do not overstate confidence.'}],
    pitfall:'Management event logs do not substitute for optional object data events.',
    missing:'S3 server access logs if configured, data events from alternate trails, bucket/object access records, key usage across accounts.',
    next:'Rotate or revoke credentials, revoke active sessions where possible, review policies, and document data-event coverage gaps for detection engineering.',
    report:'A CI artifact exposed potential credentials and a cloud role was assumed from an unrecognized source. Subsequent bucket enumeration is visible in management events. The role had access to billing exports. Object access and exfiltration cannot be excluded because S3 data-event capture was disabled. Escalate urgently for credential/session invalidation, resource scoping, and audit-gap remediation.'
  },
  {
    id:'shift07-07',tier:'L3',domain:'Detection engineering',title:'The parser that quietly went dark',difficulty:'Advanced',asset:'SIEM pipeline + EDR',
    objective:'Diagnose an apparent drop in attack alerts without mistaking it for an improvement in security.',
    background:'EDR ingest volume is stable but a process-injection rule suddenly drops to zero detections after a mapping change.',
    evidence:[
      {time:'08:55:00',source:'Ingest',entity:'edr-prod',event:'Daily raw EDR event volume remains within 2% baseline'},
      {time:'09:00:00',source:'Change',entity:'parser-v4',event:'New field mapping renamed source.process_path to process.executable'},
      {time:'09:12:00',source:'Detection',entity:'DET-104',event:'Rule still references source.process_path; matches=0 since deployment'},
      {time:'09:13:00',source:'Raw Events',entity:'edr-prod',event:'Synthetic known-positive event present with process.executable and process.parent'},
      {time:'09:16:00',source:'Regression',entity:'DET-104',event:'Positive fixture fails; negative fixture remains clean'},
      {time:'09:20:00',source:'Queue',entity:'soc-l1',event:'No alert routed despite known-positive fixture'}],
    decisions:[
      {prompt:'What failure mode best explains the gap?',options:['No malicious actions occurred','Schema drift broke analytic field matching while ingestion continued','The SOC reached perfect precision','All endpoint agents are offline'],answer:1,why:'Raw events survived but normalized field names no longer match the rule.'},
      {prompt:'What is the correct engineering action?',options:['Restore field compatibility or update analytic, test fixtures and routing end-to-end','Silence the monitor for a month','Lower every alert severity','Disable process data collection'],answer:0,why:'Fix the telemetry contract and verify that positive evidence becomes a routed alert, without adding false positives.'},
      {prompt:'What should be tracked in the postmortem?',options:['Only developer names','Coverage gap window, potentially missed signals, regression gate and deployment ownership','Nothing since no confirmed incident','Only UI color'],answer:1,why:'Detection reliability needs accountability and retrospective scoping of the blind interval.'}],
    pitfall:'Stable ingestion does not prove detections work. Test both normalization and routing.',
    missing:'Affected analytic inventory, schema change impact analysis, historical raw-event replay and deployment review approvals.',
    next:'Roll back or patch mapping safely, replay fixtures, reprocess data where supported and audit alerts missed during the gap.',
    report:'Following parser-v4 deployment, detection DET-104 stopped generating alerts despite normal raw ingest. Known-positive telemetry changed field paths and a regression fixture failed. Treat as a confirmed detection-quality incident, restore schema compatibility, validate end-to-end routing and scope the blind interval for previously missed behaviors.'
  },
  {
    id:'shift07-08',tier:'L3',domain:'Threat hunting',title:'A negative hunt with a hidden blind spot',difficulty:'Advanced',asset:'Windows + central SIEM',
    objective:'Write a properly bounded hunt conclusion when evidence coverage is incomplete.',
    background:'A hunt for suspicious remote execution across 250 hosts returns no relevant hits. Forty hosts were not collecting process creation events.',
    evidence:[
      {time:'11:00:00',source:'Hunt',entity:'HQ fleet',event:'Hypothesis: unexpected remote process execution on high-value workstations'},
      {time:'11:06:00',source:'SIEM',entity:'process creation',event:'No matching events on 210 hosts in seven-day window'},
      {time:'11:11:00',source:'Telemetry Health',entity:'HQ fleet',event:'Process events absent on 40 hosts, including 12 privileged admin workstations'},
      {time:'11:13:00',source:'Windows',entity:'admin-ws-11',event:'Audit policy missing process command-line capture'},
      {time:'11:17:00',source:'EDR',entity:'admin-ws-11',event:'Some process metadata available, but 18-hour retention only'},
      {time:'11:20:00',source:'Asset Owner',entity:'HQ fleet',event:'Exception to logging policy undocumented'}],
    decisions:[
      {prompt:'What conclusion is supported?',options:['No remote execution occurred anywhere','No relevant matches in observed coverage; 40 hosts and missing command lines materially limit confidence','No need to document telemetry','Confirmed threat actor absent'],answer:1,why:'Negative findings must explicitly name covered populations and gaps.'},
      {prompt:'Which follow-up most improves detection?',options:['Re-enable required collection through change control and perform alternate telemetry pivots','Delete the hypothesis','Double the number of dashboard charts','Mark uncovered assets as benign'],answer:0,why:'Closing collection gaps and using independent sources reduces false assurance.'},
      {prompt:'What should a senior analyst communicate?',options:['Guaranteed safety','Coverage percentage, search horizon, uncovered privileged hosts and retest plan','Only count of searches','A list of attacker names'],answer:1,why:'Risk owners need meaningful uncertainty and a concrete remediation plan.'}],
    pitfall:'Zero matches with imperfect coverage is not evidence of zero threat.',
    missing:'EDR availability for uncovered endpoints, remote service creation telemetry, PowerShell logs, command-line policy.',
    next:'Prioritize privileged hosts for telemetry remediation, run compensating hunts and document the coverage SLO.',
    report:'Seven-day hunt yielded no relevant remote-execution matches across 210 instrumented hosts. Forty hosts, including 12 privileged workstations, lacked process creation coverage. Results do not establish absence across the estate. Recommend urgent collection remediation, alternate endpoint/Windows source pivots and a targeted rerun after signal health is restored.'
  },
  {
    id:'shift07-09',tier:'L2',domain:'Container',title:'An unexpected Kubernetes pod credential',difficulty:'Intermediate',asset:'Kubernetes + cloud workload',
    objective:'Separate legitimate deployment actions from risky privilege and identity changes in a cluster.',
    background:'A batch job appears with a service-account token mount and expanded rights. Cluster audit logs also show an authorized deploy that morning.',
    evidence:[
      {time:'17:01:00',source:'Change',entity:'DEP-410',event:'Approved image patch on namespace=payments; no RBAC changes in approved manifest'},
      {time:'17:06:12',source:'Kube Audit',entity:'namespace/payments',event:'RoleBinding updated by service-account ci-deployer'},
      {time:'17:06:30',source:'Kube Audit',entity:'service-account ci-deployer',event:'New binding allows read access to secrets in payments namespace'},
      {time:'17:07:11',source:'Kube Audit',entity:'payments/batch-07',event:'Pod created with automountServiceAccountToken=true'},
      {time:'17:08:31',source:'Kube Audit',entity:'payments/batch-07',event:'Secret list API call; response=200'},
      {time:'17:10:00',source:'CI Audit',entity:'ci-deployer',event:'Unexpected deploy token use from unknown build runner'}],
    decisions:[
      {prompt:'What is the strongest initial concern?',options:['Kubernetes pods are always malicious','An out-of-scope RBAC change preceded secret enumeration by an unexpected workload','Every RoleBinding update is acceptable','Image patching caused no risk'],answer:1,why:'The deployed change does not explain new secret permissions and the unusual runner.'},
      {prompt:'What should be investigated next?',options:['Audit caller identity, binding diff, secret reads, workload spec and token origin','Only the pod image icon','Random cloud costs','Every unrelated node simultaneously'],answer:0,why:'The full authorization chain and accessed resources establish scope and potential impact.'},
      {prompt:'How should response be coordinated?',options:['Revoke suspicious access and rotate affected secrets after preserving evidence and assessing service dependencies','Destroy entire cluster immediately','Ignore change because a deploy existed','Publish secrets in ticket'],answer:0,why:'Scoped containment and secret hygiene need service-owner authorization and impact assessment.'}],
    pitfall:'Approved deployment does not imply approval for new RBAC grants or token use from an unknown runner.',
    missing:'RBAC manifest diff, token audience, accessed secret names, API audit coverage, workload-to-cloud federation.',
    next:'Contain suspicious identity permissions through approved procedure, preserve audit trail, rotate affected secrets and review CI runner integrity.',
    report:'A Kubernetes RoleBinding update outside the approved image-only change enabled new secret-reading permissions. A newly created pod then listed secrets, while the build identity was used from an unknown runner. Treat as likely unauthorized privilege expansion pending source verification. Recommend scoped response for RBAC and CI identity, secret-access review and coordinated rotation.'
  },
  {
    id:'shift07-10',tier:'L1',domain:'Operations',title:'An executive travel alert with ordinary evidence',difficulty:'Foundational',asset:'IdP + device health',
    objective:'Practice defensible benign closures without ignoring genuine remaining risks.',
    background:'An executive receives an impossible-travel alert during a flight connection. Both sign-ins used the same managed device and a corporate egress service.',
    evidence:[
      {time:'18:05:12',source:'IdP',entity:'exec@example.org',event:'Sign-in from 198.51.100.12; MFA phishing-resistant; compliant device device-001'},
      {time:'18:08:00',source:'IdP',entity:'exec@example.org',event:'Geo changed abruptly to another country; source 192.0.2.9'},
      {time:'18:08:09',source:'Network',entity:'192.0.2.9',event:'Source IP belongs to approved corporate secure web gateway'},
      {time:'18:09:01',source:'MDM',entity:'device-001',event:'Compliant; same stable device certificate as first sign-in'},
      {time:'18:10:00',source:'IdP',entity:'exec@example.org',event:'No unexpected MFA registration, application consent or high-risk token use in sampled window'},
      {time:'18:11:15',source:'Helpdesk',entity:'exec@example.org',event:'Verified scheduled travel and gateway connectivity with user'}],
    decisions:[
      {prompt:'What conclusion is best supported?',options:['Account certainly compromised','Likely false positive caused by corporate gateway geolocation; scope and context support benign travel','Impossible travel is proof of theft','Device certificate alone rules out all threats'],answer:1,why:'Network egress and device continuity explain the geo shift. No single signal guarantees safety.'},
      {prompt:'What should be checked before closing?',options:['Gateway ownership and relevant session anomalies, with documented user verification','Only IP continent','A social-media profile','File extension inventory'],answer:0,why:'A defensible closure uses independent evidence and records reasonable remaining uncertainty.'},
      {prompt:'What belongs in the closure?',options:['Nothing; close silently','Evidence supporting benign travel, checked time window, and a clear reopen condition','A password from the executive','A threat actor attribution'],answer:1,why:'Good closure notes make review and re-opening possible if new evidence appears.'}],
    pitfall:'Familiar devices and travel confirmation reduce suspicion but do not make account compromise impossible.',
    missing:'Longer session history and additional identity risk detections outside sampled interval.',
    next:'Record verified gateway mapping; consider narrowly scoped alert tuning only after repeated supported patterns.',
    report:'An impossible-travel alert coincided with approved secure-web-gateway egress, stable managed-device identity, phishing-resistant MFA and independently verified travel. No unusual consent or identity-risk activity was observed in the sampled timeframe. Current evidence supports a documented benign closure, with reopening if sessions or token behavior become anomalous.'
  }
];
