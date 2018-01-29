'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _LocationUtils = require('history/LocationUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line max-params
exports.default = function (path, state, key, currentLocation) {
  var vanillaLocation = (0, _LocationUtils.createLocation)(path, state, key, currentLocation);

  var query = path.query;
  var basename = path.basename;
  var search = vanillaLocation.search;


  var resolvedSearch = search || query && Object.keys(query).length && '?' + _queryString2.default.stringify(query) || '';
  var resolvedQuery = query || _queryString2.default.parse(search);

  var location = _extends({}, vanillaLocation, {
    search: resolvedSearch,
    query: resolvedQuery
  });

  return basename ? _extends({}, location, { basename: basename }) : location;
};