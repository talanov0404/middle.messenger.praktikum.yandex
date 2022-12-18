import Router from './utils/Router';
import Routes from './pages/const';
import AuthorizationPage from './pages/authorization';
import RegistrationPage from './pages/registration';
import MessengerPage from './pages/messenger';
import NotFoundPage from './pages/notFound';
import SettingsPage from './pages/settings';
import './style.scss';
import AuthController from './controllers/AuthController';
import ErrorPage from './pages/errorPage';

document.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Authorization, AuthorizationPage)
    .use(Routes.Registrations, RegistrationPage)
    .use(Routes.Settings, SettingsPage)
    .use(Routes.Messenger, MessengerPage)
    .use(Routes.Notfound, NotFoundPage)
    .use(Routes.Error, ErrorPage);

  let isProtectedRoute = true;
  const { pathname } = window.location;

  if (pathname === Routes.Authorization || pathname === Routes.Registrations) {
    isProtectedRoute = false;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Messenger);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Authorization);
    }
  }
});
