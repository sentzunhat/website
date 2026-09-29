# Zacatl: triage Sequelize UUID advisory

## Issue summary

The Sentzunhat website production dependency audit reports the moderate
`GHSA-w5hq-g745-h8pq` advisory through this chain:

```text
@sentzunhat/zacatl@0.0.61
└── peer sequelize@6.37.8
    └── uuid@8.3.2
```

The advisory covers `uuid` versions below `11.1.1`. It concerns missing output
buffer bounds checks in the v3, v5, and v6 UUID functions when a caller provides
a buffer.

This report is ready to copy into the Zacatl issue tracker. It records a
dependency-policy problem and a compatibility decision; it does not claim that
the current website exposes a confirmed exploitable path.

## Environment and evidence

- Observed on 2026-09-29.
- Node: `26.10.0`.
- npm: `11.19.1`.
- Zacatl: `0.0.61`.
- Sequelize: `6.37.8`.
- Vulnerable transitive UUID copy: `8.3.2` beneath Sequelize.
- Zacatl's separate direct UUID dependency is `^14.0.1`; the observed direct
  copy is `14.0.2` and is not the dependency triggering this advisory.
- `npm audit --omit=dev` reports three moderate package entries, but they are
  the propagated representation of this one dependency chain.

Reproduction:

```bash
nvm use
npm install
npm ls @sentzunhat/zacatl sequelize uuid --all
npm audit --omit=dev
```

## Exposure assessment

The advisory is real for the installed `uuid@8.3.2` package. However, the
affected API shape is narrower than the package-level audit result:

- The vulnerable functions are UUID v3, v5, and v6 when supplied with an output
  buffer.
- Inspection of the installed Sequelize 6.37.8 runtime found calls to UUID v1
  and v4 without caller-provided output buffers.
- No call matching the advisory's affected v3/v5/v6 buffer shape was found in
  the inspected Sequelize runtime path used by this website.

Current assessment: dependency remediation is warranted, while direct runtime
exploitability in the inspected website path appears low. This is not proof for
every Zacatl consumer or every Sequelize dialect; the Zacatl repository should
repeat the reachability review across its supported matrix.

## Unsafe automatic fix

Do not accept the current `npm audit fix --force` proposal. npm proposes:

- Sequelize `3.30.0`, replacing `6.37.8`.
- Zacatl `0.0.12`, replacing `0.0.61`.

Those are breaking downgrades and would discard years of framework and Zacatl
changes. A lower version number is not a valid security patch here.

## Recommended triage

1. Check for an upstream Sequelize 6 release that raises `uuid` to a fixed
   version. Prefer this path because Sequelize owns the transitive dependency
   and its compatibility contract.
2. If no upstream fix exists, test a package-manager override scoped only to
   Sequelize's UUID dependency and pin it to `11.1.1` or newer.
3. Treat the override as a compatibility experiment, not a mechanical update:
   Sequelize 6 uses the CommonJS `require('uuid').v1` and `.v4` shape, while the
   proposed override crosses several UUID majors.
4. If the override fails, document a time-bounded risk acceptance and monitor
   upstream. Do not downgrade Zacatl or Sequelize to silence the audit.

## Patch acceptance criteria

- Zacatl's supported Node matrix passes.
- Zacatl unit and integration tests pass.
- A representative Fastify + Sequelize + SQLite consumer starts successfully.
- Model synchronization, inserts, reads, and transactions pass.
- Sequelize's UUID v1/v4 CommonJS calls work with the selected resolution.
- The consumer lockfile contains no affected UUID version in the Sequelize
  subtree.
- `npm audit --omit=dev` no longer reports this advisory.
- The release notes describe the dependency change and any package-manager
  constraints.
- The result ships as a Zacatl patch release only if the public compatibility
  contract remains unchanged; otherwise use the appropriate larger release.

## Suggested issue metadata

- Type: dependency security / compatibility
- Priority: normal
- Severity: moderate package advisory, low observed website reachability
- Suggested labels: `dependencies`, `security`, `sequelize`, `triage`
- Related website work item: `2a1dc541`

## Primary references

- GitHub advisory: <https://github.com/advisories/GHSA-w5hq-g745-h8pq>
- UUID fix release threshold: `11.1.1`, as recorded by the advisory.
