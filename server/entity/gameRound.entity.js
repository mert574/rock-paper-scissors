const EmbeddedDocument = require("camo").EmbeddedDocument;

class GameRound extends EmbeddedDocument {
  round = {
    type: Number,
    min: 1,
    max: 99,
    required: true,
  };

  playerMove = {
    type: String,
    choices: [null, "ROCK", "PAPER", "SCISSORS"],
    default: null,
  };

  opponentMove = {
    type: String,
    choices: [null, "ROCK", "PAPER", "SCISSORS"],
    default: null,
  };

  roundWinner = {
    type: String,
    choices: [null, "DRAW", "PLAYER", "OPPONENT"],
    default: null,
  };

  roundEndsAt = {
    type: Date,
    required: true,
  }
}

module.exports = GameRound;
