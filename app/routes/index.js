const songRoutes = require('./song_routes');
const reviewRoutes = require ('./review_routes');

module.exports = function (app, db) {
  songRoutes(app, db);
  reviewRoutes(app, db);
}
