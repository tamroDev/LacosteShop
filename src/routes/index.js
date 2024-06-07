const siteRouter = require("./site");
const productRouter = require("./product");
const accountRouter = require("./account");
const adminRouter = require("./admin");
const checkSession = require("../middlware/checkSession");
const checkRole = require("../middlware/checkRole");

const router = (app) => {
  app.use(checkSession);
  app.use("/admin", adminRouter);
  app.use("/account", accountRouter);
  app.use("/product", productRouter);
  app.use("/", siteRouter);
};

module.exports = router;
