var trumpet = require('trumpet');
var through = require('through2');

var trump = trumpet();
var tr = trump.select('.loud').createStream();

tr.pipe(through(function(buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next();
})).pipe(tr);

process.stdin
    .pipe(trump)
    .pipe(process.stdout);
