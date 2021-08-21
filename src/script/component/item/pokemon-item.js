/* eslint-disable no-underscore-dangle */
import PokemonData from '../../data/pokemon-data';
import '../modal/modal';

class PokemonItem extends HTMLElement {
  set pokemon(pokemon) {
    this._pokemon = pokemon;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="pokemon">
          <div class="pokemon-img">
              <img src=${this._pokemon.image} alt="" loading="eager">
          </div>
          <div class="pokemon-detail">
              <p class="text-center">${this._pokemon.name}</p>
          </div>
          <button class="button bg-navy text-white mt-2 view">View Detail</button>
      </div>
    `;

    this.querySelector('.view').addEventListener('click', () => {
      this.showPokemonDetail();
    });
  }

  async showPokemonDetail() {
    const oldModal = document.querySelector('app-modal');
    if (oldModal !== null) {
      oldModal.remove();
    }

    const newModal = document.createElement('app-modal');
    const pokemon = await PokemonData.getPokemon(this._pokemon.name);
    newModal.pokemon = pokemon;
  }
}

customElements.define('pokemon-item', PokemonItem);
