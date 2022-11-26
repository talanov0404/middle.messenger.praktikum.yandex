export const Regexp = {
  email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
  login: /^\d*[a-zA-Z][a-zA-Z\d]{2,20}$/,
  firstName: /^([A-Z][a-z]+$|[А-ЯЁ][а-яё]+$)/,
  secondName: /^([A-Z][a-z]+$|[А-ЯЁ][а-яё]+$)/,
  password: /(?=^.{8,40}$)(?![.\n])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).*$/,
  message: /^\s*$/,
  phone: /^(\+)?[\d\- ]{10,15}$/,
};

export enum RegexpName {
  Email = 'email',
  Login = 'login',
  FirstName = 'firstName',
  SecondName = 'secondName',
  Password = 'password',
  Message = 'message',
  Phone = 'phone',
}
