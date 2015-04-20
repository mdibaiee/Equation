export default function(string) {
  let i = 0, buffer = [];
  return {
    next() {
      buffer.push(string[i]);

      if (i >= string.length) {
        return null;
      }
      return string[i++];
    },
    current() {
      return string[i - 1];
    },
    index() {
      return i - 1;
    },
    to(n) {
      let temp = '';
      const dest = i + n;
      for (i = i; i < dest; ++i) {
        temp += [string[i]];
      }
      return temp;
    },
    drain() {
      return buffer.splice(0, buffer.length);
    },
    replace(start, end, replace) {
      let temp = string.split('');
      temp.splice(start, end, replace);
      string = temp.join('');

      i = i - (end - start);
    },
    go(n) {
      i += n;
    },
    all() {
      return string;
    }
  };
}
