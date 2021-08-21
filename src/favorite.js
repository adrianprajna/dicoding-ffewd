/* eslint-disable import/extensions */
import 'regenerator-runtime';
import './styles/style.scss';
import './script/component/header/header.js';
import './script/component/item/pokemon-list.js';

const renderFavoritePokemons = () => {
  const STORAGE_KEY = 'FAVORITE';
  const favoritePokemonContainer = document.querySelector('.favorite-pokemon-section');
  let favoritePokemons = [];
  if (localStorage.getItem(STORAGE_KEY)) {
    favoritePokemons = JSON.parse(localStorage.getItem(STORAGE_KEY));
  }
  const favoritePokemonList = document.createElement('pokemon-list');
  favoritePokemonList.pokemons = favoritePokemons;
  favoritePokemonContainer.appendChild(favoritePokemonList);
};

document.addEventListener('DOMContentLoaded', () => {
  renderFavoritePokemons();
});

export default renderFavoritePokemons;
