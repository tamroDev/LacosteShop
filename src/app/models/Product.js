const mongoose = require("mongoose");
var slug = require("mongoose-slug-updater");
const Schema = mongoose.Schema;
var mongoose_delete = require("mongoose-delete");

const Product = new Schema(
  {
    nameProduct: { type: String, maxlength: 255 },
    priceProduct: { type: String, maxlength: 255 },
    description: { type: String },
    category: { type: String },
    quantity: { type: String },
    discount: { type: String },
    image: { type: Array },
    deleted: { type: Boolean, default: false },
    slug: { type: String, slug: "nameProduct", unique: true },
  },
  { timestamps: true }
);

mongoose.plugin(slug);

Product.plugin(mongoose_delete, {
  overrideMethods: "all",
  deleteAt: true,
});

module.exports = mongoose.model("Product", Product);
