import banner from '../../../assets/banner.png';

class Jumbotron extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="jumbotron">
        <div class="jumbotron-image">
            <img src=${banner} alt="">
        </div>
        <div class="jumbotron-text">
            <h1 class="mb-2">
                Are you a pokemon maniacs?
            </h1>
            <p class="mb-2">
                Here you can see all list of pokemon that you might like
            </p>
            <button class="button text-white bg-red">
              <a href="#all-pokemon-section" class="text-white">
                      View Pokemon
              </a>
            </button>
        </div>
    </div>
    `;
  }
}

customElements.define('jumbotron-content', Jumbotron);
