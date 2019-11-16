const express = require("express");
const cors = require("cors");

const entity = require("./entity");
const gameController = require("./controllers/game.controller");
const playerController = require("./controllers/player.controller");
const gameHandler = require("./handlers/game.handler");
const initializeDB = require("./config/db.config");

const app = express();
const port = 6378;

app.use(cors());

app.use("/api/game", gameController);
app.use("/api/player", playerController);

app.use(function(req, res, next) {
  res.status(500).json("Error.").end();
});

initializeDB().then(generateMockData);

app.listen(port, () => console.log(`RPS app listening on port ${port}!`));

// ------

async function generateMockData() {
  const player1 = await entity.player.create({ _id: "1", name: "John Doe" });
  const player2 = await entity.player.create({ _id: "2", name: "Keanu Reeves" });

  await player1.save();
  await player2.save();

  const listing1 = await gameHandler.createGameListing(player1, "1");
  const listing2 = await gameHandler.createGameListing(player2, "2");

  await listing1.save();
  await listing2.save();

  await gameHandler.joinGame("1", player2);
}
