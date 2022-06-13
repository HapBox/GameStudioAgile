const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

class Game extends Sequelize.Model {}

Game.init(
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
    designDoc: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: sequelize, modelName: "game", timestamps: false }
);

module.exports = Game;
