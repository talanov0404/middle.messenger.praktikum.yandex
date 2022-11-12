import template from './chat.hbs'
import './chat.scss'
import { createPage } from "../../index";
import { createProfilePage } from "../profile";

export const createChatPage = () => {
  createPage(template());

  const profileButton = document.getElementById('profile');
  profileButton.addEventListener('click', () => {
    createProfilePage()
  });
}