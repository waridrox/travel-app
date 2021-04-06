const app = require("./app-server");
const port = process.env.PORT || 8626;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
