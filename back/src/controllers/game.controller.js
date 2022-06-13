const { Router } = require("express");
const Game = require("../dataBase/models/Game.model");
const GameVersion = require("../database/models/GameVersion.model");
const Platform = require("../database/models/Platform.model");
const {
  checkGamedesigner,
} = require("../middlewares/gamedesigner.middlewares");
const {
  asyncHandler,
  requireToken,
} = require("../middlewares/main.middlewares");

const router = new Router();

function initRoutes() {
  router.get("/", asyncHandler(requireToken), asyncHandler(getGames));
  router.post(
    "/",
    asyncHandler(requireToken),
    asyncHandler(checkGamedesigner),
    asyncHandler(createGame)
  );
}

async function getGames(req, res, next) {
  const games = await Game.findAll({
    include: {model:  GameVersion, include:{model:Platform}}
  });
  res.status(200).json(games);
}

async function createGame(req, res, next) {
  const game = await Game.create(req.body);
  res.status(200).json({ message: "Created", game: game });
}

initRoutes();

module.exports = router;
