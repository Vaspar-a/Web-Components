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

/***/ "./src/inputs.scss":
/*!*************************!*\
  !*** ./src/inputs.scss ***!
  \*************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"* {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box;\\n  font-family: \\\"Quicksand\\\", sans-serif; }\\n  *:focus {\\n    outline: none; }\\n\\n.container {\\n  position: relative;\\n  width: 18rem;\\n  height: 1.875rem;\\n  display: flex;\\n  align-items: center;\\n  justify-content: start; }\\n  .container .label {\\n    display: flex;\\n    align-items: center;\\n    justify-content: flex-start;\\n    border-style: solid;\\n    border-right: none !important;\\n    padding: 0 1rem;\\n    width: 30%;\\n    max-width: 30%;\\n    min-width: max-content;\\n    height: 100%; }\\n  .container .input {\\n    border: none;\\n    border-left: none !important;\\n    border-style: solid;\\n    width: 70%;\\n    height: 100%;\\n    padding: 0 0.25rem;\\n    font-size: 1rem; }\\n  .container:hover .tooltip {\\n    display: inline;\\n    position: absolute;\\n    bottom: 0;\\n    right: 0;\\n    z-index: 1;\\n    font-size: 0.875rem;\\n    padding: 0.25rem;\\n    transform: translate(20%, 105%); }\\n\\n:host([width-size=\\\"md\\\"]) .container {\\n  width: 27rem; }\\n\\n:host([width-size=\\\"lg\\\"]) .container {\\n  width: 36rem; }\\n\\n:host([height-size=\\\"md\\\"]) .container {\\n  height: 2.5rem; }\\n  :host([height-size=\\\"md\\\"]) .container .input {\\n    font-size: 1.25rem; }\\n\\n:host([height-size=\\\"lg\\\"]) .container {\\n  height: 3.125rem; }\\n  :host([height-size=\\\"lg\\\"]) .container .input {\\n    font-size: 1.5rem; }\\n\\n:host([rounded]) .container {\\n  border-radius: 9999px !important; }\\n  :host([rounded]) .container .label {\\n    border-bottom-left-radius: 9999px !important;\\n    border-top-left-radius: 9999px !important; }\\n  :host([rounded]) .container .input {\\n    border-top-right-radius: 9999px !important;\\n    border-bottom-right-radius: 9999px !important; }\\n\\n:host([type=\\\"date\\\"])::-webkit-calendar-picker-indicator,\\n:host([type=\\\"datetime-local\\\"])::-webkit-calendar-picker-indicator,\\n:host([type=\\\"time\\\"])::-webkit-calendar-picker-indicator,\\n:host([type=\\\"week\\\"])::-webkit-calendar-picker-indicator {\\n  display: none; }\\n\\n:host([type=\\\"number\\\"])::-webkit-inner-spin-button {\\n  display: block;\\n  opacity: 1; }\\n\\n.tooltip {\\n  display: none;\\n  opacity: 0.98;\\n  max-width: 100px; }\\n\");\n\n//# sourceURL=webpack://web-components/./src/inputs.scss?");

/***/ }),

