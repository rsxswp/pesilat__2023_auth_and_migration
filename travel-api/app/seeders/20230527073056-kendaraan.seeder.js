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

    await queryInterface.bulkInsert("Kendaraans", [
      {
        id: "6bd61ee4-07b8-4ce9-900b-2404196d1aef",
        userId: "admin",
        merk: "Honda",
        tipe: "Civic",
        tahun: "2018",
        tempatDuduk: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "fa80a982-3df7-43b1-a070-20b7b5e0f43e",
        userId: "admin",
        merk: "Toyota",
        tipe: "Xpander",
        tahun: "2018",
        tempatDuduk: 6,
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
