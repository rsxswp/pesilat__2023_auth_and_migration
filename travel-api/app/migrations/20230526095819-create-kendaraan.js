"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Kendaraans", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      merk: {
        type: Sequelize.STRING,
      },
      tipe: {
        type: Sequelize.STRING,
      },
      tahun: {
        type: Sequelize.STRING,
      },
      totalKendaraan: {
        type: Sequelize.INTEGER,
      },
      tempatDuduk: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Kendaraans");
  },
};
