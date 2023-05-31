"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pemesanan.belongsTo(models.PaketWisata, {
        foreignKey: "paketWisataId",
        as: "paketWisata",
      });

      Pemesanan.belongsTo(models.DetailKendaraan, {
        foreignKey: "detailKendaraanId",
      });
    }
  }
  Pemesanan.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      tanggalPemesanan: DataTypes.DATE,
      tanggalBerangkat: DataTypes.DATE,
      jumlahOrang: DataTypes.INTEGER,
      tujuan: DataTypes.STRING,
      status: DataTypes.STRING,
      userId: DataTypes.STRING,
      paketWisataId: DataTypes.STRING,
      detailKendaraanId: DataTypes.STRING,
      lamaTravelSatuanHari: DataTypes.INTEGER,
      totalHarga: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pemesanan",
    }
  );
  return Pemesanan;
};
