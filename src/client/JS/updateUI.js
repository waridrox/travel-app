import { dateDiffInDays } from "./dates";
import fetch from "node-fetch";
// import {tripsArray} from './app'
var port = process.env.PORT || 8626;
var page_url = `http://localhost:${port}`;
if (process.env.NODE_ENV == "production") {
  page_url = "https://travel-diaryapp.herokuapp.com";
}

async function updateUI(cityWeather, cityInfo, url, idIndex, tripNotes, date) {
  var icon = cityWeather.weather.icon.slice(1);
  const iconObject = await fetch(
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  var w_terms = "";
  if (dateDiffInDays(date) >= 16) {
    w_terms = `<br> <span class="weather-terms">*weather forecast is only accurate within 16 days</span>`;
  }
  var tripID = "trip".concat(idIndex);
  var rmvID = "rmv".concat(idIndex);
  var txtID = "txt".concat(idIndex);
  var saveID = "save".concat(idIndex);
  $("#user-field").css("display", "none");
  $("#newTrip").css("display", "inline-block");
  $("#addedTrips").val("");
  $("#travelDate").val("");
  $("#addedTrips").css("display", "block");
  $("#user-section").prepend($("#newTrip"));
  $("#addedTrips").prepend(`
        <div class= "breadcrumb my-4 travelInfo p-0" id=${tripID}>
            <div class="p-1 trip-header">
                <p class="mb-0 trip-location">Trip to ${
                  cityInfo.city
                }, ${cityInfo.countryCode.toUpperCase()}</p>
                <p class = "mb-0 text-right tripDate"> ${date}</p>
            </div>
            <div class="d-sm-flex mx-sm-5 trip-body">
                <img src="${url}" alt="" class="trip-photo">
                <p class="ml-1 mb-0">WEATHER FORECAST: ${w_terms}</p>
                <div class="city-weather d-flex ml-sm-2 p-2">                
                    <img src=${iconObject.url} class="img-fluid weather-icon"> 
                    <div class="weather-text">
                        <p class="mb-0 weather-temp">${
                          cityWeather.low_temp
                        }&deg;/${cityWeather.high_temp}&deg;C</p>
                        <p class="mb-0 feels-like">Feels Like: ${
                          cityWeather.app_min_temp
                        }&deg;/${cityWeather.app_max_temp}&deg;C</p> 
                        <p class="mb-0 weather-desc">${
                          cityWeather.weather.description
                        }</p>
                    </div>                    
                </div>                
                <div class="trip-extras mx-1 ml-sm-3">
                    <textarea class="travel-notes" rows="8" cols="50" placeholder="Travel/Trip info goes here" id=${txtID}>${tripNotes}</textarea>
                    <button class="btn btn-sm mt-sm-2 py-0 btn-outline-success saveTxt" id=${saveID}>Save Text</button>
                </div>
            </div>            
            <div class="d-flex pb-2 tripBtns">
                <button class="btn mx-1 mx-sm-5 py-0 btn-outline-danger rmvTrip" id=${rmvID}>Remove trip</button>                
            </div>
            <div class="trip-footer px-1">
                ${dateDiffInDays(date)} day(s) to go
            </div>
        </div>`);
  var rmvBtn = $("#".concat(rmvID));
  rmvBtn.click(async function () {
    if (confirm("Are you sure you want to cancel this trip?")) {
      $("#".concat(tripID)).fadeOut("slow", function () {
        $("#".concat(tripID)).remove();
      });
      var tripNum = parseInt($("#see-trips").text()) - 1;
      $("#see-trips").text(tripNum);
      await fetch(`${page_url}/updateTrips`, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: idIndex, key: 0 }),
      });
    }
  });

  var saveBtn = $("#".concat(saveID));
  saveBtn.click(async function () {
    await fetch(`${page_url}/updateTrips`, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        index: idIndex,
        tripNotes: $("#".concat(txtID)).val(),
        key: 1,
      }),
    });
    $(this).html("SAVED");
  });

  $("#".concat(txtID)).keyup(function () {
    $("#".concat(saveID)).html("Save Text");
  });
}

export { updateUI };
