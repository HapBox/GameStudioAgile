const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const { createManagerTask } = require("../middlewares/managers.middlewares");
const {
  asyncHandler,
  requireToken,
  syncHandler,
  getTaskById,
  checkCreateTask,
} = require("../middlewares/main.middlewares");
const {
  getCodeTasks,
  createProgrammerTask,
  updateProgrammerTask,
  addToTaskProgrammer,
} = require("../middlewares/programmers.middlewares");
const {
  getArtTasks,
  createArtistTask,
  updateArtistTask,
  addToTaskArtist,
} = require("../middlewares/artists.middlewares");
const {
  getGamedesignerTasks,
  createGamedesignerTask,
  updateGamedesignerTask,
} = require("../middlewares/gamedesigner.middlewares");
const Department = require("../dataBase/models/Department.model");
const GameVersion = require("../dataBase/models/GameVersion.model");
const Bug = require("../dataBase/models/Bug.model");

const router = new Router();

function initRoutes() {
  router.get(
    "/",
    asyncHandler(requireToken),
    asyncHandler(getCodeTasks),
    syncHandler(getArtTasks),
    asyncHandler(getGamedesignerTasks),
    asyncHandler(getTasks)
  );
  router.get(
    "/data",
    asyncHandler(requireToken),
    asyncHandler(checkCreateTask),
    asyncHandler(getData)
  );
  router.post(
    "/",
    asyncHandler(requireToken),
    asyncHandler(createProgrammerTask),
    asyncHandler(createArtistTask),
    asyncHandler(createGamedesignerTask),
    asyncHandler(createManagerTask),
    asyncHandler(createTask)
  );
  router.patch(
    "/:id",
    asyncHandler(requireToken),
    asyncHandler(getTaskById),
    asyncHandler(updateProgrammerTask),
    asyncHandler(updateArtistTask),
    asyncHandler(updateGamedesignerTask),
    asyncHandler(updateTask)
  );
  router.post(
    "/:id",
    asyncHandler(requireToken),
    asyncHandler(getTaskById),
    asyncHandler(addToTaskArtist),
    asyncHandler(addToTaskProgrammer),
    asyncHandler(addWorkerGroup)
  );
}

async function getTasks(req, res, next) {
  res.status(200).json({ tasks: req.tasks });
}

async function getData(req, res, next) {
  let department = [];
  if (req.position === "LeadProgrammer") {
    const f = await Department.findOne({
      where: {
        name: "Code",
      },
    });
    department.push(f);
  } else if (req.position === "LeadArtist") {
    const f = await Department.findOne({
      where: {
        name: "Art",
      },
    });
    department.push(f);
  } else department = await Department.findAll();
  const gameVersions = await GameVersion.findAll();
  const bugs = await Bug.findAll();
  res
    .status(200)
    .json({ department: department, gameVersions: gameVersions, bugs: bugs });
}

async function createTask(req, res, next) {
  if (!req.createdTask) throw new ErrorResponse("Forbidden", 403);
  res.status(200).json(req.createdTask);
}

async function updateTask(req, res, next) {
  if (!req.updatedTask) throw new ErrorResponse("Forbidden", 403);
  const task = await req.task.update(req.updatedTask);
  res.status(200).json(req.updatedTask);
}

async function addWorkerGroup(req, res, next) {
  console.log(req.worker);
  if (!req.worker) throw new ErrorResponse("Forbidden", 403);
  await req.worker.addTask(req.task);
  res.status(200).json({ message: "Added" });
}

initRoutes();

module.exports = router;
