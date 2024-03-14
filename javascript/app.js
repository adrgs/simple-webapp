const express = require("express");
const path = require("path");
const session = require("express-session");
const fs = require("fs");

const app = express();
const port = 7777;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

app.use(
  session({
    secret: "your_secret_key", // Different on remote :)
    resave: false, // Don't save unchanged sessions
    saveUninitialized: false, // Don't create session for uninitialized requests
    cookie: {
      maxAge: 60 * 60 * 1000, // Cookie expires in 1 hour
    },
  }),
);

app.get("/", (req, res) => {
  if (!req.session.username) {
    req.session.username = "Guest";
    req.session.permissions = {};
  }

  res.render("index.html", { username: req.session.username });
});

function mergeObjects(dest, src) {
  for (let key in src) {
    if (
      (typeof dest[key] === "object" || typeof dest[key] === "function") &&
      typeof src[key] === "object"
    ) {
      mergeObjects(dest[key], src[key]);
    } else {
      dest[key] = src[key];
    }
  }
}

app.get("/echo", (req, res) => {
  console.log(req.query);

  let obj = {};
  mergeObjects(obj, req.query);

  res.render("index.html", { username: obj.echo ?? "Nothing to echo" });
});

app.get("/admin", (req, res) => {
  console.log(req.session.permissions);
  if (!req.session.permissions || !req.session.permissions.admin) {
    res.status(403).send("You do not have permission to access this page");
    return;
  }

  const flag = fs.readFileSync("../flag.txt", "utf-8");

  res.render("index.html", { username: flag });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
