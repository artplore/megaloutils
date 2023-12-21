export function toggleArray(array: any[], value: any) {
  if (value === undefined) return array;
  if (!Array.isArray(array)) return [value];
  const index = array.indexOf(value);
  if (index === -1) {
    array.push(value);
  } else {
    array.splice(index, 1);
  }
  return array;
}

export function appendQueryString(uri: string, key: string, value: any) {
  uri = uri.replace(/\?$/, '');
  const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  const separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  } else {
    return uri + separator + key + "=" + value;
  }
}

export function removeDuplicate(a: any[]) {
  const seen: any = {};
  return a.filter((item) => seen.hasOwnProperty(item) ? false : (seen[item] = true));
}

export function capitalize(str: string) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

export function randomIntFixedLength(length = 6) {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}

export function randomPick(items: any[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function getClassName(arr: any[]) {
  return arr.join(' ').trim();
}

export function generateArray(length: number) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(i);
  }
  return arr;
}

export function generateArrayLegacy(length: number, getItem: any) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(getItem(i));
  }
  return arr;
}

export function getScreenPosition(elem: HTMLElement) {
  const rect = elem.getBoundingClientRect();
  const win: any = elem.ownerDocument.defaultView;

  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset,
  };
}

export function removeUndefined(obj: any) {
  Object.keys(obj).forEach(key => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}

export function findInArray(array: any[], key: any, value: any) {
  for (const item of array) {
    if (item[key] === value) return item;
  }
  return null;
}

export function removeOneInArray(array: any[], key: any, value: any) {
  if (!array?.length) return;
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      array.splice(i, 1);
      return;
    }
  }
}

export function arrayMove(arr: any[], oldIndex: number, newIndex: number) {
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr; // for testing
}

export function removeInArray(array: any[], key: any, value: any) {
  if (!array?.length) return;
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      array.splice(i, 1);
    }
  }
}

export function findIndexInArray(array: any[], key: any, value: any) {
  if (!array?.length) return -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) return i;
  }
  return -1;
}

export function arrayMatchAtLeastOne(arr1: any[], arr2: any[]) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;

  for (const item1 of arr1) {
    for (const item2 of arr2) {
      if (item1 === item2) {
        return true;
      }
    }
  }
  return false;
}

export function randomString(length: number, chars: string) {
  let mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  let result = '';
  for (let i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}

export function removeKey(obj: any, key: any) {
  delete obj[key];
  return obj;
}

export function isEmptyObject(obj: any) {
  if (!obj) return true;
  return obj // 👈 null and undefined check
    && Object.keys(obj).length === 0
    && Object.getPrototypeOf(obj) === Object.prototype;
}

// --------------------------------------------------------------------------------
// React utils
// see: https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element
// --------------------------------------------------------------------------------

export function isClassComponent(component: any) {
  return (
    typeof component === 'function' &&
    !!component.prototype.isReactComponent
  );
}

export function isFunctionComponent(component: any) {
  return (
    typeof component === 'function' &&
    String(component).includes('return React.createElement')
  );
}

export function isReactComponent(component: any) {
  return (
    isClassComponent(component) ||
    isFunctionComponent(component)
  );
}

export function createHash(array: any[], key: any) {
  const hash: any = {};
  for (const item of array) {
    hash[item[key]] = item;
  }
  return hash;
}

export function createHashFromObj(obj: any) {
  const hash: any = {};
  for (const key of Object.keys(obj)) {
    for (const item of obj[key]) {
      hash[item] = key;
    }
  }
  return hash;
}

export function pushNoDuplicate(arr: any[], item: any) {
  if (!arr.includes(item)) {
    arr.push(item);
  }
}

// Allow setting the level 2 fields without overriding by '.'
// ----------------------------------------
export function objMergeDeepNoOverride(state: any, payload: any) {
  const toMerge: any = {};
  for (const key of Object.keys(payload)) {
    const keys = key.split('.');
    if (keys.length >= 2) {
      if (state[keys[0]]) {
        toMerge[keys[0]] = { ...state[keys[0]], [keys[1]]: payload[key] };
      } else {
        toMerge[keys[0]] = {
          [keys[1]]: payload[key],
        };
      }
    } else {
      toMerge[key] = payload[key];
    }
  }
  return { ...state, ...toMerge };
}

export function padLeadingZero(num: any, size: number) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

export function displayValue(value: any, defaultValue = "-") {
  return value || defaultValue;
}

export function formatPrice(value: number, precision = 2) {
  return value.toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getTrailingNumber = (idString: string) => {
  const re = new RegExp(/[\d]+$/, "i");
  const matches = idString.match(re);
  if (matches && matches.length) return matches[0];
  return idString;
};


export const onlyFields = (obj: any, fields: any) => {
  const newObj: any = {};
  for (const key of fields) {
    newObj[key] = obj[key];
  }
  return newObj;
};

export const onlyArrayFields = (arrObj: any, fields: any) => {
  const newArray: any[] = [];
  for (const obj of arrObj) {
    const newObj: any = {};
    for (const key of fields) {
      newObj[key] = obj[key];
    }
    newArray.push(newObj);
  }
  return newArray;
};

export const objectToArray = (obj: any, fieldName: any) => {
  const arr = [];
  for (const key of Object.keys(obj)) {
    arr.push({ [fieldName]: key, ...obj[key] });
  }
  return arr;
};

export const functionName = (fun: any) => {
  let ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
};

export const removeFromArray = (arr: any[], needle: any) => {
  if (needle instanceof Function) {
    for (let i = 0; i < arr.length; i++) {
      if (needle(arr[i])) {
        arr.splice(i, 1);
      }
    }
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === needle) {
        arr.splice(i, 1);
      }
    }
  }
  return arr;
};

