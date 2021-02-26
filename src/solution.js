const hasNumber = (string) => (string.search(/\d/) !== -1);


class PasswordValidator {
  constructor(options = {}) {
    const defaultOptions = {
      minLength: 8,
      containNumbers: true,
    }
    this.options = { ...defaultOptions, ...options };
  }
  validate(password) {
    const result = {};
    if (password.length < this.options.minLength) {
      result.minLength = 'too small';
    }
    if (this.options.containNumbers) {
      if (!hasNumber(password)) {
        result.containNumbers = 'should contain at least one number';
      }
    }
    return result;
  }
}

module.exports = PasswordValidator;
