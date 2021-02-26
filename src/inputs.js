import styles from "../assets/scss/inputs.scss";

const attrs = [
  "label-text",
  "label-color",
  "label-bg-color",
  "input-text",
  "input-placeholder",
  "input-text-color",
  "input-text-bg-color",
  "tooltip",
  "type",
  "border-color",
  "border-width",
  "border-radius",
  "detail-text",
  "error-text",
  "pattern",
  "min",
  "max",
  "step",
];

class Input extends HTMLElement {
  constructor() {
    super();
    this.template = document.createElement("template");
    this.styles = document.createElement("style");
    this.styles.appendChild(document.createTextNode(styles));
    this.template.innerHTML = `
    <div class="container">
        <span class="label" part="label">First Name</span>
        <input class="input" part="input" />
        <span class="tooltip" part="tooltip"></span>
    </div>
        `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.styles);
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.container = this.shadowRoot.querySelector(".container");
    this.input = this.shadowRoot.querySelector(".input");
    this.label = this.shadowRoot.querySelector(".label");
    this.tooltip = this.shadowRoot.querySelector(".tooltip");
    this.rendered = false;
  }

  onLabelTextChange() {
    this.label.textContent = this.getAttribute("label-text") || "Label";
  }

  onLabelBgColorChange() {
    this.label.style.backgroundColor =
      this.getAttribute("label-bg-color") || "rgba(219, 243, 236, 0.79)";
  }

  onLabelColorChange() {
    this.label.style.color = this.getAttribute("label-color") || "black";
  }

  onInputTextChange() {
    this.input.value = this.getAttribute("input-text") || "";
  }

  onInputPlaceholderChange() {
    this.input.placeholder = this.getAttribute("placeholder") || "";
  }

  onInputBgColorChange() {
    this.input.style.backgroundColor =
      this.getAttribute("input-bg-color") || "rgba(255, 255, 255, 0)";
  }

  onInputColorChange() {
    this.input.style.color = this.getAttribute("input-color") || "black";
  }

  onTooltipChange() {
    if (this.getAttribute("tooltip") !== null) {
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

  onInputTypeChange() {
    this.input.type = this.getAttribute("type") || "text";
  }

  onBorderColorChange() {
    this.label.style.borderColor =
      this.getAttribute("border-color") || "rgba(0, 0, 0, 0.7)";
    this.input.style.borderColor =
      this.getAttribute("border-color") || "rgba(0, 0, 0, 0.7)";
  }

  onBorderWidthChange() {
    this.label.style.borderWidth =
      this.getAttribute("border-width") || "2px";
    this.input.style.borderWidth =
      this.getAttribute("border-width") || "2px";
  }

  onBorderRadiusChange() {
    this.container.style.borderRadius =
      this.getAttribute("border-radius") || "1rem";
    this.label.style.borderTopLeftRadius =
      this.getAttribute("border-radius") || "1rem";
    this.label.style.borderBottomLeftRadius =
      this.getAttribute("border-radius") || "1rem";
    this.input.style.borderTopRightRadius =
      this.getAttribute("border-radius") || "1rem";
    this.input.style.borderBottomRightRadius =
      this.getAttribute("border-radius") || "1rem";
  }

  render() {
    this.rendered = true;
    this.onBorderColorChange();
    this.onBorderRadiusChange();
    this.onBorderWidthChange();
    this.onInputBgColorChange();
    this.onInputColorChange();
    this.onInputPlaceholderChange();
    this.onInputTextChange();
    this.onInputTypeChange();
    this.onLabelBgColorChange();
    this.onLabelColorChange();
    this.onLabelTextChange();
    this.onTooltipChange();
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return attrs;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // this.render();
    if (this.rendered) {
      switch (name) {
        case "border-color":
          this.onBorderColorChange();
          break;
        case "border-radius":
          this.onBorderRadiusChange();
          break;
        case "border-width":
          this.onBorderWidthChange();
          break;
        case "input-bg-color":
          this.onInputBgColorChange();
          break;
        case "input-color":
          this.onInputColorChange();
          break;
        case "placeholder":
          this.onInputPlaceholderChange();
          break;
        case "input-text":
          this.onInputTextChange();
          break;
        case "type":
          this.onInputTypeChange();
          break;
        case "label-bg-color":
          this.onLabelBgColorChange();
          break;
        case "label-color":
          this.onLabelColorChange();
          break;
        case "label-text":
          this.onLabelTextChange();
          break;
        case "tooltip":
          this.onTooltipChange();
          break;
      }
    }
  }
}

window.customElements.define("vpr-input", Input);
