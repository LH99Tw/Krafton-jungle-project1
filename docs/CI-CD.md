# CI/CD 및 Vercel 배포

이 프로젝트는 GitHub Actions로 production 빌드를 검증하고, `main` 브랜치에 변경사항이 반영되면 Vercel production으로 배포합니다.

## 배포 흐름

```text
feature branch
    ↓ Pull Request
GitHub Actions: npm ci → npm run build
    ↓ PR merge
main push
    ↓
GitHub Actions: build → Vercel pull → Vercel build → Vercel production deploy
```

현재 workflow:

- `.github/workflows/ci.yml`: PR 및 `main` push에서 production build 검증
- `.github/workflows/deploy-vercel.yml`: `main` push 또는 수동 실행 시 production 배포

## GitHub Secrets 설정

GitHub 저장소의 `Settings → Secrets and variables → Actions`에서 다음 값을 추가합니다.

| Secret | 값 | 설명 |
| --- | --- | --- |
| `VERCEL_TOKEN` | Vercel Personal Token | CLI 인증 토큰 |
| `VERCEL_ORG_ID` | `team_uzvkNoPZJBOu7M7Y3Pq5a00J` | Vercel 팀 ID |
| `VERCEL_PROJECT_ID` | `prj_DHymUN7j17fMjaEUl4dAaYG5uyzq` | `lee-juhan-project-reel` 프로젝트 ID |

토큰은 저장소 파일이나 workflow 로그에 직접 기록하지 않습니다. `VERCEL_TOKEN`은 Vercel 계정의 Personal Account Settings에서 생성합니다.

## Production 배포 조건

`deploy-vercel.yml`은 `main`에 push될 때 실행됩니다. 따라서 PR을 `main`에 병합하면 새로운 production 배포가 시작됩니다.

안전한 운영을 위해 GitHub 저장소에서 다음 branch protection을 권장합니다.

- `main` 직접 push 제한
- Pull Request 필수
- `CI / build` 성공 필수
- 필요 시 승인 리뷰 1개 이상 필수

이렇게 설정하면 일반적인 production 변경은 PR 병합을 통해서만 발생합니다.

## 수동 배포

GitHub Actions의 `Deploy to Vercel` workflow에서 `Run workflow`를 선택해 수동 배포할 수 있습니다.

로컬에서 직접 배포할 때는 다음 명령을 사용합니다.

```bash
npm ci
npm run build
vercel --prod
```

## 환경변수

현재 앱은 정적 콘텐츠만 사용하므로 필수 runtime 환경변수는 없습니다. Supabase를 연결할 때는 Vercel Project Settings의 Production 환경에 다음 값을 추가합니다.

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Publishable key만 브라우저에 노출하고, service role key나 Supabase access token은 절대 `VITE_` 변수로 저장하지 않습니다.

## 실패 시 확인 순서

1. GitHub Actions의 `CI` workflow에서 `npm ci`와 `npm run build` 로그를 확인합니다.
2. `Deploy to Vercel`의 Vercel CLI 단계에서 인증 및 project ID를 확인합니다.
3. Vercel dashboard에서 deployment build log와 deployment status를 확인합니다.
4. React Router 경로(`/works/`, `/works/:slug`, `/about/`)를 직접 새로고침해 rewrite가 동작하는지 확인합니다.

## 현재 production URL

https://lee-juhan-project-reel.vercel.app
