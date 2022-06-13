const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

class Department extends Sequelize.Model {}

Department.init(
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
  { sequelize: sequelize, modelName: "department", timestamps: false }
);

module.exports = Department;
