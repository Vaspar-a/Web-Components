import styles from "../assets/scss/table-filter.scss";
import './select';

const matchOptionsArr = ['Contains', 'Equals', '<', '>', '==', '>=', '<='];

class TableFilter extends HTMLElement {
  constructor() {
    super();
    this.template = document.createElement("template");
    this.styles = document.createElement("style");
    this.styles.appendChild(document.createTextNode(styles));
    this.template.innerHTML = `
    <div class="container">
        <div class="labels">
            <div class="column">Column</div>
            <div class="operator">Operator</div>
            <div class="key">Value</div>
            <div class="pad"></div>
        </div>
        <div class="inputs">
            <vpr-select class="header-options"></vpr-select>
            <vpr-select class="match-options"></vpr-select>
            <input class="input" part="input"/>
            <i class="icon search" part="search"></i>
        </div>
    </div>
        `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.styles);
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.input = this.shadowRoot.querySelector(".input");
    this.matchOptions = this.shadowRoot.querySelector(".match-options");
    this.headerOptions = this.shadowRoot.querySelector(".header-options");
    this.search = this.shadowRoot.querySelector(".search");
    this.filteredIndex = 0;
    this.setSearchElement = this.setSearchElement.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.setData = this.setData.bind(this);
  }

  setSearchElement(searchElement) {
    this.searchElement = searchElement;
  }

  setData(data) {
    this.data = data;
  }

  connectedCallback() {
    this.matchOptions.setOptions(matchOptionsArr);
    this.search.addEventListener('click', this.setFilter);
  }

  setHeaderOptions(headerOptionsArr) {
    this.headerOptions.setOptions(headerOptionsArr);
  }

  setFilter(event) {
    event.stopPropagation();
    this.filteredIndices = [];
    const matchOption = this.matchOptions.selectedOption;
    this.data.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          const index =  this.headerOptions.selectedOptionIndex;
          let value = false;
          if(index !== -1 && cellIndex === index) {
              switch(matchOption) {
                  case 'Contains':
                    value = this.stringContains(this.input.value.toLowerCase().trim(), cell.toLowerCase().trim());
                    break;
                  case 'Equals':
                    value = this.stringEquals(this.input.value.toLowerCase().trim(), cell.toLowerCase().trim());
                    break;
                  case '==':
                    value = this.numEq(this.input.value.toLowerCase().trim(), cell.toLowerCase().trim());
                    break;
                  case '<=':
                    value = this.numLe(this.input.value.toLowerCase().trim(), cell.toLowerCase().trim());
                    break;
                  case '>=':
                    value = this.numGe(this.input.value.toLowerCase().trim(), cell.toLowerCase().trim());
                    break;
                  case '<':
                    value = this.numLt(this.input.value.toLowerCase().trim(), cell.toLowerCase().trim());
                    break;
                  case '>':
                    value = this.numGt(this.input.value.toLowerCase().trim(), cell.toLowerCase().trim());
                    break;
              }
          }

          if(value) {
              this.filteredIndices.push(rowIndex);
          }
        });
    });
    if(this.filteredIndices.length !== 0) {
        this.searchElement.setTableBody(this.data, true, this.filteredIndices);
    } else {
        this.searchElement.setTableBody(this.data, false);
    }
  }

  stringContains(inputValue, cellValue) {
    return cellValue.includes(inputValue);
  }

  stringEquals(inputValue, cellValue) {
    return cellValue === inputValue;
  }

  numEq(inputValue, cellValue) {
    return Number(cellValue) === Number(inputValue);
  }

  numLt(inputValue, cellValue) {
    return Number(cellValue) < Number(inputValue);
  }

  numGt(inputValue, cellValue) {
    return Number(cellValue) > Number(inputValue);
  }

  numLe(inputValue, cellValue) {
    return Number(cellValue) <= Number(inputValue);
  }

  numGe(inputValue, cellValue) {
    return Number(cellValue) >= Number(inputValue);
  }
}

window.customElements.get("vpr-table-filter") ||
  window.customElements.define("vpr-table-filter", TableFilter);
