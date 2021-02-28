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

/***/ "./assets/scss/button.scss":
/*!*********************************!*\
  !*** ./assets/scss/button.scss ***!
  \*********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"* {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box;\\n  font-family: \\\"Quicksand\\\", sans-serif; }\\n  *:focus {\\n    outline: none; }\\n\\n.highlight {\\n  background-color: rgba(137, 228, 228, 0.527) !important; }\\n\\n.btn {\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  position: relative;\\n  width: fit-content;\\n  height: fit-content;\\n  padding: 0.5rem 0.75rem;\\n  border-radius: 0.125rem;\\n  text-align: center;\\n  background-color: #0059ac;\\n  border: none;\\n  outline: none;\\n  cursor: pointer; }\\n  .btn:hover .tooltip {\\n    display: inline;\\n    position: absolute;\\n    bottom: 0%;\\n    right: 0%;\\n    z-index: 1;\\n    transform: translate(80%, 110%); }\\n  .btn:focus {\\n    border: 2px solid #00063d; }\\n\\n:host([size=\\\"sm\\\"]) .btn {\\n  padding: 0.5rem 1rem; }\\n\\n:host([size=\\\"md\\\"]) .btn {\\n  padding: 0.5rem 2.25rem; }\\n\\n:host([size=\\\"lg\\\"]) .btn {\\n  padding: 0.5rem 4.5rem; }\\n\\n:host([disabled]) .btn {\\n  cursor: not-allowed;\\n  filter: opacity(70%); }\\n  :host([disabled]) .btn:hover {\\n    filter: opacity(70%); }\\n  :host([disabled]) .btn:focus {\\n    border: none; }\\n\\n:host([img-pos=\\\"left\\\"]) .img {\\n  order: 1;\\n  margin: 0 0.25rem; }\\n\\n:host([img-pos=\\\"left\\\"]) .text {\\n  order: 2; }\\n\\n:host([img-pos=\\\"top\\\"]) .btn {\\n  flex-direction: column; }\\n\\n:host([img-pos=\\\"top\\\"]) .img {\\n  order: 1;\\n  margin: 0.25rem 0; }\\n\\n:host([img-pos=\\\"top\\\"]) .text {\\n  order: 2; }\\n\\n:host([img-pos=\\\"bottom\\\"]) .btn {\\n  flex-direction: column-reverse; }\\n\\n:host([img-pos=\\\"bottom\\\"]) .img {\\n  order: 1;\\n  margin: 0.25rem 0; }\\n\\n:host([img-pos=\\\"bottom\\\"]) .text {\\n  order: 2; }\\n\\n.img {\\n  width: 0px;\\n  height: 0px; }\\n\\n.img-on-right {\\n  margin: 0 0.25rem; }\\n\\n.tooltip {\\n  display: none;\\n  width: max-content;\\n  max-width: 27rem;\\n  height: max-content;\\n  padding: 0;\\n  background-color: black;\\n  color: white;\\n  opacity: 0.98;\\n  font-size: 0.875rem; }\\n\\n:host([rounded]) .btn {\\n  border-radius: 9999px; }\\n\\n.text {\\n  color: #f0ffff; }\\n\\n*:focus {\\n  outline: none; }\\n\\n:host {\\n  display: inline-block; }\\n\");\n\n//# sourceURL=webpack://web-components/./assets/scss/button.scss?");

/***/ }),

