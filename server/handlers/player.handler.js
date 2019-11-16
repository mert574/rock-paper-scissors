const entity = require("../entity");

function getPlayerById(playerId) {
  return entity.player.findOne({ _id: playerId });
}

function getAllPlayers() {
  return entity.player.find({});
}

module.exports = {
  getPlayerById,
  getAllPlayers,
};
