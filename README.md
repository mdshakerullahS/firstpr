# FirstPR — Open-Source Discovery Platform

> **Live Demo:** [https://firstpr-one.vercel.app](https://firstpr.vercel.app)

A high-performance system designed to connect developers with impactful open-source opportunities. By orchestrating the GitHub REST API with advanced caching and rate-limiting layers, it provides a seamless discovery experience tailored to a developer's specific skill set.

Built with Next.js, Prisma, PostgreSQL, and Upstash Redis. Focused on the "Deploy" and "Scale" pillars of real-world software — containerized with Docker for consistent environment parity between development and production.

---

## Tech Stack

| Layer          | Tool                         |
| -------------- | ---------------------------- |
| Framework      | Next.js (TypeScript) + React |
| Auth           | NextAuth.js (GitHub OAuth)   |
| Database       | PostgreSQL + Prisma ORM      |
| Caching        | Upstash Redis                |
| Rate Limiting  | Upstash Rate Limiting        |
| Infrastructure | Docker + Docker Compose      |
| API            | GitHub REST API              |

---

## Features

| Feature                     | What's included                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| 🔐 **GitHub OAuth**         | Secure authentication via NextAuth.js — no passwords, native GitHub flow                  |
| 🧠 **Intelligent Matching** | Filters issues by labels (e.g. `good first issue`) and developer tech stack               |
| ⚡ **Caching Layer**        | Upstash Redis reduces redundant GitHub API calls and drastically lowers response times    |
| 🚦 **Rate Limiting**        | Upstash Rate Limiting protects resources and ensures fair usage for unauthenticated users |
| 🗄️ **Type-Safe Data Layer** | Schema management with Prisma ORM and PostgreSQL                                          |
| 📝 **Validated Forms**      | Accessible, schema-validated forms built with React Hook Form and Zod                     |

---

## Running Locally

### Prerequisites

- Node.js 18+
- Docker (recommended) or a local PostgreSQL instance
- Upstash account (Redis + Rate Limiting)
- GitHub OAuth app credentials

### Environment variables

Create a `.env` file in the project root:

```env
# GitHub Authentication
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# Database (local or cloud)
DATABASE_URL=

# Database (Docker)
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_PORT=5432
POSTGRES_DB=

# Redis (Upstash)
REDIS_PROVIDER=upstash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Redis (Docker)
REDIS_URL=
```

### Run (Docker — recommended)

```bash
docker compose up --build -d
docker compose exec app npx prisma migrate dev
```

Then open `http://localhost:3000`.

### Run (manual)

```bash
git clone https://github.com/mdshakerullahS/firstpr.git
cd firstpr
npm install
npx prisma migrate dev
npm run dev
```

---

## How It Works

```
GET /api/issues (search) | GET /api/recommendations (for-you)
│
├─ 1. Auth check (NextAuth.js)
│ └─ GitHub OAuth session verified
│ User profile + tech stack loaded from PostgreSQL via Prisma
│
├─ 2. Rate Limiting (Upstash)
│ └─ Request counted against user/IP quota
│ Rejected early if limit exceeded
│
├─ 3. Cache lookup (Upstash Redis)
│ └─ Return cached results if available
│ Skip GitHub API call entirely
│
├─ 4. GitHub REST API (on cache miss)
│ └─ Query built via githubQueryBuilder + queryParser
│ Raw response mapped to Issue type via githubMapper
│ /recommendations: ranked by relevance to user tech stack
│ Result stored in Redis with TTL
│
└─ 5. Response → /dashboard/search or /dashboard/for-you
Matched issues · Repo context · Labels · Difficulty
```

---

## Project Structure

```
src/
├── app/
│ ├── api/
│ │ ├── auth/[...nextauth]/route.ts # NextAuth.js OAuth handler
│ │ ├── bookmarks/ # GET all + POST; [id]/ DELETE
│ │ ├── issues/route.ts # GitHub issue search endpoint
│ │ ├── profile/route.ts # User profile read/update
│ │ └── recommendations/route.ts # Personalised issue feed
│ ├── dashboard/
│ │ ├── bookmarks/ # Saved issues page
│ │ ├── for-you/ # Recommended issues page
│ │ ├── profile/ # Profile settings page
│ │ └── search/ # Manual issue search page
│ └── tech-stack/page.tsx # Tech stack selection wizard
├── features/ # Feature-sliced modules (issue, bookmark, profile, recommendation)
│ └── <feature>/
│ ├── components/ # UI components scoped to the feature
│ ├── fetch.ts # Data-fetching logic
│ └── store.ts # Zustand store slice
├── services/
│ ├── github.service.ts # GitHub REST API calls
│ ├── githubMapper.ts # Raw API → internal Issue type
│ ├── recommendation.service.ts # Matching + ranking logic
│ ├── bookmark.service.ts # Bookmark CRUD against Prisma
│ └── profile.service.ts # User profile operations
├── lib/
│ ├── auth.ts # NextAuth config
│ ├── cache.ts # Redis cache helpers
│ ├── rateLimit.ts # Rate limiter middleware
│ ├── redis.ts # Upstash Redis client
│ └── prisma.ts # Prisma client singleton
├── utils/
│ ├── githubQueryBuilder.ts # Builds GitHub search query strings
│ └── queryParser.ts # Parses incoming search params
└── types/ # Shared TypeScript interfaces (issue, bookmark, user, icon)

```

---

## Contact

**Md Shakerullah Sourov**

- GitHub: [@mdshakerullahS](https://github.com/mdshakerullahS)
- LinkedIn: [linkedin.com/in/mdshakerullah](https://linkedin.com/in/mdshakerullah)
- Email: sourovmdshakerullah@gmail.com

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for full details.
