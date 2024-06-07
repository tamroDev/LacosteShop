const Account = require("../models/Account");
const jwt = require("jsonwebtoken");
const getUserFromToken = require("../../middlware/getUserToken");

class AccountController {
  // [GET] /account/login
  login(req, res, next) {
    res.render("client/login", {
      layout: "login-main",
    });
  }

  // [GET] /account/:id/me-account
  async account(req, res, next) {
    //ktra tkhoan dang nhap hay chua
    if (req.session && req.session.userInfo) {
      const account = req.session.userInfo;
      const message = req.query.message;
      let messageToShow = "";

      const messages = {
        success: "Successfully registered account",
        failure: "Registration failed",
      };

      if (message && messages.hasOwnProperty(message)) {
        messageToShow = messages[message];
      }

      return res.render("client/account", {
        account,
        message: messageToShow,
      });
    } else {
      return res.render("client/login", {
        layout: "login-main",
      });
    }
  }

  // [GET] /account/register
  register(req, res, next) {
    const message = req.query.message;
    let messageToShow = "";

    const messages = {
      success: "Successfully registered account",
      failure: "Registration failed",
    };

    if (message && messages.hasOwnProperty(message)) {
      messageToShow = messages[message];
    }

    res.render("client/register", { message: messageToShow });
  }

  // [POST] /account/register
  async createAccount(req, res, next) {
    try {
      const formData = req.body;

      const account = new Account(formData);

      if (account.check !== "on") {
        return res.redirect("/account/register?message=failure");
      }

      await account.save();
      return res.redirect("/account/register?message=success");
    } catch (error) {
      res.redirect("/account/register?message=failure");
    }
  }

  // [POST] /account/login
  async loginAccount(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await Account.findOne({ email });
      // kt email có tồn tại hay không
      if (!user) {
        return res.render("client/login", {
          message: "Email or password is incorrect",
          layout: "login-main",
        });
      }

      if (password === user.password) {
        const token = jwt.sign({ email: user.email }, "abcxyz");

        const userData = await getUserFromToken(token);

        const dataUser = {
          _id: userData._id,
          lastName: userData.lastName,
          firstName: userData.firstName,
          email: userData.email,
          phone: userData.phone,
          adr: userData.adr,
          role: userData.role,
        };

        req.session.userInfo = dataUser;

        res.redirect("/");
      } else {
        return res.render("client/login", {
          message: "Email or password is incorrect",
          layout: "login-main",
        });
      }
    } catch (error) {
      res.send(error);
    }
  }

  logoutAccount(req, res, next) {
    if (req.session.userInfo) {
      req.session.userInfo = undefined;
      req.session.save();
      res.redirect("/");
    }
  }

  //[PUT] /account/:id/edit
  async update(req, res, next) {
    try {
      await Account.updateOne({ _id: req.params.id }, req.body);
      const dataUser = {
        _id: req.params.id,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        phone: req.body.phone,
        adr: req.body.adr,
        role: req.body.role,
      };
      req.session.userInfo = dataUser;
      res.redirect(
        `/account/${req.session.userInfo._id}/me-account?message=success`
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật tài khoản:", error);
      res.status(500).send("Đã xảy ra lỗi khi cập nhật tài khoản");
    }
  }
}
module.exports = new AccountController();
