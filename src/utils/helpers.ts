/* eslint-disable no-param-reassign */
export type Indexed<T = any> = {
  [key in string]: T;
};

export const trim = (value: string, chars?: string): string => {
  if (value && !chars) {
    return value.trim();
  }
  const regexp = new RegExp(`[${chars}]`, 'gi');
  return value.trim().replace(regexp, '');
};

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  Object.keys(rhs).forEach((key) => {
    try {
      if (typeof rhs[key] === 'object') {
        lhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
      } else {
        lhs[key] = rhs[key];
      }
    } catch (e) {
      lhs[key] = rhs[key];
    }
  });

  return lhs;
};

export const set = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const keys: Array<string> = path.split('.');

  const result = keys.reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any);
  return merge(object as Indexed, result);
};

export const queryStringify = (data: Record<string, any>) => {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  return Object.entries(data).reduce((prev, [key, value]) => (
    !prev ? `?${key}=${value}` : `${prev}&${key}=${value}`), '');
};

function isPlainObject(value: unknown): value is Indexed {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

export function isEqual(lhs: Indexed, rhs: Indexed) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isPlainObject(value) && isPlainObject(rightValue)) {
      if (!isEqual(value, rightValue)) {
        return false;
      }
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}
