const entity = require("../entity");
const { sendEvent } = require("../config/sse.config");

function getPlayerById(playerId) {
  return entity.player.findOne({_id: playerId});
}

function getAllPlayers() {
  return entity.player.find({});
}

async function registerPlayer(name) {
  const player = entity.player.create({name});
  await player.save();
  sendEvent(player, "PLAYER_CREATED");
  return player;
}

module.exports = {
  getPlayerById,
  getAllPlayers,
  registerPlayer,
};
