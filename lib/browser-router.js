'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createLocation = require('./util/create-location');

var _createLocation2 = _interopRequireDefault(_createLocation);

var _storeEnhancer = require('./store-enhancer');

var _storeEnhancer2 = _interopRequireDefault(_storeEnhancer);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next: unstubbable! */
var realLocation = function realLocation() {
  return window.location;
};

exports.default = function (_ref) {
  var routes = _ref.routes;
  var basename = _ref.basename;
  var _ref$getLocation = _ref.getLocation;
  var getLocation = _ref$getLocation === undefined ? realLocation : _ref$getLocation;
  var _ref$passRouterStateT = _ref.passRouterStateToReducer;
  var passRouterStateToReducer = _ref$passRouterStateT === undefined ? false : _ref$passRouterStateT;

  var history = (0, _createBrowserHistory2.default)({ basename: basename });

  var _getLocation = getLocation();

  var pathname = _getLocation.pathname;
  var search = _getLocation.search;

  var descriptor = basename ? { pathname: pathname, basename: basename, search: search } : { pathname: pathname, search: search };

  var location = (0, _createLocation2.default)(descriptor);

  return {
    routerEnhancer: (0, _storeEnhancer2.default)({
      routes: routes,
      history: history,
      location: location,
      passRouterStateToReducer: passRouterStateToReducer
    }),
    routerMiddleware: (0, _middleware2.default)({ history: history })
  };
};