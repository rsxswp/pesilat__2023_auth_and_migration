"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_roles", {
      userId: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Roles",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pemesanans");
  },
};
