let date = new Date();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

exports.timestaps = function () {
    let obj = {
        year : date.getFullYear(),
        months : date.getMonth(),
        days : date.getDate(),
        time : date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }
    console.log(obj)
};
