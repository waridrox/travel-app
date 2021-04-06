var port = process.env.PORT || 8626;
var url = `http://localhost:${port}`;
if (process.env.NODE_ENV == "production") {
  url = "https://travel-diaryapp.herokuapp.com";
}

const getCityPic = async (city, country) => {
  const cityURI = city.replace(" ", "&");
  const countryURI = country.replace(" ", "&");
  var count = 0;
  var maxTries = 2;
  while (count < maxTries) {
    var query = encodeURI(cityURI.concat("&", countryURI));
    if (count > 0) {
      query = encodeURI(countryURI);
    }
    try {
      const resPicture = await fetch(`${url}/citypic`, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query }),
      });
      const toReturn = await resPicture.json();
      return toReturn.previewURL;
    } catch (e) {
      if (++count == maxTries) throw e;
      // console.log("error: ", error)
    }
  }
};

export { getCityPic };
