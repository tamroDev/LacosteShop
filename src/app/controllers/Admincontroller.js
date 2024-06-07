const renderItem = require("../../ulti/mongose");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Account = require("../models/Account");
const readData = require("../../middlware/readData");

class AdminController {
  async productAdd(req, res, next) {
    try {
      const category = await readData(
        "http://localhost:2003/admin/category/api"
      );
      const message = req.query.message;
      let messageToShow = "";

      const messages = {
        success: "Successfully add product",
        failure: "add product failed",
      };

      if (message && messages.hasOwnProperty(message)) {
        messageToShow = messages[message];
      }

      res.render("admin/addProduct", {
        layout: "admin_layout",
        currentPage: "admin",
        category,
        message: messageToShow,
      });
    } catch (error) {}
  }

  async productList(req, res, next) {
    try {
      const data = await readData("http://localhost:2003/admin/product/api");

      res.render("admin/listProduct", {
        layout: "admin_layout",
        currentPage: "admin-table",
        data,
      });
    } catch (error) {}
  }

  async trashProduct(req, res, next) {
    try {
      const deletedProducts = await Product.findDeleted();
      const filteredDeletedProducts = deletedProducts.filter(
        (product) => product.deleted === true
      );

      res.render("admin/trashProduct", {
        layout: "admin_layout",
        currentPage: "admin-trash",
        newData: renderItem.mutipleMongooseToObject(filteredDeletedProducts),
      });
    } catch (error) {
      next(error);
    }
  }

