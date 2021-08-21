/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

const imageBaseURL = 'https://cdn.traction.one/pokedex/pokemon';
const STORAGE_KEY = 'FAVORITE';

class Modal extends HTMLElement {
  set pokemon(pokemon) {
    this._pokemon = pokemon;
    this.render();
    this.setEvent();
  }

  render() {
    this.innerHTML = `
    <div class="modal-bg">
        <div class="modal-content">
            <div class="modal-header">
                <img src=${imageBaseURL}/${this._pokemon.id}.png alt="">
                <h1 class="text-green">${this._pokemon.name}</h1>
                <hr class="text-green">
            </div>
            <div class="modal-detail">
                <div class="modal-detail-row">
                    <div class="pokemon-weight">
                        <h3 class="text-red">Weight</h3>
                        <p>${this._pokemon.weight} hectograms</p>
                    </div>
                    <div class="pokemon-height">
                        <h3 class="text-red">Height</h3>
                        <p>${this._pokemon.height} decimeters</p>
                    </div>
                    <div class="pokemon-base-experience">
                        <h3 class="text-red">Base Experience</h3>
                        <p>${this._pokemon.base_experience} exp</p>
                    </div>
                    <div class="pokemon-types">
                        <h3 class="text-red">Type</h3>
                        ${this.getTypes()}
                    </div>
                </div>
                <div class="modal-detail-row">
                    <div class="pokemon-abilities">
                        <h3 class="text-red">Abilities</h3>
                        ${this.getAbilites()}
                    </div>
                    <div class="pokemon-moves">
                        <h3 class="text-red">Moves</h3>
                        ${this.getMoves()}
                    </div>
                    <div class="pokemon-stats">
                        <h3 class="text-red">Stats</h3>
                        ${this.getStats()}
                    </div>
                    <div class="pokemon-game-indices">
                        <h3 class="text-red">Game Indices</h3>
                        ${this.getGameIndices()}
                    </div>
                </div>
                <div class="modal-btn">
                    ${this.renderButton()}
                    <button class="button bg-red text-white btn-close">Go Back</button>
                </div>
            </div>
        </div>
    </div>
    `;
  }

  setEvent() {
    document.body.appendChild(this);
    setTimeout(() => {
      this.querySelector('.modal-bg').classList.add('active');
    }, 10);

    this.querySelector('.btn-close').addEventListener('click', () => {
      this.querySelector('.modal-bg').classList.remove('active');
    });

    this.querySelector('.btn-toggle').addEventListener('click', () => {
      this.toggleFavoritePokemon();
    });
  }

  toggleFavoritePokemon() {
    const toggleButton = document.querySelector('.btn-toggle');
    let favoritePokemons = [];
    if (localStorage.getItem(STORAGE_KEY) !== null) {
      favoritePokemons = JSON.parse(localStorage.getItem(STORAGE_KEY));
    }
    if (toggleButton.innerHTML === 'Add to Favorite') {
      const newPokemon = {
        id: this._pokemon.id,
        name: this._pokemon.name,
        image: `${imageBaseURL}/${this._pokemon.id}.png`,
      };
      favoritePokemons.push(newPokemon);
      toggleButton.innerHTML = 'Remove from Favorite';
    } else {
      favoritePokemons.forEach((pokemon, index) => {
        if (pokemon.id === this._pokemon.id) {
          favoritePokemons.splice(index, 1);
        }
      });
      toggleButton.innerHTML = 'Add to Favorite';
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritePokemons));
    if (window.location.href.endsWith('/favorite.html')) {
      window.location.reload();
    }
  }

  renderButton() {
    let favoritePokemons = [];
    let isFavorite = false;
    if (localStorage.getItem(STORAGE_KEY) !== null) {
      favoritePokemons = JSON.parse(localStorage.getItem(STORAGE_KEY));
    }

    favoritePokemons.forEach((pokemon) => {
      if (pokemon.id === this._pokemon.id) {
        isFavorite = true;
      }
    });

    if (isFavorite) {
      return '<button class="button bg-navy text-white btn-toggle">Remove from Favorite</button>';
    }

    return '<button class="button bg-navy text-white btn-toggle">Add to Favorite</button>';
  }

  getTypes() {
    let types = '';
    this._pokemon.types.forEach((data) => {
      types += `<p>${data.type.name}</p>`;
    });
    return types;
  }

  getAbilites() {
    let abilites = '';
    this._pokemon.abilities.forEach((data) => {
      abilites += `<p>${data.ability.name}</p>`;
    });
    return abilites;
  }

  getMoves() {
    let moves = '';
    for (let i = 0; i < 2; i += 1) {
      moves += `<p>${this._pokemon.moves[i].move.name}</p>`;
    }
    return moves;
  }

  getStats() {
    let stats = '';
    for (let i = 0; i < 2; i += 1) {
      const baseStat = this._pokemon.stats[i].base_stat;
      const statName = this._pokemon.stats[i].stat.name;
      stats += `<p>${baseStat} ${statName}</p>`;
    }
    return stats;
  }

  getGameIndices() {
    let gameIndices = '';
    for (let i = 0; i < 2; i += 1) {
      const gameIndex = this._pokemon.game_indices[i].game_index;
      const versionName = this._pokemon.game_indices[i].version.name;
      gameIndices += `<p>${gameIndex} ${versionName}</p>`;
    }
    return gameIndices;
  }
}

customElements.define('app-modal', Modal);
