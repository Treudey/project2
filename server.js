var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')))
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//Routes for Hanlebars (HOLLY)
app.get('/', (req, res) => {
    res.render('index', { 
      title: 'Where to Go Toronto' 
    });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'How it works'
  });
});

app.get('/add', (req, res) => {
  res.render('add',{
    title: 'Rate a Washroom'
  });
});

//For later intigration of Login Pages
// app.get('/newuser', (req, res) => {
//   res.render('newuser');
// });

// app.get('/login', (req, res) => {
//   res.render('login');
// });

// app.get('/rate', (req, res) => {
//   res.render('rate');
// });

// app.get('/404', (req, res) => {
//   res.render('404');
// });

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
