const PasswordValidator = require('./solution.js')

const validator = new PasswordValidator();
const errors1 = validator.validate('qwertya3sdf');
const errors2 = validator.validate('qwerty');
console.log(errors1);
console.log(errors2);
