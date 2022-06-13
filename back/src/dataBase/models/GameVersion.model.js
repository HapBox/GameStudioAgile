const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

class GameVersion extends Sequelize.Model {}

GameVersion.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    version: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    note: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dateRelease: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    dateTo: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
  },
  { sequelize: sequelize, modelName: "gameVersion", timestamps: false }
);

module.exports = GameVersion;