  async add(req, res, next) {
    try {
      let imagePaths = [];
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          const imagePath = "/uploads/" + file.filename;
          imagePaths.push(imagePath);
        });
      } else {
        throw new Error("No image uploaded");
      }

      const newProduct = new Product({
        nameProduct: req.body.nameProduct,
        priceProduct: req.body.priceProduct,
        description: req.body.description,
        category: req.body.category,
        discount: req.body.discount,
        quantity: req.body.quantity,
        image: imagePaths,
      });

      await newProduct.save();

      res.status(200).redirect("/admin/product/add?message=success");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  }

  async apiProduct(req, res, next) {
    try {
      const data = await Product.find();

      if (data && data.length > 0) {
        return res.json(data);
      } else {
        return res.send("Data not found");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Xóa mềm
  async destroy(req, res, next) {
    try {
      await Product.delete({ _id: req.params.id });
      res.redirect("back");
    } catch (next) {
      next;
    }
  }
  // Khôi phục
  async restore(req, res, next) {
    try {
      const id = req.params.id;
      await Product.restore({ _id: id });
      res.redirect("back");
    } catch (next) {}
  }
  // Xóa vĩnh viễn
  async hardDeleteProduct(req, res, next) {
    try {
      const id = req.params.id;
      await Product.deleteOne({ _id: id });
      res.status(200).redirect("back");
    } catch (error) {
      next(error);
    }
  }

  //   [GET] /product/:id/edit
  async edit(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      const category = await readData(
        "http://localhost:2003/admin/category/api"
      );

      const image = product.image[0];
      res.render("admin/edit", {
        product: renderItem.mongooseToObject(product),
        image,
        category,
        layout: "admin_layout",
      });
    } catch (error) {
      next(error);
    }
  }

  //   [PUT] /product/:id/edit
  async update(req, res, next) {
    try {
      let imagePaths = [];
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          const imagePath = "/uploads/" + file.filename;
          imagePaths.push(imagePath);
        });
      } else {
        throw new Error("No image uploaded");
      }

      const updatedProduct = {
        nameProduct: req.body.nameProduct,
        priceProduct: req.body.priceProduct,
        description: req.body.description,
        category: req.body.category,
        discount: req.body.discount,
        quantity: req.body.quantity,
        image: imagePaths,
      };

      await Product.findOneAndUpdate({ _id: req.params.id }, updatedProduct);

      res.redirect("/admin/product/list");
    } catch (error) {
      next(error);
    }
  }

  // -----------------------------category------------------------------

  categoryAdd(req, res, next) {
    let message = "";

    if (req.query.message === "done") {
      message = "Added category successfully";
    }
    res.render("admin/category/addCategory", {
      layout: "admin_layout",
      message,
    });
  }

  async createCategory(req, res, next) {
    try {
      const data = req.body;
      const category = new Category(data);

      await category.save();

      res.redirect("/admin/category/add?message=done");
    } catch (error) {
      next(error);
    }
  }

  async apiCategory(req, res, next) {
    try {
      const data = await Category.find();

      if (data && data.length > 0) {
        return res.json(data);
      } else {
        return res.send("Data not found");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async readApiCategory(req, res, next) {
    try {
      const data = await readData("http://localhost:2003/admin/category/api");

      res.render("admin/category/listCategory", {
        layout: "admin_layout",
        data,
      });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }

  async categoryTrash(req, res, next) {
    try {
      const deletedProducts = await Category.findDeleted();
      const filteredDeletedCategory = deletedProducts.filter(
        (category) => category.deleted === true
      );

      res.render("admin/category/trashCategory", {
        layout: "admin_layout",
        currentPage: "admin-trash",
        newData: renderItem.mutipleMongooseToObject(filteredDeletedCategory),
      });
    } catch (error) {
      next(error);
    }
  }

  async categoryDelete(req, res, next) {
    try {
      await Category.delete({ _id: req.params.id });
      res.redirect("back");
    } catch (next) {
      next;
    }
  }

  async categoryUpdate(req, res, next) {
    const id = req.params.id;
    try {
      const categoryData = await Category.findById({ _id: id });
      res.render("admin/category/edit", {
        layout: "admin_layout",
        category: renderItem.mongooseToObject(categoryData),
      });
    } catch (error) {}
  }

  async categoryEdit(req, res, next) {
    try {
      const categoryUpdate = {
        name: req.body.name,
      };

      await Category.findOneAndUpdate({ _id: req.params.id }, categoryUpdate);
      res.redirect("back");
    } catch (error) {}
  }

  async restoreCategory(req, res, next) {
    try {
      const id = req.params.id;
      await Category.restore({ _id: id });
      res.redirect("back");
    } catch (next) {}
  }

  async hardDeleteCategory(req, res, next) {
    try {
      const id = req.params.id;
      await Category.deleteOne({ _id: id });
      res.status(200).redirect("back");
    } catch (error) {
      next(error);
    }
  }

  // -----------------------------Account------------------------------
  async apiAccount(req, res, next) {
    try {
      const data = await Account.find();

      if (data && data.length > 0) {
        return res.json(data);
      } else {
        return res.send("Data not found");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async readApiAccount(req, res, next) {
    try {
      const data = await readData("http://localhost:2003/admin/account/api");

      res.render("admin/account/listAccount", {
        layout: "admin_layout",
        data,
      });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }

  async updateRole(req, res, next) {
    try {
      const id = req.params.id;
      const newRole = req.body.role;
      const updatedAccount = await Account.findByIdAndUpdate(
        id,
        { role: newRole },
        { new: true }
      );

      if (!updatedAccount) {
        console.log("Không tìm thấy tài khoản để cập nhật");
        return null; // Hoặc xử lý theo ý của bạn, ví dụ như throw một lỗi
      }

      console.log('Cập nhật trường "role" thành công:', updatedAccount);
      return res.redirect("back");
    } catch (error) {}
  }

  async updateStatus(req, res, next) {
    try {
      const id = req.params.id;
      const newStatus = req.body.status;
      const updatedAccount = await Account.findByIdAndUpdate(
        id,
        { status: newStatus },
        { new: true }
      );

      if (!updatedAccount) {
        console.log("Không tìm thấy tài khoản để cập nhật");
        return null; // Hoặc xử lý theo ý của bạn, ví dụ như throw một lỗi
      }

      console.log('Cập nhật trường "role" thành công:', updatedAccount);
      return res.redirect("back");
    } catch (error) {}
  }
}

module.exports = new AdminController();
