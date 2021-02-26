import styles from "../assets/scss/button.scss";

class Button extends HTMLElement {
  alpha(a) {
    let currentColor = getComputedStyle(this.button).getPropertyValue("background-color");
    let match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(currentColor);
    a = a > 1 ? a / 100 : a;
    return "rgba(" + [match[1], match[2], match[3], a].join(",") + ")";
  }

  constructor() {
    super();
    this.template = document.createElement("template");
    this.styles = document.createElement("style");
    this.styles.appendChild(document.createTextNode(styles));
    this.template.innerHTML = `
    <button class="btn" part="button">
        <span class="text"></span> 
        <img class="img" part="img"></img>
        <span class="tooltip" part="tooltip"></span>
    </button>
        `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.styles);
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.button = this.shadowRoot.querySelector(".btn");
    this.buttonText = this.shadowRoot.querySelector(".text");
    this.img = this.shadowRoot.querySelector(".img");
    this.tooltip = this.shadowRoot.querySelector(".tooltip");
    this.rendered = false;
  }

  render() {
    this.onTextChange();
    this.onTooltipChange();
    this.onBackgroundChnage();
    this.onColorChange();
    this.onImgChange();
    this.onBorderColorChange();
    this.onBorderWidthChange();
    this.onBorderRadiusChange();
    this.onRoundedBorder();
    this.rendered = true;
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return [
      "text",
      "img",
      "bg-color",
      "color",
      "tooltip",
      "border-color",
      "border-width",
      "border-radius",
      "rounded",
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // this.render();
    if (this.rendered) {
      switch (name) {
        case "text":
          this.onTextChange();
          break;
        case "tooltip":
          this.onTooltipChange();
          break;
        case "bg-color":
          this.onBackgroundChnage();
          break;
        case "color":
          this.onColorChange();
          break;
        case "img":
          this.onImgChange();
          break;
        case "border-color":
          this.onBorderColorChange();
          break;
        case "border-width":
          this.onBorderWidthChange();
          break;
        case "border-radius":
          this.onBorderRadiusChange();
          break;
        case "rounded":
          this.onRoundedBorder();
          break;
      }
    }
  }

  onTextChange() {
    // Set Text
    this.buttonText.textContent =
      this.getAttribute("text") !== null ? this.getAttribute("text") : "Button";
  }

  onTooltipChange() {
    const tooltipText = this.getAttribute("tooltip");
    if (this.getAttribute("tooltip") !== null && tooltipText.trim() !== "") {
      this.tooltip.textContent = this.getAttribute("tooltip");
      this.tooltip.style.width = "max-content";
      this.tooltip.style.height = "max-content";
      this.tooltip.style.padding = "0.25rem";
      this.tooltip.style.color =
        this.getAttribute("tooltip-color") !== null
          ? this.getAttribute("tooltip-color")
          : "white";
      this.tooltip.style.backgroundColor =
        this.getAttribute("tooltip-bg-color") !== null
          ? this.getAttribute("tooltip-bg-color")
          : "black";
    } else {
      this.tooltip.style.width = "0px";
      this.tooltip.style.height = "0px";
      this.tooltip.style.padding = "0px";
    }
  }

  onBackgroundChnage() {
    // Set Background Color
    this.button.style.backgroundColor =
      this.getAttribute("bg-color") !== null
        ? this.getAttribute("bg-color")
        : "rgb(0, 89, 172)";
  }

  onColorChange() {
    // Set Color
    this.buttonText.style.color =
      this.getAttribute("color") !== null
        ? this.getAttribute("color")
        : "#f0ffff";
  }

  onImgChange() {
    // Set img if url given
    if (this.getAttribute("img") !== null) {
      this.img.style.width = "20px";
      this.img.style.height = "20px";
      this.img.src = this.getAttribute("img");
      this.img.classList.add("img-on-right");
    }
  }

  onBorderColorChange() {
    if (this.getAttribute("border-color") !== null) {
      this.button.style.borderColor = this.getAttribute("border-color");
    }
  }

  onBorderWidthChange() {
    if (this.getAttribute("border-width") !== null) {
      this.button.style.borderStyle = "solid";
      this.button.style.borderWidth = this.getAttribute("border-width");
    }
  }

  onBorderRadiusChange() {
    if (this.getAttribute("border-radius") !== null) {
      this.button.style.borderRadius = this.getAttribute("border-radius");
    }
  }

  onRoundedBorder() {
    if (this.getAttribute("rounded") !== null) {
      this.button.classList.add('rounded-border');
    }
  }
}

window.customElements.get("vpr-button") || window.customElements.define("vpr-button", Button);
