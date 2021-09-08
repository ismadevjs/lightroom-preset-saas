const timestaps = require("../controller/dateController");
const categoryCollection = require("../db").db().collection("categories");
const { ObjectId } = require("mongodb");
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
      await categoryCollection.insertOne(this.data);
      resolve();
    }
  });
};
Category.prototype.deleteByOne = function () {
  return new Promise(async (resolve, reject) => {
    let data = await categoryCollection.findOne({ _id: ObjectId(this.data) });
    if (data !== null ) {
      await categoryCollection.deleteOne({ _id : ObjectId(this.data) })
      resolve()
    } else {
      reject('Category is not found')
    }
  });
};
module.exports = Category;
