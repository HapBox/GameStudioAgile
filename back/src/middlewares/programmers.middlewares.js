const ErrorResponse = require("../classes/error-response");
const Bug = require("../dataBase/models/Bug.model");
const GameVersion = require("../dataBase/models/GameVersion.model");
const Task = require("../dataBase/models/Task.model");
const Worker = require("../dataBase/models/Worker.model");

const getCodeTasks = async (req, _res, next) => {
  if (req.position === "Programmer" || req.position === "LeadProgrammer") {
    req.tasks = {};
    const plansTasks = await Task.findAll({
      where: {
        idDepartment: req.department.id,
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
        idDepartment: req.department.id,
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
        {
          model: Worker,
          attributes: ["id", "name"],
        },
      ],
    });
    req.tasks.inWork = workTasks;
    const doneTasks = await Task.findAll({
      where: {
        idDepartment: req.department.id,
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
        {
          model: Worker,
          attributes: ["id", "name"],
        },
      ],
    });
    req.tasks.isDone = doneTasks;
    const checkedTasks = await Task.findAll({
      where: {
        idDepartment: req.department.id,
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

const createProgrammerTask = async (req, _res, next) => {
  if (req.position === "LeadProgrammer") {
    const task = await Task.create({
      ...req.body,
      idDepartment: req.department.id,
    });
    req.createdTask = task;
  }
  next();
};

const updateProgrammerTask = async (req, _res, next) => {
  if (
    req.position === "LeadProgrammer" &&
    req.task.idDepartment === req.department.id
  ) {
    req.updatedTask = {};
    req.updatedTask = {
      name: req.body.name,
      description: req.body.description,
      links: req.body.links,
      countMembers: req.body.countMembers,
      status: req.body.status,
      idGameVersion: req.body.idGameVersion,
    };
  } else if (
    req.position === "Programmer" &&
    req.body.status === "isDone" &&
    req.task.idDepartment === req.department.id
  ) {
    req.updatedTask = {};
    req.updatedTask.status = req.body.status;
  }
  next();
};

const addToTaskProgrammer = async (req, _res, next) => {
  if (
    (req.position === "Programmer" || req.position === "LeadProgrammer") &&
    req.task.idDepartment === req.department.id
  ) {
    req.worker = await Worker.findByPk(req.token.workerId);
  }
  next();
};

module.exports = {
  getCodeTasks,
  createProgrammerTask,
  updateProgrammerTask,
  addToTaskProgrammer,
};
