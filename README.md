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
Installation
Clone the repository:

bash
git clone https://github.com/abu-pixel/github-activity-cli.git
cd github-activity-cli
No npm install is needed — the project has zero dependencies.

Usage
bash
node index.js <github-username>
Example
bash
node index.js abu-pixel
Sample output
text
Recent activity for abu-pixel:

- Pushed 2 commit(s) to abu-pixel/Ledger-Intelligence
- Starred abu-pixel/some-repo
- Opened an issue in abu-pixel/Ledger-Intelligence
- Created repository in abu-pixel/new-project
How It Works
The tool calls the GitHub REST API endpoint:

text
GET https://api.github.com/users/{username}/events/public
It sends the following headers:

Header	Value
Accept	application/vnd.github+json
User-Agent	github-activity-cli
The response is parsed and the 10 most recent events are formatted into readable lines based on the event type.

If a request fails due to a transient network issue, the tool retries up to 3 times with a 1-second delay between attempts.

Error Handling
Status	Meaning
404	The requested GitHub user does not exist
403	API rate limit exceeded (60 requests/hour for unauthenticated requests)
Other	A generic GitHub API error is shown with the status code
Project Structure
text
github-activity-cli/
├── index.js        # Main script
├── package.json    # Project metadata
└── README.md       # This file
Rate Limits
Unauthenticated requests to the GitHub API are limited to 60 requests per hour per IP address. If you hit the limit, wait until the reset time shown in the error, or authenticate your requests with a personal access token (not implemented in this version).

License
MIT



-
