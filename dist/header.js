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

/***/ "./assets/scss/header.scss":
/*!*********************************!*\
  !*** ./assets/scss/header.scss ***!
  \*********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"* {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box;\\n  font-family: \\\"Quicksand\\\", sans-serif; }\\n  *:focus {\\n    outline: none; }\\n\\n.highlight {\\n  background-color: rgba(137, 228, 228, 0.527) !important; }\\n\\n.header {\\n  display: grid;\\n  position: sticky;\\n  top: 0;\\n  left: 0;\\n  z-index: 50;\\n  width: 100vw;\\n  height: 4.715rem;\\n  /* min-height: 72.24px; */\\n  grid-template-columns: 5% 0.5fr 1fr 5%;\\n  grid-auto-rows: 1fr 1fr;\\n  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);\\n  background-color: white;\\n  align-items: center; }\\n\\n.menu-bar {\\n  display: none; }\\n  .menu-bar .menu-icon {\\n    content: url(\\\"../assets/images/menu.svg\\\");\\n    transform: scale(1.5); }\\n\\n.logo-wrapper {\\n  display: flex;\\n  align-items: center;\\n  justify-content: left;\\n  height: 3.3rem;\\n  grid-row: 1;\\n  grid-column: 2/3;\\n  background-color: transparent; }\\n\\n.nav-links {\\n  height: 3.3rem;\\n  grid-row: 1/2;\\n  grid-column: 3/4;\\n  display: flex;\\n  align-items: center;\\n  justify-content: space-between;\\n  list-style: none;\\n  text-decoration: none;\\n  background-color: transparent; }\\n  .nav-links .li {\\n    width: max-content;\\n    height: max-content;\\n    display: flex;\\n    justify-content: flex-start;\\n    align-items: center; }\\n\\n.list-style {\\n  list-style: none;\\n  text-decoration: none; }\\n\\n.link-img {\\n  width: 1.4rem;\\n  height: 2rem;\\n  vertical-align: middle; }\\n\\n.link-text {\\n  font-size: 1.2rem;\\n  vertical-align: middle;\\n  color: #1D3557; }\\n\\n.logo-img {\\n  height: 45px; }\\n\\n.nav-link, .logo-wrapper .logo-text {\\n  display: inline-block;\\n  width: max-content;\\n  height: max-content;\\n  list-style: none;\\n  text-align: right;\\n  cursor: pointer;\\n  align-self: center; }\\n\\n.logo-text {\\n  font-size: 1.3rem; }\\n\\n.nav-link {\\n  font-size: 1.2rem;\\n  padding-inline: 0.125rem; }\\n\\n.active {\\n  border-bottom-width: 2px;\\n  border-bottom-style: solid;\\n  border-bottom-color: rgba(255, 0, 55, 0.966); }\\n\\n.menu-active {\\n  transform: translateX(0%); }\\n\\n.close-menu {\\n  content: url(\\\"../assets/images/close.svg\\\") !important; }\\n\\n@media screen and (max-width: 860px) {\\n  .header {\\n    height: 4.5rem; }\\n  .header .menu-bar {\\n    display: block;\\n    width: max-content;\\n    height: max-content;\\n    cursor: pointer;\\n    z-index: 12;\\n    background-color: transparent;\\n    grid-row: 1/2;\\n    grid-column: 3/4;\\n    justify-self: flex-end;\\n    /* transform: translateY(70%); */ }\\n  .header .stick {\\n    height: 3px;\\n    width: 30px;\\n    background-color: #02061a;\\n    margin: 5px; }\\n  .s1 {\\n    margin-top: 0%; }\\n  .s3 {\\n    margin-bottom: 0%; }\\n  .logo-wrapper {\\n    height: 100%; }\\n  .nav-links {\\n    position: fixed;\\n    background-color: #f2f2f2;\\n    height: 100vh;\\n    width: 100%;\\n    flex-direction: column;\\n    clip-path: circle(100px at 90% -30%);\\n    -webkit-clip-path: circle(100px at 90% -30%);\\n    transition: clip-path, -webkit-clip-path 0.75s ease-out;\\n    pointer-events: none;\\n    z-index: 10;\\n    justify-content: space-around; }\\n  .nav-links-active {\\n    clip-path: circle(1500px at 90% -30%);\\n    -webkit-clip-path: circle(1500px at 90% -30%);\\n    pointer-events: all; }\\n  .nav-links li {\\n    opacity: 0;\\n    color: #02061a;\\n    transition: border-bottom 0.2s ease 0.1s; }\\n  .li-fade {\\n    opacity: 1 !important; }\\n  .nav-links li:nth-child(1) {\\n    transition: opacity 0.5s ease 0.15s; }\\n  .nav-links li:nth-child(2) {\\n    transition: opacity 0.5s ease 0.25s; }\\n  .nav-links li:nth-child(3) {\\n    transition: opacity 0.5s ease 0.35s; }\\n  .nav-links li:nth-child(4) {\\n    transition: opacity 0.5s ease 0.45s; }\\n  .nav-links li:nth-child(5) {\\n    transition: opacity 0.5s ease 0.55s; } }\\n\");\n\n//# sourceURL=webpack://web-components/./assets/scss/header.scss?");

/***/ }),

