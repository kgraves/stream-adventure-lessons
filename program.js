var concat = require('concat-stream');
var crypto = require('crypto');
var tar = require('tar');
var thru = require('through2');
var zlib = require('zlib');

var cipherName = process.argv[2];
var passphrase = process.argv[3];
var decipherStream = crypto.createDecipher('aes256', passphrase);

var tarParser = tar.Parse();
tarParser.on('entry', function (entry) {
  if (entry.type == 'File') {
    entry
        .pipe(crypto.createHash('md5', { encoding: 'hex' }))
        .pipe(concat(function(hex) {
          console.log(hex + ' ' + entry.path);
        }));
  }
});

process.stdin
    .pipe(crypto.createDecipher(cipherName, passphrase))
    .pipe(zlib.createGunzip())
    .pipe(tarParser);
