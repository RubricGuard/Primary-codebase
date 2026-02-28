# RubricGuard

**Live:** https://rubricguard.vercel.app

An AI-powered grading assistant that helps educators grade student submissions consistently using customizable rubrics.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: shadcn/ui, Tailwind CSS
- **Backend**: Supabase (auth, database, storage)
- **State**: TanStack Query
- **Routing**: React Router v6

## Getting Started

### Prerequisites

- Node.js 18+ or [Bun](https://bun.sh)
- A [Supabase](https://supabase.com) project

### Local Development

```sh
# Clone the repo
git clone <YOUR_GIT_URL>
cd rubricguard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your Supabase credentials in .env

# Start the dev server
npm run dev
```

### Environment Variables

Create a `.env` file at the project root with the following:

```
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
VITE_SUPABASE_PROJECT_ID=<your-project-id>
```

## Deployment (Vercel)

This project is configured to deploy on [Vercel](https://vercel.com).

### Deploy via CLI

```sh
npm install -g vercel
vercel
```

### Deploy via Vercel Dashboard

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Set the following **Environment Variables** in the Vercel project settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`
4. Click **Deploy**. Vercel auto-detects Vite and uses `npm run build` with `dist` as the output directory.

> The `vercel.json` in this repo configures all routes to serve `index.html` for client-side routing.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 8080 |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run tests |
| `npm run lint` | Lint code |
