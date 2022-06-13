const ErrorResponse = require("../classes/error-response");
const Playtest = require("../dataBase/models/Playtest.model");
const Task = require("../dataBase/models/Task.model");

const getPlaytests = async (req, _res, next) => {
  if (req.position === "CommunityManager") {
    const playtests = await Playtest.findAll();
    req.playtests = playtests;
  } else throw new ErrorResponse("Forbidden", 403);
  next();
};

const createManagerTask = async (req, _res, next) => {
  if (req.position === "CommunityManager") {
    const task = await Task.create(req.body);
    req.createdTask = task;
  }
  next();
};

const checkManager = async (req, _res, next) => {
  if (req.position !== "CommunityManager" && req.position !== "Gamedesigner"){
    throw new ErrorResponse("Forbidden", 403);
  }
  next();
};

module.exports = {
  getPlaytests,
  createManagerTask,
  checkManager,
};
