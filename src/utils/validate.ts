import { Regexp } from '../const';
import EntryField from '../components/entryField';

type ValueOf<T> = T[keyof T];
export type TRegexp = ValueOf<typeof Regexp>;

export const regexpTest = (type: TRegexp, str: string) => type.test(str);

const validate = (components: [EntryField]) => {
  let result = true;
  components.forEach((child) => {
    if (!regexpTest(child.regexp, child.value)) {
      (child as EntryField).addClass('error');
      result = false;
    }
  });
  return result;
};

export default validate;
