"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pemesanans", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
      },
      tanggalPemesanan: {
        type: Sequelize.DATE,
      },
      tanggalBerangkat: {
        type: Sequelize.DATE,
      },
      jumlahOrang: {
        type: Sequelize.INTEGER,
      },
      tujuan: {
        type: Sequelize.STRING,
      },
      lamaTravelSatuanHari: {
        // satuan hari
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM("booking", "dalam_perjalanan", "selesai"),
        defaultValue: "booking",
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
      paketWisataId: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "PaketWisata",
          },
          key: "id",
        },
      },
      detailKendaraanId: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "DetailKendaraans",
          },
          key: "id",
        },
        allowNull: false,
      },
      totalHarga: Sequelize.INTEGER,
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
