import styles from "../assets/scss/input.scss";
import "./calendar";
import "./time";

const attrs = [
  "input-text",
  "input-placeholder",
  "input-text-color",
  "input-text-bg-color",
  "tooltip",
  "type",
  "border-color",
  "border-width",
  "border-radius",
  "detail",
  "error",
  "pattern",
  "min",
  "max",
  "step",
];

class Input extends HTMLElement {
  constructor() {
    super();

    const inputHTML = `
      <div class="container" part="input-container">
          <div class="input-container">
              <input class="input" part="input" />
              <span class="tooltip" part="tooltip"></span>
              <i class="img" part="img" src=""></i>
          </div>
          <span class="detail" part="detail"></span>
          <span class="error" part="error"></span>
      </div>
    `;

    const inputDateHTML = `
      <div class="container" part="input-container">
          <div class="input-container">
              <input class="input" part="input" readonly />
              <span class="tooltip" part="tooltip"></span>
              <i class="img" part="img" src=""></i>
              <vpr-calendar class="calendar hide" id="calendar" min="${this.getAttribute("min")}" max="${this.getAttribute("max")}">
              </vpr-calendar>
          </div>
          <span class="detail" part="detail"></span>
          <span class="error" part="error"></span>
      </div>
    `;

    const inputTimeHTML = `
      <div class="container" part="input-container">
          <div class="input-container">
              <input class="input" part="input" readonly />
              <span class="tooltip" part="tooltip"></span>
              <i class="img" part="img" src=""></i>
              <vpr-time id="time" class="time hide" ${this.getAttribute("hr-24") !== null ? "hr-24" : ""} ></vpr-time>
          </div>
          <span class="detail" part="detail"></span>
          <span class="error" part="error"></span>
      </div>
    `;

    this.template = document.createElement("template");
    this.styles = document.createElement("style");
    this.styles.appendChild(document.createTextNode(styles));

    if (this.getAttribute("type") === "date") {
      this.template.innerHTML = inputDateHTML;
    } else if (this.getAttribute("type") === "time") {
      this.template.innerHTML = inputTimeHTML;
    } else {
      this.template.innerHTML = inputHTML;
    }

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.styles);
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.container = this.shadowRoot.querySelector(".container");
    this.input = this.shadowRoot.querySelector(".input");
    this.detail = this.shadowRoot.querySelector(".detail");
    this.error = this.shadowRoot.querySelector(".error");
    this.tooltip = this.shadowRoot.querySelector(".tooltip");
    this.img = this.shadowRoot.querySelector(".img");
    this.calendar = this.shadowRoot.querySelector("#calendar");
    this.time = this.shadowRoot.querySelector("#time");
    this.rendered = false;
    this.show = false;
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
    this.toggleCalendarVisibility = this.toggleCalendarVisibility.bind(this);
    this.toggleTimeVisibility = this.toggleTimeVisibility.bind(this);
    this.onDateClick = this.onDateClick.bind(this);
  }

  onImgChange() {
    if (this.getAttribute("img") !== null) {
      this.img.style.display = "block";
      this.img.style.content = `url("${this.getAttribute("img")}")`;
    }
  }

  onImgClick(callback) {
    this.img.addEventListener("click", (event) => {
      event.stopPropagation();
      callback();
    });
  }

  onInputClick(callback) {
    this.input.addEventListener("click", (event) => {
      event.stopPropagation();
      callback();
    });
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

  onPatternChange() {
    const pattern = this.getAttribute("pattern");
    if (pattern !== null && pattern.trim() !== "") {
      this.showError(pattern);
    }
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

  onErrorChange() {
    const errorText = this.getAttribute("error");
    if (errorText !== null && errorText.trim() !== "") {
      this.error.textContent = errorText;
      this.error.style.width = "max-content";
      this.error.style.height = "max-content";
      this.error.style.paddingTop = "0.125rem";
      this.error.style.paddingLeft = "0.16rem";
      this.error.style.color = this.getAttribute("error-color") || "red";
      this.error.style.backgroundColor =
        this.getAttribute("error-bg-color") || "white";
    } else {
      this.error.style.width = "0px";
      this.error.style.height = "0px";
      this.error.style.paddingTop = "0px";
      this.error.style.paddingLeft = "0px";
    }
  }

  showError(pattern) {
    this.input.addEventListener("blur", () => {
      let regex = RegExp(pattern);
      let inputText = this.input.value;
      if (!regex.test(inputText)) {
        this.error.style.display = "inline-block";
      } else {
        this.error.style.display = "none";
      }
    });
  }

  onInputTypeChange() {
    // this.input.type = this.getAttribute("type") || "text";
    const type = this.getAttribute("type");
    if (type === "email") {
      const pattern = `^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$`;
      this.showError(pattern);
    } else if (type === "tel") {
      const pattern = "^[0-9]{10}$";
      this.showError(pattern);
    } else if (type === "url") {
      const pattern =
        "[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)";
      this.showError(pattern);
    } else if (type === "password") {
      this.input.type = "password";
      this.onImgClick(this.togglePasswordVisibility);
      const pattern = this.getAttribute("pattern");
      this.showError(pattern);
      this.input.value = "";
    } else if (type === "date") {
      this.input.value = "";
      this.onImgClick(this.toggleCalendarVisibility);
      this.onInputClick(this.toggleCalendarVisibility);
      this.calendar.setOnDateClick(this.onDateClick, () => {
        this.show = false;
        this.calendar.classList.add("hide");
        if(this.getAttribute("error") !== null && this.getAttribute("error").trim() !== "") {
          this.error.style.display = "inline-block";
        }
        this.input.value = "";
      });
    } else if (type === "time") {
      this.input.value = "";
      this.onInputClick(this.toggleTimeVisibility);
      this.onImgClick(this.toggleTimeVisibility);
    }
  }

  togglePasswordVisibility() {
    if (this.getAttribute("eye") !== null) {
      if (this.show) {
        this.input.type = "password";
        this.img.style.content = `url("../assets/images/eye-outline.svg")`;
        this.show = false;
      } else {
        this.input.type = "text";
        this.img.style.content = `url("../assets/images/eye-off-outline.svg")`;
        this.show = true;
      }
    } else {
      if (this.show) {
        this.input.type = "password";
        this.img.style.content = `url("../assets/images/lock.svg")`;
        this.show = false;
      } else {
        this.input.type = "text";
        this.img.style.content = `url("../assets/images/lock-open.svg")`;
        this.show = true;
      }
    }
  }

  toggleCalendarVisibility() {
    if (this.show === false) {
      // this.calendar.style.display = "inline-block";
      this.calendar.classList.remove("hide");
      this.show = true;
    } else {
      // this.calendar.style.display = "none";
      this.calendar.classList.add("hide");
      this.show = false;
    }

    window.addEventListener("click", () => {
      this.show = false;
      this.calendar.classList.add("hide");
      // this.calendar.style.display = "none";
    });
  }

  toggleTimeVisibility() {
    if (this.show === false) {
      // this.calendar.style.display = "inline-block";
      this.time.classList.remove("hide");
      this.show = true;
    } else {
      // this.calendar.style.display = "none";
      this.time.classList.add("hide");
      this.show = false;
      this.input.value = this.time.selectedTime;
    }

    window.addEventListener("click", () => {
      this.show = false;
      this.time.classList.add("hide");
      this.input.value = this.time.selectedTime;
      // this.calendar.style.display = "none";
    });
  }

  setPaddingRightImage() {
    const displayValue = getComputedStyle(this.img).getPropertyValue("display");
    if (displayValue === "block") {
      const width = this.getAttribute("width-size");
      if (width === "md" || width === "lg") {
        this.input.style.paddingRight = "8%";
      } else {
        this.input.style.paddingRight = "12%";
      }
    } else {
      this.input.style.paddingRight = "0%";
    }
  }

  onBorderColorChange() {
    this.input.style.borderColor =
      this.getAttribute("border-color") || "rgba(0, 0, 0, 0.7)";
  }

  onBorderWidthChange() {
    this.input.style.borderWidth = this.getAttribute("border-width") || "2px";
  }

  onBorderRadiusChange() {
    this.container.style.borderRadius =
      this.getAttribute("border-radius") || "0.5rem";
    this.input.style.borderRadius =
      this.getAttribute("border-radius") || "0.5rem";
  }

  onDateClick() {
    this.show = false;
    this.calendar.classList.add("hide");
    const dateValue = this.dateFormats();
    this.input.value = dateValue;
    this.error.style.display = "none";
  }

  dateFormats() {
    const format = this.getAttribute("format");
    if (format === "mm/dd/yy") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear().toString().slice(-2);
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${monthStr}/${dateStr}/${yearStr}`;
    } else if (format === "yy/mm/dd") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear().toString().slice(-2);
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${yearStr}/${monthStr}/${dateStr}`;
    } else if (format === "dd/mm/yy") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear().toString().slice(-2);
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${dateStr}/${monthStr}/${yearStr}`;
    } else if (format === "mm/dd/yyyy") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear();
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${monthStr}/${dateStr}/${yearStr}`;
    } else if (format === "yyyy/mm/dd") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear();
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${yearStr}/${monthStr}/${dateStr}`;
    } else if (format === "mm-dd-yy") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear().toString().slice(-2);
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${monthStr}-${dateStr}-${yearStr}`;
    } else if (format === "yy-mm-dd") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear().toString().slice(-2);
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${yearStr}-${monthStr}-${dateStr}`;
    } else if (format === "dd-mm-yy") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear().toString().slice(-2);
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${dateStr}-${monthStr}-${yearStr}`;
    } else if (format === "mm-dd-yyyy") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear();
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${monthStr}-${dateStr}-${yearStr}`;
    } else if (format === "yyyy-mm-dd") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear();
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${yearStr}-${monthStr}-${dateStr}`;
    } else if (format === "dd-mm-yyyy") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear();
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${dateStr}-${monthStr}-${yearStr}`;
    } else if (format === "mm.dd.yy") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear().toString().slice(-2);
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${monthStr}.${dateStr}.${yearStr}`;
    } else if (format === "yy.mm.dd") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear().toString().slice(-2);
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${yearStr}.${monthStr}.${dateStr}`;
    } else if (format === "dd.mm.yy") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear().toString().slice(-2);
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${dateStr}.${monthStr}.${yearStr}`;
    } else if (format === "mm.dd.yyyy") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear();
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${monthStr}.${dateStr}.${yearStr}`;
    } else if (format === "yyyy.mm.dd") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear();
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${yearStr}.${monthStr}.${dateStr}`;
    } else if (format === "dd.mm.yyyy") {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear();
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${dateStr}.${monthStr}.${yearStr}`;
    } else if (format === "month dd, yyyy") {
      return this.calendar.selectedDate.toLocaleString("default", {
        dateStyle: "long",
      });
    } else if (format === "dd month, yyyy") {
      const monthStr = this.calendar.selectedDate.toLocaleString("default", {
        month: "long",
      });
      const yearStr = this.calendar.selectedDate.getFullYear();
      const dateStr = this.calendar.selectedDate.getDate();
      return `${dateStr} ${monthStr}, ${yearStr}`;
    } else if (format === "yyyy, month dd") {
      const monthStr = this.calendar.selectedDate.toLocaleString("default", {
        month: "long",
      });
      const yearStr = this.calendar.selectedDate.getFullYear();
      const dateStr = this.calendar.selectedDate.getDate();
      return `${yearStr}, ${monthStr} ${dateStr}`;
    } else if (format === "mon dd, yyyy") {
      return this.calendar.selectedDate.toLocaleString("default", {
        dateStyle: "medium",
      });
    } else if (format === "dd mon, yyyy") {
      const monthStr = this.calendar.selectedDate.toLocaleString("default", {
        month: "short",
      });
      const yearStr = this.calendar.selectedDate.getFullYear();
      const dateStr = this.calendar.selectedDate.getDate();
      return `${dateStr} ${monthStr}, ${yearStr}`;
    } else if (format === "yyyy, mon dd") {
      const monthStr = this.calendar.selectedDate.toLocaleString("default", {
        month: "short",
      });
      const yearStr = this.calendar.selectedDate.getFullYear();
      const dateStr = this.calendar.selectedDate.getDate();
      return `${yearStr}, ${monthStr} ${dateStr}`;
    } else {
      const monthStr = `0${this.calendar.selectedDate.getMonth() + 1}`.slice(-2);
      const yearStr = this.calendar.selectedDate.getFullYear();
      const dateStr = `0${this.calendar.selectedDate.getDate()}`.slice(-2);
      return `${dateStr}/${monthStr}/${yearStr}`;
    }
  }

  render() {
    this.rendered = true;
    this.onImgChange();
    this.onBorderColorChange();
    this.onBorderRadiusChange();
    this.onBorderWidthChange();
    this.onInputBgColorChange();
    this.onInputColorChange();
    this.onInputPlaceholderChange();
    this.onInputTextChange();
    this.onInputTypeChange();
    this.onPatternChange();
    this.onTooltipChange();
    this.onDetailChange();
    this.onErrorChange();
    this.setPaddingRightImage();
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
        case "tooltip":
          this.onTooltipChange();
          break;
        case "detail":
          this.onDetailChange();
          break;
        case "error":
          this.onErrorChange();
          break;
      }
    }
  }

  get value() {
    return this.input.value;
  }
}

window.customElements.get("vpr-input") ||
  window.customElements.define("vpr-input", Input);
