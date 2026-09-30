# 2026-09-29 — El Salvador mobile SMS number research clarified

Repository: `sentzunhat/website`
Organization: `sentzunhat`
Branch: `main`

Privacy note: this repository is public. This checkpoint intentionally omits personal identifiers, private account details, family names, and any non-public legal or ownership details. It records only public-safe continuation context for business communications planning.

## Before

Sentzunhat El Salvador planning was moving toward a separate local-country entity under the Sentzunhat brand family. The communications question was unresolved: whether a Salvadoran `+503` number could be bought online and used for calls, texting, SMS verification, and possibly customer-facing business communication from outside El Salvador.

Initial assumptions remained open:

- a VoIP/CPaaS provider might sell a usable El Salvador number;
- Twilio or another programmable provider might be sufficient;
- virtual-number providers might support two-way SMS;
- a travel eSIM might provide a phone number;
- or a local carrier SIM/eSIM might be necessary.

## During

The conversation tested and narrowed the options.

### Travel eSIMs

Travel eSIM providers were considered for El Salvador connectivity. The conclusion was that they are useful for data, maps, app access, and internet-based calling, but they are not a substitute for a real Salvadoran mobile number. They generally do not provide a durable local `+503` mobile phone number suitable for two-way SMS, WhatsApp registration, bank/government verification, or customer-facing identity.

### Twilio

Twilio was evaluated as a possible alternative. The working conclusion from the research thread is that Twilio is not a dependable route for a real Salvadoran mobile `+503` number with two-way SMS. Twilio can be useful for outbound messaging or voice workflows involving El Salvador, but the conversation did not verify purchasable Salvadoran mobile-number inventory with dependable inbound and outbound SMS.

### Virtual-number / VoIP providers

Several virtual-number providers were considered, including PBX.IM, DIDWW, Sonetel, FlyNumber, TollFreeForwarding, Telnyx, and KrispCall.

The resulting distinction matters:

- many providers advertise El Salvador `+503` numbers;
- most verified inventory appears to be local/landline-style DID service rather than true mobile-prefix numbers;
- several providers either explicitly do not support SMS for El Salvador numbers or only support voice/call forwarding;
- some providers claim SMS support, but the conversation did not independently verify true mobile-prefix `+503` inventory with reliable two-way SMS.

PBX.IM was initially considered because it appeared to claim two-way SMS for El Salvador. This was later weakened when it became clear it did not provide mobile numbers for the needed use case. It should not be treated as a confirmed solution.

### Carrier SIM/eSIM path

The dependable path remained a real Salvadoran mobile line from a local carrier, most likely Claro or Tigo. A prepaid SIM/eSIM is the recommended starting point for a single business/customer-facing number because it avoids a contract, can be tested cheaply, and behaves like a normal mobile line.

Estimated cost direction from the conversation:

- prepaid top-ups/packages are likely the cheapest way to keep a real number active;
- a practical monthly keep-alive/testing budget is roughly in the low single digits to around ten USD, depending on carrier rules and usage;
- postpaid plans are more appropriate later if formal billing, larger data buckets, roaming, multiple staff lines, or business-account administration becomes important.

The exact line-retention rules, identity-registration requirements, eSIM availability, and whether foreign passport registration is accepted still need to be confirmed directly with the carrier or a trusted in-country representative.

## After / current state

Current working state:

- Do not use a travel eSIM as the Salvadoran business number.
- Do not rely on Twilio, DIDWW, Sonetel, FlyNumber, TollFreeForwarding, Telnyx, KrispCall, or PBX.IM as a verified source of a true Salvadoran mobile-prefix number with reliable two-way SMS.
- Treat online `+503` virtual numbers as likely voice/local-DID solutions unless the provider gives written proof for the exact number type and SMS capabilities.
- The dependable path for a real mobile number is a Claro or Tigo prepaid SIM/eSIM registered through normal Salvadoran carrier processes.
- If application/backend integration is needed, use the real carrier SIM in a controlled phone/modem gateway rather than pretending that a VoIP DID is equivalent to mobile SMS.

## Decisions and constraints to preserve

- The target is a real Salvadoran mobile number, not merely any `+503` number.
- Two-way SMS matters; outbound-only SMS is insufficient.
- A landline-style DID is not acceptable if the requirement is mobile SMS, WhatsApp registration, or normal local texting behavior.
- Verification/OTP compatibility must not be assumed for any virtual number.
- Provider marketing claims are insufficient; the exact purchasable number must be verified for prefix/type, inbound SMS, outbound SMS, and ability to exchange SMS with Claro/Tigo lines.
- The recommended first implementation is a real Claro/Tigo prepaid mobile line, then optional gateway/API integration.

## Unresolved / not proven

- Exact carrier activation requirements for a non-resident or foreign passport holder remain unconfirmed.
- Exact prepaid line expiry/recycling rules remain unconfirmed.
- Whether Tigo or Claro is better for roaming to Canada, long-term keep-alive, eSIM issuance, and SMS gateway use remains unresolved.
- Whether a specific online provider can provision a mobile-prefix Salvadoran number with verified two-way SMS remains unproven.
- WhatsApp Business API migration path from a carrier SIM number has not been planned.
- Android SMS gateway/modem gateway tooling has not yet been selected or tested.

## Next direction

Resume by converting the carrier-SIM decision into a practical acquisition and integration plan:

1. Ask Claro El Salvador and Tigo El Salvador directly for prepaid SIM/eSIM activation requirements, including passport/DUI rules, eSIM support, roaming, and line-retention periods.
2. Confirm which carrier is easiest to maintain from Canada with recurring top-ups and reliable SMS reception.
3. Acquire one prepaid test line locally through an official store or trusted in-country representative.
4. Test normal calls and SMS with Claro, Tigo, and an international number.
5. Test WhatsApp Business registration only after the number is active and stable.
6. If backend integration is required, test a secure Android SMS gateway or modem gateway using that real SIM.
7. Keep CPaaS tools such as Twilio/Telnyx separate for automated outbound notifications or voice routing, not as the identity-bearing Salvadoran mobile number.

## Cross-project relationships

- This affects Sentzunhat El Salvador setup, customer support, WhatsApp Business, onboarding, and future local operations.
- It may affect future CRM/ERP/customer-notification architecture if the real carrier SIM becomes the source of truth for local SMS and WhatsApp identity.
- It complements, but does not replace, the existing El Salvador entity-structure checkpoint.

Resume from: Online virtual-number providers are not verified for the required true Salvadoran mobile two-way SMS use case; proceed with a carrier-first Claro/Tigo prepaid test line.

Next objective: confirm carrier activation/retention requirements, acquire one real prepaid mobile line, and test calls, SMS, WhatsApp Business, and gateway integration.