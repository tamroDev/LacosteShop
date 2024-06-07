const renderItem = require("../../ulti/mongose");
const readData = require("../../middlware/readData");
const filterData = require("../../middlware/filterData");
const filteProduct = require("../../middlware/filterProduct");
const Cart = require("../models/Cart");

const Handlebars = require("handlebars");
const Product = require("../models/Product");

Handlebars.registerHelper("firstImage", function (images) {
  return images && images.length > 0 ? images[0] : "";
});

class ProuctController {
  async new(req, res, next) {
    try {
      const data = await readData("http://localhost:2003/admin/product/api");

      const newData = await filterData("New in", data);

      res.render("client/newIn", { currentPage: "Product", newData });
    } catch (error) {}
  }

  async men(req, res, next) {
    try {
      const data = await readData("http://localhost:2003/admin/product/api");

      const newData = await filterData("Men", data);

      res.render("client/men", { currentPage: "Product", newData });
    } catch (error) {}
  }

  async women(req, res, next) {
    try {
      const data = await readData("http://localhost:2003/admin/product/api");

      const newData = await filterData("Women", data);

      res.render("client/women", { currentPage: "Product", newData });
    } catch (error) {}
  }

  async kid(req, res, next) {
    try {
      const data = await readData("http://localhost:2003/admin/product/api");

      const newData = await filterData("Kids", data);

      res.render("client/kid", { currentPage: "Product", newData });
    } catch (error) {}
  }

  async detail(req, res, next) {
    const id = req.params.id;
    try {
      const data = await readData("http://localhost:2003/admin/product/api");
      const product = await filteProduct(id, data);
      const img = product[0].image;

      let userId = null;

      if (req.session.userInfo) {
        userId = req.session.userInfo._id;
      }

      res.render("client/details", { product: product[0], img, userId });
    } catch (error) {}
  }

  async add(req, res, next) {
    try {
      if (req.session.userInfo) {
        const idProduct = req.body.idProduct;
        const idUser = req.body.idUser;

        const formData = {
          idProduct,
          idUser,
        };

        const cart = new Cart(formData);
        await cart.save();

        if (res.status(200)) {
          res.redirect("back");
        }
      } else {
        res.redirect("/account/login");
      }
    } catch (error) {
      next(error);
    }
  }

  async cartApi(req, res, next) {
    try {
      const data = await Cart.find({});

      res.json(data);
    } catch (error) {}
  }

  cart(req, res, next) {
    res.render("client/cart");
  }

  async cartId(req, res, next) {
    try {
      const idUser = req.params.id;

      if (idUser) {
        const data = await readData("http://localhost:2003/product/cart/api");

        const dataCart = data.filter((item) => item.idUser === idUser);

        if (dataCart.length > 0) {
          const dataProduct = dataCart.map((item) => item.idProduct);
          const dataOld = await readData(
            "http://localhost:2003/admin/product/api"
          );

          const newData = [];

          dataProduct.forEach((item, index) => {
            const id = dataCart[index]._id;
            dataOld.forEach((item2) => {
              if (item === item2._id) {
                const product = {
                  _id: id,
                  nameProduct: "Product 1",
                  priceProduct: "99",
                  description: "xcvbghnjm",
                  category: "Men",
                  quantity: "123",
                  discount: "5",
                  image: ["/uploads/1712423553027-9.avif"],
                  deleted: false,
                  createdAt: "2024-04-06T17:12:33.040Z",
                  updatedAt: "2024-04-06T17:12:33.040Z",
                  slug: "product-1-hNNHaiGmU",
                  __v: 0,
                };
                newData.push(product);
              }
            });
          });

          res.render("client/cart", { dataRender: newData });
        } else {
          return res.redirect("/product/cart");
        }
      } else {
        return res.redirect("/product/cart");
      }
    } catch (error) {}
  }

  async removeCart(req, res, next) {
    try {
      if (req.session.userInfo) {
        const id = req.params.id;

        await Cart.deleteMany({ _id: id });

        res.status(200).redirect("back");
      }
    } catch (error) {}
  }

  async search(req, res, next) {
    const keyWords = req.query.keyWord;

    if (keyWords) {
      const data = await Product.find({ nameProduct: keyWords });

      if (data.length <= 0) {
        return res.render("client/productFind", { message: "Not Found" });
      } else {
        return res.render("client/productFind", {
          newData: renderItem.mutipleMongooseToObject(data),
        });
      }
    } else {
      return res.render("client/productFind", { message: "Not Found" });
    }
  }
}

module.exports = new ProuctController();
