const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const geo_endpoint = "http://api.geonames.org/searchJSON?";
const weather_forecast = "https://api.weatherbit.io/v2.0/forecast/daily";
const pix_endpoint = "https://pixabay.com/api/?key=";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/json
app.use(bodyParser.json());
app.use(express.static("dist"));

var tripsArray = [];
var index = 0;

app.get("/", function (req, res) {
  res.sendFile("dist/index.html", { root: __dirname + "/.." });
});

app.get("/trips", function (req, res) {
  tripsArray.sort(function (a, b) {
    return new Date(b.tripDate) - new Date(a.tripDate);
  });
  //   console.log("sorted array: ", tripsArray);
  res.send(tripsArray);
});

app.post("/updateTrips", function (req, res) {
  tripsArray.forEach((trip, i) => {
    if (trip.index == req.body.index) {
      if (req.body.key == 0) {
        tripsArray.splice(i, 1);
      } else {
        trip.tripNotes = req.body.tripNotes;
      }
    }
  });
  res.send("Updated");
});

app.post("/saveTrip", function (req, res) {
  ++index;
  var tripObject = {
    cityInfo: req.body.cityInfo,
    tripDate: req.body.tripDate,
    tripNotes: "",
    index: index,
  };
  tripsArray.push(tripObject);
  console.log("updated trips: ", tripsArray);
  res.send({ index: index });
});

app.post("/coordinates", function (req, res) {
  // console.log(`${geo_endpoint}q=${req.body.city}&country=${req.body.cCode}&maxRows=10&username=${process.env.g_key}`)
  fetch(
    `${geo_endpoint}q=${req.body.city}&country=${req.body.cCode}&maxRows=10&username=${process.env.g_key}`
  )
    .then((res) => res.json())
    .then((json) => res.send(json));
});

app.post("/forecast", function (req, res) {
  fetch(
    `${weather_forecast}?&lat=${req.body.lat}&lon=${req.body.long}&key=${process.env.w_key}`
  )
    .then((res) => res.json())
    .then(function (json) {
      var days = json.data;
      var toReturn = days[days.length - 1]; //loops to find temp for trip date
      for (var day in days) {
        if (Object.prototype.hasOwnProperty.call(days, day)) {
          if (days[day]["valid_date"] === req.body.date) {
            // res.send(days[day]);
            toReturn = days[day];
            break;
          }
        }
      }
      res.send(toReturn);
    });
});

app.post("/citypic", function (req, res) {
  // console.log(`${pix_endpoint}${process.env.p_key}&q=${req.body.query}&image_type=photo&pretty=true`)
  fetch(
    `${pix_endpoint}${process.env.p_key}&q=${req.body.query}&image_type=photo&pretty=true`
  )
    .then((res) => res.json())
    .then((json) => res.send(json.hits[0]));
});

module.exports = app;
