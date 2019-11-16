const EmbeddedDocument = require("camo").EmbeddedDocument;
const GameRound = require("./gameRound.entity");

class Game extends EmbeddedDocument {
  currentRound = {
    type: GameRound,
    required: false,
    default: null,
  };

  pastRounds = {
    type: [GameRound],
    required: false,
    default: null,
  };
}

module.exports = Game;
