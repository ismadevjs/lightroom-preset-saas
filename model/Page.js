const timestaps = require("../controller/dateController");
const pagesCollection = require("../db").db().collection("pages");
const { ObjectId } = require("mongodb");
const Page = function (data) {
  this.data = data;
  this.error = [];
};

Page.prototype.becomeArtist = function () {
  return new Promise(async (resolve, reject) => {
    if (this.data.title === "") {
      this.error.push("the title should not be empry");
    }
    if (this.error.length) {
      reject(this.error);
    } else {
      await pagesCollection.updateOne(
        {},
        {
          $set: {
            title: this.data.title,
            body: this.data.body,
            created_at: timestaps.ladate(),
            updated_at: timestaps.ladate(),
          },
        }
      );
      resolve();
    }
  });
};
Page.prototype.create = function () {
  return new Promise(async (resolve, reject) => {
    this.data = {
      title: this.data.title,
      body: this.data.body,
      created_at: timestaps.ladate(),
      updated_at: timestaps.ladate(),
    };
    await pagesCollection.insertOne(this.data);
    resolve();
  });
};

Page.prototype.updatePage = function () {
  return new Promise(async (resolve, reject) => {
    await pagesCollection.updateOne(
      { _id: ObjectId(this.data._id) },
      {
        $set: {
          title: this.data.title,
          body: this.data.body,
          created_at: timestaps.ladate(),
          updated_at: timestaps.ladate(),
        },
      }
    );
    resolve();
  });
};

Page.prototype.deletePage = function () {
  return new Promise(async (resolve, reject) => {
    await pagesCollection.deleteOne(this.data);
    resolve();
  });
};

module.exports = Page;
