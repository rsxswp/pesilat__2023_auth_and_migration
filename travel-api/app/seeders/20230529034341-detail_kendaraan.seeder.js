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

    await queryInterface.bulkInsert("DetailKendaraans", [
      {
        id: "a5d7eb0b-99f2-4e64-8e80-19e6b31fe336",
        kodeUrut: "001",
        kendaraanId: "6bd61ee4-07b8-4ce9-900b-2404196d1aef",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "c62f4b39-5b32-402c-9dd8-2dbd3e13fefa",
        kodeUrut: "002",
        kendaraanId: "6bd61ee4-07b8-4ce9-900b-2404196d1aef",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "58b4535c-308a-4c21-881d-b4a60e61a41d",
        kodeUrut: "003",
        kendaraanId: "6bd61ee4-07b8-4ce9-900b-2404196d1aef",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "9a66f18f-85e9-4e18-99da-6f3b0900ae7e",
        kodeUrut: "004",
        kendaraanId: "6bd61ee4-07b8-4ce9-900b-2404196d1aef",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3e2346d7-7a0a-4c7a-8d54-82a6eb1588a2",
        kodeUrut: "001",
        kendaraanId: "fa80a982-3df7-43b1-a070-20b7b5e0f43e",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "e0d8d504-165f-4c6f-96b6-4f651879bc1b",
        kodeUrut: "002",
        kendaraanId: "fa80a982-3df7-43b1-a070-20b7b5e0f43e",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "7294e149-6a3b-45f2-9dd3-925738c06a61",
        kodeUrut: "003",
        kendaraanId: "fa80a982-3df7-43b1-a070-20b7b5e0f43e",
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
