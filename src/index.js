import Handlebars from 'handlebars/dist/handlebars.runtime';
import './style.scss';
import './components';
import { createAuthorizationPage } from './pages/authorization';

export const createPage = (template) => {
  const root = document.getElementById('root');
  root.innerHTML = template;
};

document.addEventListener('DOMContentLoaded', () => {
  createAuthorizationPage();
});
