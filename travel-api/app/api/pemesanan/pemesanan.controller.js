const helpers = require("./../../helpers");
const { Op } = require("sequelize");
const _ = require("lodash");

const {
  Pemesanan,
  PaketWisata,
  Kendaraan,
  DetailKendaraan,
} = require("./../../models");

// membantu menampilkan data kendaraan yang sedang kosong
const semuaDetailKendaraanYangKosong = async () => {
  const detailKendaraan = await DetailKendaraan.findAll({
    // where: {
    //   id: "58b4535c-308a-4c21-881d-b4a60e61a41d",
    // },
    include: [
      {
        model: Pemesanan,
        where: {
          [Op.or]: [{ status: "booking" }, { status: "dalam_perjalanan" }],
        },
        required: false,
        //   left: true,
      },
      {
        model: Kendaraan,
      },
    ],
  });

  const groupedData = _.groupBy(detailKendaraan, (item) => item.Kendaraan.merk);

  for (const key in groupedData) {
    groupedData[key] = groupedData[key].filter(
      (item) => item.Pemesanan == null
    );
    groupedData[key] = _.sortBy(groupedData[key], ["kodeUrut"]);
  }

  return groupedData;
};

const detailKendaraanTerbooking = async (uuid) => {
  const detailKendaraan = await DetailKendaraan.findAll({
    where: {
      id: uuid,
    },
    include: [
      {
        model: Pemesanan,
        where: {
          [Op.or]: [{ status: "booking" }, { status: "dalam_perjalanan" }],
        },
        required: false,
      },
      {
        model: Kendaraan,
      },
    ],
  });

  return detailKendaraan[0].Pemesanan ? true : false;
};

const updateAdmin = async (req, res) => {
  try {
    const pemesanan = await Pemesanan.findOne({
      where: { id: req.params.id },
    });
    if (!pemesanan) {
      return helpers.response(res, 404, {
        message: "data not found",
        errors: "data not found",
      });
    }

    const dataUpdate = { status: req.body.status };

    pemesanan.update(dataUpdate);

    return helpers.response(res, 200, {
      message: "success update status to : " + dataUpdate.status,
    });
  } catch (e) {
    throw e;
  }
};

const updateUser = async (req, res) => {
  try {
    const pemesanan = await Pemesanan.findOne({
      where: { id: req.params.id },
      include: {
        model: PaketWisata,
        as: "paketWisata",
      },
    });

    // jika data tidak ditemukan
    if (!pemesanan) {
      return helpers.response(res, 404, {
        message: "data not found",
        errors: "data not found",
      });
    }

    // jika yang ngedit bukan user yang insert data
    if (req.userId !== pemesanan.userId) {
      return helpers.response(res, 403, { errors: "forbidden access" });
    }

    const updateData = {};
    for (const key in req.body) {
      switch (key) {
        case "status":
          // tidak melakukan apa apa, karena saya adalah user
          break;
        case "tanggal_berangkat":
          updateData.tanggalBerangkat = req.body[key];
          break;
        case "jumlah_orang":
          updateData.jumlahOrang = req.body[key];
          break;
        case "paket_wisata_id":
          updateData.paketWisataId = req.body[key];
          break;
        case "detail_kendaraan_id":
          updateData.detailKendaraanId = req.body[key];
          break;
        case "lama_pesan_hari":
          updateData.totalHarga =
            parseInt(req.body[key]) * pemesanan.paketWisata.harga;
          updateData.lamaTravelSatuanHari = req.body[key];
          break;
        default:
          updateData[key] = req.body[key];
          break;
      }
    }

    const dataAfterUpdate = await pemesanan.update(updateData);

    return helpers.response(res, 200, {
      message: "success update data as a user",
      data: dataAfterUpdate,
    });
  } catch (e) {
    throw e;
  }
};
// membantu menampilkan data kendaraan yang sudah terboking atau sedang dalam perjalanan
const semuaDetailKendaraanTerbooking = async () => {
  const detailKendaraan = await DetailKendaraan.findAll({
    include: [
      {
        model: Pemesanan,
        where: {
          [Op.or]: [{ status: "booking" }, { status: "dalam_perjalanan" }],
        },
        required: false,
      },
      {
        model: Kendaraan,
      },
    ],
  });

  const groupedData = _.groupBy(detailKendaraan, (item) => item.Kendaraan.merk);

  for (const key in groupedData) {
    groupedData[key] = groupedData[key].filter(
      (item) => item.Pemesanan != null
    );
    groupedData[key] = _.sortBy(groupedData[key], ["kodeUrut"]);
  }

  return groupedData;
};

