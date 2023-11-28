var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); 

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

function jsonReturnFactory(date) {
  return {
    unix: date.getTime(),
    utc: date.toUTCString()
  }
}

app.get("/api/:date?", function(req, res) {
  let date = !isNaN(req.params.date)
    ? new Date(Number(req.params.date))
    : new Date(req.params.date);

  if (!req.params.date) {
    date = new Date()
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
    return;
  }

  res.json(jsonReturnFactory(date));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
