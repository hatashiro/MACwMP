const { flatten } = require('lodash');

class CArray {
  constructor(fn) {
    this.xs = [];
    fn((xs) => {
      // set internal array
      this.xs = xs;
    }, () => {
      // empty reject, because no need to handle error.
    });
  }

  static fromArray(arr) {
    return new CArray((resolve) => resolve(arr));
  }

  static resolve(x) {
    return CArray.fromArray([x]);
  }

  static reject(x) {
    return CArray.fromArray([]);
  }

  then(fn) {
    let isMonadic = false;

    let result = this.xs.map(x => {
      const mapped = fn(x);
      if (mapped instanceof CArray) {
        isMonadic = true;
      }
      return isMonadic ? mapped.xs : mapped;
    })

    if (isMonadic) {
      result = flatten(result);
    }

    return CArray.fromArray(result);
  }
}