const detailKendaraanInvalid = async (idPaketWisata, detailKendaraanId) => {
  try {
    const paketWisata = await PaketWisata.findAll({
      where: {
        id: idPaketWisata,
      },
      include: {
        model: Kendaraan,
        include: {
          model: DetailKendaraan,
        },
      },
    });

    let kendaraanIdDitemukan = false;
    for (const item of paketWisata[0].Kendaraan.DetailKendaraans) {
      // jika ditemukan
      if (item.id === detailKendaraanId) {
        kendaraanIdDitemukan = true;
        break;
      }
    }

    return {
      isTrue: () => !kendaraanIdDitemukan,
      validData: () => paketWisata,
    };
  } catch (e) {
    throw e;
  }
};

module.exports = {
  store: async (req, res) => {
    try {
      const dataCreated = {
        tanggalPemesanan: new Date(),
        tanggalBerangkat: req.body.tanggal_berangkat,
        jumlahOrang: parseInt(req.body.jumlah_orang),
        tujuan: req.body.tujuan,
        userId: req.userId,
        paketWisataId: req.body.paket_wisata_id,
        detailKendaraanId: req.body.detail_kendaraan_id,
        lamaTravelSatuanHari: parseInt(req.body.lama_pesan_hari),
      };

      const detailKendaraanInvalidA = await detailKendaraanInvalid(
        dataCreated.paketWisataId,
        dataCreated.detailKendaraanId
      );

      const dataPaketWisata = detailKendaraanInvalidA.validData()[0];
      dataCreated.totalHarga =
        dataPaketWisata["harga"] * dataCreated.lamaTravelSatuanHari;

      if (detailKendaraanInvalidA.isTrue()) {
        return helpers.response(res, 422, {
          errors: "data invalid : " + detailKendaraanInvalidA.isTrue(),
          data: {
            validData: detailKendaraanInvalidA.validData(),
          },
        });
      }

      const validasi = helpers.validator(dataCreated, {
        tanggalPemesanan: {
          type: "date",
        },
        tanggalBerangkat: {
          type: "string",
        },
        jumlahOrang: {
          type: "number",
        },
        tujuan: {
          type: "string",
        },
        userId: {
          type: "string",
        },
        paketWisataId: {
          type: "string",
        },
        detailKendaraanId: {
          type: "string",
        },
        lamaTravelSatuanHari: {
          type: "number",
        },
      });

      if (await detailKendaraanTerbooking(dataCreated.detailKendaraanId)) {
        return helpers.response(res, 422, {
          errors: "kendaraan sudah terbooking. silahkan pilih data tersedia",
        });
      }

      if (validasi.gagal()) {
        return helpers.response(res, 422, {
          message: "validation failed",
          errors: validasi.erorrMessages(),
        });
      }

      // validasi apakah detail kendaraan sekian sudah pernah dibooking sebelumnya
      let insertData = await Pemesanan.create(dataCreated);

      insertData = await Pemesanan.findByPk(insertData.id, {
        include: [
          {
            model: PaketWisata,
            as: "paketWisata",
            include: {
              model: Kendaraan,
            },
          },
          {
            model: DetailKendaraan,
          },
        ],
      });
      return helpers.response(res, 200, {
        message: "success created",
        data: insertData,
      });
    } catch (e) {
      return helpers.response(res, 500, {
        message: "500 internal server error",
        errors: e,
      });
    }
  },

  index: async (req, res) => {
    try {
      const pemesanan = await Pemesanan.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: PaketWisata,
            as: "paketWisata",
            include: {
              model: Kendaraan,
              include: {
                model: DetailKendaraan,
              },
            },
          },
          {
            model: DetailKendaraan,
          },
        ],
      });

      return helpers.response(res, 200, {
        data: pemesanan,
      });
    } catch (e) {
      return helpers.response(res, 500, { errors: e });
    }
  },

  update: async (req, res) => {
    try {
      if (req.isAdmin()) {
        return updateAdmin(req, res);
      } else {
        return updateUser(req, res);
      }
    } catch (e) {
      return helpers.response(res, 500, {
        errors: "500 internal server error",
      });
    }
  },

  destroy: async (req, res) => {
    try {
      const pemesanan = await Pemesanan.findOne({
        where: { id: req.params.id },
      });

      if (!pemesanan) {
        return helpers.response(res, 404, { errors: "data not found" });
      }

      if (req.userId !== pemesanan.userId) {
        return helpers.response(res, 403, {
          errors: "forbidden access to delete data",
        });
      }

      const hapusData = await pemesanan.destroy();
      if (hapusData) {
        return helpers.response(res, 200, { message: "success delete data" });
      } else {
        return helpers.response(res, 500, { errors: "errorr delete data" });
      }
      s;
    } catch (e) {
      helpers.response(res, 500, { errors: "500 internal server errorr" });
    }
  },
};
