/* eslint-disable import/extensions */
import PokemonData from '../data/pokemon-data.js';
import '../component/item/pokemon-list.js';

const main = () => {
  let page = 0;
  const allPokemonsContainer = document.querySelector('.all-pokemon-section');
  const allPokemonsList = document.createElement('pokemon-list');
  const renderPopularPokemons = async () => {
    const popularPokemonsContainer = document.querySelector('.popular-pokemon-section');
    const popularPokemonList = document.createElement('pokemon-list');
    popularPokemonList.pokemons = await PokemonData.getPopularPokemon();
    popularPokemonsContainer.appendChild(popularPokemonList);
  };

  const renderAllPokemons = async () => {
    allPokemonsList.pokemons = await PokemonData.getAllPokemon(page);
    allPokemonsContainer.appendChild(allPokemonsList);
  };

  const addSearchEvent = () => {
    const btnSearch = document.querySelector('.btn-search');
    btnSearch.addEventListener('click', async () => {
      const searchText = document.querySelector('#search-text');
      if (searchText.value === '') {
        return;
      }
      allPokemonsList.renderLoading();
      const data = await PokemonData.getSearchedPokemon(searchText.value);
      if (data == null) {
        allPokemonsList.renderError();
      } else {
        allPokemonsList.pokemons = data;
      }

      searchText.value = '';
    });
  };

  const addPaginationEvent = () => {
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    prevBtn.addEventListener('click', () => {
      page -= 1;

      if (page < 0) {
        page = 0;
      }

      renderAllPokemons(page);
    });

    nextBtn.addEventListener('click', () => {
      page += 1;

      renderAllPokemons(page);
    });
  };

  renderPopularPokemons();
  renderAllPokemons();
  addSearchEvent();
  addPaginationEvent();
};

export default main;
