// index.js
const username = process.argv[2];

if (!username) {
  console.error("Usage: node index.js <github-username>");
  process.exit(1);
}

async function fetchActivity() {
  const url = `https://api.github.com/users/${username}/events/public`;

  const options = {
    headers: {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'github-activity-cli'
    }
  };

  let lastError;

  // Retry up to 3 times — fetch() sometimes fails on the first attempt
  // due to a transient TLS/DNS issue, especially on Windows.
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        if (response.status === 404) throw new Error(`User "${username}" not found.`);
        if (response.status === 403) throw new Error("Rate limit exceeded. Try again later.");
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const events = await response.json();

      if (events.length === 0) {
        console.log(`No recent public activity found for ${username}.`);
        return;
      }

      console.log(`\nRecent activity for ${username}:\n`);

      events.slice(0, 10).forEach(event => {
        let description = "";

        switch (event.type) {
          case "PushEvent":
            const commits = event.payload.commits ? event.payload.commits.length : 0;
            description = `Pushed ${commits} commit(s) to ${event.repo.name}`;
            break;
          case "IssuesEvent":
            description = `${event.payload.action} an issue in ${event.repo.name}`;
            break;
          case "WatchEvent":
            description = `Starred ${event.repo.name}`;
            break;
          case "CreateEvent":
            description = `Created ${event.payload.ref_type} in ${event.repo.name}`;
            break;
          case "ForkEvent":
            description = `Forked ${event.repo.name}`;
            break;
          default:
            description = `${event.type.replace('Event', '')} on ${event.repo.name}`;
        }

        console.log(`- ${description}`);
      });

      return; // success — exit the retry loop

    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt < 3) {
        console.log("Retrying in 1 second...\n");
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  // All retries failed — show the underlying cause
  console.error("\nAll attempts failed.");
  if (lastError && lastError.cause) {
    console.error("Underlying cause:", lastError.cause);
  }
  console.error("Full error:", lastError);
}

fetchActivity();