'use strict';

/**
 * Error Messages
 * 错误提示
 */
var errorMessages = {
  empty: 'Value cannot be empty.',
  minLength: 'Value must be less than #{min} chars.'
}

/**
 * Validations
 * 所有校验规则
 */
var validations = {
  empty: function(value) {
    var val = typeof value === 'string' ? value.trim() : value.toString().trim();
    if (val === '') {
      return errorMessages['empty'];
    }
  },

  minLength: function(value, min) {
    var val = typeof value === 'string' ? value.trim() : value.toString().trim();
    if (val.length < min) {
      return errorMessages['minLength'];
    }
  }
}

/** 
 * Validator
 * 执行校验器
 */
var Validator = function() {
  var forms = [].filter.call(document.getElementsByTagName('form'), function(form) {
    return form.hasAttribute('validator');
  });

  return {
    start: start
  }

  function start() {
    for (var i = 0, n = forms.length; i < n; i++) {
      _formValidate(forms[i]);
    }
  }

  function _formValidate(form) {
    var inputs = [].filter.call(form.children, function(ele) {
      return ele.hasAttribute('validations');
    });

    for (var i = 0, n = inputs.length; i < n; i++) {
      _inputValidate(inputs[i]);
    }
  }

  function _inputValidate(input) {
    var vals = input.getAttribute('validations').split(',');
    for (var i = 0, n = vals.length; i < n; i++) {
      var msg = validations[vals[i]](input.value);
      if (msg) {
        _showErrorMessage(input, msg);
      }
    }
  }

  function _showErrorMessage(input, msg) {
    console.log(input, msg);
  }
}
