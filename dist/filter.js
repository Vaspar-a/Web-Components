/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/scss/filter.scss":
/*!*********************************!*\
  !*** ./assets/scss/filter.scss ***!
  \*********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"* {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box;\\n  font-family: \\\"Quicksand\\\", sans-serif; }\\n  *:focus {\\n    outline: none; }\\n\\n.highlight {\\n  background-color: rgba(137, 228, 228, 0.527) !important; }\\n\\n.container {\\n  width: 18rem;\\n  height: 2.5rem;\\n  border: 2px solid black;\\n  display: flex;\\n  justify-content: space-around;\\n  align-items: center;\\n  border-radius: 0.5rem; }\\n  .container:focus-within {\\n    border-color: #127cd3; }\\n  .container .input {\\n    width: 50%;\\n    height: 1.875rem;\\n    border: none;\\n    outline: none;\\n    padding-inline: 7px;\\n    border-right: 1px solid black; }\\n    .container .input:focus {\\n      border-color: #127cd3; }\\n  .container .match-text {\\n    display: inline;\\n    padding-inline: 7px; }\\n  .container .icon {\\n    width: 1.6rem;\\n    height: 1.875rem;\\n    cursor: pointer; }\\n\\n.up-search {\\n  content: url(\\\"../assets/images/chevron-up.svg\\\"); }\\n\\n.down-search {\\n  content: url(\\\"../assets/images/chevron-up.svg\\\");\\n  transform: rotate(180deg); }\\n\\n.close {\\n  content: url(\\\"../assets/images/close.svg\\\");\\n  padding-right: 7px; }\\n\");\n\n//# sourceURL=webpack://web-components/./assets/scss/filter.scss?");

/***/ }),

/***/ "./src/filter.js":
/*!***********************!*\
  !*** ./src/filter.js ***!
  \***********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_scss_filter_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/scss/filter.scss */ \"./assets/scss/filter.scss\");\n\r\n\r\nclass Filter extends HTMLElement {\r\n  constructor() {\r\n    super();\r\n    this.template = document.createElement(\"template\");\r\n    this.styles = document.createElement(\"style\");\r\n    this.styles.appendChild(document.createTextNode(_assets_scss_filter_scss__WEBPACK_IMPORTED_MODULE_0__.default));\r\n    this.template.innerHTML = `\r\n    <div class=\"container\">\r\n      <input class=\"input\" part=\"input\"/>\r\n      <p class=\"match-text\" part=\"match-text\"></p>\r\n      <i class=\"icon up-search\" part=\"up-search\"></i>\r\n      <i class=\"icon down-search\" part=\"down-search\"></i>\r\n      <i class=\"icon close\" part=\"close\"></i>\r\n    </div>\r\n        `;\r\n\r\n    this.attachShadow({ mode: \"open\" });\r\n    this.shadowRoot.appendChild(this.styles);\r\n    this.shadowRoot.appendChild(this.template.content.cloneNode(true));\r\n    this.input = this.shadowRoot.querySelector(\".input\");\r\n    this.matchText = this.shadowRoot.querySelector(\".match-text\");\r\n    this.searchUp = this.shadowRoot.querySelector(\".up-search\");\r\n    this.searchDown = this.shadowRoot.querySelector(\".down-search\");\r\n    this.close = this.shadowRoot.querySelector(\".close\");\r\n    this.filteredIndex = 0;\r\n    this.setOnClickClose = this.setOnClickClose.bind(this);\r\n  }\r\n\r\n  connectedCallback() {\r\n    this.input.addEventListener(\"change\", (event) => {\r\n      event.stopPropagation();\r\n      \r\n      this.filterData();\r\n\r\n      if (this.filteredData.length > 0) {\r\n        this.matchText.textContent = `${this.filteredIndex + 1}/${\r\n          this.filteredData.length\r\n        }`;\r\n        this.searchElement.querySelector(this.filteredData[0]).focus();\r\n      } else {\r\n        this.matchText.textContent = `0/0`;\r\n      }\r\n    });\r\n\r\n    this.setOnClickSearchUp();\r\n    this.setOnClickSearchDown();\r\n  }\r\n\r\n  setFilter(searchElement, data, idGenerator) {\r\n    this.searchElement = searchElement;\r\n    this.data = data;\r\n    this.idGenerator = idGenerator;\r\n    this.filterData();\r\n  }\r\n\r\n  setOnClickClose(callback) {\r\n    this.close.addEventListener(\"click\", (event) => {\r\n      event.stopPropagation();\r\n      event.stopImmediatePropagation();\r\n      callback();\r\n    });\r\n  }\r\n\r\n  setOnClickSearchUp() {\r\n    this.searchUp.addEventListener(\"click\", (event) => {\r\n      event.stopPropagation();\r\n      event.stopImmediatePropagation();\r\n      console.log(this.filteredIndex);\r\n      if (this.filteredData.length > 0) {\r\n        this.filteredIndex = this.filteredIndex + 1;\r\n        this.filteredIndex = this.filteredIndex % this.filteredData.length;\r\n        this.searchElement\r\n          .querySelector(this.filteredData[this.filteredIndex])\r\n          .focus();\r\n        this.matchText.textContent = `${this.filteredIndex + 1}/${\r\n          this.filteredData.length\r\n        }`;\r\n      } else {\r\n        this.matchText.textContent = `0/0`;\r\n      }\r\n    });\r\n  }\r\n\r\n  setOnClickSearchDown() {\r\n    this.searchDown.addEventListener(\"click\", (event) => {\r\n      event.stopPropagation();\r\n      event.stopImmediatePropagation();\r\n      console.log(this.filteredIndex);\r\n      if (this.filteredIndex > 0) {\r\n        if (this.filteredData.length > 0) {\r\n          this.filteredIndex =\r\n            (this.filteredIndex - 1) % this.filteredData.length;\r\n          this.searchElement\r\n            .querySelector(this.filteredData[this.filteredIndex])\r\n            .focus();\r\n          this.matchText.textContent = `${this.filteredIndex + 1}/${\r\n            this.filteredData.length\r\n          }`;\r\n        } else {\r\n          this.matchText.textContent = `0/0`;\r\n        }\r\n      } else {\r\n        this.filteredIndex = this.filteredData.length - 1;\r\n        this.searchElement\r\n          .querySelector(this.filteredData[this.filteredIndex])\r\n          .focus();\r\n        this.matchText.textContent = `${this.filteredIndex + 1}/${\r\n          this.filteredData.length\r\n        }`;\r\n      }\r\n    });\r\n  }\r\n\r\n  filterData() {\r\n    this.filteredData = [];\r\n    this.filteredIndex = 0;\r\n    this.data.forEach((row, rowIndex) => {\r\n      row.forEach((cell, cellIndex) => {\r\n        if (this.input.value.trim() !== \"\" && cell.includes(this.input.value)) {\r\n          const id = this.idGenerator(rowIndex, cellIndex);\r\n          this.filteredData.push(id);\r\n        }\r\n      });\r\n    });\r\n  }\r\n}\r\n\r\nwindow.customElements.get(\"vpr-filter\") ||\r\n  window.customElements.define(\"vpr-filter\", Filter);\r\n\n\n//# sourceURL=webpack://web-components/./src/filter.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/filter.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;