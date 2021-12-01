import styles from "../assets/scss/header.scss";
// import {readFileSync} from 'fs';

class Header extends HTMLElement {
  constructor() {
    super();
    this.template = document.createElement("template");
    this.styles = document.createElement("style");
    this.styles.appendChild(document.createTextNode(styles));
    this.template.innerHTML = `
    <header class="header" part="header">
        <nav class="logo-wrapper" part="logo-wrapper">
          <i class="logo-img" part="logo-img"></i>
          <h3 class="logo-text" part="logo-text"></h3> 
        </nav>
        <div class="menu-bar">
          <i class="menu-icon"></i>
        </div>
        <ul class="nav-links" part="nav-links"></ul>
    </header>
        `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.styles);
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.header = this.shadowRoot.querySelector(".header");
    this.logoImg = this.shadowRoot.querySelector(".logo-img");
    this.logoText = this.shadowRoot.querySelector(".logo-text");
    this.navLinks = this.shadowRoot.querySelector(".nav-links");
    this.menuBar = this.shadowRoot.querySelector(".menu-bar");
    this.menuIcon = this.shadowRoot.querySelector(".menu-icon");

    this.openMenu = this.openMenu.bind(this);
    this.setStyle = this.setStyle.bind(this);
  }

  setNavLinks(links, activeLink) {
    links.forEach((link, index) => {
        let linkString;
        if (activeLink === link.text || activeLink === index) {
            linkString = 
            `<li class="active nav-link" id="link${index}" part="nav-link">
                <a href=${link.link} class="list-style">
                    ${link.img !== undefined ? link.img.slice(0, 2) === "fa" ? `<i class="link-img ${link.img}"></i>` : `<i class="link-img" style="content: url(${link.img});"></i>` : ``}
                    <span class="link-text" part="link-text">${link.text}</span>
                </a>
            </li>`;
        } else {
            linkString = 
            `<li class="nav-link" id="link${index}" part="nav-link">
                <a href=${link.link} class="list-style">
                    ${link.img !== undefined ? link.img.slice(0, 2) === "fa" ? `<i class="link-img ${link.img}"></i>` : `<i class="link-img" style="content: url(${link.img});"></i>` : ``}
                    <span class="link-text" part="link-text">${link.text}</span>
                </a>
            </li>`;
        }
        
        this.navLinks.innerHTML += linkString;
    });
  }

  openMenu(event) {
    event.stopPropagation();
    this.navLinks.classList.toggle("nav-links-active");
    this.menuIcon.classList.toggle("close-menu");
    const elements = this.shadowRoot.querySelectorAll(".nav-links li");
    elements.forEach((element) => {
        element.classList.toggle("li-fade");
    });
  }

  setLogoText(text) {
    this.logoText.textContent = text;
  }

  setLogoImg(img) {
    this.logoImg.style.content = `url(${img})`;
  }

  connectedCallback() {
    this.menuBar.addEventListener("click", this.openMenu);
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // this.render();
  }

  setStyle(path) {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', (event) => {
      console.log(fileReader.result);
      // this.shadowRoot.querySelector('style').appendChild(document.createTextNode(cssText));
    });
    fileReader.readAsText(path);
  }
}

window.customElements.get("vpr-header") ||
  window.customElements.define("vpr-header", Header);
