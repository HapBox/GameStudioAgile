const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

class Bug extends Sequelize.Model {}

Bug.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { sequelize: sequelize, modelName: "bug", timestamps: false }
);

module.exports = Bug;
