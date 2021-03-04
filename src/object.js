const isObject = require('lodash/isObject.js');


const createObject = (object) => new Proxy(object, {
  get: (target, name) => {
    if (!(name in target)) {
      return createObject({});
    }
    const value = target[name];
    return isObject(value) ? createObject(value) : value;
  },
});

module.exports = createObject;
