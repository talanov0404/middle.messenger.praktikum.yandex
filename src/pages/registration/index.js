import template from './registration.hbs';
import './registration.scss';
import { createPage } from '../../index';
import { createAuthorizationPage } from '../authorization';

export const createRegistrationPage = () => {
  createPage(template());

  const registrationButton = document.getElementById('registration');
  registrationButton.addEventListener('click', function (e) {
    createAuthorizationPage();
  });

  const authorizationButton = document.getElementById('authorization');
  authorizationButton.addEventListener('click', function (e) {
    createAuthorizationPage();
  });
};
