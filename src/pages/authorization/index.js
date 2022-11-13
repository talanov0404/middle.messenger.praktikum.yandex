import template from './authorization.hbs';
import './authorization.scss';
import { createPage } from '../../index';
import { createRegistrationPage } from '../registration';
import { createChatPage } from '../chats';

export const createAuthorizationPage = () => {
  createPage(template());

  const registrationButton = document.getElementById('registration');
  registrationButton.addEventListener('click', () => {
    createRegistrationPage();
  });

  const authorizationButton = document.getElementById('authorization');
  authorizationButton.addEventListener('click', () => {
    createChatPage();
    return false;
  });
};
