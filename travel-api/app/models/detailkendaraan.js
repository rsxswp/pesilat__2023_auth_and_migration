"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailKendaraan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailKendaraan.hasOne(models.Pemesanan, {
        foreignKey: "detailKendaraanId",
      });

      DetailKendaraan.belongsTo(models.Kendaraan, {
        foreignKey: "kendaraanId",
      });
    }
  }
  DetailKendaraan.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      kodeUrut: DataTypes.STRING,
      kendaraanId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DetailKendaraan",
    }
  );
  return DetailKendaraan;
};
