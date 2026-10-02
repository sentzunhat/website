# GA4 baseline: Sentzunhat website

Observed: 2026-10-02 in the authenticated Google Analytics browser. Report window: **2026-09-04 through 2026-10-01** (GA4's Last 28 days). Source: GA4 property `sentzunhat-corp` (`557072524`), account `sentzunhat` (`410459516`), web stream `sentzunhat` (`15939499111`, `https://sentzunhat.com`), measurement ID `G-8TVQJXLW0K`. The stream details said data collection was active in the past 48 hours.

## Page views by route and host

| Host | Page path | Views |
| --- | --- | ---: |
| `sentzunhat.com` | `/` | 3 |
| `sentzunhat.com` | `/projects/mochilada/` | 2 |
| `127.0.0.1` | `/` | 2 |
| `localhost` | `/projects/mochilada/` | 1 |
| `localhost` | `/` | 0 |
| `localhost` | `/projects/hawp/` | 0 |

Total: **8 page views**, comprising **5 public** and **3 local** views. The two zero-view rows had other events and active users; they are not evidence of successful page-view collection for those visits. GA4 showed 7 active users for the property overall. The per-host and per-device active-user counts can overlap and must not be added as distinct people.

## Clicks and other events

| Host | `click` events |
| --- | ---: |
| `sentzunhat.com` | 0 |
| `127.0.0.1` | 1 |
| `localhost` | 1 |

The Events report showed **36 total events**, including 8 `page_view`, 9 `session_start`, 9 `user_engagement`, 6 `first_visit`, 2 `click`, and 2 `scroll`. The two recorded clicks are local test traffic. The standard historical Events report did not show link destinations. In Admin → Custom definitions, the Custom dimensions table was **0 of 0**, so `link_url` and `link_domain` were not registered as report dimensions at inspection time. No Admin setting was changed.

## Device and technology

These are **property-wide** figures for the same date range and include public plus local traffic.

| Dimension | Active users | Events |
| --- | ---: | ---: |
| Web / desktop | 6 | 25 |
| Web / mobile | 2 | 11 |
| Chrome browser | 7 | 36 |
| Macintosh OS | 6 | 25 |
| Android OS | 1 | 6 |
| iOS | 1 | 5 |

GA4's device categories show 6 desktop and 2 mobile active users against a property total of 7: a user can appear in more than one category. The report also showed 0 engaged sessions and 22 seconds average engagement time per active user; with this small, mixed local/public sample, these are not stable performance measures.

## Method and limits

- Read directly from the signed-in GA4 browser: Admin → Data streams and Custom definitions; Reports → Pages and screens with **Hostname** as a secondary dimension; Events with **Hostname**; User → Tech details, switching among Browser, Device category, Platform / device category, and Operating system.
- The GA4 report indicated **100% of available data**. This does not prove every visit was collected; consent choices, blocking, and the earlier missing initial/virtual page-view implementation can affect collection.
- The Oct 2 page-view instrumentation correction is outside this report window. Its effect on public traffic is not established by this baseline. The local preview collection test belongs to the implementation item `ce64effe-82ce-4182-9346-74c3df18d7a5`.
- Link destination reporting requires registering the emitted event parameters as event-scoped custom dimensions, or another read path that exposes event parameters. Check the events sent by the deployed site and decide whether destination reporting is needed before changing Admin settings.

Next review: after new traffic accumulates, repeat the same host split over a fresh date range to assess the deployed page-view change and whether public clicks are being collected.
