const validator = require("validator");
const usersCollection = require("../db").db().collection("users");
const bcrypt = require("bcryptjs");
const { Timestamp } = require("bson");
const salt = bcrypt.genSaltSync(12);
const timestaps = require("../controller/dateController");
const User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanR = async function () {
  if (this.data.username === "") {
    this.errors.push("the username should not be empty");
  }
  if (this.data.email === "") {
    this.errors.push("the email should not be empty");
  }
  if (this.data.password === "") {
    this.errors.push("the password should not be empty");
  }
  if (!validator.isEmail(this.data.email)) {
    this.errors.push("Incorrect email adress");
  }
  if (!/\s/.test(this.data.username) === false) {
    this.errors.push("username should not have spaces in between");
  }
  await usersCollection.findOne(
    { username: this.data.username },
    (err, founded) => {
      if (founded) {
        this.errors.push("the username is already in our records");
      }
    }
  );
};

User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanR();
    if (this.errors.length) {
      reject(this.errors);
    } else {
      this.data = {
        username: this.data.username,
        email: this.data.email,
        password: bcrypt.hashSync(this.data.password, salt),
        created_at: Timestamp,
      };
      this.timestaps();
      //await usersCollection.insertOne(this.data);
      resolve();
    }
  });
};
module.exports = User;
