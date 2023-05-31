const signUpMiddleware = require("./auth_signup.middleware");
const authController = require("./auth.controller");

module.exports = function (app) {
  app.post(
    "/api/auth/signup",
    [
      signUpMiddleware.validationField,
      signUpMiddleware.checkDuplicateUserNameOrEmail,
      signUpMiddleware.checkRolesExisted,
    ],
    authController.signup
  );

  app.post("/api/auth/signin", authController.signin);
};
