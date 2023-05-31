const signInMiddleware = require("../auth/auth_sign_in.middleware");
const paketWisataController = require("./paketWisata.controller");

module.exports = function (app) {
  app.post(
    "/api/paket-wisata",
    [signInMiddleware.verifyToken, signInMiddleware.isAdmin],
    paketWisataController.store
  );

  app.get("/api/paket-wisata", paketWisataController.index);

  app.put(
    "/api/paket-wisata/:id",
    [signInMiddleware.verifyToken, signInMiddleware.isAdmin],
    paketWisataController.update
  );

  app.delete(
    "/api/paket-wisata/:id",
    [signInMiddleware.verifyToken, signInMiddleware.isAdmin],
    paketWisataController.destroy
  );
};
