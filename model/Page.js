const { pages } = require("../controller/backendController");
const timestaps = require("../controller/dateController");
const pagesCollection = require("../db").db().collection("pages");
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
module.exports = Page;
