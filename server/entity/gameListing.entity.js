const Document = require("camo").Document;
const Player = require("./player.entity");
const Game = require("./game.entity");

class GameListing extends Document {
  status = {
    type: String,
    choices: ["ACTIVE", "PLAYING", "FINISHED", "EXPIRED"],
    default: "ACTIVE",
  };

  player = {
    type: Player,
    required: true,
  };

  opponent = {
    type: Player,
    required: false,
    default: null,
  };

  game = {
    type: Game,
    required: false,
    default: null,
  };

  winner = {
    type: String,
    required: false,
    default: null,
    choices: [null, "PLAYER", "OPPONENT"],
  };

  createdAt = {
    type: Date,
    default: Date.now
  };

  updatedAt = {
    type: Date,
    required: false,
    default: null,
  };

  static collectionName() {
    return 'games';
  }
}

module.exports = GameListing;
