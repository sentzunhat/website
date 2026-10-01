# Sentzunhat business email setup and contact path

ID: `c0400001`
Type: task
Status: parked
Opened: 2026-10-01
Source: Mochilada October 15, 2026 release strategy supplied 2026-10-01

input: |
  Record and sequence the Sentzunhat website and business-email work described in the October release strategy.

context: |
  Website work belongs in this repository. Keep approved branding, theme, solar-system hero, crawlable content, truthful project status, and measured performance. See `.hawp/work/status/2026/10/01/release-strategy-context.md` for shared dates, gates, positioning, and sequencing.

mission: |
  Establish a shared Sentzunhat contact and support email for Mochilada and future apps when a public reply channel is needed.

constraints: |
  This is a recorded work item, not evidence that the proposed state has been implemented or externally verified. Preserve existing active work and do not let corporate-site changes delay the Mochilada App Store submission.

output: |
  A completed and verified change with evidence linked from this plan.

## Intake context

Investigate and establish a professional business email for Sentzunhat Corp. after the priority website identity pass. Define the business domain/address needs (for example, a public contact/support mailbox and an owner/admin mailbox), compare a small set of suitable providers and costs, choose the provider, configure DNS records (MX, SPF, DKIM, DMARC) with the domain registrar, verify sending/receiving and deliverability, and update the corporate website contact path only after the mailbox is live. No provider, domain, or address was specified in the supplied strategy; make the decision during intake rather than assuming one.

Acceptance: chosen mailbox is usable; DNS/authentication checks pass; contact address is consistent across public site surfaces; recovery/admin ownership is documented without storing credentials in the repository.

## Investigation and planning

- [x] Investigate current source and implementation overlap before shaping the plan.
- [x] Record options, risk, touched paths, and verification plan before implementation.
- [ ] Verify the result and update this plan/backlog.

## Investigation — 2026-10-01

### Direct evidence

- Authoritative `sentzunhat.com` DNS delegates to DigitalOcean. Queries to `ns1.digitalocean.com` returned no apex MX/TXT or `_dmarc` TXT records. This is a point-in-time public DNS observation, not account ownership proof.
- Local `doctl account get` returned HTTP 401, so this environment has no verified DigitalOcean DNS write access.
- Website source contains no `mailto:` contact path. Publishing an address before a working mailbox would misdirect customers.
- The user supplied a comparison of Zoho Workplace, Microsoft 365, Infomaniak kSuite, Proton Workspace, and Google Workspace, with Zoho Workplace Professional as the preferred trial and Microsoft 365/Copilot as a stronger candidate for large documentation search. Prices are user-supplied research estimates, not a verified Canadian checkout quote.
- Zoho's current documentation confirms a 15-day Professional trial without payment details and says region-specific MX values must be read from the organization's Admin Console. Sources and the cutover sequence are in [business-email setup](../../../../docs/business-email-setup.md).

### Decision and risk

- **Candidate when resumed:** trial Zoho Workplace Professional using sample documents while keeping production domain mail untouched. Set up `sentzunhat.com` only after administrator and DNS access, mailbox names, and sending services are known.
- **Alternative retained:** compare Microsoft 365 with SharePoint/Copilot if cross-document AI search is the main purchase criterion; retain the current document workflow as the control.
- **Risk:** publishing a non-working address, wrong regional MX records, or an incomplete SPF/DKIM/DMARC change could lose mail or damage deliverability. The website contact path follows verified external send and receive.
- **Touched paths so far:** this plan, backlog, and `docs/business-email-setup.md`. Future site changes likely include the shared footer and organization metadata once an address is live.
- **Verification:** check the final DNS zone and Zoho Admin Console; send, receive, and reply through independent external accounts; inspect authentication alignment; then build and inspect site contact links in the served HTML. Record actual results in an evidence file.

### User decision — 2026-10-01

- The address should serve Sentzunhat contacts and support for Mochilada and future apps, rather than a Mochilada-only mailbox.
- The user wants to defer setup while bandwidth is limited, then return when a contact/reply channel is needed. The user will review Zoho Workplace prices first. No Zoho organization exists yet.
- The user says they can access DigitalOcean DNS. The earlier local CLI HTTP 401 only describes this machine's unauthenticated `doctl` session; it is not evidence that the user lacks DNS access.
- Address name, mailbox/alias structure, provider plan, and administrator recovery remain undecided. No provider account, DNS record, or website contact link has been changed.

### Resume trigger

Resume before publishing a shared contact address, sending customer-facing outreach from the company domain, or submitting a release surface that requires a working support channel. Mochilada work item `085` tracks the App Store support URL gate; its current `/support` page has a placeholder contact statement and must be reviewed before submission. The support URL can be prepared separately, but it must provide a real way for customers to reach support at launch.
