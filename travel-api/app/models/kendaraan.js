"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kendaraan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kendaraan.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
      });

      Kendaraan.hasMany(models.DetailKendaraan, {
        foreignKey: "kendaraanId",
      });
    }
  }
  Kendaraan.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: DataTypes.STRING,
      merk: DataTypes.STRING,
      tipe: DataTypes.STRING,
      tahun: DataTypes.STRING,
      tempatDuduk: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Kendaraan",
    }
  );
  return Kendaraan;
};
