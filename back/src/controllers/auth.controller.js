const { Router } = require("express");
const { nanoid } = require("nanoid");
const ErrorResponse = require("../classes/error-response");
const Department = require("../dataBase/models/Department.model");
const GameVersion = require("../dataBase/models/GameVersion.model");
const WorkerPosition = require("../dataBase/models/WorkerPosition.model");
const Worker = require("../database/models/Worker.model");
const Token = require("../dataBase/models/Token.model");
const { Op } = require("sequelize");
const {
  asyncHandler,
  checkCreateWorker,
  requireToken,
} = require("../middlewares/main.middlewares");

const router = new Router();

function initRoutes() {
  router.post("/login", asyncHandler(login));
  router.get("/data", asyncHandler(requireToken), asyncHandler(getData));
  router.post(
    "/registration",
    asyncHandler(requireToken),
    asyncHandler(checkCreateWorker),
    asyncHandler(registration)
  );
  router.post("/logout", asyncHandler(requireToken), asyncHandler(logout));
}

async function login(req, res, next) {
  const worker = await Worker.findOne({
    attributes: ["login", "password", "idPosition", "id"],
    where: {
      login: req.body.login,
      password: req.body.password,
    },
  });
  console.log(Worker.associations);
  if (!worker) throw new ErrorResponse("Wrong login or password", 400);
  const token = await Token.create({
    workerId: worker.id,
    value: nanoid(128),
  });
  const version = await GameVersion.findAll();
  console.log(version);
  const position = await WorkerPosition.findOne({
    where: {
      id: worker.dataValues.idPosition,
    },
  });
  res.status(200).json({
    accessToken: token.value,
    workerPosition: position.name,
  });
}

async function getData(req, res, next) {
  if (req.position !== "Gamedesigner") throw new ErrorResponse("Forbidden", 403);
  const positions = await WorkerPosition.findAll();
  const departments = await Department.findAll();
  res.status(200).json({ positions: positions, departments: departments });
}

async function registration(req, res, next) {
  await Worker.create(req.newWorker);
  res.status(200).json({ message: "Created" });
}

async function logout(req, res, next) {
  await req.token.destroy();
  res.status(200).json({ message: "Logout succesfull" });
}

initRoutes();

module.exports = router;
