const Document = require("camo").Document;
const Player = require("./player.entity");

class User extends Document {
  username = String;
  passwordHash = String;

  player = Player;

  gamesPlayer = {
    type: Number,
    default: 0,
  };

  createdAt = {
    type: Date,
    default: Date.now
  };

  updatedAt = {
    type: Date,
    default: null,
  };

  static collectionName() {
    return 'users';
  }
}

module.exports = User;
