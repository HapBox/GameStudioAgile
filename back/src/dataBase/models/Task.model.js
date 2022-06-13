const { Sequelize } = require("sequelize");
const { sequelize } = require("..");

class Task extends Sequelize.Model {}

Task.init(
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
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    links: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    countMembers: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM("inPlans", "inWork", "isDone", "isChecked"),
        defaultValue: "inPlans",
    }
  },
  { sequelize: sequelize, modelName: "task", timestamps: false }
);

module.exports = Task;
