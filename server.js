const express = require ('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const path = require('path');

const app = express();


app.use(express.static('./app/www'));

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile('./app/www/index.html', {root: path.join(__dirname, '')});
});

MongoClient.connect(db.url, (err, client) => {
  const db = client.db('music');
  if (err) return console.log(err);
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log("Live on " + port);
  })

});
