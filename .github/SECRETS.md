# GitHub Secrets

Add these secrets in **Settings → Secrets and variables → Actions** for the CI/CD pipeline.

## Required for Build

| Secret | Description |
|--------|-------------|
| `DATABASE_URL` | Neon Postgres connection string (e.g. `postgresql://user:pass@host/db?sslmode=require`) |
| `DOCKERHUB_USERNAME` | DockerHub username (e.g. `harshitbreaksprod`) |
| `DOCKERHUB_TOKEN` | DockerHub access token (Settings → Security → Access Tokens) |

## Required for Deploy

| Secret | Description |
|--------|-------------|
| `SSH_PRIVATE_KEY` | Full private key for SSH to the VM (including `-----BEGIN...-----` and `-----END...-----`) |
| `SSH_IP` | VM IP or hostname |
| `SSH_USER` | SSH username on the VM |
| `DATABASE_URL` | Neon Postgres connection string |
| `REDIS_URL` | Managed Redis connection string (e.g. `redis://default:pass@host:port` or `rediss://...` for TLS) |
| `FRONTEND_URL` | Public URL of the app (e.g. `https://yourdomain.com`) for CORS |
| `API_URL` | Same as FRONTEND_URL or internal API URL (e.g. `https://yourdomain.com`) |
| `OPENAI_API_KEY` | OpenAI API key |
| `JWT_SECRET` | Strong random string for signing JWTs (e.g. 32+ chars) |
| `JWT_EXPIRES_IN` | Token expiry (e.g. `7d`, `24h`) |
| `COOKIE_NAME` | Cookie name for session (e.g. `session_token`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_CALLBACK_URL` | Must match Google Console (e.g. `https://yourdomain.com/api/v1/auth/google/callback`) |

## Repo permissions

No special workflow permissions needed for DockerHub. The build job uses `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` to push images.
