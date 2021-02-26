import styles from "../assets/scss/table.scss";

class Table extends HTMLElement {
  constructor() {
    super();
    this.template = document.createElement("template");
    this.styles = document.createElement("style");
    this.styles.appendChild(document.createTextNode(styles));

    const filterTable = `
    <div class="wrapper">
      <div class="filter-container">
        <vpr-filter class="filter-bar" part="filter-bar"></vpr-filter>
        <i class="filter-icon" type="filter-icon"></i>
      </div>
      <div class="table-container">
        <span class="for-serial-nos left-cover-up hide" part="add-button"></span>
        <table class="table" part="table" cellspacing="0" cellpadding="0">
            <thead class="thead" part="thead"></thead>
            <tbody class="tbody" part="tbody"></tbody>
        </table>
      </div>
    </div>
    `;

    const table = `
    <div class="table-container">
      <span class="for-serial-nos left-cover-up hide" part="add-button"></span>
      <table class="table" part="table" cellspacing="0" cellpadding="0">
        <thead class="thead" part="thead"></thead>
        <tbody class="tbody" part="tbody"></tbody>
      </table>
    </div>
    `;

    if(this.getAttribute("filterable") !== null) {
      this.template.innerHTML = filterTable;
    } else {
      this.template.innerHTML = table;
    }
    
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.styles);
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.table = this.shadowRoot.querySelector(".table");
    this.thead = this.shadowRoot.querySelector(".thead");
    this.tbody = this.shadowRoot.querySelector(".tbody");
    this.leftCoverUp = this.shadowRoot.querySelector(".left-cover-up");
    this.filterIcon = this.shadowRoot.querySelector(".filter-icon");
    this.filterBar = this.shadowRoot.querySelector(".filter-bar");
    this.handleKeyPressDown = this.handleKeyPressDown.bind(this);
    this.addNewRow = this.addNewRow.bind(this);
    this.deleteARow = this.deleteARow.bind(this);
  }

  connectedCallback() {
    this.leftCoverUp.addEventListener("click", this.addNewRow);
    this.filterIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      this.filterBar.classList.toggle("show-filter");
    });
  }

  setHeightForCoverUp() {
    const thElelment = this.shadowRoot.querySelector(".header-cell");
    const height = getComputedStyle(thElelment).getPropertyValue("height");
    this.leftCoverUp.style.height = height;
    // this.rightCoverUp.style.height = height;
  }

  setHeightForTableContainer() {
    const tableContainer = this.shadowRoot.querySelector(".table-container");
    const tableHeight = getComputedStyle(this.table).getPropertyValue("height");
    tableContainer.style.height = tableHeight;
  }

  setTableHeader(header) {
    let theadStr = `<tr class="header-row" part="header-row">`;

    if (this.getAttribute("show-row-num") !== null) {
      theadStr += `<th class="header-cell for-serial-nos freeze-header-cell" part="header-cell"></th>`;
      this.leftCoverUp.classList.remove("hide");
    }

    header.forEach((headerText) => {
      theadStr += `<th class="header-cell freeze-header-cell" part="header-cell">${headerText}<i part="sort-arrow"></i></th>`;
    });

    if (this.getAttribute("editable") !== null) {
      theadStr += `<th class="header-cell for-serial-nos freeze-header-cell" part="header-cell"></th>`;
      this.leftCoverUp.classList.remove("hide");
      this.leftCoverUp.classList.add("add-row");
    }

    theadStr += `</tr>`;

    this.thead.innerHTML = theadStr;
    this.colLength = header.length;

    this.setHeightForCoverUp();
    if (this.getAttribute("sortable") !== null) {
      this.setOnClickOnHeader();
    }
  }

  setTableBody(body) {
    if(this.bodyData === undefined) {
      this.bodyData = [...body];
    }

    let tbodyStr = "";
    this.bodyData.forEach((row, rowIndex) => {
      tbodyStr += `<tr id="r${rowIndex}" class="body-row" part="body-row">`;

      if (this.getAttribute("show-row-num") !== null) {
        tbodyStr += `<td class="body-cell for-serial-nos freeze-body-cell" part="body-cell">${
          rowIndex + 1
        }</td>`;
      }

      row.forEach((cellText, colIndex) => {
        tbodyStr += `<td id="r${rowIndex}c${colIndex}" class="body-cell" part="body-cell" ${
          this.getAttribute("editable") === null ? "" : "contenteditable"
        }>${cellText}</td>`;
      });

      if (this.getAttribute("editable") !== null) {
        tbodyStr += `<td class="body-cell for-serial-nos freeze-trash" id="trash-${rowIndex}" part="body-cell"><i class="trash-button" id="i-${rowIndex}" part="trash-button"></i></td>`;
      }

      tbodyStr += `</tr>`;
    });

    this.tbody.innerHTML = tbodyStr;
    this.rowLength = this.bodyData.length;

    this.setArrowKeyEvents();
    this.setInputEventOnBodyCells();
    this.setDeleteRowOnTrash();
    this.setHeightForTableContainer();
    if (this.filterBar !== undefined) {
      const callback = (rowId, colId) => `#r${rowId}c${colId}`;
      this.filterBar.setFilter(this.shadowRoot, this.bodyData, callback);
      this.filterBar.setOnClickClose(() => {
        this.filterBar.classList.toggle("show-filter");
      });
    }
  }

  setTable(header, body) {
    this.setTableHeader(header);
    this.setTableBody(body);
  }

  setArrowKeyEvents() {
    const cells = this.shadowRoot.querySelectorAll(".body-cell");
    cells.forEach((cell) => {
      cell.addEventListener("keydown", this.handleKeyPressDown);
    });
  }

  setDeleteRowOnTrash() {
    const trashElements = this.shadowRoot.querySelectorAll(".freeze-trash");
    const trashIconElements = this.shadowRoot.querySelectorAll(".trash-button");

    trashElements.forEach((trashElement, index) => {
      trashElement.addEventListener("click", (event) => { this.deleteARow(event, index) });
    });
    
    trashIconElements.forEach((trashIconElement, index) => {
      trashIconElement.addEventListener("click", (event) => { this.deleteARow(event, index) });
    });
  }

  setInputEventOnBodyCells() {
    const cells = this.shadowRoot.querySelectorAll(".body-cell");
    cells.forEach((cell) => {
      cell.addEventListener("input", (event) => {
        event.stopPropagation();
        const rowIndex = parseInt(event.target.id.substring(1, event.target.id.indexOf("c")));
        const cellIndex = parseInt(event.target.id.substring(event.target.id.indexOf("c") + 1));
        this.bodyData[rowIndex][cellIndex] = cell.textContent;
      });
    });
  }

  // onKeyPressDown with ctrl
  handleKeyPressDown(event) {
    let currentId = event.target.id;
    let rowId = event.target.parentNode.id.slice(1);
    let colId = currentId.substring(currentId.indexOf("c") + 1);
    if (event.ctrlKey && event.key === "ArrowLeft") {
      // left
      event.stopPropagation();
      let colNo = this.leftKey(this.colLength, colId);
      let newId = "r" + rowId + "c" + colNo;
      this.shadowRoot.querySelector(`#${newId}`).focus();
    } else if (event.ctrlKey && event.key === "ArrowUp") {
      // up
      event.stopPropagation();
      let rowNo = this.upKey(this.rowLength, rowId);
      let newId = "r" + rowNo + "c" + colId;
      this.shadowRoot.querySelector(`#${newId}`).focus();
    } else if (event.ctrlKey && event.key === "ArrowRight") {
      // right
      event.stopPropagation();
      let colNo = this.rightKey(this.colLength, colId);
      let newId = "r" + rowId + "c" + colNo;
      this.shadowRoot.querySelector(`#${newId}`).focus();
    } else if (event.ctrlKey && event.key === "ArrowDown") {
      // down
      event.stopPropagation();
      let rowNo = this.downKey(this.rowLength, rowId);
      let newId = "r" + rowNo + "c" + colId;
      this.shadowRoot.querySelector(`#${newId}`).focus();
    } else if (event.ctrlKey && event.shiftKey && event.key === "Enter") {
      // insert row before
      event.stopPropagation();
      this.insertNewRow(parseInt(rowId, 10));
    } else if (event.ctrlKey && event.key === "Enter") {
      // insert row after
      event.stopPropagation();
      this.insertNewRow(parseInt(rowId, 10) + 1);
    } 
  }

  // Formula when ctrl + upArrow is pressed
  upKey(totalRows, rowNo) {
    rowNo = parseInt(rowNo, 10);
    let newRowNo = (totalRows + (rowNo - 1)) % totalRows;
    return newRowNo;
  }

  // Formula when ctrl + downArrow is pressed
  downKey(totalRows, rowNo) {
    rowNo = parseInt(rowNo, 10);
    let newRowNo = (totalRows + (rowNo + 1)) % totalRows;
    return newRowNo;
  }

  // Formula when ctrl + leftArrow is pressed
  leftKey(totalCols, colNo) {
    colNo = parseInt(colNo, 10);
    let newColNo = (totalCols + (colNo - 1)) % totalCols;
    return newColNo;
  }

  // Formula when ctrl + rightArrow is pressed
  rightKey(totalCols, colNo) {
    colNo = parseInt(colNo, 10);
    let newColNo = (totalCols + (colNo + 1)) % totalCols;
    return newColNo;
  }

  insertNewRow(rowIndex) {
    let row = [];
    for(let i = 0; i < this.colLength; i++) row[i] = "";
    this.bodyData.splice(rowIndex, 0, row);
    this.setTableBody(this.bodyData);
    this.shadowRoot.querySelector(`#r${rowIndex}c0`).focus();
  }

  addNewRow(event) {
    event.stopPropagation();
    let row = [];
    for(let i = 0; i < this.colLength; i++) row[i] = "";
    this.bodyData.push(row);
    this.setTableBody(this.bodyData);
    this.shadowRoot.querySelector(`#r${this.rowLength - 1}c0`).focus();
  }

  deleteARow(event, index) {
    event.stopPropagation();
    this.bodyData.splice(index, 1);
    this.setTableBody(this.bodyData);
  }

  sortTable(index, order) {
    if(order === "ascending") {
      this.bodyData.sort((arr1, arr2) => {
          return arr1[index].localeCompare(arr2[index]);
      });
    } else if (order === "descending") {
      this.bodyData.sort((arr1, arr2) => {
        return arr2[index].localeCompare(arr1[index]);
      });
    }
  }

  setOnClickOnHeader() {
    const headers = this.shadowRoot.querySelectorAll(".header-cell");
    this.currentSortCol = this.shadowRoot.querySelector(".header-cell i");
    let order = "";
    headers.forEach((header, index) => {
      header.addEventListener("click", (event) => {
        event.stopPropagation();
        
        const sortArrow = header.firstElementChild;
        if (this.currentSortCol !== sortArrow) {
          this.currentSortCol.classList.remove("asc-arrow");
          this.currentSortCol.classList.remove("desc-arrow");
          this.currentSortCol = sortArrow;
        }
        
        if (sortArrow.classList.length === 0 || sortArrow.classList.contains("desc-arrow")) {
          sortArrow.classList.remove("desc-arrow");
          sortArrow.classList.add("asc-arrow");
          order = "ascending";
        } else if (sortArrow.classList.contains("asc-arrow")) {
          sortArrow.classList.remove("asc-arrow");
          sortArrow.classList.add("desc-arrow");
          order = "descending";
        }
        
        if(index > 0 && index <= this.colLength) {
          this.sortTable(index - 1, order);
          this.setTableBody();
        }
      });
    });
  }
}

window.customElements.get("vpr-table") ||
  window.customElements.define("vpr-table", Table);
