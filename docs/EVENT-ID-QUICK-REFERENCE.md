# SOC FIELDWORK — Windows / Sysmon quick reference

**Event availability depends on audit settings, installed Sysmon configuration and log collection.** Check host OS and authoritative vendor documentation before relying on any event. Never use an Event ID alone to conclude maliciousness.

## Windows Security

| Event ID | Typical meaning | Analyst context |
| --- | --- | --- |
| 4624 | An account was successfully logged on | Inspect logon type, account, workstation/source address, LogonId |
| 4625 | A logon attempt failed | Status/substatus, origin, target account, repeated pattern |
| 4634 | Account session logged off | Session boundaries and correlation limitations |
| 4648 | Logon attempted with explicit credentials | Account context and source process |
| 4672 | Special privileges assigned to a new logon | Could be normal for administrative identities |
| 4688 | New process created | Audit policy and command-line availability matter |
| 4698 | Scheduled task created | Creator, task action, trigger and maintenance history |
| 4720 | User account created | Acting account, new target and domain/local scope |
| 4726 | User account deleted | Actor and approval trail |
| 4728 | Member added to a global security group | Group privilege, actor, target, change approval |
| 4732 | Member added to a local security group | Local versus domain-local scope depends on source |
| 4756 | Member added to a universal security group | Actor and target privileges |
| 4768 | Kerberos authentication ticket requested | Domain controller and principal context |
| 4769 | Kerberos service ticket requested | SPN, account baseline and source context |
| 4771 | Kerberos preauthentication failed | Investigate specific error and related auth attempts |
| 4776 | DC attempted to validate account credentials | NTLM authentication context |
| 4662 | An operation was performed on an object | Relevant directory replication analysis requires configured SACL and property context |

## Windows System and PowerShell channels

| Event | Context |
| --- | --- |
| System 7045 | A service was installed; inspect image path, account and origin |
| PowerShell Operational 4104 | Script-block content when enabled; high value for script investigation |
| PowerShell Operational 4103 | Module logging details when configured |

## Sysmon (installed separately)

| Event | Meaning |
| --- | --- |
| 1 | Process creation: process GUID, image, command line and parent |
| 3 | Network connection (may be disabled in configuration) |
| 7 | Image loaded (often high-volume; selectively enabled) |
| 8 | CreateRemoteThread (when configured) |
| 10 | Process access (configuration and false positives matter) |
| 11 | File create |
| 12–14 | Registry object and value events |
| 22 | DNS query (configured and available) |

### High-value correlation patterns

- **Possible password spray:** multi-user 4625 failures from one origin → success 4624 / identity-provider sign-in → device and MFA → follow-on activity.
- **Suspicious remote service:** 4624 type 3 from new origin → System 7045 → Sysmon Event 1 for service binary → network and file evidence.
- **Phishing chain:** mail gateway delivery → click → download → Sysmon/EDR execution → identity or external network changes.
- **Coverage failure:** expected telemetry missing → collector heartbeat/lag → raw source availability → parser mapping → test event.

For official semantics consult [Microsoft Windows security auditing](https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/) and [Sysmon documentation](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon).
