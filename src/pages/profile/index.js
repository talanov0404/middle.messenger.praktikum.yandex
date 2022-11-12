import template from './profile.hbs'
import './profile.scss'
import './components'
import { createPage } from "../../index";
import { createChatPage } from "../chats";
import { createAuthorizationPage } from "../authorization";

export const createProfilePage = () => {
  createPage(template());

  const toBackButton = document.getElementById('toback');
  toBackButton.addEventListener('click', () => {
    createChatPage();
  });

  const logoutButton = document.getElementById('logout');
  logoutButton.addEventListener('click', () => {
    createAuthorizationPage();
  });
}