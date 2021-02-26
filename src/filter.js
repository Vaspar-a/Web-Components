import styles from "../assets/scss/filter.scss";

class Filter extends HTMLElement {
  constructor() {
    super();
    this.template = document.createElement("template");
    this.styles = document.createElement("style");
    this.styles.appendChild(document.createTextNode(styles));
    this.template.innerHTML = `
    <div class="container">
      <input class="input" part="input"/>
      <p class="match-text" part="match-text"></p>
      <i class="icon up-search" part="up-search"></i>
      <i class="icon down-search" part="down-search"></i>
      <i class="icon close" part="close"></i>
    </div>
        `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.styles);
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.input = this.shadowRoot.querySelector(".input");
    this.matchText = this.shadowRoot.querySelector(".match-text");
    this.searchUp = this.shadowRoot.querySelector(".up-search");
    this.searchDown = this.shadowRoot.querySelector(".down-search");
    this.close = this.shadowRoot.querySelector(".close");
    this.filteredIndex = 0;
    this.setOnClickClose = this.setOnClickClose.bind(this);
  }

  connectedCallback() {
    this.input.addEventListener("change", (event) => {
      event.stopPropagation();
      
      this.filterData();

      if (this.filteredData.length > 0) {
        this.matchText.textContent = `${this.filteredIndex + 1}/${
          this.filteredData.length
        }`;
        this.searchElement.querySelector(this.filteredData[0]).focus();
      } else {
        this.matchText.textContent = `0/0`;
      }
    });

    this.setOnClickSearchUp();
    this.setOnClickSearchDown();
  }

  setFilter(searchElement, data, idGenerator) {
    this.searchElement = searchElement;
    this.data = data;
    this.idGenerator = idGenerator;
    this.filterData();
  }

  setOnClickClose(callback) {
    this.close.addEventListener("click", (event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      callback();
    });
  }

  setOnClickSearchUp() {
    this.searchUp.addEventListener("click", (event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      console.log(this.filteredIndex);
      if (this.filteredData.length > 0) {
        this.filteredIndex = this.filteredIndex + 1;
        this.filteredIndex = this.filteredIndex % this.filteredData.length;
        this.searchElement
          .querySelector(this.filteredData[this.filteredIndex])
          .focus();
        this.matchText.textContent = `${this.filteredIndex + 1}/${
          this.filteredData.length
        }`;
      } else {
        this.matchText.textContent = `0/0`;
      }
    });
  }

  setOnClickSearchDown() {
    this.searchDown.addEventListener("click", (event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      console.log(this.filteredIndex);
      if (this.filteredIndex > 0) {
        if (this.filteredData.length > 0) {
          this.filteredIndex =
            (this.filteredIndex - 1) % this.filteredData.length;
          this.searchElement
            .querySelector(this.filteredData[this.filteredIndex])
            .focus();
          this.matchText.textContent = `${this.filteredIndex + 1}/${
            this.filteredData.length
          }`;
        } else {
          this.matchText.textContent = `0/0`;
        }
      } else {
        this.filteredIndex = this.filteredData.length - 1;
        this.searchElement
          .querySelector(this.filteredData[this.filteredIndex])
          .focus();
        this.matchText.textContent = `${this.filteredIndex + 1}/${
          this.filteredData.length
        }`;
      }
    });
  }

  filterData() {
    this.filteredData = [];
    this.filteredIndex = 0;
    this.data.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (this.input.value.trim() !== "" && cell.includes(this.input.value)) {
          const id = this.idGenerator(rowIndex, cellIndex);
          this.filteredData.push(id);
        }
      });
    });
  }
}

window.customElements.get("vpr-filter") ||
  window.customElements.define("vpr-filter", Filter);
