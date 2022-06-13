const { sequelize } = require("..");
const { Sequelize } = require("sequelize");
const Department = require("./Department.model");
const Game = require("./Game.model");
const GameVersion = require("./GameVersion.model");
const Platform = require("./Platform.model");
const Bug = require("./Bug.model");
const Playtest = require("./Playtest.model");
const Task = require("./Task.model");
const WorkerPosition = require("./WorkerPosition.model");
const Token = require("./Token.model");

class Worker extends Sequelize.Model {}

Worker.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
  },
  { sequelize: sequelize, modelName: "worker", timestamps: false }
);

Worker.hasMany(Token, {
  foreignKey: "workerId",
});

Token.belongsTo(Worker, {
  foreignKey: "workerId",
});

WorkerPosition.hasMany(Worker, {
  foreignKey: "idPosition",
});

Worker.belongsTo(WorkerPosition, {
  foreignKey: "idPosition",
});

Department.hasMany(Worker, {
  foreignKey: "idDepartment",
});

Worker.belongsTo(Department, {
  foreignKey: "idDepartment",
});

Game.hasMany(GameVersion, {
  foreignKey: "idGame",
});

GameVersion.belongsTo(Game, {
  foreignKey: "idGame",
});

Platform.hasMany(GameVersion, {
  foreignKey: "idPlatform",
});

GameVersion.belongsTo(Platform, {
  foreignKey: "idPlatform",
});

GameVersion.hasMany(Bug, {
  foreignKey: "idGameVersion",
});

Bug.belongsTo(GameVersion, {
  foreignKey: "idGameVersion",
});

GameVersion.hasMany(Playtest, {
  foreignKey: "idGameVersion",
});

Playtest.belongsTo(GameVersion, {
  foreignKey: "idGameVersion",
});

Worker.hasMany(Playtest, {
  foreignKey: "idWorker",
});

Playtest.belongsTo(Worker, {
  foreignKey: "idWorker",
});

Bug.hasMany(Task, {
  foreignKey: "idBug",
  allowNull: true,
});

Task.belongsTo(Bug, {
  foreignKey: "idBug",
  allowNull: true,
});

Department.hasMany(Task, {
  foreignKey: "idDepartment",
});

Task.belongsTo(Department, {
  foreignKey: "idDepartment",
});

GameVersion.hasMany(Task, {
  foreignKey: "idGameVersion",
});

Task.belongsTo(GameVersion, {
  foreignKey: "idGameVersion",
});

Worker.belongsToMany(Task, {
  through: "workerGroup",
  timestamps: false,
});

Task.belongsToMany(Worker, {
  through: "workerGroup",
  timestamps: false,
});

module.exports = Worker;