/***/ "./src/header.js":
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_scss_header_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/scss/header.scss */ \"./assets/scss/header.scss\");\n\r\n// import {readFileSync} from 'fs';\r\n\r\nclass Header extends HTMLElement {\r\n  constructor() {\r\n    super();\r\n    this.template = document.createElement(\"template\");\r\n    this.styles = document.createElement(\"style\");\r\n    this.styles.appendChild(document.createTextNode(_assets_scss_header_scss__WEBPACK_IMPORTED_MODULE_0__.default));\r\n    this.template.innerHTML = `\r\n    <header class=\"header\" part=\"header\">\r\n        <nav class=\"logo-wrapper\" part=\"logo-wrapper\">\r\n          <i class=\"logo-img\" part=\"logo-img\"></i>\r\n          <h3 class=\"logo-text\" part=\"logo-text\"></h3> \r\n        </nav>\r\n        <div class=\"menu-bar\">\r\n          <i class=\"menu-icon\"></i>\r\n        </div>\r\n        <ul class=\"nav-links\" part=\"nav-links\"></ul>\r\n    </header>\r\n        `;\r\n\r\n    this.attachShadow({ mode: \"open\" });\r\n    this.shadowRoot.appendChild(this.styles);\r\n    this.shadowRoot.appendChild(this.template.content.cloneNode(true));\r\n    this.header = this.shadowRoot.querySelector(\".header\");\r\n    this.logoImg = this.shadowRoot.querySelector(\".logo-img\");\r\n    this.logoText = this.shadowRoot.querySelector(\".logo-text\");\r\n    this.navLinks = this.shadowRoot.querySelector(\".nav-links\");\r\n    this.menuBar = this.shadowRoot.querySelector(\".menu-bar\");\r\n    this.menuIcon = this.shadowRoot.querySelector(\".menu-icon\");\r\n\r\n    this.openMenu = this.openMenu.bind(this);\r\n    this.setStyle = this.setStyle.bind(this);\r\n  }\r\n\r\n  setNavLinks(links, activeLink) {\r\n    links.forEach((link, index) => {\r\n        let linkString;\r\n        if (activeLink === link.text || activeLink === index) {\r\n            linkString = \r\n            `<li class=\"active nav-link\" id=\"link${index}\" part=\"nav-link\">\r\n                <a href=${link.link} class=\"list-style\">\r\n                    ${link.img !== undefined ? link.img.slice(0, 2) === \"fa\" ? `<i class=\"link-img ${link.img}\"></i>` : `<i class=\"link-img\" style=\"content: url(${link.img});\"></i>` : ``}\r\n                    <span class=\"link-text\" part=\"link-text\">${link.text}</span>\r\n                </a>\r\n            </li>`;\r\n        } else {\r\n            linkString = \r\n            `<li class=\"nav-link\" id=\"link${index}\" part=\"nav-link\">\r\n                <a href=${link.link} class=\"list-style\">\r\n                    ${link.img !== undefined ? link.img.slice(0, 2) === \"fa\" ? `<i class=\"link-img ${link.img}\"></i>` : `<i class=\"link-img\" style=\"content: url(${link.img});\"></i>` : ``}\r\n                    <span class=\"link-text\" part=\"link-text\">${link.text}</span>\r\n                </a>\r\n            </li>`;\r\n        }\r\n        \r\n        this.navLinks.innerHTML += linkString;\r\n    });\r\n  }\r\n\r\n  openMenu(event) {\r\n    event.stopPropagation();\r\n    this.navLinks.classList.toggle(\"nav-links-active\");\r\n    this.menuIcon.classList.toggle(\"close-menu\");\r\n    const elements = this.shadowRoot.querySelectorAll(\".nav-links li\");\r\n    elements.forEach((element) => {\r\n        element.classList.toggle(\"li-fade\");\r\n    });\r\n  }\r\n\r\n  setLogoText(text) {\r\n    this.logoText.textContent = text;\r\n  }\r\n\r\n  setLogoImg(img) {\r\n    this.logoImg.style.content = `url(${img})`;\r\n  }\r\n\r\n  connectedCallback() {\r\n    this.menuBar.addEventListener(\"click\", this.openMenu);\r\n  }\r\n\r\n  static get observedAttributes() {\r\n    return [];\r\n  }\r\n\r\n  attributeChangedCallback(name, oldValue, newValue) {\r\n    // this.render();\r\n  }\r\n\r\n  setStyle(path) {\r\n    const fileReader = new FileReader();\r\n    fileReader.addEventListener('load', (event) => {\r\n      console.log(fileReader.result);\r\n      // this.shadowRoot.querySelector('style').appendChild(document.createTextNode(cssText));\r\n    });\r\n    fileReader.readAsText(path);\r\n  }\r\n}\r\n\r\nwindow.customElements.get(\"vpr-header\") ||\r\n  window.customElements.define(\"vpr-header\", Header);\r\n\n\n//# sourceURL=webpack://web-components/./src/header.js?");

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
/******/ 	__webpack_require__("./src/header.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;