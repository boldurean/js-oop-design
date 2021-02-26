class Truncater {
  static defaultOptions = {
    separator: '...',
    length: 200,
  };

  constructor(options = {}) {
    this.options = { ...this.constructor.defaultOptions, ...options };
  }

  truncate(text, options = {}) {
    const { length, separator } = { ...this.options, ...options };
    return (text.length <= length) ? text : text.substring(0, length).concat(separator);
  }
}

module.exports = Truncater;
