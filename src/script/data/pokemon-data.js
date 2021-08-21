import axios from 'axios';

const baseURL = 'https://pokeapi.co/api/v2';
const imageBaseURL = 'https://cdn.traction.one/pokedex/pokemon';

class PokemonData {
  static async getAllPokemon(page) {
    let { results } = await axios.get(`${baseURL}/pokemon/?offset=${page * 20}&limit=20`).then((response) => response.data);
    results = this.mappingData(results, page);
    return results;
  }

  static async getPopularPokemon() {
    let { results } = await axios.get(`${baseURL}/pokemon/?offset=0&limit=50`).then((response) => response.data);
    results = this.mappingData(results, 1);
    const randomData = [];
    for (let i = 0; i < 4; i += 1) {
      const randomNumber = this.getRandomNumber();
      randomData.push(results[randomNumber]);
    }
    return randomData;
  }

  static async getPokemon(pokemonName) {
    const data = await axios.get(`${baseURL}/pokemon/${pokemonName}`).then((response) => response.data);
    return data;
  }

  static async getSearchedPokemon(pokemonName) {
    const data = await axios.get(`${baseURL}/pokemon/${pokemonName}`).then((response) => response.data)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        return null;
      });
    if (data !== null) {
      const { id } = data;
      let { species } = data;
      species = {
        ...species,
        image: `${imageBaseURL}/${id}.png`,
      };
      return [species];
    }

    return null;
  }

  static getRandomNumber() {
    this.min = 0;
    this.max = 50;
    return Math.floor(Math.random() * (this.max - this.min) + this.min);
  }

  static mappingData(results, page) {
    return results.map((data) => {
      const firstImgNumber = data.url[data.url.length - 4];
      const secondImgNumber = data.url[data.url.length - 3];
      const thirdImgNumber = data.url[data.url.length - 2];
      if (page < 5) {
        return {
          ...data,
          image: `${imageBaseURL}/${secondImgNumber}${thirdImgNumber}.png`,
        };
      }

      return {
        ...data,
        image: `${imageBaseURL}/${firstImgNumber}${secondImgNumber}${thirdImgNumber}.png`,
      };
    });
  }
}
export default PokemonData;
