const { Router } = require("express");
const Bug = require("../dataBase/models/Bug.model");
const GameVersion = require("../dataBase/models/GameVersion.model");
const Task = require("../dataBase/models/Task.model");
const {
  asyncHandler,
  requireToken,
} = require("../middlewares/main.middlewares");
const { checkManager } = require("../middlewares/managers.middlewares");

const router = new Router();

function initRoutes() {
  router.get("/version/:id", asyncHandler(requireToken), asyncHandler(getBugs));
  router.post(
    "/",
    asyncHandler(requireToken),
    asyncHandler(checkManager),
    asyncHandler(createBug)
  );
  router.get(
    "/data",
    asyncHandler(requireToken),
    asyncHandler(getData)
  );
}

async function createBug(req, res, next) {
  const bug = await Bug.create(req.body);
  res.status(200).json({ message: "Created", bug: bug });
}

async function getBugs(req, res, next) {
  const bugs = await Bug.findAll({
    where: {
      idGameVersion: req.params.id,
    },
    include: {
      model: Task,
      attributes: ["id"],
    },
  });
  res.status(200).json(bugs);
}

async function getData(req, res, next) {
  const versions = await GameVersion.findAll();
  res.status(200).json(versions);
}

initRoutes();

module.exports = router;
