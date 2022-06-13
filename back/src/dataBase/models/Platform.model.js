const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

class Platform extends Sequelize.Model {}

Platform.init(
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
  { sequelize: sequelize, modelName: "platform", timestamps: false }
);

module.exports = Platform;