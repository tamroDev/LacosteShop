const checkUserRole = (req, res, next) => {
  if (req.session && req.session.user) {
    if (req.session.userInfo.role === 0) {
      next();
    } else {
      res.status(403).send("Bạn không có quyền truy cập vào trang này!");
    }
  } else {
    res.status(401).send("Vui lòng đăng nhập để truy cập vào trang này!");
  }
};

module.exports = checkUserRole;
