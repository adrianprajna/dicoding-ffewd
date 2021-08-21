import profile from '../../../assets/profile.jpg';

class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer>
        <div class="profile-img">
          <img src=${profile} alt="">
        </div>
        <div class="profile-desc">
          <h2>Adrian</h2>
          <hr>
          <p>Dicoding Fundamental Front End Web Development's Submission</p>
        </div>
    </footer>
        `;
  }
}

customElements.define('app-footer', Footer);
