export function toggleArray(array: any[], value: any) {
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

export function arrayMove(arr:any[], oldIndex:number, newIndex:number) {
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

export function functionName(fun: any) {
  let ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}

export function removeFromArray(arr: any[], needle: any) {
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
}

export function arrayIncludes(arr: any[], func: any) {
  for (const item of arr) {
    if (func(arr)) return true;
  }
  return false;
}

export function arrayIncludesKV(arr: any[], key: any, value: any) {
  for (const item of arr) {
    if (arr[key] === value) return true;
  }
  return false;
}

export function arrayIndexOf(arr: any[], func: any) {
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i])) return i;
  }
  return -1;
}
