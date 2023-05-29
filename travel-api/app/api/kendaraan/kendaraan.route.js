const signInMiddleware = require("../auth/auth_sign_in.middleware");
const kendaraanController = require("./kendaraan.controller");

module.exports = function (app) {
  app.post(
    "/api/kendaraan",
    [signInMiddleware.verifyToken, signInMiddleware.isAdmin],
    kendaraanController.store
  );

  app.get("/api/kendaraan", kendaraanController.index);

  app.put(
    "/api/kendaraan/:id",
    [signInMiddleware.verifyToken, signInMiddleware.isAdmin],
    kendaraanController.update
  );

  app.delete(
    "/api/kendaraan/:id",
    [signInMiddleware.verifyToken, signInMiddleware.isAdmin],
    kendaraanController.destroy
  );
};
