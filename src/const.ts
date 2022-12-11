export const Regexp = {
  email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
  login: /^\d*[a-zA-Z][a-zA-Z\d]{2,20}$/,
  first_name: /^([A-Z][a-z]+$|[А-ЯЁ][а-яё]+$)/,
  second_name: /^([A-Z][a-z]+$|[А-ЯЁ][а-яё]+$)/,
  display_name: /^([A-Z][a-z]+$|[А-ЯЁ][а-яё]+$)/,
  password: /(?=^.{8,40}$)(?![.\n])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).*$/,
  message: /^\s*$/,
  phone: /^(\+)?[\d\- ]{10,15}$/,
};

export enum RegexpName {
  Email = 'email',
  Login = 'login',
  FirstName = 'first_name',
  SecondName = 'second_name',
  Password = 'password',
  Message = 'message',
  Phone = 'phone',
}

export enum Methods {
  Get = 'Get',
  Put = 'Put',
  Post = 'Post',
  Patch = 'Patch',
  Delete = 'Delete',
}