export const arrayIncludes = (arr: any[], func: any) => {
  for (const item of arr) {
    if (func(arr)) return true;
  }
  return false;
};

export const arrayIncludesKV = (arr: any[], key: any, value: any) => {
  for (const item of arr) {
    if (item[key] === value) return true;
  }
  return false;
};

export const arrayIndexOf = (arr: any[], func: any) => {
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i])) return i;
  }
  return -1;
};

/**
 * Initially for base_x to base_x conversion
 */
export const generatePowSequence = (base: number, maxCount = 15) => {
  const dividends = [];
  for (let i = 0; i < maxCount; i++) {
    const val = Math.pow(base, i);
    if (val > Number.MAX_VALUE) {
      break;
    }
    dividends.push(val);
  }
  dividends.sort((a, b) => b - a);
  return dividends;
};

const ENCODE_SEQ = '0123456789abcdefghijklmnopqrstuvwxyz-';
const DIVIDENDS = [3.005038205702535e+45, 8.121724880277123e+43, 2.1950607784532765e+42, 5.932596698522369e+40, 1.6034045131141537e+39, 4.333525711119334e+37, 1.1712231651673877e+36, 3.1654680139659126e+34, 8.555318956664628e+32, 2.3122483666661157e+31, 6.249319909908421e+29, 1.6890053810563301e+28, 4.5648794082603513e+26, 1.2337511914217166e+25, 3.334462679518153e+23, 9.012061295995008e+21, 243569224216081300000, 6582952005840036000, 177917621779460400, 4808584372417849, 129961739795077, 3512479453921, 94931877133, 2565726409, 69343957, 1874161, 50653, 1369, 37, 1];

export const numberToAlphaNumeric = (value: number) => {
  let resArr = DIVIDENDS.map(() => 0);
  let result = '';
  let _value = value;
  for (let i = 0; i < DIVIDENDS.length; i++) {
    const dividend = DIVIDENDS[i];
    if (dividend > _value) {
      continue;
    }
    const idx = Math.floor(_value / dividend);
    _value -= dividend * idx;
    resArr[i] = idx;
  }

  let startDigit = -1;
  for (let i = 0; i < resArr.length; i++) {
    if (resArr[i] > 0) {
      startDigit = i;
      break;
    }
  }
  resArr = resArr.slice(startDigit);
  for (const idx of resArr) {
    result += ENCODE_SEQ[idx];
  }
  return result;
};

