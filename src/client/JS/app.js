import { dateFormat } from "./dates";
import { getCityWeather } from "./weather";
import { buttonHandler } from "./buttonHandler";

const fetch = require("node-fetch");
var places = require("places.js");
var port = process.env.PORT || 8626;
var url = `http://localhost:${port}`;
if (process.env.NODE_ENV == "production") {
  url = "https://travel-diaryapp.herokuapp.com";
}

$(document).ready(async function () {
  $("#newTrip").click(newTrip);
  const req = await fetch(`${url}/trips`);
  const trips = await req.json();

  $("#see-trips").text(trips.length);
  $("#see-trips").click(viewTrips);
  var forms = $(".needs-validation");
  var tomorrow = dateFormat(new Date(new Date().valueOf() + 1000 * 3600 * 24));
  $("#travelDate").attr("min", tomorrow); //prevents booking dates in the past

  //prevent submitting form for invalid input
  var cityInfo = {};
  var placesAutocomplete = places({
    appId: process.env.algolia_ID,
    apiKey: process.env.algolia_KEY,
    container: document.querySelector("#address-input"),
  }).configure({
    type: "city",
    aroundLatLngViaIP: false,
  });
  placesAutocomplete.on("change", (e) => {
    cityInfo = {
      city: e.suggestion.name,
      county: e.suggestion.administrative,
      country: e.suggestion.country,
      countryCode: e.suggestion.countryCode,
    };
  });
  // Bootsrap form validation
  Array.prototype.filter.call(forms, function (form) {
    // eslint-disable-next-line prettier/prettier
    form.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
        form.classList.add("was-validated");
        if (form.checkValidity() === true) {
          if (jQuery.isEmptyObject(cityInfo)) {
            // empty object means location wasn't found with Algolia API
            console.log("empty cityInfo obj");
            alert("Please select a valid destination");
          } else {
            var dateText = $("#travelDate").val();
            buttonHandler(cityInfo, dateText, 0, 0);
          }
        }
      },
      false
    );
  });
});

async function viewTrips() {
  if ($("#addedTrips").is(":hidden")) {
    $("#addedTrips").html("");
    var req = await fetch(`${url}/trips`);
    var trips = await req.json();
    trips.forEach((trip) => {
      console.log("trip: ", trip);
      buttonHandler(
        trip.cityInfo,
        trip.tripDate,
        1,
        trip.index,
        trip.tripNotes
      );
    });
  } else {
    console.log("added trips is not hidden");
  }
}

function newTrip() {
  $("#user-field").css("display", "block");
  $("#addedTrips").css("display", "none");
  $("#newTripText").css("padding-top", "1vh");
  $("#newTrip").css("display", "none");
  $("#user-section").addClass("pb-3 pt-2");
}

export { getCityWeather, viewTrips };
