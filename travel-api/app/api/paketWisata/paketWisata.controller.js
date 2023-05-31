const helpers = require("./../../helpers");

const { PaketWisata } = require("./../../models");

module.exports = {
  store: async (req, res) => {
    try {
      const insertData = await PaketWisata.create({
        namaPaket: req.body.nama_paket,
        harga: req.body.harga,
        durasiHari: parseInt(req.body.durasi_hari),
        deskripsi: req.body.deskripsi,
        kendaraanId: req.body.kendaraan_id,
      });

      return helpers.response(res, 200, {
        message: "success created",
        data: insertData,
      });
    } catch (e) {}
  },

  index: () => {
    try {
    } catch (e) {}
  },

  update: () => {},

  destroy: () => {},
};
