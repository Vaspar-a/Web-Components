import styles from "../assets/scss/select.scss";

const attr = [
  "editable",
  "border-type",
  "border-color",
  "border-width",
  "border-radius",
  "select-color", 
  "select-bg-color",
  "options-color",
  "options-bg-color",
  "detail",
  "tooltip",
];

class Select extends HTMLElement {

  constructor() {
    super();
    this.template = document.createElement("template");
    this.styles = document.createElement("style");
    this.styles.appendChild(document.createTextNode(styles));
    this.template.innerHTML = `
    <div class="container">
      <div class="select" part="select">
        <input class="para" part="para" tabindex="-1" readonly/>
        <i class="img" part="img"></i>
        <div class="options-box">
            <div class="options" part="options"></div>
        </div>
        <span class="tooltip" part="tooltip"></span>
      </div>
      <span class="detail" part="detail"></span>
    </div>
        `;

    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(this.styles);
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.select = this.shadowRoot.querySelector(".select");
    this.para = this.shadowRoot.querySelector(".select .para");
    this.image = this.shadowRoot.querySelector(".select .img");
    this.optionsBox = this.shadowRoot.querySelector(".select .options-box");
    this.options = this.shadowRoot.querySelector(".options");
    this.detail = this.shadowRoot.querySelector(".detail");
    this.tooltip = this.shadowRoot.querySelector(".tooltip");
    this.optionsList = [];
    this.currentOptionIndex = 0;
  }

  setAttrEditable() {
    if(this.getAttribute("editable") !== null) {
      this.para.removeAttribute("readonly");
      this.para.style.cursor = "text";
    }
  }

  setBorderType() {
    if(this.getAttribute("border-type") === "all") {
      this.select.style.borderStyle = "solid";
    }
  }

  setBorderColor() {
    this.select.style.borderColor =
      this.getAttribute("border-color") || "rgba(0, 0, 0, 1)";
  }

  setBorderWidth() {
    this.select.style.borderWidth = 
      this.getAttribute("border-width") || "2px";
  }

  setBorderRadius() {
    this.select.style.borderRadius = this.getAttribute("border-radius") || "0.5rem";
  }

  setSelectColor() {
    this.select.style.color = this.getAttribute("select-color") || "black";
  }

  setSelectBackgroundColor() {
    this.select.style.backgroundColor = this.getAttribute("bg-color") || "white";
  }

  setOptionsColor() {
    this.options.style.color = this.getAttribute("option-color") || "black";
  }

  setOptionsBackgroundColor() {
    this.options.style.backgroundColor = this.getAttribute("option-bg-color") || "white";
  }

  onDetailChange() {
    const detailText = this.getAttribute("detail");
    if (detailText !== null && detailText.trim() !== "") {
      this.detail.textContent = detailText;
      this.detail.style.display = "inline-block";
      this.detail.style.width = "max-content";
      this.detail.style.height = "max-content";
      this.detail.style.paddingTop = "0.125rem";
      this.detail.style.paddingLeft = "0.16rem";
      this.detail.style.color = this.getAttribute("detail-color") || "#858587";
      this.detail.style.backgroundColor =
        this.getAttribute("detail-bg-color") || "white";
    } else {
      this.detail.style.display = "none";
      this.detail.style.width = "0px";
      this.detail.style.height = "0px";
      this.detail.style.paddingTop = "0px";
      this.detail.style.paddingLeft = "0px";
    }
  }

  onTooltipChange() {
    const tooltipText = this.getAttribute("tooltip");
    if (tooltipText !== null && tooltipText.trim() !== "") {
      this.tooltip.textContent = this.getAttribute("tooltip");
      this.tooltip.style.width = "max-content";
      this.tooltip.style.height = "max-content";
      this.tooltip.style.color = this.getAttribute("tooltip-color") || "white";
      this.tooltip.style.backgroundColor =
        this.getAttribute("tooltip-bg-color") || "black";
    } else {
      this.tooltip.style.width = "0px";
      this.tooltip.style.height = "0px";
      this.tooltip.style.padding = "0px";
    }
  }

  render() {
    this.setAttrEditable();
    this.setBorderType();
    this.setBorderType();
    this.setBorderWidth();
    this.setBorderRadius();
    this.onDetailChange();
    this.onTooltipChange();
  }

  setOptions(optionsList, callback) {
    this.optionsList = optionsList;
    this.options.innerHTML = "";
    let optionsString = "";

    this.optionsList.forEach((option, index) => {
      optionsString += `<p class="option" tabindex="2" id="option${index}" part="option">${option}</p>`;
    });

    this.options.innerHTML = optionsString;

    this.optionElements = [];
    const options = this.shadowRoot.querySelectorAll('.option');
    options.forEach(option => {
      this.optionElements.push(option);
    });

    this.setOnOptionClick(callback);
  }

