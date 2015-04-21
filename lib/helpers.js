export const parseFormat = function(a) {
  const split = a.split('1');
  return {
    left: split[0].length,
    right: split[1].length
  };
};

export const isNumber = a => {
  return !isNaN(+a);
};

export const parseNumbers = (a) => {
  return a.map(b => {
    if (isNumber(b)) {
      return parseFloat(b);
    }
    if (Array.isArray(b)) {
      return parseNumbers(b);
    }
    return b;
  });
};

export const dive = (arr, n) => {
  let result = arr;
  for (let i = 0; i < n; ++i) {
    result = result[result.length - 1];
  }
  return result;
};

export const deep = (arr, n, index = 0) => {
  if (n < 2) {
    return {arr, index};
  }

  let d = arr.reduce((a, b, i) => {
    if (Array.isArray(b)) {
      let {arr, index: x} = deep(b, n - 1, i),
          merged = a.concat(arr);

      index = x;
      return merged;
    }
    return a;
  }, []);

  return {arr: d, index};
};

export const diveTo = (arr, indexes, replace) => {
  let answer = [];
  if (indexes.some(Array.isArray)) {
    for (let index of indexes) {
      answer.push(diveTo(arr, index, replace));
    }
  } else {
    arr[indexes[0]] = replace;
    return replace;
  }

  return answer;
};

export const flatten = (arr) => {
  if (!Array.isArray(arr) || !arr.some(Array.isArray)) {
    return arr;
  }

  return arr.reduce((a, b) => {
    return a.concat(flatten(b));
  }, []);
};

export const removeSymbols = string => {
  return string.toString().replace(/\W/g, '');
};
