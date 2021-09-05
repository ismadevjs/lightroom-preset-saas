const validator = require("validator");
const usersCollection = require("../db").db().collection("users");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(12);
const timestaps = require("../controller/dateController");
const randomHash = require("../controller/randomHash");
const { ObjectId } = require("mongodb");
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
  if (this.data.password.length > 0 && this.data.password.length > 50) {
    this.errors.push("Password should not exceed 50 charachters");
  }
  if (this.data.password.length < 6) {
    this.errors.push("Password should be more than 6 charachters");
  }
  if (this.data.username.length > 0 && this.data.username.length > 20) {
    this.errors.push("Username should not exceed 20 charachters");
  }
  if (this.data.username.length < 3) {
    this.errors.push("Password should be more than 3 charachters");
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
User.prototype.cleanL = async function () {
  if (this.data.email === "") {
    this.errors.push("the email should not be empty");
  }
  if (this.data.password === "") {
    this.errors.push("the password should not be empty");
  }
  if (!validator.isEmail(this.data.email)) {
    this.errors.push("Incorrect email adress");
  }
  if (this.data.password.length > 0 && this.data.password.length > 50) {
    this.errors.push("Password should not exceed 50 charachters");
  }
  if (this.data.password.length < 6) {
    this.errors.push("Password should be more than 6 charachters");
  }
};
User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanR();
    if (this.errors.length) {
      reject(this.errors);
    } else {
      this.data = {
        username: this.data.username.trim(),
        fullname: null,
        email: this.data.email.trim(),
        password: bcrypt.hashSync(this.data.password, salt),
        avatar: null,
        cover: null,
        about: null,
        active: false,
        artist: false,
        verified: false,
        website: null,
        socials: [],
        token: randomHash.randomHash(20),
        created_at: timestaps.ladate(),
        updated_at: timestaps.ladate(),
      };
      await usersCollection.insertOne(this.data);
      resolve();
    }
  });
};
User.prototype.login = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanL();
    if (this.errors.length) {
      reject(this.errors);
    } else {
      usersCollection.findOne({ email: this.data.email }).then((e) => {
        if (e && bcrypt.compareSync(this.data.password, e.password)) {
          resolve(e);
        } else {
          reject("Email / Password invalid");
        }
      });
    }
  });
};
User.prototype.updateSettingsCleaning = function () {
  return new Promise(async (resolve, reject) => {
    if (!validator.isEmail(this.data.email)) {
      this.errors.push("email is not correct!");
    }
  });
};

User.prototype.updateSettings = function () {
  return new Promise(async (resolve, reject) => {
    this.updateSettingsCleaning();
    if (this.errors.length) {
      reject(this.errors);
    } else {
      await usersCollection.update(
        { _id: ObjectId(this.data._id) },
        {
          $set: {
            email: this.data.email,
            firstname: this.data.firstname,
            lastname: this.data.lastname,
            about: this.data.about,
            wesite: this.data.website,
            socials: this.data.socials,
            updated_at: timestaps.ladate(),
          },
        }
      );
    }
  });
};
module.exports = User;
