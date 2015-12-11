var concat = require('concat-stream');

process.stdin
    .pipe(concat(function(input) {
      var reversed = input.toString('utf8').split('').reverse().join('');
      console.log(reversed);
    }));
