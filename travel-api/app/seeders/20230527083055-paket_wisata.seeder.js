"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("PaketWisata", [
      {
        id: "e92f8f0d-14d6-4db3-af98-38e2d6b1b9d0",
        namaPaket: "PROMO Liburan ke Bandung menggunakan xpander",
        harga: 700_000,
        kendaraanId: "6bd61ee4-07b8-4ce9-900b-2404196d1aef",
        durasiHari: 1,
        deskripsi:
          "Anda akan menikmati jalan jalan ke bandugn dengan menggunakan kendaraan pribadi dengan harga 700K dalam sehari",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b9987fc2-8ae7-4f32-a8e7-5409b01e29a3",
        namaPaket: "PROMO Liburan ke Bandung menggunakan xpander",
        harga: 600_000,
        kendaraanId: "fa80a982-3df7-43b1-a070-20b7b5e0f43e",
        durasiHari: 1,
        deskripsi:
          "Anda akan menikmati jalan jalan ke bandugn dengan menggunakan kendaraan pribadi dengan harga 600K dalam sehari",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
