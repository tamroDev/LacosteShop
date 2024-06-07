const renderItem = require("../../ulti/mongose");

class SiteController {
  index(req, res, next) {
    res.render("client/home", { currentPage: "Home", title: "Trang chủ" });
  }
}

module.exports = new SiteController();
