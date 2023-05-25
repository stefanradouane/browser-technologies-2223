/*******************************************************
 * Define some constants and variables
 ********************************************************/
const express = require("express");
// let ejs = require("ejs");

const app = express();
const port = process.env.PORT || 4444;

const routes = require("./routes/routes");
const bodyParser = require("body-parser");

/*******************************************************
 * Middleware
 ********************************************************/
app.use(express.static("./public"));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

/*******************************************************
 * Set template engine
 ********************************************************/
app.set("view engine", "ejs");
app.set("views", "views");

/*******************************************************
 * Routes
 ********************************************************/
app.use(routes);

// app.get("/", (req, res) => {
//   res.render("pages/index");
// });

// app.get("/gallery", (req, res) => {
//   res.render("pages/gallery");
// });

/*******************************************************
 * If no routes give response, show 404
 ********************************************************/
app.use((req, res) => {
  res.status(404).send("Error 404: Pagina niet gevonden");
});

/*******************************************************
 * Start webserver
 ********************************************************/
app.listen(port, () => console.log(`Server running on port ${port}`));
