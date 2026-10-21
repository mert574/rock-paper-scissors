# Roadmap

## Angular and development setup

- Upgrade Angular, the component library and supporting packages to versions compatible with Node.js 22.
- Replace the old build and test tooling where necessary.
- Add portable scripts for starting the frontend and backend together, with a reproducible dependency lockfile.
- Make API and event-stream addresses configurable for development and deployment.

## Multiplayer reliability

- Improve lobby updates, joining, round transitions and timeout handling.
- Restore match state after refresh and reconnect cleanly after a dropped event stream.
- Keep submitted moves private until both players have chosen or the round ends.
- Handle players leaving, expired matches and rematches consistently.

## Matches and history

- Add configurable match length and round timers.
- Preserve match history across server restarts with persistent storage.
- Add match details with round results, score summaries and filtering.
- Add a leaderboard showing player rankings, wins, losses and draws.

## Interface

- Redesign the lobby, match screen, history and surrounding page layout.
- Give the interface a more game-like presentation with player cards, clear scoreboards and prominent round and match results.
- Add animations for move selection, countdowns, simultaneous reveals, round results and match victories.
- Expand nickname setup into a guided join flow.
- Improve mobile layouts, keyboard controls, loading states and round-result feedback.
