import './style.scss';
import { Pages, PagesName } from './pages/const';

type TPages = keyof typeof Pages;

const createPage = (name: TPages) => {
  const root: HTMLElement | null = document.getElementById('root');
  const page: HTMLElement | null = new Pages[name]().getContent();
  if (root && page) {
    root.innerHTML = '';
    root.append(page);
  }
};

export default createPage;

document.addEventListener('DOMContentLoaded', () => {
  createPage(PagesName.Authorization);
});
