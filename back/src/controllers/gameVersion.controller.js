const { Router } = require("express");
const GameVersion = require("../dataBase/models/GameVersion.model");
const {
  asyncHandler,
  requireToken,
} = require("../middlewares/main.middlewares");
const {
  checkGamedesigner,
} = require("../middlewares/gamedesigner.middlewares");
const Platform = require("../dataBase/models/Platform.model");
const Game = require("../dataBase/models/Game.model");

const router = new Router();

function initRoutes() {
  // router.get("/", asyncHandler(requireToken), asyncHandler(getVersions));
  router.get(
    "/data",
    asyncHandler(requireToken),
    asyncHandler(checkGamedesigner),
    asyncHandler(getData)
  );
  router.post(
    "/",
    asyncHandler(requireToken),
    asyncHandler(checkGamedesigner),
    asyncHandler(createPlaytest)
  );
}

// async function getVersions(req, res, next) {
//   const versions = await GameVersion.findAll({
//     where: {
//       idGame: req.params.game,
//     },
//   });
//   res.status(200).json({ versions: versions });
// }

async function getData(req, res, next) {
  const platforms = await Platform.findAll();
  const games = await Game.findAll();
  res.status(200).json({ platforms: platforms, games: games });
}

async function createPlaytest(req, res, next) {
  const version = await GameVersion.create({
    ...req.body,
    idWorker: req.token.idWorker,
  });
  res.status(200).json({ message: "Created", version: version });
}

initRoutes();

module.exports = router;