/***/ "./src/button.js":
/*!***********************!*\
  !*** ./src/button.js ***!
  \***********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_scss_button_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/scss/button.scss */ \"./assets/scss/button.scss\");\n\r\n\r\nclass Button extends HTMLElement {\r\n  alpha(a) {\r\n    let currentColor = getComputedStyle(this.button).getPropertyValue(\"background-color\");\r\n    let match = /rgba?\\((\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*(,\\s*\\d+[\\.\\d+]*)*\\)/g.exec(currentColor);\r\n    a = a > 1 ? a / 100 : a;\r\n    return \"rgba(\" + [match[1], match[2], match[3], a].join(\",\") + \")\";\r\n  }\r\n\r\n  constructor() {\r\n    super();\r\n    this.template = document.createElement(\"template\");\r\n    this.styles = document.createElement(\"style\");\r\n    this.styles.appendChild(document.createTextNode(_assets_scss_button_scss__WEBPACK_IMPORTED_MODULE_0__.default));\r\n    this.template.innerHTML = `\r\n    <button class=\"btn\" part=\"button\">\r\n        <span class=\"text\"></span> \r\n        <img class=\"img\" part=\"img\"></img>\r\n        <span class=\"tooltip\" part=\"tooltip\"></span>\r\n    </button>\r\n        `;\r\n\r\n    this.attachShadow({ mode: \"open\" });\r\n    this.shadowRoot.appendChild(this.styles);\r\n    this.shadowRoot.appendChild(this.template.content.cloneNode(true));\r\n    this.button = this.shadowRoot.querySelector(\".btn\");\r\n    this.buttonText = this.shadowRoot.querySelector(\".text\");\r\n    this.img = this.shadowRoot.querySelector(\".img\");\r\n    this.tooltip = this.shadowRoot.querySelector(\".tooltip\");\r\n    this.rendered = false;\r\n  }\r\n\r\n  render() {\r\n    this.onTextChange();\r\n    this.onTooltipChange();\r\n    this.onBackgroundChange();\r\n    this.onColorChange();\r\n    this.onImgChange();\r\n    this.onBorderColorChange();\r\n    this.onBorderWidthChange();\r\n    this.onBorderRadiusChange();\r\n    this.rendered = true;\r\n  }\r\n\r\n  connectedCallback() {\r\n    this.render();\r\n  }\r\n\r\n  static get observedAttributes() {\r\n    return [\r\n      \"text\",\r\n      \"img\",\r\n      \"bg-color\",\r\n      \"color\",\r\n      \"tooltip\",\r\n      \"border-color\",\r\n      \"border-width\",\r\n      \"border-radius\",\r\n    ];\r\n  }\r\n\r\n  attributeChangedCallback(name, oldValue, newValue) {\r\n    // this.render();\r\n    if (this.rendered) {\r\n      switch (name) {\r\n        case \"text\":\r\n          this.onTextChange();\r\n          break;\r\n        case \"tooltip\":\r\n          this.onTooltipChange();\r\n          break;\r\n        case \"bg-color\":\r\n          this.onBackgroundChange();\r\n          break;\r\n        case \"color\":\r\n          this.onColorChange();\r\n          break;\r\n        case \"img\":\r\n          this.onImgChange();\r\n          break;\r\n        case \"border-color\":\r\n          this.onBorderColorChange();\r\n          break;\r\n        case \"border-width\":\r\n          this.onBorderWidthChange();\r\n          break;\r\n        case \"border-radius\":\r\n          this.onBorderRadiusChange();\r\n          break;\r\n      }\r\n    }\r\n  }\r\n\r\n  onTextChange() {\r\n    // Set Text\r\n    this.buttonText.textContent =\r\n      this.getAttribute(\"text\") !== null ? this.getAttribute(\"text\") : \"Button\";\r\n  }\r\n\r\n  onTooltipChange() {\r\n    const tooltipText = this.getAttribute(\"tooltip\");\r\n    if (this.getAttribute(\"tooltip\") !== null && tooltipText.trim() !== \"\") {\r\n      this.tooltip.textContent = tooltipText;\r\n      this.tooltip.style.padding = '0.25rem';\r\n      \r\n      if(this.getAttribute(\"tooltip-color\") !== null) {\r\n        this.tooltip.style.color = this.getAttribute(\"tooltip-color\");\r\n      }\r\n      if(this.getAttribute(\"tooltip-bg-color\") !== null) {\r\n        this.tooltip.style.backgroundColor = this.getAttribute(\"tooltip-bg-color\");\r\n      }\r\n    } \r\n  }\r\n\r\n  onBackgroundChange() {\r\n    // Set Background Color\r\n    if(this.getAttribute(\"bg-color\") !== null) {\r\n      this.button.style.backgroundColor = this.getAttribute(\"bg-color\");\r\n    }\r\n  }\r\n\r\n  onColorChange() {\r\n    // Set Color\r\n    if(this.getAttribute(\"color\") !== null) {\r\n      this.buttonText.style.color = this.getAttribute(\"color\");\r\n    }\r\n  }\r\n\r\n  onImgChange() {\r\n    // Set img if url given\r\n    if (this.getAttribute(\"img\") !== null) {\r\n      this.img.style.width = \"20px\";\r\n      this.img.style.height = \"20px\";\r\n      this.img.src = this.getAttribute(\"img\");\r\n      this.img.classList.add(\"img-on-right\");\r\n    }\r\n  }\r\n\r\n  onBorderColorChange() {\r\n    if (this.getAttribute(\"border-color\") !== null) {\r\n      this.button.style.borderColor = this.getAttribute(\"border-color\");\r\n    }\r\n  }\r\n\r\n  onBorderWidthChange() {\r\n    if (this.getAttribute(\"border-width\") !== null) {\r\n      this.button.style.borderStyle = \"solid\";\r\n      this.button.style.borderWidth = this.getAttribute(\"border-width\");\r\n    }\r\n  }\r\n\r\n  onBorderRadiusChange() {\r\n    if (this.getAttribute(\"border-radius\") !== null) {\r\n      this.button.style.borderRadius = this.getAttribute(\"border-radius\");\r\n    }\r\n  }\r\n}\r\n\r\nwindow.customElements.get(\"vpr-button\") || window.customElements.define(\"vpr-button\", Button);\r\n\n\n//# sourceURL=webpack://web-components/./src/button.js?");

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
/******/ 	__webpack_require__("./src/button.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;