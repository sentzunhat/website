# Assess Turso database support in Zacatl

ID: `c4253e37-2d77-457b-afa8-2dfeb5887073`
Type: investigation
Status: plan-ready
Opened: 2026-10-01
Updated: 2026-10-01

input: |
  Research Turso and plan how to implement it in Zacatl. Compare whether it is easier and safer to use it with the existing Sequelize integration or through a Zacatl-native database adapter.

context: |
  The Sentzunhat website uses Zacatl 0.0.61, Sequelize 6, sqlite3, and a local SQLite file. Zacatl currently advertises Sequelize, Mongoose, and Node's built-in SQLite repository adapters. Turso now refers to both the newer Rust-based Turso Database and the older libSQL project, with separate JavaScript packages and operational models.

mission: |
  Produce an evidence-based compatibility and implementation plan for adding a Turso-compatible database option to Zacatl without coupling domain/application code to a particular driver.

constraints: |
  Research current primary documentation and package/API contracts. Keep Turso Database distinct from libSQL/Turso Cloud. Do not add a runtime dependency, change this website's database, create an account, or make an infrastructure purchase during this investigation. Treat unverified ORM compatibility as unknown, not supported.

output: |
  A short comparison of Sequelize and direct-driver paths, a recommendation to prototype an optional Zacatl Turso module, an adapter boundary and proof matrix, risks/unknowns, and a next implementation slice if the API is compatible.

## Initial source review

Directly observed on 2026-10-01:

- Zacatl 0.0.61 exports Sequelize and Node SQLite adapters and accepts database instances through its server platform.
- Zacatl's documented JavaScript APIs include direct Turso Database (`@tursodatabase/database`) and Turso Cloud (`@tursodatabase/serverless`) drivers; these are not Sequelize dialect packages.
- Sequelize v6 documents `sqlite3` as its SQLite connector. No first-party Sequelize dialect for either Turso JavaScript package was found in the inspected official sources.
- This suggests an ORM-preserving solution may require an additional compatible dialect bridge, while a direct Turso driver would likely require a new Zacatl platform/repository adapter. This is a hypothesis to verify with a small prototype, not a compatibility claim.

## Follow-up assessment

Rechecked on 2026-10-01:

- Sequelize v6's documented dialect list remains finite and its v7 documentation describes dialects as separate packages, but v7 is alpha and the official docs state Sequelize v6 does not accept new dialects. No official Sequelize Turso/libSQL dialect was found. A custom v6 connector is possible as third-party code in principle, but it would own a substantial dialect contract and ongoing compatibility testing; this is not simply plugging the Turso SDK into Sequelize.
- The Rust-based Turso Database SDK and the libSQL/Turso Cloud client are separate engines/APIs. A future Zacatl module should select and name the target explicitly. For the smallest proof, prototype an optional Zacatl provider/platform module around one official JS driver, retaining Zacatl repository/domain ports. Do not make Sequelize a hard dependency for that path.
- The adapter's implementation can be published as free/open-source code. That does not make cloud hosting, usage overages, or engineering/maintenance free. Turso's pricing page currently advertises a $0 tier with quotas; those limits and terms can change.
- Recommendation: do not build a Sequelize connector first. Prototype an optional Zacatl Turso module and compare the smallest set of existing website operations against the current SQLite/Sequelize implementation. Revisit a Sequelize bridge only if preserving Sequelize models is a hard product requirement and a viable dialect contract passes the same test matrix.

## Planned investigation

1. Distinguish local embedded Turso Database, Turso Cloud serverless access, and libSQL embedded replicas; identify which one matches the target deployment and durability needs.
2. Inspect each official JavaScript package's connection, transaction, prepared statement, pooling/concurrency, type, and platform support contracts.
3. Prototype an optional Zacatl module around one selected official Turso JS driver; test connection, UUID/page schema creation, constraints, transactions, query semantics, and teardown.
4. Inspect Zacatl extension points for `DatabaseVendor`, `DatabaseServerPort`, ORM tokens, repositories, readiness, and its service composition lifecycle.
5. Only if Sequelize must be retained, separately prototype a dialect bridge and compare its compatibility surface and maintenance cost to the native module.
6. Record deployment constraints, local development parity, durability/backups, concurrency, operations, dependency/security footprint, and expected change surface.
7. Recommend adopt, defer, or reject with a test matrix and bounded Zacatl implementation plan.

## Initial primary sources

- [Zacatl framework architecture and adapters](https://github.com/sentzunhat/zacatl/blob/main/README.md)
- [Turso JavaScript API reference](https://github.com/tursodatabase/turso/blob/main/docs/javascript-api-reference.md)
- [Turso TypeScript SDK](https://docs.turso.tech/sdk/ts/quickstart)
- [Sequelize v6 SQLite connector documentation](https://sequelize.org/docs/v6/other-topics/dialect-specific-things/)
- [Sequelize v6 supported dialects and drivers](https://sequelize.org/docs/v6/getting-started/)
- [Sequelize v7 new dialect guidance](https://sequelize.org/docs/v7/databases/new/)
- [Turso pricing](https://turso.tech/pricing)

## Open questions

- Is the target an embedded database on the existing host, Turso Cloud, or a nearby embedded replica?
- Is keeping Sequelize an actual requirement, or is preserving repository/domain boundaries the important compatibility contract?
- Which deployment's persistence and concurrent-write needs must the prototype meet?

No implementation or production suitability is claimed by this initial plan.
