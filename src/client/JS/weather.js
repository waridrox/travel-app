var port = process.env.PORT || 8626;
var url = `http://localhost:${port}`;
if (process.env.NODE_ENV == "production") {
  url = "https://travel-diaryapp.herokuapp.com";
}

const getCityWeather = async (lat, long, dateText) => {
  // console.log("date in weather: ", dateText)
  try {
    const resWeather = await fetch(`${url}/forecast`, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat: lat, long: long, date: dateText }),
    });
    const toReturn = await resWeather.json();
    // console.log("res weather", toReturn)
    return toReturn;
  } catch (error) {
    console.log("error: ", error);
  }
};

export { getCityWeather };
