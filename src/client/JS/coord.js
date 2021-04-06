var port = process.env.PORT || 8626;
var url = `http://localhost:${port}`;
if (process.env.NODE_ENV == "production") {
  url = "https://travel-diaryapp.herokuapp.com";
}
const getCoordinates = async (cityInfo) => {
  var count = 0;
  var maxTries = 2;
  var query = cityInfo.city;
  while (count < maxTries) {
    if (count > 0) query = cityInfo.county;
    try {
      const reqCoord = await fetch(`${url}/coordinates`, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: `${encodeURI(query).replace("%20", "&")}`,
          cCode: cityInfo.countryCode,
        }),
      });
      const data = await reqCoord.json(); //returns a promise
      // console.log("to be returned: ", data)
      if (data.geonames.length == 0) {
        if (++count == maxTries) throw "coordinates not found";
        continue;
      }
      return data.geonames[0];
    } catch (e) {
      // if (++count == maxTries) throw e;
      console.log("error:", e);
    }
  }
};

export { getCoordinates };
