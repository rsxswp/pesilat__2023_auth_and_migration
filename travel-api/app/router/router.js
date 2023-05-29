module.exports = function (app) {
  //User Auth
  require("../api/auth/auth.route")(app);
  require("../api/kendaraan/kendaraan.route")(app);
  require("../api/paketWisata/paketWisata.route")(app);
  require("../api/pemesanan/pemesanan.route")(app);
  //Status
  //   app.get("/api/status", statusController.list);
  //   app.get(
  //     "/api/statususer",
  //     [verifyJwtTokenController.verifyToken],
  //     statusController.listStatusUser
  //   );
  //   app.get(
  //     "/api/status/:id",
  //     [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
  //     statusController.getById
  //   );
  //   app.post(
  //     "/api/status",
  //     [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
  //     statusController.add
  //   );
  //   app.put(
  //     "/api/status/:id",tersedia
  //     [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
  //     statusController.update
  //   );
  //   app.delete(
  //     "/api/status/:id",
  //     [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
  //     statusController.delete
  //   );
};
