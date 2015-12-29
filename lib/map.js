var async = require('async');
module.exports = function (superOptions) {
  var $beginMap = function (options, done) {
    if (!done) {
      done = options;
      options = {};
    }

    done(null, {
      value: this.previousResult(),
      options: options
    });
  };

  var $endMap = function (subchain, done) {
    var fromBegin = this.previousResult();
    var instanceOptions = fromBegin.options;
    var values = fromBegin.value;

    var extendedOptions = {}, k;
    for (k in superOptions) if (superOptions.hasOwnProperty(k)) extendedOptions[k] = superOptions[k];
    for (k in instanceOptions) if (instanceOptions.hasOwnProperty(k)) extendedOptions[k] = instanceOptions[k];

    if (extendedOptions.series) {
      async.mapSeries(values, subchain.run.bind(subchain), done);
    } else if (extendedOptions.limit) {
      async.mapLimit(values, extendedOptions.limit, subchain.run.bind(subchain), done);
    } else {
      async.map(values, subchain.run.bind(subchain), done);
    }
  };

  $beginMap.$beginSubchain = 'map';
  $endMap.$endSubchain = 'map';

  return {
    $beginMap: $beginMap,
    $endMap: $endMap
  };
};
