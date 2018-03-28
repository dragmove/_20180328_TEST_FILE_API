import {namespace} from './utils/util';

(function ($) {
  'use strict';

  namespace('nc');

  window.nc.hello = function() {
    window.alert('hello');
  };

  /*
   * implement
   */
  $(document).ready(init);

  function init() {
    window.nc.hello();
  }
}(jQuery));