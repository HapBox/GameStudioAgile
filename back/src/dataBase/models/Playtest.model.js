const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

class Playtest extends Sequelize.Model {}

Playtest.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    bugs: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { sequelize: sequelize, modelName: "playtest", timestamps: false }
);

module.exports = Playtest;
