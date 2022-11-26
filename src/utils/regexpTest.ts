import { Regexp } from '../const';

type TRegexp = keyof typeof Regexp;

const regexpTest = (type: TRegexp, str: string) => Regexp[type].test(str);

export default regexpTest;
