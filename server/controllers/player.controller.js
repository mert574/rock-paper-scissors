const router = require('express').Router();
const playerHandler = require('../handlers/player.handler');

// hooks
router
  .get('/', getAllPlayersController)
  .get('/:playerId', getPlayerController)
  .post('/register', registerPlayerController);

// controllers
async function getAllPlayersController(req, res, next) {
  try {
    const players = await playerHandler.getAllPlayers();
    res.json(players).end();
  } catch (e) {
    next(e);
  }
}

async function getPlayerController(req, res, next) {
  try {
    const player = await playerHandler.getPlayerById(req.params.playerId);
    if (!player) {
      res.status(404).end();
      return
    }

    res.json(player).end();
  } catch (e) {
    next(e);
  }
}

async function registerPlayerController(req, res, next) {
  try {
    const player = await playerHandler.registerPlayer(req.body.name);
    if (!player) {
      res.status(404).end();
      return
    }

    res.json(player).end();
  } catch (e) {
    next(e);
  }
}

module.exports = router;
