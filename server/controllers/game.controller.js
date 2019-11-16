const router = require('express').Router();
const gameHandler = require('../handlers/game.handler');
const playerHandler = require('../handlers/player.handler');

// hooks
router
  .get('/', getAllGamesController)
  .get('/:gameId', getGameController)
  .post('/:gameId/join/:opponentId', joinGameController)
  .post('/:gameId/play/:playerId/:move', playGameController);

// controllers
async function getAllGamesController(req, res) {
  console.log(`[GET] getAllGames`);

  try {
    const games = await gameHandler.getAllGameListings();
    res.json(games).end();
  } catch (e) {
    res.status(500).json({ error: e.message }).end();
  }
}

async function getGameController(req, res, next) {
  const { gameId } = req.params;
  console.log(`[GET] getGame: ${gameId}`);

  if (!gameId) {
    res.status(400).end();
    return;
  }

  try {
    const game = await gameHandler.getGameListingById(gameId);
    if (!game) {
      res.status(404).end();
      return;
    }

    res.json(game).end();

  } catch (e) {
    next(e);
  }
}

async function joinGameController(req, res, next) {
  const { gameId, opponentId } = req.params;
  console.log(`[POST] joinGame: ${gameId}, opponentId: ${opponentId}`);

  try {
    const opponent = await playerHandler.getPlayerById(opponentId);
    if (!opponent) {
      res.status(404).end();
      return;
    }

    const listing = await gameHandler.joinGame(gameId, opponent);
    res.json(listing).end();
  } catch (e) {
    next(e);
  }
}

async function playGameController(req, res, next) {
  const { gameId, playerId, move } = req.params;
  console.log(`[POST] playGame: ${gameId}, playerId: ${playerId}, move: ${move}`);

  try {
    const player = await playerHandler.getPlayerById(playerId);
    if (!player) {
      res.status(404).end();
      return;
    }

    const listing = await gameHandler.playGame(gameId, player, move);
    res.json(listing).end();
  } catch (e) {
    next(e);
  }
}

module.exports = router;
