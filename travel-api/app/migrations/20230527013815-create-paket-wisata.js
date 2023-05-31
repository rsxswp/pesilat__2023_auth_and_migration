"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PaketWisata", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
      },
      namaPaket: {
        type: Sequelize.STRING,
      },
      harga: { // adalah harga per hari nya
        type: Sequelize.INTEGER,
      },
      kendaraanId: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "Kendaraans",
          },
          key: "id",
        },
      },
      durasiHari: {
        type: Sequelize.INTEGER,
      },
      deskripsi: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("PaketWisata");
  },
};
