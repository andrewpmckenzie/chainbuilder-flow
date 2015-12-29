module.exports = function (superOptions) {
  var map = require('./lib/map')(superOptions);

  return {
    $beginMap: map.$beginMap,
    $endMap: map.$endMap,
    // Alias map
    $beginEach: map.$beginMap,
    $endEach: map.$endMap
  };
};
