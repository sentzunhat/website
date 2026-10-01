# Sentzunhat business email setup

Working runbook for `c0400001`. Last checked: 2026-10-01. Setup is parked until a public contact or reply channel is needed. This records a candidate provider and deployment sequence; it is not proof that a mailbox exists.

## Decision in progress

When setup resumes, consider a **Zoho Workplace Professional** trial following the user-supplied comparison of Zoho, Microsoft 365, Infomaniak kSuite, Proton Workspace, and Google Workspace. The user will review prices before starting. No Zoho organization exists yet. Evaluate mail, documents, sharing, search/AI answers, and export with a small set of synthetic or approved sample files. Keep the existing document workflow as the control. Zoho [confirms a Professional trial without payment details](https://www.zoho.com/workplace/help/admin-guide/workplace-subscription.html). Select a paid plan only after checking the Canadian checkout price, user count, storage needs, AI behavior, and export quality. The user-supplied price table is a research snapshot, not a purchase quote.

The comparison also identifies Microsoft 365 with SharePoint/Copilot as the stronger candidate if search across substantial company documentation is the main requirement. That is a separate pilot decision; the mailbox launch does not require a document migration.

## Current evidence and access

- Public authoritative DNS uses `ns1.digitalocean.com`, `ns2.digitalocean.com`, and `ns3.digitalocean.com`. On 2026-10-01, queries to `ns1.digitalocean.com` returned no apex MX or TXT record and no `_dmarc` TXT record. Recheck immediately before any DNS change.
- The local `doctl account get` request returned HTTP 401 on 2026-10-01. DigitalOcean DNS write access is therefore unverified in this environment.
- The user says they can access DigitalOcean DNS; the local CLI authentication failure does not contradict their account access.
- The website source currently has no `mailto:` contact address. Do not publish an untested mailbox.
- Zoho says domain ownership verification needs DNS access and does not itself redirect incoming mail; MX records control receipt. Zoho's MX values depend on the chosen data center and should be copied from that organization's Admin Console, not from generic examples. See [domain setup](https://www.zoho.com/mail/help/adminconsole/add-domains.html) and [MX configuration](https://www.zoho.com/mail/help/adminconsole/configure-email-delivery.html).

## Before account and DNS setup

The mailbox is intended as a shared Sentzunhat contact and support channel for Mochilada and future apps. Record privately with the owner: primary administrator and recovery method; number of paid users; intended public address and product support address; whether either should be an alias or a separate staffed mailbox; billing country/currency; and any current sender that uses `@sentzunhat.com`. Keep passwords, recovery codes, and payment details out of this repository.

Use the Zoho trial to check document editing, external sharing, AI answers with citations or source links, export, and account administration. Do not move the production mail domain or confidential documents for this comparison alone.

## Domain cutover sequence

1. Restore verified access to the DigitalOcean DNS zone and capture the full current record set. Identify any existing mail sender before changing SPF or MX.
2. Create or access the Zoho organization in the chosen region. Turn on administrator MFA and configure recovery. Add `sentzunhat.com`; publish the ownership TXT/CNAME value that Zoho generates and verify it in Admin Console.
3. Create the chosen mailbox and aliases. Confirm the intended public address can be monitored and replied from. Copy the region-specific MX, SPF, and DKIM values from this organization’s Zoho Admin Console.
4. Publish those records in DigitalOcean. Use one SPF policy for the domain, include all legitimate senders, and enable the Zoho DKIM selector after its DNS value validates. Zoho's [DKIM instructions](https://www.zoho.com/mail/help/adminconsole/dkim-configuration.html) generate a unique key per organization.
5. After SPF and DKIM work, publish a DMARC monitoring policy (`p=none`) with a reporting destination the owner controls. Review reports and all legitimate senders before moving to `quarantine` or `reject`; Zoho recommends [phased enforcement](https://www.zoho.com/mail/help/adminconsole/dmarc-policy.html).
6. Verify public DNS against Zoho Admin Console. From an independent external account, send to each public address, reply, inspect SPF/DKIM/DMARC alignment in received headers, and repeat with a second receiver. Check spam placement and alias reply behavior.
7. Only after delivery and replies pass, add the confirmed public address to the corporate website and any Mochilada support surface that owns the same address. Update source metadata/structured data where appropriate, build, inspect served HTML, and verify the deployed links. Record the DNS snapshot, chosen plan, owner, and observed checks in the HAWP evidence file without secrets.

If cutover fails, use the captured DNS record set and provider state to restore the prior mail routing. Recheck public DNS and receiving before announcing an address.

## Completion gate

A confirmed mailbox, verified DNS/authentication, external send-and-receive evidence, monitored owner/recovery path, and consistent public contact links are required before closing `c0400001`.

Mochilada's `/support` page can be worked separately, but its current contact text is a placeholder. Review that release gate before App Store submission; a published support surface needs a real monitored path even if this mailbox setup remains parked.
