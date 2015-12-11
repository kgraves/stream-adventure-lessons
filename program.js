var split = require('split');
var through = require('through2');
var index = 1;

process.stdin
    .pipe(split())
    .pipe(through(function(line, encoding, next) {
      if (index % 2 === 0) {
        this.push(line.toString('utf8').toUpperCase() + '\n');
      } else {
        this.push(line.toString('utf8').toLowerCase() + '\n');
      }

      index += 1;
      next();
    })).pipe(process.stdout);
