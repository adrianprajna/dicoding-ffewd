/* eslint-disable import/extensions */
import './styles/style.scss';
import 'regenerator-runtime';
import './script/component/header/header.js';
import './script/component/jumbotron/jumbotron.js';
import './script/component/footer/footer.js';
import main from './script/view/main';

document.addEventListener('DOMContentLoaded', main);
