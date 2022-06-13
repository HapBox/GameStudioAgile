const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

class Token extends Sequelize.Model {}

Token.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dateUpdate: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
  },
  { sequelize: sequelize, modelName: "token", timestamps: false }
);

module.exports = Token;
