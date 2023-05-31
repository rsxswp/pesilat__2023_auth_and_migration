const response = require("@helpers/response.helper");
const validasiHelper = require("@helpers/validator.helper");
const { Kendaraan, User, Role } = require("@models");

module.exports = {
  store: async (req, res) => {
    try {
      const createData = {
        merk: req.body.merk,
        tipe: req.body.tipe,
        tahun: req.body.tahun,
        tempatDuduk: parseInt(req.body.tempat_duduk),
        userId: req.userId,
      };

      const validasi = validasiHelper(createData, {
        merk: {
          type: "string",
        },
        tipe: {
          type: "string",
        },
        tahun: {
          type: "string",
        },
        tempatDuduk: {
          type: "number",
        },
      });

      if (validasi.gagal()) {
        return response(res, 422, { errors: validasi.erorrMessages() });
      }

      const insertKendaraan = await Kendaraan.create(createData);

      return response(res, 200, {
        message: "success created",
        data: insertKendaraan,
      });
    } catch (e) {
      return response(res, 500, { errors: e, message: "500 internal error" });
    }
  },

  index: async (req, res) => {
    try {
      const kendaraan = await Kendaraan.findAll({
        include: {
          model: User,
          as: "user",
        },
      });
      return response(res, 200, {
        data: kendaraan,
        message: "success get data",
      });
    } catch (e) {
      return response(res, 500, { errors: e, message: "500 internal error" });
    }
  },

  update: async (req, res) => {
    try {
      const kendaraan = await Kendaraan.findByPk(req.params.id);
      // jika data tidak ditemukan
      if (!kendaraan) {
        return response(res, 404, {
          message: "Data not found",
          errors: "Data not found",
        });
      }

      if (kendaraan.userId !== req.userId) {
        return response(res, 403, {
          message: "forbidden",
          errors: "forbidden access",
        });
      }

      const updateData = {};
      for (const key in req.body) {
        if (key === "tempat_duduk") {
          updateData.tempatDuduk = req.body[key];
        } else {
          updateData[key] = req.body[key];
        }
      }

      const updated = await kendaraan.update(updateData);

      return response(res, 200, { message: "data updated", data: updated });
    } catch (e) {
      return response(res, 500, {
        message: "500 internal server error",
        errors: e,
      });
    }
  },

  destroy: async (req, res) => {
    try {
      const kendaraan = await Kendaraan.findByPk(req.params.id);

      if (!kendaraan) {
        return response(res, 404, {
          message: "data not found",
          errors: "data not found",
        });
      }

      if (kendaraan.userId !== req.userId) {
        return response(res, 403, {
          message: "forbidden",
          errors: "forbidden access",
        });
      }

      const deleted = await kendaraan.destroy();

      if (deleted) {
        return response(res, 200, { message: "data success delete" });
      } else {
        return response(res, 500, {
          message: "delete failed",
          errors: "deleted failed",
        });
      }
    } catch (e) {
      return response(res, 500, {
        message: "500 internal server error",
        errors: e,
      });
    }
  },
};
