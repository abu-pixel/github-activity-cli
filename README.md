# GitHub Activity CLI

A simple command-line tool that fetches and displays a GitHub user's recent public activity using the GitHub REST API.

Built as a lightweight Node.js project to demonstrate GitHub API integration.

## Features

- Fetches the 10 most recent public events for any GitHub user
- Shows human-readable descriptions for:
  - Pushes (`PushEvent`)
  - Issues (`IssuesEvent`)
  - Stars (`WatchEvent`)
  - Repository creation (`CreateEvent`)
  - Forks (`ForkEvent`)
  - And a fallback for all other event types
- Automatically retries up to 3 times on transient network failures
- Clear error messages for:
  - User not found (404)
  - Rate limit exceeded (403)
  - Other API errors
- Uses the native `fetch` API — no external dependencies

## Requirements

- **Node.js 18 or higher** (required for the built-in `fetch` API)

Check your version:

```bash
node -v
