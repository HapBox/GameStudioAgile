const ErrorResponse = require("../classes/error-response");
const Bug = require("../database/models/Bug.model");
const GameVersion = require("../dataBase/models/GameVersion.model");
const Task = require("../dataBase/models/Task.model");

const getGamedesignerTasks = async (req, _res, next) => {
  if (req.position === "Gamedesigner") {
    req.tasks = {};
    const plansTasks = await Task.findAll({
      where: {
        status: "inPlans",
      },
      include: [
        {
          model: GameVersion,
          attributes: ["id", "version", "dateTo"],
        },
        {
          model: Bug,
          attributes: ["id", "description"],
        },
      ],
    });
    req.tasks.inPlans = plansTasks;
    const workTasks = await Task.findAll({
      where: {
        status: "inWork",
      },
      include: [
        {
          model: GameVersion,
          attributes: ["id", "version", "dateTo"],
        },
        {
          model: Bug,
          attributes: ["id", "description"],
        },
      ],
    });
    req.tasks.inWork = workTasks;
    const doneTasks = await Task.findAll({
      where: {
        status: "isDone",
      },
      include: [
        {
          model: GameVersion,
          attributes: ["id", "version", "dateTo"],
        },
        {
          model: Bug,
          attributes: ["id", "description"],
        },
      ],
    });
    req.tasks.isDone = doneTasks;
    const checkedTasks = await Task.findAll({
      where: {
        status: "isChecked",
      },
      include: [
        {
          model: GameVersion,
          attributes: ["id", "version", "dateTo"],
        },
        {
          model: Bug,
          attributes: ["id", "description"],
        },
      ],
    });
    req.tasks.isChecked = checkedTasks;
  }
  next();
};

const createGamedesignerTask = async (req, _res, next) => {
  if (req.position === "Gamedesigner") {
    const task = await Task.create(req.body);
    req.createdTask = task;
  }
  next();
};

const updateGamedesignerTask = async (req, _res, next) => {
  if (req.position === "Gamedesigner") {
    req.updatedTask = req.body;
  }
  next();
};

const checkGamedesigner = async (req, _res, next) => {
  if (req.position !== "Gamedesigner") {
    throw new ErrorResponse("Forbidden", 403);
  }
  next();
};

module.exports = {
  getGamedesignerTasks,
  createGamedesignerTask,
  updateGamedesignerTask,
  checkGamedesigner,
};
