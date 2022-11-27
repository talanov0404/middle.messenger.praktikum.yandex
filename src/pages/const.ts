import AuthorizationPage from './authorization';
import RegistrationPage from './registration';
import ErrorPage from './errorPage';
import NotFoundPage from './notFound';
import ChatsPage from './chats';
import ProfilePage from './profile';

export const Pages = {
  authorization: AuthorizationPage,
  registrations: RegistrationPage,
  error: ErrorPage,
  notfound: NotFoundPage,
  chats: ChatsPage,
  profile: ProfilePage,
};

export enum PagesName {
  Authorization = 'authorization',
  Registrations = 'registrations',
  Error = 'error',
  Notfound = 'notfound',
  Chats = 'chats',
  Profile = 'profile',
}
