var duplex = require('duplexer2');
var through = require('through2').obj;

module.exports = function(counter) {
  var counts = {};
  var inStream = through(function(row, encoding, next) {
    // increment count
    counts[row.country] = (counts[row.country] || 0) + 1;
    next();
  }, function(done) {
    // set countrs
    counter.setCounts(counts)
    done();
  });

  return duplex(inStream, counter);
};
