import styles from "../assets/scss/time.scss";

class Time extends HTMLElement {
  
  constructor() {
    super();
    this.template = document.createElement("template");
    this.styles = document.createElement("style");
    this.styles.appendChild(document.createTextNode(styles));
    this.template.innerHTML = `
    <div class="time">
      <div class="hours-panel">
          <i class="up"></i>
          <input class="time-input" value="12" />
          <i class="down"></i>
      </div>
      <p class="colon">&#58</p>
      <div class="minutes-panel">
          <i class="up"></i>
          <input class="time-input" value="59"/>
          <i class="down"></i>
      </div>
      <div class="am-pm">
        <p class="am">AM</p>
        <p class="pm">PM</p>
      </div>
    </div>
        `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.styles);
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.hourInput = this.shadowRoot.querySelector(".hours-panel .time-input");
    this.minutesInput = this.shadowRoot.querySelector(".minutes-panel .time-input");
    this.hourUp = this.shadowRoot.querySelector(".hours-panel .up");
    this.hourDown = this.shadowRoot.querySelector(".hours-panel .down");
    this.minutesUp = this.shadowRoot.querySelector(".minutes-panel .up");
    this.minutesDown = this.shadowRoot.querySelector(".minutes-panel .down");
    this.am = this.shadowRoot.querySelector(".am");
    this.pm = this.shadowRoot.querySelector(".pm");
  }

  connectedCallback() {
    this.minutesUp.addEventListener("click", (event) => {
      event.stopPropagation();
      try {
        let oldValue = parseInt(this.minutesInput.value);
        if(isNaN(oldValue) || oldValue > 59 || oldValue < 0) {
          this.minutesInput.value = "00";
        } else if(oldValue === 59) {
          this.minutesInput.value = "00";
        } else {
          oldValue++;
          this.minutesInput.value = ("0" + oldValue).slice(-2);
        }
      } catch(e) {
        console.log(e);
      }
    });
    
    this.minutesDown.addEventListener("click", (event) => {
      event.stopPropagation();
      try {
        let oldValue = parseInt(this.minutesInput.value);
        if(isNaN(oldValue) || oldValue > 59 || oldValue < 0) {
          this.minutesInput.value = "00";
        } else if(oldValue === 0) {
          this.minutesInput.value = "59";
        } else {
          oldValue--;
          this.minutesInput.value = ("0" + oldValue).slice(-2);
        }
      } catch(e) {
        console.log(e);
      }
    });
    
    this.hourUp.addEventListener("click", (event) => {
      event.stopPropagation();
      try {
        let oldValue = parseInt(this.hourInput.value);
        if(this.getAttribute("hr-24") !== null) {
          if(isNaN(oldValue) || oldValue > 23 || oldValue < 0) {
            this.hourInput.value = "01";
          } else if(oldValue === 23) {
            this.hourInput.value = "00";
          } else {
            oldValue++;
            this.hourInput.value = ("0" + oldValue).slice(-2);
          }
        } else {
          if(isNaN(oldValue) || oldValue > 12 || oldValue < 0) {
            this.hourInput.value = "01";
          } else if(oldValue === 12) {
            this.hourInput.value = "01";
          } else {
            oldValue++;
            this.hourInput.value = ("0" + oldValue).slice(-2);
          }
        }
      } catch(e) {
        console.log(e);
      }
    });
    
    this.hourDown.addEventListener("click", (event) => {
      event.stopPropagation();
      try {
        let oldValue = parseInt(this.hourInput.value);
        if(this.getAttribute("hr-24") !== null) {
          if(isNaN(oldValue) || oldValue > 23 || oldValue < 0) {
            this.hourInput.value = "01";
          } else if(oldValue === 0) {
            this.hourInput.value = "23";
          } else {
            oldValue--;
            this.hourInput.value = ("0" + oldValue).slice(-2);
          }
        } else {
          if(isNaN(oldValue) || oldValue > 12 || oldValue < 0) {
            this.hourInput.value = "01";
          } else if(oldValue === 1) {
            this.hourInput.value = "12";
          } else {
            oldValue--;
            this.hourInput.value = ("0" + oldValue).slice(-2);
          }
        }
      } catch(e) {
        console.log(e);
      }
    });

    const currentTime = new Date();
    this.minutesInput.value = ("0" + currentTime.getMinutes()).slice(-2);
    if(this.getAttribute("hr-24") === null && currentTime.getHours() > 12) {
      this.hourInput.value =  ("0" + currentTime.getHours() % 12).slice(-2);
      this.pm.classList.remove("lower-opacity");
      this.am.classList.add("lower-opacity");
      this.strAMPM = "PM";
    } else {
      this.hourInput.value = ("0" + currentTime.getHours()).slice(-2);
      this.pm.classList.add("lower-opacity");
      this.am.classList.remove("lower-opacity");
      this.strAMPM = "AM";
    }

    this.am.addEventListener("click", (event) => {
      event.stopPropagation();
      if(this.am.classList.contains("lower-opacity")) {
        this.pm.classList.add("lower-opacity");
        this.am.classList.remove("lower-opacity");
        this.strAMPM = "AM";
      }
    });
    
    this.pm.addEventListener("click", (event) => {
      event.stopPropagation();
      if(this.pm.classList.contains("lower-opacity")) {
        this.am.classList.add("lower-opacity");
        this.pm.classList.remove("lower-opacity");
        this.strAMPM = "PM";
      }
    });

    this.hourInput.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    this.minutesInput.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  get selectedTime() {
    if(this.getAttribute("hr-24") !== null) {
      return `${this.hourInput.value} : ${this.minutesInput.value}`;
    } else {
      return `${this.hourInput.value} : ${this.minutesInput.value} ${this.strAMPM}`;
    }
  }

}

window.customElements.get("vpr-time") || window.customElements.define("vpr-time", Time);
