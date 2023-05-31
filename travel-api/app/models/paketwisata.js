"use strict";
const { Kendaraan } = require("./../models");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaketWisata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PaketWisata.belongsTo(models.Kendaraan, {
        foreignKey: "kendaraanId",
      });
    }
  }

  PaketWisata.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      namaPaket: DataTypes.STRING,
      harga: DataTypes.INTEGER,
      durasiHari: DataTypes.INTEGER,
      deskripsi: DataTypes.STRING,
      kendaraanId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PaketWisata",
    }
  );
  return PaketWisata;
};
