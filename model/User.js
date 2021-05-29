const User = function (data) {
  this.data = data;
};

User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    console.log(this.data);
  });
};
module.exports = User;
