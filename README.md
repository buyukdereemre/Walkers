# Walkers

Arkadaşlarınla her gün yeniden başlayan küçük bir adım yarışı.

React Native + Expo (development build) + TypeScript istemci, Supabase backend.
Ürün ve teknik tasarım: [Phase 1 tasarım dokümanı](https://claude.ai/code/artifact/6c9afbf8-1bcd-4291-9414-ca6a181eb088).

## Branch düzeni

| Branch | Amaç |
| --- | --- |
| `main` | Her zaman stabil, çalışan sürüm |
| `develop` | Aktif geliştirme; tamamlanan fazlar buraya birleşir |
| `feature/<faz>` | Her faz kendi dalında geliştirilir (`feature/project-foundation`, `feature/auth`, ...) |

Akış: `develop`'tan `feature/<faz>` açılır, faz test edilip onaylanınca `develop`'a birleşir; `develop` stabil olduğunda `main`'e alınır.

Commit mesajları [Conventional Commits](https://www.conventionalcommits.org/) biçimindedir: `feat(auth): ...`, `fix(steps): ...`, `chore(tooling): ...`.
