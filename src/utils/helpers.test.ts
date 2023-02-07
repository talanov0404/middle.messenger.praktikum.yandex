import { expect } from 'chai';
import { set } from './helpers';

describe('Helpers function', () => {
  describe('set', () => {
    let obj: Object;
    let path: string;
    let value: unknown;

    beforeEach(() => {
      obj = {};
      path = 'a.b.c';
      value = 'new value';
    });

    it('should return original object if it\'s is not an object', () => {
      const notAnObject = 'not an object';

      const result = set(notAnObject, path, value);

      expect(result).to.eq(notAnObject);
    });

    it('should return null if null is passed as first argument', () => {
      const nullObject = null;

      const result = set(nullObject, path, value);

      expect(result).to.eq(nullObject);
    });

    it('should set a value by path to the object', () => {
      set(obj, path, value);

      expect((obj as any).a.b.c).to.eq(value);
    });

    it('should not return new object', () => {
      const result = set(obj, path, value);

      expect(result).to.eq(obj);
    });
  });
});
