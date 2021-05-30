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

exports.ladate = function () {
  let obj = {
    year: date.getFullYear(),
    months: months[date.getMonth()],
    days: date.getDate(),
    time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
  };
  return {
      fullDate  : obj.days + ' ' + obj.months + ' ' + obj.year,
      fullTime : obj.time,
  };
};
