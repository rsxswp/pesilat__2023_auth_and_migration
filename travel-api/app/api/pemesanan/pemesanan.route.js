const signInMiddleware = require("../auth/auth_sign_in.middleware");
const pemesananController = require("./pemesanan.controller");

module.exports = function (app) {
  app.post(
    "/api/pemesanan",
    [signInMiddleware.verifyToken, signInMiddleware.isUser],
    pemesananController.store
  );

  app.get(
    "/api/pemesanan",
    [signInMiddleware.verifyToken, signInMiddleware.isUser],
    pemesananController.index
  );

  app.put(
    "/api/pemesanan/:id",
    [signInMiddleware.verifyToken, signInMiddleware.isUser],
    pemesananController.update
  );

  app.delete(
    "/api/pemesanan/:id",
    [signInMiddleware.verifyToken, signInMiddleware.isUser],
    pemesananController.destroy
  );
};
