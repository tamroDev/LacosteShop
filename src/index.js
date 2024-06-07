const express = require("express");
const path = require("path");
const session = require("express-session");
const handlebars = require("express-handlebars");
const routes = require("./routes");
const methodOverride = require("method-override");
const db = require("./config/db");
const bodyParser = require("body-parser");

const app = express();
const port = 2003;

db.connect();

app.use(methodOverride("_method"));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      compare: (val1, val2) => (val1 === val2 ? true : false),
      unCompare: (val1, val2) => (val1 !== val2 ? true : false),
      check: (val) => (val ? true : false),
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

routes(app);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
