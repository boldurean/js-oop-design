const Course = require('./Course.js');

const validateProperty = (target, name) => {
  if (!(name in target)) {
    throw new Error(`Property "${name}" doesn't exist`);
  }
  if (name.startsWith('_')) {
    throw new Error(`Property "${name}" is protected`);
  }
};

const protect = (obj) => new Proxy(obj, {
  get: (target, name) => {
    const property = target[name];
    validateProperty(target, name);

    return (typeof property === 'function') // если свойство - это метод, то необходимо привязать его
      ? property.bind(obj) // к контексту оригинального объекта, иначе метод вызовется на прокси
      : property;
  },
  set: (target, name, value) => {
    validateProperty(target, name);
    target[name] = value;

    return true;
  },
});

module.exports = protect;
