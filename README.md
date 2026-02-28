# RubricGuard

**Live:** https://rubricguard.vercel.app

An AI-powered grading co-pilot that helps  

# RubricGuard AI  
### Stop grading drift before it becomes a dispute.

RubricGuard is a real-time grading alignment tool for professors teaching large, multi-section courses.

It helps instructors catch grading inconsistency for equivalent answers during the grading process — not after students file regrade requests.

---

## The Problem

In large, multi-grader courses:

- Equivalent work receives different scores  
- Rubrics are interpreted differently across TAs  
- Grading drifts over long sessions  
- Regrades consume time and create fairness concerns  

Learning Management Systems record grades.  
Feedback tools assist with comments.  
Manual Calibration meetings happen occasionally.

No system monitors grading alignment live.

---

## The Solution

RubricGuard runs alongside grading.

As instructors score submissions, it:

- Detects scoring drift across graders  
- Flags deviations from baseline patterns  
- Checks whether written justifications align with rubric criteria  
- Highlights unstable rubric dimensions  
- Logs decisions for defensibility  

Professors keep full authority.  
Nothing is auto-graded.  
Nothing is overridden.

---

## Who It’s For

- Multi-section core classes  
- TA-heavy grading teams  
- Essay and case-based assessments  

If grading alignment is a recurring departmental issue, this is built for you.

---

## How It Works

1. Upload rubric and submissions  
2. Grade as usual  
3. Receive real-time consistency alerts  
4. Review session analytics  
5. Finalize with documented alignment summary  

No LMS integration required to start.

---

## Why Now

- Larger class sizes  
- More subjective assessments  
- More TA-heavy grading  
- Increased scrutiny around fairness  
- Growth of AI-generated student work  

The cost of inconsistency is rising.

---

## What It Is Not

- Not automated grading  
- Not an LMS replacement  
- Not a plagiarism tool  

It’s a grading copilot — not a grading robot.

---

## Status

MVP deployed. 
Pilot to start with large, multi-section courses at Carnegie Mellon University.

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
