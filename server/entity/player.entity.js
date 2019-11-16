const Document = require("camo").Document;

class Player extends Document {
  name = {
    type: String,
    required: true,
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
    return 'players';
  }
}

module.exports = Player;
