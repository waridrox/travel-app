import { getCoordinates } from "./coord";
import { getCityWeather } from "./weather";
import { getCityPic } from "./cityPic";
import { updateUI } from "./updateUI";
import { viewTrips } from "./app";

var port = process.env.PORT || 8626;
var url = `http://localhost:${port}`;
if (process.env.NODE_ENV == "production") {
  url = "https://travel-diaryapp.herokuapp.com";
}

async function buttonHandler(cityInfo, date, key, index, tripNotes) {
  try {
    // console.log("date in handler: ", date)
    const cityCoord = await getCoordinates(cityInfo); // console.log("city coord: ", cityCoord)
    const cityWeather = await getCityWeather(
      cityCoord.lat,
      cityCoord.lng,
      date
    ); // console.log("city weather: ", cityWeather)
    const imageUrl = await getCityPic(cityInfo.city, cityInfo.country);
    // console.log("image URL: ", imageUrl)
    if (key == 0) {
      const req = await fetch(`${url}/saveTrip`, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cityInfo: cityInfo, tripDate: date }),
      });
      const reqJSON = await req.json();
      console.log("fetch complete: ", reqJSON);
      //   await updateUI(cityWeather, cityInfo, imageUrl, reqJSON.index, date);
      var tripNum = parseInt($("#see-trips").text()) + 1;
      $("#see-trips").text(tripNum);
      viewTrips();
    } else {
      await updateUI(cityWeather, cityInfo, imageUrl, index, tripNotes, date);
    }
    console.log("view trips called");
  } catch (e) {
    alert("Cannot retrieve information for the city and country entered");
    console.log("error: ", e);
  }
}

export { buttonHandler };
