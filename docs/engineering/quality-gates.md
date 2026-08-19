# Quality gates

**Owns:** the verification chain, and what each gate actually proves.

A gate that nobody can explain is a gate nobody will defend when it fails at an
inconvenient moment. Each one below states what it catches.

---

## 1. The chain

Three tiers, strictly additive: `fast ⊂ default ⊂ full`. One runner, run the same
way locally and in CI.

```bash
npm run verify:fast     # the inner loop
npm run verify          # before you push — identical to CI
npm run verify:full     # before you release
```

There is no CI-only check and no local-only check. A gate that only exists in CI
is a gate engineers learn to discover by surprise.

**`verify:fast` is no longer purely fast.** It builds the package, because
nothing downstream can typecheck or run without `dist/`. That is the boundary
being real rather than an inconvenience — before DH-2, everything shared one
compilation and no build was needed.

---

## 2. What each gate proves

### fast

| Gate                       | Proves                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| **Foundation token bridge**| No generated token file has been hand-edited. Runs **first** because it is cheapest and catches the one class of drift nothing downstream can see — a silently forked brand value. |
| **Package build**          | The package builds. Runs **second** because everything after it needs `dist/`: the documentation application resolves `@jheavner95/design` through the workspace link, not through a source alias. |
| **Boundary**               | The package's tsconfig resolves only inside the package; no library source escapes it; documentation imports only declared entry points; no documentation identifier appears in the bundle. Replaces the two esbuild resolver plugins DH-2 deleted. |
| **TypeScript — library & documentation** | Both compile under strict mode, each resolving only its own tree     |
| **TypeScript — tests**     | Tests type-check. A test that does not compile is not a test.                                   |
| **ESLint**                 | Zero warnings. A rule is an error or it is off.                                                 |
| **Unit & component tests** | Behaviour is what we claim, deterministically                                                   |
| **Accessibility tests**    | Every component passes automated axe checks; every interactive component is keyboard-operable   |

### default — adds

| Gate                   | Proves                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| **API check**          | The export surface matches `API.md`. **The most valuable check in the repository.**       |
| **Exports check**      | Every declared entry point resolves, in the shapes consumers import                       |
| **CSS check**          | The stylesheet contains what it claims and nothing more                                   |
| **Framework independence** | No framework specifier in source, in the emitted output, or in the manifest. Keeps [ADR 0007](../decisions/0007-framework-neutrality.md) a rule rather than a convention — the convention had already failed once. |
| **Client boundaries** | No entry point carries a `"use client"` directive; every module that needs one has one; none carries one it does not need; emitted output agrees with source. This is what keeps defect N1 fixed. |
| **Identity check**     | Name, version, registry, files, and peer ranges are coherent                              |
| **Documentation build**| The documentation site builds **against the published surface** — an integration test of the public API |

### full — adds

| Gate                   | Proves                                                                        |
| ---------------------- | ------------------------------------------------------------------------------ |
| **Pack**               | The tarball contains exactly what it should — no source, no tests, no site     |
| **Visual regression**  | Nothing changed appearance unintentionally, in both themes                     |
| **End-to-end**         | The documentation site and playground work in a real browser                   |

---

## 3. The gates that matter most

Three carry disproportionate weight, and they are the three to defend hardest
when someone wants to skip them.

**The API check.** It converts "be careful about exports" — which depends on
reviewer memory — into something that cannot be forgotten. Without it, the entire
public API strategy is a document rather than a mechanism.

**The token bridge check.** It is the only thing standing between the ecosystem
and a second canonical owner of the brand. A hand-edited generated file is a fork
that looks like a bug fix.

**The client-boundary check.** Added in DH-3, and the reason N1 cannot come
back. It does not check a list of known files — it re-derives, from the source,
which modules do something only a client can do, and fails if the directives
disagree in either direction. Over-marking fails as loudly as under-marking,
because over-marking is how N1 spread.

**The documentation build.** Since DH-2 the documentation site consumes the
published entry points, which makes it the one gate that exercises the API the
way a consumer does. This is not theoretical: on its first run against `dist/`
it found three defects the shared source tree had hidden — a component
documented under a name the package does not export, two same-named token
objects with different shapes, and `cn` being uncallable from a server
component. None was findable before.

---

## 4. Accessibility verification

Article II § 5 makes accessibility a contract. A contract needs a check.

**Automated, every component, every run:**

- axe with no violations, in both themes
- Keyboard operability: every interactive element reachable and operable
- Focus visibility on every focusable element
- Focus trapping and restoration on every overlay
- Correct name, role, and value

**Manual, before a component reaches Stable tier:**

- Screen-reader pass on the primary flow
- Zoom to 200% without loss of function
- Keyboard-only completion of the component's main task

Automated checks catch perhaps half of what matters. Saying so is more useful
than a green badge that implies otherwise, and the manual list is what makes the
Stable tier mean something.

**Known accessibility gaps are documented, not hidden**, in the documentation
product's Accessibility section. A named gap is a managed risk; an unnamed one is
a trap.

---

## 5. Visual verification

A component is not done because it compiles.

- Every component has a visual baseline in light and dark
- Baselines cover each variant and state, not just the default
- A baseline change is reviewed as a **design change**, by someone accountable
  for the design, not waved through as a test update

That last rule is the one that decides whether visual regression testing is worth
its maintenance cost. A team that updates baselines reflexively has bought a
slow test suite and no signal.

---

## 6. Never weaken a check

If a check is wrong, fix the check **in its own commit**, and state what the
false positive was.

A check weakened to make a build green is a check that will not catch the real
thing next time — and nobody will remember why it was loosened. This is Article
VI § 7, and it has no exceptions.

---

## 7. References

- [publishing.md](publishing.md)
- [../architecture/public-api.md](../architecture/public-api.md)
- [../contributing/governance.md](../contributing/governance.md)
