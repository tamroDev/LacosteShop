const mongoose = require("mongoose");
var mongoose_delete = require("mongoose-delete");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-updater");

const Category = new Schema(
  {
    name: { type: String, maxlength: 255 },
    slug: { type: String, slug: "name", unique: true },
  },
  { timestamps: true }
);

Category.plugin(slug);
Category.plugin(mongoose_delete, {
  overrideMethods: "all",
  deleteAt: true,
});

module.exports = mongoose.model("Category", Category);