  connectedCallback() {
    this.render();
    
    this.select.addEventListener("click", (event) => {
      event.stopPropagation();
      if (this.options.classList.contains("show")) {
        this.options.classList.remove("show");
        this.image.classList.remove("arrow-rotate");
        this.optionsBox.classList.remove("disable-pointer-events");
      } else {
        this.options.classList.add("show");
        this.image.classList.add("arrow-rotate");
        this.optionsBox.classList.add("disable-pointer-events");
      }
    });

    this.select.addEventListener('keydown', (event) => {
      event.stopPropagation();
      if(event.key === "Enter") { // Enter
        event.preventDefault();
        this.options.classList.remove("show");
        this.image.classList.remove("arrow-rotate");
        this.optionsBox.classList.remove("disable-pointer-events");
      }

      if(this.getAttribute('onSpaceToggle') !== null) {
        if(event.key === " " || event.key === "Spacebar") { // Space
          event.preventDefault();
          this.para.focus();
          if (this.options.classList.contains("show")) {
            this.options.classList.remove("show");
            this.image.classList.remove("arrow-rotate");
            this.optionsBox.classList.remove("disable-pointer-events");
          } else {
            this.options.classList.add("show");
            this.image.classList.add("arrow-rotate");
            this.optionsBox.classList.add("disable-pointer-events");
          }
        } 
      }
    });

    this.select.addEventListener('keydown', (event) => {
      if(event.key === "Escape" || event.key === "Esc") { // Escape
        this.options.classList.remove("show");
        this.image.classList.remove("arrow-rotate");
        this.optionsBox.classList.remove("disable-pointer-events");
      } else if(event.key === "ArrowDown" || event.key === "Down") {
        event.preventDefault();
        const optionElement = this.shadowRoot.querySelector(`#option${this.currentOptionIndex}`);
        optionElement.focus();
      }
    });

    window.addEventListener('click', (event) => {
      event.stopPropagation();
      this.options.classList.remove("show");
      this.image.classList.remove("arrow-rotate");
      this.optionsBox.classList.remove("disable-pointer-events");
    });
  }

  static get observedAttributes() {
    return attr;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "editable":
        this.setAttrEditable();
        break;
      case "border-type":
        this.setBorderType();
        break;
      case "border-color":
        this.setBorderColor();
        break;
      case "border-width":
        this.setBorderWidth();
        break;
      case "border-radius":
        this.setBorderRadius();
        break;
      case "detail":
        this.onDetailChange();
        break;
      case "tooltip":
        this.onTooltipChange();
        break;
    }
  }

  setOnOptionClick(callback) {
    this.optionElements.forEach((option, index) => {
      option.addEventListener('click', (event) => {
        this.para.value = option.textContent;
        this.scrollOptionsTo(index);
        if(callback !== undefined) {
          callback(event);
        }
      });

      option.addEventListener('keydown', (event) => {
        event.preventDefault();
        const totalOptionElements = this.optionElements.length;
        if(event.key === "ArrowUp" || event.key === "Up") {
          event.stopPropagation();
          const optionIndex = (totalOptionElements + index - 1) % totalOptionElements;
          const newOptionId = `#option${optionIndex}`;
          this.shadowRoot.querySelector(newOptionId).focus();
        } else if(event.key === "ArrowDown" || event.key === "Down") {
          event.stopPropagation();
          const optionIndex = (totalOptionElements + index + 1) % totalOptionElements;
          const newOptionId = `#option${optionIndex}`;
          this.shadowRoot.querySelector(newOptionId).focus();
        } else if(event.key === "Enter") {
          this.para.value = option.textContent;
          this.scrollOptionsTo(index);
          if(callback !== undefined) {
            callback(event);
          }
        }
      });
    });

    this.para.addEventListener('keyup', (event) => {
      if(event.key === "Enter") { // Enter
        event.preventDefault();
        if(this.optionsList.indexOf(this.para.value) !== -1) {
          if(callback !== undefined) {
            callback(event);
          }
        } else {
          this.para.value = this.optionsList[this.currentOptionIndex];
        }
      } 
    });
  }

  scrollOptionsTo(index) {
    const option = this.optionElements[0];
    const optionHeight = parseFloat(getComputedStyle(option).height.replace('px', ''));
    setTimeout(() => {
      this.options.scrollTo({
        top: index * optionHeight,
        behavior: 'smooth',
      });
    }, 100);
    
    this.currentOptionIndex = index;
  }

  setDefaultOption(index) {
    this.para.value = this.optionsList[index];
    this.scrollOptionsTo(index);
  }

  get selectedOption() {
    return this.para.value;
  }

  get selectedOptionIndex() {
    return this.optionsList.indexOf(this.para.value);
  }
}

window.customElements.get("vpr-select") || window.customElements.define("vpr-select", Select);