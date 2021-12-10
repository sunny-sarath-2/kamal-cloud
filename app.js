const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const Gig = require("./models/Gig");
const Sequelize = require("sequelize");
var hbs = require("hbs");

const app = express();

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: hbs.registerHelper("log", function (something) {
      console.log(something);
    }),
  })
);
app.set("view engine", "handlebars");

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Index route
app.get("/", (req, res) => res.render("index", { layout: "landing" }));

// Gig routes
app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
