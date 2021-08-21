import logo from '../../../assets/pokeball-logo.png';

class Header extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <header>
            <div class="header-logo">
                <img src=${logo} alt="">
                <h2>PokeMonster</h2>
            </div>
            <nav>
                <button class="button bg-red">
                  <a href="favorite.html" class="text-white">
                      View Favorite
                  </a>
                </button>
            </nav>
        </header>
        `;

    this.querySelector('.header-logo').addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
}

customElements.define('app-bar', Header);
