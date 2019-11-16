const entity = require("../entity");

// TODO: expired rps handling
const ROUND_TIMEOUT_SEC = 999999;

// ---------------------

function getAllGameListings() {
  return entity.gameListing.find({}, { populate: true });
}

function getGameListingById(gameId) {
  return entity.gameListing.findOne({ _id: gameId }, { populate: true });
}

async function joinGame(gameId, opponent) {
  const gameListing = await getGameListingById(gameId);
  if (!gameListing) {
    throw new Error("Game not found.");
  }

  if (gameListing.status !== "ACTIVE" && gameListing.opponent !== null) {
    throw new Error("Game is not active.");
  }

  if (opponent._id === gameListing.player._id) {
    throw new Error("You cannot join your own game.");
  }

  const game = createGame();

  gameListing.opponent = opponent;
  gameListing.status = "PLAYING";
  gameListing.updatedAt = Date.now();
  gameListing.game = game;

  await gameListing.save();
  return gameListing;
}

async function playGame(gameId, player, move) {
  const validMoves = ["ROCK", "PAPER", "SCISSORS"];
  if (!validMoves.includes(move)) {
    throw new Error("Invalid move.");
  }

  const gameListing = await getGameListingById(gameId);
  if (!gameListing) {
    throw new Error("Game not found.");
  }

  const game = gameListing.game;
  if (!game.currentRound || game.currentRound.roundWinner) {
    throw new Error("No active round found.");
  }

  if (Date.now() >= game.currentRound.roundEndsAt) {
    throw new Error("Round expired.");
  }

  const moveKey = gameListing.player._id === player._id ? "playerMove" : "opponentMove";

  if (game.currentRound[moveKey] !== null) {
    throw new Error("You have already played this round.");
  }

  await playGameRound(gameListing, move, moveKey);

  await gameListing.save();
  return gameListing;
}

// ---------------------
// Helpers

function getRPSWinner(player, opponent) {
  if (player === opponent) {
    return "DRAW";
  }

  const winTable = {
    ROCK: "SCISSORS",
    PAPER: "ROCK",
    SCISSORS: "PAPER",
  };

  return winTable[player] === opponent ? "PLAYER" : "OPPONENT";
}

function getScoreTable(pastRounds) {
  return pastRounds.reduce((acc, curr) => {
    switch (curr.roundWinner) {
      case "PLAYER": {
        acc.player++;
        break;
      }
      case "OPPONENT": {
        acc.opponent++;
        break;
      }
    }
    return acc;
  }, { player: 0, opponent: 0 });
}

function playGameRound(gameListing, move, moveKey) {
  const { game } = gameListing;
  const round = game.currentRound;

  // play the round
  round[moveKey] = move;

  gameListing.updatedAt = Date.now();

  // check if the round ended
  if (round.playerMove && round.opponentMove) {
    round.roundWinner = getRPSWinner(round.playerMove, round.opponentMove);
    game.pastRounds.push(game.currentRound);

    // check if the game ended
    if (game.currentRound.round >= 3) {
      const scoreTable = getScoreTable(game.pastRounds);
      console.log("scoreTable", scoreTable);

      // check if score equality is broken
      if (scoreTable.player !== scoreTable.opponent) {
        game.currentRound = null;
        gameListing.status = "FINISHED";
        gameListing.winner = scoreTable.player > scoreTable.opponent ? "PLAYER" : "OPPONENT";
        return;
      }
    }

    // game goes on
    game.currentRound = createGameRound(game.currentRound.round + 1);
  }

  // TODO: notify users
}

function createGameRound(round) {
  const roundEndsAt = Date.now() + ROUND_TIMEOUT_SEC * 1000;
  return entity.gameRound.create({ round, roundEndsAt });
}

function createGame() {
  const firstRound = createGameRound(1);
  return entity.game.create({ currentRound: firstRound });
}

function createGameListing(player, _id, rest) {
  return entity.gameListing.create({ _id, player: player, ...rest });
}

module.exports = {
  getAllGameListings,
  getGameListingById,
  joinGame,
  playGame,
  createGameListing,
};
