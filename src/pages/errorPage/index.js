import template from './errorPage.hbs'
import './errorPage.scss'
import { createPage } from "../../index";
import { createAuthorizationPage } from "../authorization";

export const createErrorPage = () => {
  createPage(template());

  const toBackButton = document.getElementById('toback');
  toBackButton.addEventListener('click', () => {
    createAuthorizationPage();
  });
}