const jwt = require("jsonwebtoken");
const config = require("../../config/configRoles.js");
const User = require("../../models/index.js").User;

module.exports = {
  verifyToken(req, res, next) {
    let tokenHeader = req.headers["authorization"];

    if (!tokenHeader) {
      return res.status(401).send({
        auth: false,
        massage: "Unauthorized",
        errors: "token is required",
      });
    }

    if (tokenHeader.split(" ")[0] !== "Bearer") {
      return res.status(500).send({
        auth: false,
        message: "Error",
        errors: "Incorrect token format",
      });
    }

    let token = tokenHeader.split(" ")[1];

    if (!token) {
      return res.status(403).send({
        auth: false,
        message: "Error",
        errors: "No token provided",
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: "Error",
          errors: err,
        });
      }
      req.user = () => decoded;
      req.userId = decoded.id; // menambahkan userId ke request supaya bisa diakses
      next();
    });
  },

  isAdmin(req, res, next) {
    User.findByPk(req.userId).then((user) => {
      user.getRoles().then((roles) => {
        // console.log({ roles });
        for (let i = 0; i < roles.length; i++) {
          console.log(roles[i].name);
          if (roles[i].name.toUpperCase() === "ADMIN") {
            req.isAdmin = () => true;
            next();
            return;
          }
        }
        req.isAdmin = () => false;
        res.status(403).send({
          auth: false,
          message: "Error",
          message: "Require Admin Role",
        });
        return;
      });
    });
  },

  isPmOrAdmin(req, res, next) {
    User.findByPk(req.userId).then((user) => {
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name.toUpperCase() === "PM") {
            next();
            return;
          }
          if (roles[i].name.toUpperCase() === "ADMIN") {
            next();
            return;
          }
        }
        res.status(403).send({
          auth: false,
          message: "Error",
          message: "Require PM/Admin Role",
        });
        return;
      });
    });
  },

  isUser(req, res, next) {
    User.findByPk(req.userId).then((user) => {
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name.toUpperCase() === "USER") {
            console.log("Ini adalah user");
            next();
            return;
          }
        }
        res.status(403).send({
          auth: false,
          message: "Error ",
          message: "Require USER Role",
        });
        return;
      });
    });
  },
};
