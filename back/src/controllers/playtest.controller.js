const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const Game = require("../dataBase/models/Game.model");
const GameVersion = require("../dataBase/models/GameVersion.model");
const Playtest = require("../dataBase/models/Playtest.model");
const Worker = require("../dataBase/models/Worker.model");
const {
  asyncHandler,
  requireToken,
} = require("../middlewares/main.middlewares");
const { checkManager } = require("../middlewares/managers.middlewares");

const router = new Router();

function initRoutes() {
  router.get(
    "/",
    asyncHandler(requireToken),
    asyncHandler(checkManager),
    asyncHandler(getPlaytests)
  );
  router.post(
    "/",
    asyncHandler(requireToken),
    asyncHandler(checkManager),
    asyncHandler(createPlaytest)
  );
}

async function getPlaytests(req, res, next) {
  const playtests = await Playtest.findAll({
    include: [
      {
        model: GameVersion,
        attributes: ["id", "version"],
        include: {
          model: Game,
          attributes: ["id", "name"],
        },
      },
      {
        model: Worker,
        attributes: ["id", "name"],
      },
    ],
  });
  res.status(200).json(playtests);
}

async function createPlaytest(req, res, next) {
  const playtest = await Playtest.create({
    ...req.body,
    idWorker: req.token.workerId,
  });
  res.status(200).json({ message: "Created", playtest: playtest });
}

initRoutes();

module.exports = router;
