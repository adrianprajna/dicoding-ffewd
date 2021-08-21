/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import './pokemon-item.js';

class PokemonList extends HTMLElement {
  set pokemons(pokemons) {
    this._pokemons = pokemons;
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class='popular-pokemon-list'>

        </div>
    `;

    const container = this.querySelector('.popular-pokemon-list');

    this._pokemons.forEach((data) => {
      const pokemonElement = document.createElement('pokemon-item');
      pokemonElement.pokemon = data;
      container.appendChild(pokemonElement);
    });
  }

  renderError() {
    this.innerHTML = `
      <div class="pokemon-render-section">
        <h2 class="text-center">Pokemon not found!</h2>
      </div>
    `;
  }

  renderLoading() {
    this.innerHTML = `
    <div class="pokemon-render-section">
      <h2 class="text-center">Please wait...</h2>
    </div>
    `;
  }
}

customElements.define('pokemon-list', PokemonList);
