import styles from "../assets/scss/calendar.scss";
import "./select";
import "./button";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class Calendar extends HTMLElement {
  
  constructor() {
    super();
    this.template = document.createElement("template");
    this.styles = document.createElement("style");
    this.styles.appendChild(document.createTextNode(styles));
    this.template.innerHTML = `
    <div class="calendar">
      <div class="month">
          <i class="prev"></i>
          <div class="select-container">
              <vpr-select editable onSpaceToggle class="month-select"></vpr-select>
              <vpr-select editable onSpaceToggle class="year-select"></vpr-select>
          </div>
          <i class="next"></i>
      </div>
      <div class="weekdays"></div>
      <vpr-button border-radius="0px" class="today-btn" bg-color="#ffffff" color="#167e56" text="Today"></vpr-button>
    </div>
        `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.styles);
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.weekdays = this.shadowRoot.querySelector(".weekdays");
    this.monthSelect = this.shadowRoot.querySelector(".month-select");
    this.yearSelect = this.shadowRoot.querySelector(".year-select");
    this.todayButton = this.shadowRoot.querySelector(".today-btn");
    this.prevButton = this.shadowRoot.querySelector(".prev");
    this.nextButton = this.shadowRoot.querySelector(".next");
    this.isOpen = false;
    this.today = new Date();
    this.minDate = new Date(1500, 0, 5);
    this.maxDate = new Date(5000, 0, 5);
    this.selectedDate = this.today;

    this.onMonthSelect = this.onMonthSelect.bind(this);
    this.onYearSelect = this.onYearSelect.bind(this);
  }

  setMinDate() {
    if(this.getAttribute('min') !== null && this.getAttribute('min') !== "null") {
      try {
        const date = this.getAttribute('min').split("/");
        this.minDate = new Date(parseInt(date[2]), parseInt(date[1]) - 1, parseInt(date[0]));
      } catch {
        this.minDate = new Date(1500, 0);
      }
    }
  }

  setMaxDate() {
    if(this.getAttribute('max') !== null && this.getAttribute('max') !== "null") {
      try {
        const date = this.getAttribute('max').split("/");
        this.maxDate = new Date(parseInt(date[2]), parseInt(date[1]) - 1, parseInt(date[0]));
      } catch {
        this.maxDate = new Date(5000, 0);
      }
    }
  }

  setMinDateLimit(date) {
    if(date.getFullYear() === this.minDate.getFullYear() && date.getMonth() === this.minDate.getMonth()) {
      // Add disable class on prev-date
      const prevDateElements = this.shadowRoot.querySelectorAll('.prev-date');
      prevDateElements.forEach(prevDateElement => {
        prevDateElement.classList.add('disable');
      });
      // Add disable class on dates before minDate
      const dateElements = this.shadowRoot.querySelectorAll('.date');
      dateElements.forEach(dateElement => {
        if(!dateElement.classList.contains('prev-date') && !dateElement.classList.contains('next-date')) {
          const dateNumber = parseInt(dateElement.textContent);
          if(dateNumber < this.minDate.getDate()) {
            dateElement.classList.add('disable');
          }
        }
      });
    }
  }

  setMaxDateLimit(date) {
    if(date.getFullYear() === this.maxDate.getFullYear() && date.getMonth() === this.maxDate.getMonth()) {
      // Add disable class on next-date
      const nextDateElements = this.shadowRoot.querySelectorAll('.next-date');
      nextDateElements.forEach(nextDateElement => {
        nextDateElement.classList.add('disable');
      });
      // Add disable class on dates after maxDate
      const dateElements = this.shadowRoot.querySelectorAll('.date');
      dateElements.forEach(dateElement => {
        if(!dateElement.classList.contains('prev-date') && !dateElement.classList.contains('next-date')) {
          const dateNumber = parseInt(dateElement.textContent);
          if(dateNumber > this.maxDate.getDate()) {
            dateElement.classList.add('disable');
          }
        }
      });
    }
  }

  renderCalendar(date) {
    const maxCond = date <= this.maxDate;
    const minCond = date >= this.minDate;
    
    if(minCond && maxCond) {
      this.renderDates(date);
    } else if(date.getFullYear() === this.minDate.getFullYear() && date.getMonth() === this.minDate.getMonth()) {
      date.setDate(this.minDate.getDate());
      this.renderDates(date);
    } else if(date.getFullYear() === this.maxDate.getFullYear() && date.getMonth() === this.maxDate.getMonth()) {
      date.setDate(this.maxDate.getDate());
      this.renderDates(date);
    } 

    if(!minCond) {
      this.selectedDate = this.minDate;
      this.monthSelect.setDefaultOption(this.minDate.getMonth());
      this.yearSelect.setDefaultOption(0);
    } else if(!maxCond) {
      this.selectedDate = this.maxDate;
      this.monthSelect.setDefaultOption(this.maxDate.getMonth());
      this.yearSelect.setDefaultOption(this.maxDate.getFullYear() - this.minDate.getFullYear());
    } else {
      this.monthSelect.setDefaultOption(this.selectedDate.getMonth());
      this.yearSelect.setDefaultOption(this.selectedDate.getFullYear() - this.minDate.getFullYear());
    }
  }

  renderDates(date) {
    const lastDateOfPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
    const lastDateOfCurrMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.weekdays.innerHTML = "";
    let daysDates = "";

    days.forEach((day) => {
      daysDates += `<div class="day">${day}</div>`;
    });

    // Prev month's dates
    // Runs (lastDateOfPrevMonth.getDay() + 1) times
    for (let i = lastDateOfPrevMonth.getDay(); i >= 0; i--) {
      daysDates += `<div class="date prev-date">${lastDateOfPrevMonth.getDate() - i}</div>`;
    }

    // Curr month's dates
    // Runs (lastDateOfCurrMonth.getDate()) times
    for (let i = 1; i <= lastDateOfCurrMonth.getDate(); i++) {
      if ( this.selectedDate.getDate() === i && this.selectedDate.getMonth() === date.getMonth() && this.selectedDate.getFullYear() === date.getFullYear() ) {
        daysDates += `<div class="date today">${i}</div>`;
      } else {
        daysDates += `<div class="date">${i}</div>`;
      }
    }

    // Next month's dates
    // Runs (6 - lastDateOfCurrMonth.getDay()) times
    for (let i = 1; i <=  42 - lastDateOfCurrMonth.getDate() - (lastDateOfPrevMonth.getDay() + 1); i++) {
      daysDates += `<div class="date next-date">${i}</div>`;
    }

    this.weekdays.innerHTML = daysDates;

    this.setMinDateLimit(date);
    this.setMaxDateLimit(date);
    this.onDateClick();
  }

  connectedCallback() {
    this.setMinDate();
    this.setMaxDate();
    
    let years = [];
    for (let i = this.minDate.getFullYear(); i <= this.maxDate.getFullYear(); i++) {
      years.push(i.toString());
    }

    this.monthSelect.setOptions(months, this.onMonthSelect);
    this.yearSelect.setOptions(years, this.onYearSelect);
    
    if (this.selectedDate < this.minDate) {
      this.selectedDate = this.minDate;
    } else if (this.selectedDate > this.maxDate) {
      this.selectedDate = this.maxDate;
    }
    this.renderCalendar(this.selectedDate);
    
    this.prevButton.addEventListener('click', (event) => {
      event.stopPropagation();
      if(this.selectedDate.getMonth() === 0) {
        this.selectedDate = new Date(this.selectedDate.getFullYear() - 1, 11)
        this.renderCalendar(this.selectedDate);
      } else {
        this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() - 1)
        this.renderCalendar(this.selectedDate);
      }
    });

    this.nextButton.addEventListener('click', (event) => {
      event.stopPropagation();
      if(this.selectedDate.getMonth() === 11) {
        this.selectedDate = new Date(this.selectedDate.getFullYear() + 1, 0)
        this.renderCalendar(this.selectedDate);
      } else {
        this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1)
        this.renderCalendar(this.selectedDate);
      }
    });

    this.todayButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.selectedDate = this.today;
      this.renderCalendar(this.selectedDate);
      if(this.callback !== undefined)  this.callback();
    });
  }

  setOnDateClick(callback, error) {
    if(callback !== undefined)  this.callback = callback;
    if(error !== undefined) this.error = error;
  }

  onDateClick() {
    const dates = this.shadowRoot.querySelectorAll(".date");
    dates.forEach(date => {
      date.addEventListener('click', (event) => {
        event.stopPropagation();
        if(date.classList.contains('disable')) {
          if(this.error !== undefined) this.error();
        } else if(date.classList.contains('prev-date')) {
          if(this.selectedDate.getMonth() === 0) {
            this.selectedDate = new Date(this.selectedDate.getFullYear() - 1, 11, parseInt(date.textContent));
            if(this.callback !== undefined)  this.callback();
          } else {
            this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() - 1, parseInt(date.textContent));
            if(this.callback !== undefined)  this.callback();
          }
        } else if(date.classList.contains('next-date')) {
          if(this.selectedDate.getMonth() === 11) {
            this.selectedDate = new Date(this.selectedDate.getFullYear() + 1, 0, parseInt(date.textContent));
            if(this.callback !== undefined)  this.callback();
          } else {
            this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, parseInt(date.textContent));
            if(this.callback !== undefined)  this.callback();
          }
        } else {
          this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), parseInt(date.textContent));
          if(this.callback !== undefined)  this.callback();
        }
        
        this.renderCalendar(this.selectedDate);
      });
    });
  }

  onMonthSelect(event) {
    const month = this.monthSelect.selectedOption;
    this.selectedDate = new Date(this.selectedDate.getFullYear(), months.indexOf(month));
    if(this.selectedDate > this.maxDate) {
      this.selectedDate = this.maxDate;
    } else if(this.selectedDate < this.minDate) {
      this.selectedDate = this.minDate;
    }
    this.renderCalendar(this.selectedDate);
  }

  onYearSelect(event) {
    const year = this.yearSelect.selectedOption;
    this.selectedDate = new Date(parseInt(year), this.selectedDate.getMonth());
    if(this.selectedDate > this.maxDate) {
      this.selectedDate = this.maxDate;
    } else if(this.selectedDate < this.minDate) {
      this.selectedDate = this.minDate;
    }
    this.renderCalendar(this.selectedDate);
  }
}

window.customElements.get("vpr-calendar") || window.customElements.define("vpr-calendar", Calendar);