/***/ "./src/inputs.js":
/*!***********************!*\
  !*** ./src/inputs.js ***!
  \***********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _inputs_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inputs.scss */ \"./src/inputs.scss\");\n\r\n\r\nconst attrs = [\r\n  \"label-text\",\r\n  \"label-color\",\r\n  \"label-bg-color\",\r\n  \"input-text\",\r\n  \"input-placeholder\",\r\n  \"input-text-color\",\r\n  \"input-text-bg-color\",\r\n  \"tooltip\",\r\n  \"type\",\r\n  \"border-color\",\r\n  \"border-width\",\r\n  \"border-radius\",\r\n  \"detail-text\",\r\n  \"error-text\",\r\n  \"pattern\",\r\n  \"min\",\r\n  \"max\",\r\n  \"step\",\r\n];\r\n\r\nclass Input extends HTMLElement {\r\n  constructor() {\r\n    super();\r\n    this.template = document.createElement(\"template\");\r\n    this.styles = document.createElement(\"style\");\r\n    this.styles.appendChild(document.createTextNode(_inputs_scss__WEBPACK_IMPORTED_MODULE_0__.default));\r\n    this.template.innerHTML = `\r\n    <div class=\"container\">\r\n        <span class=\"label\" part=\"label\">First Name</span>\r\n        <input class=\"input\" part=\"input\" />\r\n        <span class=\"tooltip\" part=\"tooltip\"></span>\r\n    </div>\r\n        `;\r\n\r\n    this.attachShadow({ mode: \"open\" });\r\n    this.shadowRoot.appendChild(this.styles);\r\n    this.shadowRoot.appendChild(this.template.content.cloneNode(true));\r\n    this.container = this.shadowRoot.querySelector(\".container\");\r\n    this.input = this.shadowRoot.querySelector(\".input\");\r\n    this.label = this.shadowRoot.querySelector(\".label\");\r\n    this.tooltip = this.shadowRoot.querySelector(\".tooltip\");\r\n    this.rendered = false;\r\n  }\r\n\r\n  onLabelTextChange() {\r\n    this.label.textContent = this.getAttribute(\"label-text\") || \"Label\";\r\n  }\r\n\r\n  onLabelBgColorChange() {\r\n    this.label.style.backgroundColor =\r\n      this.getAttribute(\"label-bg-color\") || \"rgba(219, 243, 236, 0.79)\";\r\n  }\r\n\r\n  onLabelColorChange() {\r\n    this.label.style.color = this.getAttribute(\"label-color\") || \"black\";\r\n  }\r\n\r\n  onInputTextChange() {\r\n    this.input.value = this.getAttribute(\"input-text\") || \"\";\r\n  }\r\n\r\n  onInputPlaceholderChange() {\r\n    this.input.placeholder = this.getAttribute(\"placeholder\") || \"\";\r\n  }\r\n\r\n  onInputBgColorChange() {\r\n    this.input.style.backgroundColor =\r\n      this.getAttribute(\"input-bg-color\") || \"rgba(255, 255, 255, 0)\";\r\n  }\r\n\r\n  onInputColorChange() {\r\n    this.input.style.color = this.getAttribute(\"input-color\") || \"black\";\r\n  }\r\n\r\n  onTooltipChange() {\r\n    if (this.getAttribute(\"tooltip\") !== null) {\r\n      this.tooltip.textContent = this.getAttribute(\"tooltip\");\r\n      this.tooltip.style.width = \"max-content\";\r\n      this.tooltip.style.height = \"max-content\";\r\n      this.tooltip.style.color = this.getAttribute(\"tooltip-color\") || \"white\";\r\n      this.tooltip.style.backgroundColor =\r\n        this.getAttribute(\"tooltip-bg-color\") || \"black\";\r\n    } else {\r\n      this.tooltip.style.width = \"0px\";\r\n      this.tooltip.style.height = \"0px\";\r\n      this.tooltip.style.padding = \"0px\";\r\n    }\r\n  }\r\n\r\n  onInputTypeChange() {\r\n    this.input.type = this.getAttribute(\"type\") || \"text\";\r\n  }\r\n\r\n  onBorderColorChange() {\r\n    this.label.style.borderColor =\r\n      this.getAttribute(\"border-color\") || \"rgba(0, 0, 0, 0.7)\";\r\n    this.input.style.borderColor =\r\n      this.getAttribute(\"border-color\") || \"rgba(0, 0, 0, 0.7)\";\r\n  }\r\n\r\n  onBorderWidthChange() {\r\n    this.label.style.borderWidth =\r\n      this.getAttribute(\"border-width\") || \"2px\";\r\n    this.input.style.borderWidth =\r\n      this.getAttribute(\"border-width\") || \"2px\";\r\n  }\r\n\r\n  onBorderRadiusChange() {\r\n    this.container.style.borderRadius =\r\n      this.getAttribute(\"border-radius\") || \"1rem\";\r\n    this.label.style.borderTopLeftRadius =\r\n      this.getAttribute(\"border-radius\") || \"1rem\";\r\n    this.label.style.borderBottomLeftRadius =\r\n      this.getAttribute(\"border-radius\") || \"1rem\";\r\n    this.input.style.borderTopRightRadius =\r\n      this.getAttribute(\"border-radius\") || \"1rem\";\r\n    this.input.style.borderBottomRightRadius =\r\n      this.getAttribute(\"border-radius\") || \"1rem\";\r\n  }\r\n\r\n  render() {\r\n    this.rendered = true;\r\n    this.onBorderColorChange();\r\n    this.onBorderRadiusChange();\r\n    this.onBorderWidthChange();\r\n    this.onInputBgColorChange();\r\n    this.onInputColorChange();\r\n    this.onInputPlaceholderChange();\r\n    this.onInputTextChange();\r\n    this.onInputTypeChange();\r\n    this.onLabelBgColorChange();\r\n    this.onLabelColorChange();\r\n    this.onLabelTextChange();\r\n    this.onTooltipChange();\r\n  }\r\n\r\n  connectedCallback() {\r\n    this.render();\r\n  }\r\n\r\n  static get observedAttributes() {\r\n    return attrs;\r\n  }\r\n\r\n  attributeChangedCallback(name, oldValue, newValue) {\r\n    // this.render();\r\n    if (this.rendered) {\r\n      switch (name) {\r\n        case \"border-color\":\r\n          this.onBorderColorChange();\r\n          break;\r\n        case \"border-radius\":\r\n          this.onBorderRadiusChange();\r\n          break;\r\n        case \"border-width\":\r\n          this.onBorderWidthChange();\r\n          break;\r\n        case \"input-bg-color\":\r\n          this.onInputBgColorChange();\r\n          break;\r\n        case \"input-color\":\r\n          this.onInputColorChange();\r\n          break;\r\n        case \"placeholder\":\r\n          this.onInputPlaceholderChange();\r\n          break;\r\n        case \"input-text\":\r\n          this.onInputTextChange();\r\n          break;\r\n        case \"type\":\r\n          this.onInputTypeChange();\r\n          break;\r\n        case \"label-bg-color\":\r\n          this.onLabelBgColorChange();\r\n          break;\r\n        case \"label-color\":\r\n          this.onLabelColorChange();\r\n          break;\r\n        case \"label-text\":\r\n          this.onLabelTextChange();\r\n          break;\r\n        case \"tooltip\":\r\n          this.onTooltipChange();\r\n          break;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nwindow.customElements.define(\"vpr-input\", Input);\r\n\n\n//# sourceURL=webpack://web-components/./src/inputs.js?");

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
/******/ 	__webpack_require__("./src/inputs.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;