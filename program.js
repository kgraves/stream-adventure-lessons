var combine = require('stream-combiner');
var split = require('split');
var thru = require('through2');
var zlib = require('zlib');

module.exports = function () {
  var currentGenre;
  var tr = thru(function(line, _, next) {
    if (line.length <= 0) {
      return next();
    }

    var row = JSON.parse(line);
    if (row.type === 'genre') {
      if (currentGenre) {
        this.push(JSON.stringify(currentGenre) + '\n');
      }
      
      currentGenre = {
        name: row.name,
        books: []
      };
    } else if (row.type === 'book') {
      currentGenre.books.push(row.name);
    }

    next();
  }, function(done) {
    // if it ends with a genre, push that genre
    this.push(JSON.stringify(currentGenre) + '\n');
    done();
  });

  return combine(
    split(),
    tr,
    zlib.createGzip()
  );
};
