const timestaps = require("../controller/dateController");
const categoryCollection = require('../db').db().collection('categories')
const Category = function (data) {
  this.data = data;
  this.errors = [];
};

Category.prototype.add = function () {
  return new Promise(async (resolve, reject) => {
    if (this.data.name === "") {
      this.errors.push("category name should not be empty");
    }
    if (this.errors.length) {
      reject(this.errors);
    } else {
      this.data = {
        name: this.data.name,
        created_at: timestaps.ladate(),
        updated_at: timestaps.ladate(),
      };
      await categoryCollection.insertOne(this.data)
      resolve();
    }
  });
};

module.exports = Category