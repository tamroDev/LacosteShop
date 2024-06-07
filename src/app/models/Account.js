const mongoose = require("mongoose");
var mongoose_delete = require("mongoose-delete");
const Schema = mongoose.Schema;

const Account = new Schema(
  {
    lastName: { type: String, maxlength: 255 },
    firstName: { type: String, maxlength: 255, required: true },
    email: { type: String, maxlength: 255 },
    password: { type: String },
    phone: { type: String, default: "does not exist" },
    adr: { type: String, default: "does not exist" },
    check: { type: String, default: "off" },
    role: { type: Number, default: 1 },
    status: { type: Number, default: 1 },
  },
  { timestamps: true }
);

Account.plugin(mongoose_delete, {
  overrideMethods: "all",
  deleteAt: true,
});

module.exports = mongoose.model("Account", Account);
