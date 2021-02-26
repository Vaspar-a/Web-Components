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

/***/ "./assets/scss/time.scss":
/*!*******************************!*\
  !*** ./assets/scss/time.scss ***!
  \*******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"* {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box;\\n  font-family: \\\"Quicksand\\\", sans-serif; }\\n  *:focus {\\n    outline: none; }\\n\\n.highlight {\\n  background-color: rgba(137, 228, 228, 0.527) !important; }\\n\\n.time {\\n  display: flex;\\n  align-items: center;\\n  justify-content: space-around;\\n  background-color: #2667f3;\\n  width: 18rem;\\n  height: max-content; }\\n  .time .hours-panel,\\n  .time .minutes-panel {\\n    display: flex;\\n    align-items: center;\\n    justify-content: space-between;\\n    flex-direction: column;\\n    width: 5rem;\\n    height: 7rem; }\\n    .time .hours-panel .up,\\n    .time .minutes-panel .up {\\n      width: 1.8rem;\\n      height: 1.8rem;\\n      content: url(\\\"../assets/images/chevron.svg\\\");\\n      transform: rotate(90deg);\\n      user-select: none;\\n      cursor: pointer; }\\n    .time .hours-panel .down,\\n    .time .minutes-panel .down {\\n      width: 1.8rem;\\n      height: 1.8rem;\\n      content: url(\\\"../assets/images/chevron.svg\\\");\\n      transform: rotate(-90deg);\\n      user-select: none;\\n      cursor: pointer; }\\n    .time .hours-panel .time-input,\\n    .time .minutes-panel .time-input {\\n      background-color: #2667f3;\\n      color: white;\\n      border: none;\\n      outline: none;\\n      width: 2.5rem;\\n      height: 3.5rem;\\n      font-size: 2.25rem;\\n      text-align: center; }\\n  .time .am-pm {\\n    display: flex;\\n    align-items: center;\\n    justify-content: space-around;\\n    width: 7rem;\\n    height: 7rem; }\\n    .time .am-pm .am,\\n    .time .am-pm .pm {\\n      color: white;\\n      font-size: 1.5rem;\\n      user-select: none;\\n      cursor: pointer; }\\n  .time .colon {\\n    color: white;\\n    font-size: 2.25rem;\\n    user-select: none;\\n    cursor: default; }\\n\\n.lower-opacity {\\n  filter: opacity(80%); }\\n\\n:host([hr-24]) .time {\\n  width: 10rem; }\\n\\n:host([hr-24]) .am-pm {\\n  display: none; }\\n\\n*:focus {\\n  outline: none; }\\n\\n:host {\\n  display: inline-block; }\\n\");\n\n//# sourceURL=webpack://web-components/./assets/scss/time.scss?");

/***/ }),

