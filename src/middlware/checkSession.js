const Account = require("../app/models/Account");

const checkSession = (req, res, next) => {
  if (req.session.userInfo && req.session.userInfo.email) {
    const email = req.session.userInfo.email;
    if (res.locals.userInfo) {
      next();
    } else {
      Account.findOne({ email })
        .then((user) => {
          if (user) {
            const dataUser = {
              _id: user._id,
              lastName: user.lastName,
              firstName: user.firstName,
              email: user.email,
              phone: user.phone,
              adr: user.adr,
              role: user.role,
            };
            res.locals.userInfo = dataUser;
          }
          next();
        })
        .catch((error) => {
          console.error("Error checking session:", error);
          next(error);
        });
    }
  } else {
    next();
  }
};

module.exports = checkSession;
