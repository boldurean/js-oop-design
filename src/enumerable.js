const has = require('lodash/has');
const cloneDeep = require('lodash/cloneDeep');

class Enumerable {
  static wrap(elements) {
    return new Enumerable(elements);
  }

  constructor(elements, whereParts = []) {
    this.elements = elements;
    this.whereParts = whereParts;
    this.memo = {
      saved: false,
      data: [],
    };
  }

  where(key, value) {
    this.memo.saved = false;
    const whereParts = [...this.whereParts, [key, value]];
    return new Enumerable(this.elements, whereParts);
  }

  all() {
    const filtered = (this.whereParts.length === 0)
      ? this.elements
      : this.elements.filter((element) => this.whereParts
        .some(([key, value]) => has(element, key) && (element[key] === value)));

    return cloneDeep(filtered);
  }

  allWithMemoization() {
    if (!this.memo.saved) {
      const filtered = (this.whereParts.length === 0)
        ? this.elements
        : this.elements.filter((element) => this.whereParts
          .some(([key, value]) => has(element, key) && (element[key] === value)));

      this.memo.data = cloneDeep(filtered);
      this.memo.saved = true;
    }

    return this.memo.data;
  }
}

module.exports = Enumerable;