/***/ "./src/time.js":
/*!*********************!*\
  !*** ./src/time.js ***!
  \*********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_scss_time_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/scss/time.scss */ \"./assets/scss/time.scss\");\n\r\n\r\nclass Time extends HTMLElement {\r\n  \r\n  constructor() {\r\n    super();\r\n    this.template = document.createElement(\"template\");\r\n    this.styles = document.createElement(\"style\");\r\n    this.styles.appendChild(document.createTextNode(_assets_scss_time_scss__WEBPACK_IMPORTED_MODULE_0__.default));\r\n    this.template.innerHTML = `\r\n    <div class=\"time\">\r\n      <div class=\"hours-panel\">\r\n          <i class=\"up\"></i>\r\n          <input class=\"time-input\" value=\"12\" />\r\n          <i class=\"down\"></i>\r\n      </div>\r\n      <p class=\"colon\">&#58</p>\r\n      <div class=\"minutes-panel\">\r\n          <i class=\"up\"></i>\r\n          <input class=\"time-input\" value=\"59\"/>\r\n          <i class=\"down\"></i>\r\n      </div>\r\n      <div class=\"am-pm\">\r\n        <p class=\"am\">AM</p>\r\n        <p class=\"pm\">PM</p>\r\n      </div>\r\n    </div>\r\n        `;\r\n\r\n    this.attachShadow({ mode: \"open\" });\r\n    this.shadowRoot.appendChild(this.styles);\r\n    this.shadowRoot.appendChild(this.template.content.cloneNode(true));\r\n    this.hourInput = this.shadowRoot.querySelector(\".hours-panel .time-input\");\r\n    this.minutesInput = this.shadowRoot.querySelector(\".minutes-panel .time-input\");\r\n    this.hourUp = this.shadowRoot.querySelector(\".hours-panel .up\");\r\n    this.hourDown = this.shadowRoot.querySelector(\".hours-panel .down\");\r\n    this.minutesUp = this.shadowRoot.querySelector(\".minutes-panel .up\");\r\n    this.minutesDown = this.shadowRoot.querySelector(\".minutes-panel .down\");\r\n    this.am = this.shadowRoot.querySelector(\".am\");\r\n    this.pm = this.shadowRoot.querySelector(\".pm\");\r\n  }\r\n\r\n  connectedCallback() {\r\n    this.minutesUp.addEventListener(\"click\", (event) => {\r\n      event.stopPropagation();\r\n      try {\r\n        let oldValue = parseInt(this.minutesInput.value);\r\n        if(isNaN(oldValue) || oldValue > 59 || oldValue < 0) {\r\n          this.minutesInput.value = \"00\";\r\n        } else if(oldValue === 59) {\r\n          this.minutesInput.value = \"00\";\r\n        } else {\r\n          oldValue++;\r\n          this.minutesInput.value = (\"0\" + oldValue).slice(-2);\r\n        }\r\n      } catch(e) {\r\n        console.log(e);\r\n      }\r\n    });\r\n    \r\n    this.minutesDown.addEventListener(\"click\", (event) => {\r\n      event.stopPropagation();\r\n      try {\r\n        let oldValue = parseInt(this.minutesInput.value);\r\n        if(isNaN(oldValue) || oldValue > 59 || oldValue < 0) {\r\n          this.minutesInput.value = \"00\";\r\n        } else if(oldValue === 0) {\r\n          this.minutesInput.value = \"59\";\r\n        } else {\r\n          oldValue--;\r\n          this.minutesInput.value = (\"0\" + oldValue).slice(-2);\r\n        }\r\n      } catch(e) {\r\n        console.log(e);\r\n      }\r\n    });\r\n    \r\n    this.hourUp.addEventListener(\"click\", (event) => {\r\n      event.stopPropagation();\r\n      try {\r\n        let oldValue = parseInt(this.hourInput.value);\r\n        if(this.getAttribute(\"hr-24\") !== null) {\r\n          if(isNaN(oldValue) || oldValue > 23 || oldValue < 0) {\r\n            this.hourInput.value = \"01\";\r\n          } else if(oldValue === 23) {\r\n            this.hourInput.value = \"00\";\r\n          } else {\r\n            oldValue++;\r\n            this.hourInput.value = (\"0\" + oldValue).slice(-2);\r\n          }\r\n        } else {\r\n          if(isNaN(oldValue) || oldValue > 12 || oldValue < 0) {\r\n            this.hourInput.value = \"01\";\r\n          } else if(oldValue === 12) {\r\n            this.hourInput.value = \"01\";\r\n          } else {\r\n            oldValue++;\r\n            this.hourInput.value = (\"0\" + oldValue).slice(-2);\r\n          }\r\n        }\r\n      } catch(e) {\r\n        console.log(e);\r\n      }\r\n    });\r\n    \r\n    this.hourDown.addEventListener(\"click\", (event) => {\r\n      event.stopPropagation();\r\n      try {\r\n        let oldValue = parseInt(this.hourInput.value);\r\n        if(this.getAttribute(\"hr-24\") !== null) {\r\n          if(isNaN(oldValue) || oldValue > 23 || oldValue < 0) {\r\n            this.hourInput.value = \"01\";\r\n          } else if(oldValue === 0) {\r\n            this.hourInput.value = \"23\";\r\n          } else {\r\n            oldValue--;\r\n            this.hourInput.value = (\"0\" + oldValue).slice(-2);\r\n          }\r\n        } else {\r\n          if(isNaN(oldValue) || oldValue > 12 || oldValue < 0) {\r\n            this.hourInput.value = \"01\";\r\n          } else if(oldValue === 1) {\r\n            this.hourInput.value = \"12\";\r\n          } else {\r\n            oldValue--;\r\n            this.hourInput.value = (\"0\" + oldValue).slice(-2);\r\n          }\r\n        }\r\n      } catch(e) {\r\n        console.log(e);\r\n      }\r\n    });\r\n\r\n    const currentTime = new Date();\r\n    this.minutesInput.value = (\"0\" + currentTime.getMinutes()).slice(-2);\r\n    if(this.getAttribute(\"hr-24\") === null && currentTime.getHours() > 12) {\r\n      this.hourInput.value =  (\"0\" + currentTime.getHours() % 12).slice(-2);\r\n      this.pm.classList.remove(\"lower-opacity\");\r\n      this.am.classList.add(\"lower-opacity\");\r\n      this.strAMPM = \"PM\";\r\n    } else {\r\n      this.hourInput.value = (\"0\" + currentTime.getHours()).slice(-2);\r\n      this.pm.classList.add(\"lower-opacity\");\r\n      this.am.classList.remove(\"lower-opacity\");\r\n      this.strAMPM = \"AM\";\r\n    }\r\n\r\n    this.am.addEventListener(\"click\", (event) => {\r\n      event.stopPropagation();\r\n      if(this.am.classList.contains(\"lower-opacity\")) {\r\n        this.pm.classList.add(\"lower-opacity\");\r\n        this.am.classList.remove(\"lower-opacity\");\r\n        this.strAMPM = \"AM\";\r\n      }\r\n    });\r\n    \r\n    this.pm.addEventListener(\"click\", (event) => {\r\n      event.stopPropagation();\r\n      if(this.pm.classList.contains(\"lower-opacity\")) {\r\n        this.am.classList.add(\"lower-opacity\");\r\n        this.pm.classList.remove(\"lower-opacity\");\r\n        this.strAMPM = \"PM\";\r\n      }\r\n    });\r\n\r\n    this.hourInput.addEventListener(\"click\", (event) => {\r\n      event.stopPropagation();\r\n    });\r\n\r\n    this.minutesInput.addEventListener(\"click\", (event) => {\r\n      event.stopPropagation();\r\n    });\r\n  }\r\n\r\n  get selectedTime() {\r\n    if(this.getAttribute(\"hr-24\") !== null) {\r\n      return `${this.hourInput.value} : ${this.minutesInput.value}`;\r\n    } else {\r\n      return `${this.hourInput.value} : ${this.minutesInput.value} ${this.strAMPM}`;\r\n    }\r\n  }\r\n\r\n}\r\n\r\nwindow.customElements.get(\"vpr-time\") || window.customElements.define(\"vpr-time\", Time);\r\n\n\n//# sourceURL=webpack://web-components/./src/time.js?");

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
/******/ 	__webpack_require__("./src/time.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;