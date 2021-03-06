const validator = require("validator");
const timestaps = require("../controller/dateController");
const itemCollections = require('../db').db().collection('items')
const Item = function (data, images) {
  this.data = data;
  this.images = images;
  this.errors = [];
};

Item.prototype.validation = function () {
  if (this.data.name === "") {
    this.errors.push("the name should not be empty ");
  }
  if (this.data.body === "") {
    this.errors.push("the body should not be empty ");
  }
  if (this.data.category === "") {
    this.errors.push("the category should not be empty ");
  }
  if (this.data.price === "") {
    this.errors.push("the price should not be empty ");
  }
  if (this.data.tags === "") {
    this.errors.push("the tags should not be empty ");
  }
  if (this.images.image1 === "" || this.images.image1 == undefined) {
    this.errors.push("Please upload the before image ");
  }
  if (this.images.image2 === "" || this.images.image2 == undefined) {
    this.errors.push("Please upload the after image ");
  }
  if (this.images.files === "" || this.images.files == undefined) {
    this.errors.push("Please upload the Zip files ");
  }

  // if (
  //   this.images.files != undefined &&
  //   this.images.files[0].mimetype !== "application/zip"
  // ) {
  //   this.errors.push("only zip file is required");
  // }
  // if (
  //   (this.images.image1 != undefined &&
  //   this.images.image1[0].mimetype !== "image/png") ||
  //   this.images.image1[0].mimetype !== "image/jpg" ||
  //   this.images.image1[0].mimetype !== "image/jpeg"
  // ) {
  //   this.errors.push("only images are accepted");
  // }
  // if (
  //   (this.images.image2 != undefined &&
  //     this.images.image2[0].mimetype != "image/png") ||
  //   this.images.image2[0].mimetype != "image/jpg" ||
  //   this.images.image2[0].mimetype != "image/jpeg"
  // ) {
  //   this.errors.push("only images are accepted");
  // }
  if (!validator.isNumeric(this.data.price)) {
    this.errors.push("price should have only numbers");
  }
  if (this.data.name > 100) {
    this.errors.push("Item name should not exceed 100 charachters");
  }
};
Item.prototype.create = function () {
  return new Promise(async (resolve, reject) => {
    this.validation();
    if (this.errors.length) {
      reject(this.data.errors);
    } else {
      this.data = {
        author: this.data.author,
        name: this.data.name,
        body: this.data.body,
        category: this.data.category,
        price: this.data.price,
        tags: this.data.tags,
        before: this.images.image1,
        after: this.images.image2,
        files: this.images.files,
        created_at: timestaps.ladate(),
        updated_at: timestaps.ladate(),
      };
      await itemCollections.insertOne(this.data);
      resolve();
    }
  });
};

module.exports = Item;