export const alphaNumericToNumber = (str: string) => {
  const dividends = DIVIDENDS.slice(DIVIDENDS.length - str.length);
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    result += ENCODE_SEQ.indexOf(str[i]) * dividends[i];
  }
  return result;
};

export const kebabToTitle = (inputStr: string) => {
  const split = inputStr.split('-');
  for (let i = 0; i < split.length; i++) {
    split[i] = capitalize(split[i]);
  }
  return split.join(' ');
};

export const kebabToCamel = (str: string) => {
  const arr = str.split('-');
  const capital = arr.map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase());
  return capital.join("");
};

export const isArrayEqual = (arr1: any[], arr2: any[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

export const isObjIdentical = (obj1: any, obj2: any) => {
  if (obj1 === obj2) {
    return true;
  }
  if (obj1 === null || obj2 === null) {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (!isArrayEqual(keys1, keys2)) {
    return false;
  }
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
};

export const forceArray = (arr1: any, arr2: any) => {
  const a1 = Array.isArray(arr1) ? arr1 : arr1 === undefined ? [] : [arr1];
  const a2 = Array.isArray(arr2) ? arr2 : arr2 === undefined ? [] : [arr2];
  return a1.concat(a2);
};

// e.g. Invoice Number
// ----------------------------------------
export const toAlphaNumeric = (num: number) => {
  return parseInt(num.toString(), 10).toString(36).toUpperCase();
};

export const toTimeUniqueAlphaNumeric = (num: number, moreDigits = 2) => {
  const r = toAlphaNumeric(num);
  if (!moreDigits) {
    return r;
  }
  return r + toAlphaNumeric(getRandomInt((Math.pow(36, moreDigits)) - 1));
};

export const getRandomInt = (max: number, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export class Deferred {
  promise: Promise<any>;
  reject!: (value?: any) => void;
  resolve!: (value?: any) => void;

  constructor() {
    const self = this;
    this.promise = new Promise((resolve, reject) => {
      self.reject = reject;
      self.resolve = resolve;
    });
  }
}

export const debounce = <F extends ((...args: any) => any)>(func: F, waitFor: number) => {
  const timeout: number = 0;
  const debounced = (...args: any) => {
    clearTimeout(timeout);
    setTimeout(() => func(...args), waitFor);
  };
  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export const getKeyFromPath = (path: string) => {
  const split = path.split('/');
  const toJoin: string[] = [];
  for (const str of split) {
    if (str) {
      toJoin.push(str);
    }
  }
  return toJoin.join('-');
};

export const sanitizeUrl = (url: string) => {
  return url.replace(/\/{2,}/i, '/');
};


// e.g. ('string', { disabled: false }, ['str', 'str2']);
export const toClassName = (...args: any[]) => {
  const result: string[] = [];
  for (const arg of args) {
    if (typeof arg === 'string') {
      result.push(arg);
    } else if (Array.isArray(arg)) {
      for (const argElement of arg) {
        result.push = argElement;
      }
    } else if (arg && Object.keys(arg).length) {
      for (const key of Object.keys(arg)) {
        if (arg[key]) {
          result.push(key);
        }
      }
    }
  }
  return result.join(' ');
};

export const optionsFromEnum = (en: any) => {
  const options: any[] = [];
  for (const key of Object.keys(en)) {
    options.push({ value: en[key], label: key });
  }
  return options;
};

export const lastArrayItem = (arr: any) => {
  if (Array.isArray(arr) && arr.length) {
    return arr[arr.length - 1];
  }
};

export const removeEmptyObject = (o: any) => {
  for (const k in o) {
    if (!o[k] || typeof o[k] !== "object") {
      continue;
    }
    if (Object.keys(o[k]).length === 0 || o[k] === undefined) {
      delete o[k];
    }
    return o;
  }
};

export const hasUndefined = (q: any) => {
  if (q === undefined) {
    return true;
  }
  if (typeof q === 'object') {
    for (const key of Object.keys(q)) {
      if (q[key] === undefined) {
        return true;
      }
    }
  }
  return false;
};
