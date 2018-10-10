var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  //Add song
    app.post('/songs', (req, res)=> {
      const song = {
        title: req.body.title,
        genre: req.body.genre
       };
      db.collection('songs').insertOne(song, (err, results) =>{
        if(err) {
          res.send({ 'error' : 'Am error has occured' });
        } else {
          res.send(results.ops[0]);
        }
      });
    });
    //Get single song
    app.get('/songs/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id) };

      db.collection('songs').findOne(details, (err, item) => {
        if(err) {
          res.send('error');
        } else {
          res.send(item);
        }
      });
    });
    //Delete single song
    app.delete('/songs/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id) };

      db.collection('songs').remove(details, (err, item) => {
        if(err) {
          res.send('error');
        } else {
          res.send('note ' +id + ' deleted');
        }
      });
    });
    //Get all songs
    app.get('/songs', (req, res) => {
      db.collection('songs').find({}).toArray(function (err, result ) {
        if(err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });
    //Update single song
    app.put('/songs/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id) };
    const song = {
      title: req.body.title,
      genre: req.body.genre
     };
      db.collection('songs').update(details,song, (err, item) => {
        if(err) {
          res.send('error');
        } else {
          res.send(item);
        }
      });
    });
};
