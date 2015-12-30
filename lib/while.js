var async = require('async');

module.exports = function () {
  var $beginWhile = function (check, done) {
    done(null, {
      check: check,
      value: this.previousResult()
    });
  };

  var $endWhile = function (subchain, done) {
    var fromBegin = this.previousResult();
    var check = fromBegin.check;
    var value = fromBegin.value;

    async.whilst(function () {
      return check(value);
    }, function (cb) {
      subchain.run(value, function (err, val) {
        if (err) cb(err);
        value = val;
        cb(null);
      });
    }, function (err) {
      if (err) done(err);
      done(null, value);
    });
  };

  $beginWhile.$beginSubchain = 'while';
  $endWhile.$endSubchain = 'while';

  return {
    $beginWhile: $beginWhile,
    $endWhile: $endWhile
  };
};
