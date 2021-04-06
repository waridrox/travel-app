function dateDiffInDays(tripDate) {
  const a = new Date(tripDate);
  const b = new Date();
  const diffTime = Math.abs(a - b);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // console.log("diff in dates: ", diffDays)
  return diffDays;
}

//function below is used in app.js
function dateFormat(date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1; //January is 0!
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  date = yyyy + "-" + mm + "-" + dd;
  return date;
}

export { dateDiffInDays, dateFormat };
