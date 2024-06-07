const Account = require("../app/models/Account");
const jwt = require("jsonwebtoken");

async function getUserFromToken(token) {
  try {
    // Giải mã token và trích xuất thông tin người dùng từ payload
    const decoded = jwt.verify(token, "abcxyz"); // Thay thế 'your_secret_key' bằng khóa bí mật của bạn
    const email = decoded.email;

    // Truy xuất dữ liệu người dùng từ cơ sở dữ liệu
    const user = await Account.findOne({ email });

    return user;
  } catch (error) {
    console.error("Error when decoding token:", error); // In ra lỗi
    throw error; // Xử lý lỗi nếu có
  }
}

module.exports = getUserFromToken;
