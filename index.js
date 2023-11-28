// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
bodyParser = require("body-parser");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// My  code

// Middleware para manejar JSON y formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/basic-routing.html
/*app.get("/", function (req, res) {
  
  res.sendFile(__dirname + '/views/index.html');
});*/

app.get("/:date?", function (req, res) {
  const date = req.params.date;
  const newDateNow = new Date(); 

  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
  const formaterDate = newDateNow.toLocaleString('es-ES', options);

  if (!date) {
    res.json({ unix: Date.now(), utc: formaterDate });
  } else {
    const timestamp = parseInt(date);

    if (!isNaN(timestamp)) {
      const newDate = new Date(timestamp);
      const formattedDate = newDate.toLocaleString('es-ES', options);
      res.json({ unix: timestamp, utc: formattedDate });
    } else {
      res.json({ error: 'Invalid date' });
    }
  }
})
// 1451001600000
// 2015-12-25

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
