const ErrorResponse = require("../classes/error-response");
const Department = require("../dataBase/models/Department.model");
const Task = require("../dataBase/models/Task.model");
const Token = require("../dataBase/models/Token.model");
const Worker = require("../database/models/Worker.model");
const WorkerPosition = require("../dataBase/models/WorkerPosition.model");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const syncHandler = (fn) => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

const notFound = (req, _res, next) => {
  next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

const requireToken = async (req, _res, next) => {
  if (!req.header("x-access-token"))
    throw new ErrorResponse("Token not found", 400);
  const token = await Token.findOne({
    where: {
      value: req.header("x-access-token"),
    },
  });
  if (!token) throw new ErrorResponse("Invalid token", 403);
  const dateUpdate = new Date();
  await token.update(dateUpdate);
  const worker = await Worker.findByPk(token.workerId,{
    include: [
      {
        model: WorkerPosition,
        attributes: ["name"],
      },
      {
        model: Department,
        attributes: ["id", "name"],
      },
    ],
  });
  req.position = worker.workerPosition.name;
  console.log(req.position);
  req.department = worker.department;
  req.token = token;
  next();
};

const getTaskById = async (req, _res, next) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) throw new ErrorResponse("Not Found", 404);
  req.task = task;
  next();
};

const checkCreateWorker = async (req, _res, next) => {
  req.newWorker = req.body;
  if (req.position !== "Gamedesigner")throw new ErrorResponse("Forbidden", 403);
  next();
};

const checkCreateTask = async (req, _res, next) => {
  if (
    req.position !== "LeadProgrammer" &&
    req.position !== "LeadArtist" &&
    req.position !== "Gamedesigner"
  )
    throw new ErrorResponse("Forbidden", 403);
  next();
};

const errorHandler = (err, _req, res, _next) => {
  console.log("Ошибка", {
    message: err.message,
    stack: err.stack,
  });
  res.status(err.code || 500).json({
    message: err.message,
  });
};

module.exports = {
  asyncHandler,
  syncHandler,
  notFound,
  errorHandler,
  requireToken,
  getTaskById,
  checkCreateWorker,
  checkCreateTask,
};
