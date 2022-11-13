import template from './notFound.hbs';
import './notFound.scss';
import { createPage } from '../../index';
import { createAuthorizationPage } from '../authorization';

export const createNotFoundPage = () => {
  createPage(template());

  const toBackButton = document.getElementById('toback');
  toBackButton.addEventListener('click', () => {
    createAuthorizationPage();
  });
};
