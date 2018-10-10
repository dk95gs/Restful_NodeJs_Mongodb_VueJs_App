var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  //Add review
    app.post('/reviews', (req, res)=> {
      const review = {
        songId: req.body.songId,
        reviewBody: req.body.reviewBody
       };
      db.collection('reviews').insertOne(review, (err, results) =>{
        if(err) {
          res.send({ 'error' : 'Am error has occured' });
        } else {
          res.send(results.ops[0]);
        }
      });
    });

    //Delete single song
    app.delete('/reviews/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id) };

      db.collection('reviews').remove(details, (err, item) => {
        if(err) {
          res.send('error');
        } else {
          res.send('note ' +id + ' deleted');
        }
      });
    });
    //Get all reviews
    app.get('/reviews', (req, res) => {
      db.collection('reviews').find({}).toArray(function (err, result ) {
        if(err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });
    //Get all reviews for a single song
    app.get('/sreviews/:id', (req, res) => {
    const id = req.params.id;
    const details = {'songId' : id };

      db.collection('reviews').find(details).toArray(function (err, item) {
        if(err) {
          res.send('error');
        } else {
          res.send(item);
        }
      });
    });
    //Get single review
    app.get('/reviews/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id) };

      db.collection('reviews').findOne(details, (err, item) => {
        if(err) {
          res.send('error');
        } else {
          res.send(item);
        }
      });
    });
    //Update single review
    app.put('/reviews/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id) };
    const review = {
      songId: req.body.songId,
      reviewBody: req.body.reviewBody
     };
      db.collection('reviews').update(details,review, (err, item) => {
        if(err) {
          res.send('error');
        } else {
          res.send(item);
        }
      });
    });
}
