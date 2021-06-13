"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use({
  install: function install(Vue) {
    Vue.prototype.$swal = _sweetalert["default"];
  }
});