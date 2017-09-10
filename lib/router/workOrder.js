'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (service) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var t = function t(doc, lng) {
    if (doc && lng && doc.err && doc.msg) {
      return {
        err: doc.err,
        msg: service.t(doc.msg, lng) || Err.t(doc.msg, lng) || doc.msg
      };
    }
    return doc;
  };

  var listOpts = opts.list || {
    conditions: {},
    options: {
      sort: [{ 'crtime': -1 }]
    },
    fields: {},
    populations: [{
      path: 'user',
      select: 'nick'
    }]
  };

  var getOpts = opts.get || {
    fields: {},
    populations: [{
      path: 'user',
      select: 'nick'
    }]
  };

  var router = ms.router();
  service.onReady().then(function () {
    router.add('/', 'get', function (opts, cb, next) {
      if (opts.headers && opts.headers.acl_user) {
        opts.data.userId = opts.headers.acl_user;
      }
      next();
    }).add('/', 'post', function (opts, cb, next) {
      if (opts.headers && opts.headers.acl_user) {
        opts.data.user = opts.headers.acl_user;
      }
      next();
    }).add('/', 'get', function (opts, cb, next) {
      opts.conditions || (opts.conditions = {});
      if (opts.data.userId) {
        opts.conditions.user = opts.data.userId;
      }
      if (opts.data.status) {
        opts.conditions.status = opts.data.status;
      }
      if (opts.data.type) {
        opts.conditions.type = opts.data.type;
      }
      next();
    }).use((0, _jmMsDaorouter2.default)(service.workOrder, {
      list: listOpts,
      get: getOpts
    }));
  });
  return router;
};

var _jmErr = require('jm-err');

var _jmErr2 = _interopRequireDefault(_jmErr);

var _jmMsDaorouter = require('jm-ms-daorouter');

var _jmMsDaorouter2 = _interopRequireDefault(_jmMsDaorouter);

var _jmMsCore = require('jm-ms-core');

var _jmMsCore2 = _interopRequireDefault(_jmMsCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ms = new _jmMsCore2.default();
var Err = _jmErr2.default.Err;
;
module.exports = exports['default'];