const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

class WorkerPosition extends Sequelize.Model {}

WorkerPosition.init(
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
  },
  { sequelize: sequelize, modelName: "workerPosition", timestamps: false }
);

module.exports = WorkerPosition;
