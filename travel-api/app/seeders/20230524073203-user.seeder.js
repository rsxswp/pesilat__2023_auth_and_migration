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

    await queryInterface.bulkInsert("Users", [
      {
        id: "user",
        name: "user",
        alamat: "Karawang Kota Jl No 34",
        noTelp: "0828949234",
        email: "user@gmail.com",
        password:
          "$2a$08$nCjjGeX5.KrmkJqx1iFNJem0oGQuo9XQUAfhu.49JBTvD61BwOoQm", // 12341234
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "admin",
        name: "admin",
        alamat: "Jakarta",
        email: "admin@gmail.com",
        password:
          "$2a$08$nCjjGeX5.KrmkJqx1iFNJem0oGQuo9XQUAfhu.49JBTvD61BwOoQm", // 12341234
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
