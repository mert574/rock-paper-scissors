# Rock, Paper, Scissors

A multiplayer Rock, Paper, Scissors game built with Angular and a Node.js/Express
backend. Players choose a nickname, create or join a match, and play timed rounds.
The lobby and matches receive live updates through server-sent events.

## Current features

- Match creation and joining.
- Timed rounds, score tracking and completed-match history.
- Nickname-based player identities stored in the browser.

The backend currently uses an in-memory database, so its player and match data
is lost when the server restarts.

## Development

The frontend currently uses Angular 8. Its local preview runs on Node.js 22
with the legacy OpenSSL flag below; upgrading Angular remains planned work.

```sh
npm ci --ignore-scripts
node server/index.js
```

In a second terminal:

```sh
node --openssl-legacy-provider node_modules/@angular/cli/bin/ng serve --host 127.0.0.1
```

The frontend uses port 4200 and the backend uses port 6378.

## License

Original project code and the new SVG game icons are licensed under [MIT](LICENSE).
Existing logo credits are recorded in `src/assets/info.txt`.
