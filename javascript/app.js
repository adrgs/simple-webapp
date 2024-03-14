const express = require("express");
const path = require("path");

const app = express();
const port = 7777;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

app.get("/", (req, res) => {
  res.render("index.html");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
