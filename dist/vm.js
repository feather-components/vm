(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["this"] = factory();
	else
		root["this"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event__ = __webpack_require__(42);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__dom__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__util__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__event__["a"]; });




/* harmony default export */ __webpack_exports__["d"] = ({
    Dom: __WEBPACK_IMPORTED_MODULE_0__dom__["a" /* default */],
    Util: __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */],
    Event: __WEBPACK_IMPORTED_MODULE_2__event__["a" /* default */]
});



/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(37)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cfg_default_js__ = __webpack_require__(39);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



/* harmony default export */ __webpack_exports__["a"] = (function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) == 'object') {
        for (var key in config) {
            __WEBPACK_IMPORTED_MODULE_0__cfg_default_js__["a" /* default */][key] = config[key];
        }
    } else {
        return __WEBPACK_IMPORTED_MODULE_0__cfg_default_js__["a" /* default */][config];
    }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overlay__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__overlay___default.a));

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(64),
  /* template */
  __webpack_require__(69),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/icon/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-770e66a0", Component.options)
  } else {
    hotAPI.reload("data-v-770e66a0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popup__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__popup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__popup___default.a));

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    props: {
        value: null
    },

    data: function data() {
        return {
            val: this.value
        };
    },


    watch: {
        val: function val(v) {
            this.$emit('input', v);
        },
        value: function value(v) {
            this.setValue(v);
        }
    },

    methods: {
        setValue: function setValue(v) {
            this.val = v;
        }
    }
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loading__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loading___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__loading__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__loading___default.a));

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Scroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pulldown2refresh; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroll__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pulldown2refresh__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pulldown2refresh___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__pulldown2refresh__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(0);




var Scroll = __WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__scroll___default.a);
var Pulldown2refresh = __WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_1__pulldown2refresh___default.a);

/* harmony default export */ __webpack_exports__["c"] = (Scroll);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__draggable__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__draggable__["a" /* default */], true));

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    storage: function storage(key, value) {
        if (value != null) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            var item = localStorage.getItem(key);
            return item == null ? item : JSON.parse(item);
        }
    },
    pad: function pad(str) {
        return str < 10 ? '0' + str : str;
    },
    date: function date(str) {
        var date = typeof str == 'string' ? new Date(str.replace(/-/g, '/')) : str;

        if (isNaN(date.getTime())) {
            throw new Error(date + ' is not a valid date type!');
        }

        return date;
    },
    n2p: function n2p(number) {
        if (/^\d+$/.test(number)) {
            return number + 'px';
        }

        return number;
    },
    l2camel: function l2camel(str) {
        return str.replace(/-(\w)/g, function (all, c, index) {
            return index > 0 ? c.toUpperCase() : c;
        });
    },
    each: function each(arr, callback) {
        if (arr.length) {
            [].forEach.call(arr, callback);
        } else {
            for (var i in arr) {
                callback(arr[i], i);
            }
        }
    },
    rfa: function rfa(callback) {
        return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        })(callback);
    },
    crfa: function crfa(id) {
        return id && (window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout)(id);
    },
    makeArray: function makeArray(arr) {
        if (Array.isArray(arr)) {
            return arr;
        }

        return arr == null ? [] : [arr];
    },
    log: function log() {
        var str = JSON.stringify(arguments);
        var container = document.querySelector('#__log__');

        if (!container) {
            container = document.createElement('div');
            container.id = '__log__';
            container.style.cssText = 'position: fixed; bottom: 0px; width: 100%; background: #ccc; z-index: 10000; overflow: hidden; max-height: 200px;';
            document.body.appendChild(container);
        }

        container.innerHTML = container.innerHTML + '<br />' + str;
        setTimeout(function () {
            container.scrollTop = 100000000;
        }, 0);
    },
    firstKey: function firstKey(obj) {
        for (var i in obj) {
            return i;
        }

        return false;
    },
    observer: function observer(target) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var callback = arguments[2];

        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var observer = new MutationObserver(callback);

        observer.observe(target, config);
        return observer;
    },
    register: function register(obj) {
        var directive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var after = arguments[2];

        var Component = directive ? obj : obj.Component || obj;

        function install(Vue) {
            if (install._installed) return;

            install._installed = true;

            if (directive) {
                Vue.directive(Component.name, obj);
            } else {
                Component._$name = Component.name;
                delete Component.name;
                Vue.component('vm-' + Component._$name, Component);
            }

            after && after(Vue);
        }

        if (window.Vue) {
            install(window.Vue);
        } else {
            obj.install = Component.install = install;
        }

        return obj;
    },
    factory: function factory(options) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.body;

        var klass = this.$$.extend(options);
        var instance = new klass({
            propsData: data
        });

        instance.$mount();
        container.appendChild(instance.$el);
        return instance;
    },
    debounce: function debounce(fn, wait) {
        var id = void 0;

        return function () {
            var _this = this;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            id && clearTimeout(id);
            id = setTimeout(function () {
                fn.apply(_this, args);
            }, wait);
        };
    },
    ajax: function ajax(url, params) {
        var xhr = new XMLHttpRequest();
        var promise = new Promise(function (resolve, reject) {
            xhr.open('GET', url + '?_random=' + Math.random(), true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    xhr.status == 200 ? resolve(JSON.parse(xhr.responseText)) : reject();
                }
            };
            xhr.send(params);
        });

        promise.abort = xhr.abort;
        return promise;
    },
    acm: function acm(ajax, context) {
        var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        var name = '$$ajax-' + index;
        var idn = name + '-id';

        if (context[name] && context[name].abort) {
            context[name].abort();
        }

        var id = context[idn] = Date.now();

        context[name] = ajax;

        if (!ajax.then) {
            throw new Error('api return must be a promise~');
        }

        return new Promise(function (resolve, reject) {
            ajax.then(function (data) {
                id == context[idn] && resolve(data);
            }, function (data) {
                id == context[idn] && reject(data);
            });
        });
    }
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(211)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(213),
  /* template */
  __webpack_require__(214),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/picker/picker.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] picker.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-04434e7b", Component.options)
  } else {
    hotAPI.reload("data-v-04434e7b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(32);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__button__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__button___default.a);
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__button___default.a);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__masker__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__masker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__masker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__masker___default.a));

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(95)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(97),
  /* template */
  __webpack_require__(98),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/actionsheet/item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1d2a4fdd", Component.options)
  } else {
    hotAPI.reload("data-v-1d2a4fdd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dropdown__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__dropdown___default.a));

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(137)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(139),
  /* template */
  __webpack_require__(142),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/scroll/scroll.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] scroll.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-283d099b", Component.options)
  } else {
    hotAPI.reload("data-v-283d099b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__autosize__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__autosize__["a" /* default */], true));

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__searchbar__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__searchbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__searchbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__searchbar___default.a));

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__input__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__input___default.a));

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(8);


/* harmony default export */ __webpack_exports__["a"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_0__model__["a" /* default */]],

    props: {
        placeholder: {
            type: String,
            default: null
        },

        readonly: {
            type: Boolean,
            default: false
        },

        clearable: {
            type: Boolean,
            default: false
        },

        maxlength: {
            type: [Number, String],
            default: 100000000
        },

        autofocus: {
            type: Boolean,
            default: false
        },

        theme: {
            type: String,
            default: 'default'
        }
    },

    methods: {
        onFocus: function onFocus() {
            !this.readonly && this.$emit('focus');
        },
        onBlur: function onBlur() {
            this.$emit('blur');
        },
        onClick: function onClick() {
            this.$emit('click');
        }
    }
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(195)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(197),
  /* template */
  __webpack_require__(201),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/checker/icon.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] icon.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-baae4a12", Component.options)
  } else {
    hotAPI.reload("data-v-baae4a12", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(198)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(200),
  /* template */
  null,
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/checker/abstract.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-909a21c0", Component.options)
  } else {
    hotAPI.reload("data-v-909a21c0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(202)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(204),
  /* template */
  __webpack_require__(205),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/checker/checker.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] checker.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-64332da7", Component.options)
  } else {
    hotAPI.reload("data-v-64332da7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__picker__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__overlay__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_model__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper__ = __webpack_require__(0);






var HOURS = 23,
    MINUTES = 59;

var TimePicker = {
    name: 'timepicker',

    mixins: [__WEBPACK_IMPORTED_MODULE_1__overlay__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_model__["a" /* default */]],

    props: {
        units: {
            type: Array,
            default: function _default() {
                return Object(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */])('timepicker.units');
            }
        }
    },

    data: function data() {
        return {
            options: [TimePicker.lv(HOURS, 0, this.units[0]), TimePicker.lv(MINUTES, this.units[1])],
            vals: this.analyseValue(this.value)
        };
    },


    methods: {
        onConfirm: function onConfirm(vals) {
            this.vals = vals;
            this.$emit('confirm', this.val = vals.join(':'));
        },
        setValue: function setValue(value) {
            this.analyseValue(this.val = value);
        },
        analyseValue: function analyseValue(value) {
            return (value || '').split(':');
        }
    },

    render: function render(h) {
        return h(__WEBPACK_IMPORTED_MODULE_0__picker___default.a, {
            props: {
                options: this.options,
                visible: this.visibility,
                value: this.vals
            },

            on: {
                hide: this.hide,
                confirm: this.onConfirm
            }
        });
    }
};

TimePicker.lv = function (end) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var arr = [];

    for (var i = start; i <= end; i++) {
        var label = __WEBPACK_IMPORTED_MODULE_4__helper__["c" /* Util */].pad(i) + unit;

        arr.push({
            label: label,
            value: i
        });
    };

    return arr;
};

/* harmony default export */ __webpack_exports__["a"] = (TimePicker);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__badge__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__badge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__badge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__badge___default.a);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__badge___default.a);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_base_css__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_base_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__assets_base_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_page__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_layout__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_button__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_topbar__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_forward__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_overlay__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_masker__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_popup__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_actionsheet__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_modal__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_toast__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_segment__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_dropdown__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_popover__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_scroll__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_list__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_search__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_searchbar__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_input__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_switch__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_textarea__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_image__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_checker__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_picker__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_form__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_swiper__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_swipeout__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_Tabs__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__directives_badge__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_badge__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_loading__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__directives_draggable__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__directives_autosize__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__helper__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Page", function() { return __WEBPACK_IMPORTED_MODULE_1__components_page__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return __WEBPACK_IMPORTED_MODULE_2__components_layout__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Row", function() { return __WEBPACK_IMPORTED_MODULE_2__components_layout__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return __WEBPACK_IMPORTED_MODULE_3__components_button__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TopBar", function() { return __WEBPACK_IMPORTED_MODULE_4__components_topbar__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Forward", function() { return __WEBPACK_IMPORTED_MODULE_5__components_forward__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Overlay", function() { return __WEBPACK_IMPORTED_MODULE_6__components_overlay__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Masker", function() { return __WEBPACK_IMPORTED_MODULE_7__components_masker__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Popup", function() { return __WEBPACK_IMPORTED_MODULE_8__components_popup__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ActionSheet", function() { return __WEBPACK_IMPORTED_MODULE_9__components_actionsheet__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ActionSheetItem", function() { return __WEBPACK_IMPORTED_MODULE_9__components_actionsheet__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return __WEBPACK_IMPORTED_MODULE_10__components_modal__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Toast", function() { return __WEBPACK_IMPORTED_MODULE_11__components_toast__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Segment", function() { return __WEBPACK_IMPORTED_MODULE_12__components_segment__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DropDown", function() { return __WEBPACK_IMPORTED_MODULE_13__components_dropdown__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Popover", function() { return __WEBPACK_IMPORTED_MODULE_14__components_popover__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverAction", function() { return __WEBPACK_IMPORTED_MODULE_14__components_popover__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Scroll", function() { return __WEBPACK_IMPORTED_MODULE_15__components_scroll__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Pulldown2refresh", function() { return __WEBPACK_IMPORTED_MODULE_15__components_scroll__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "List", function() { return __WEBPACK_IMPORTED_MODULE_16__components_list__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Search", function() { return __WEBPACK_IMPORTED_MODULE_17__components_search__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBar", function() { return __WEBPACK_IMPORTED_MODULE_18__components_searchbar__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return __WEBPACK_IMPORTED_MODULE_19__components_input__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return __WEBPACK_IMPORTED_MODULE_20__components_switch__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Textarea", function() { return __WEBPACK_IMPORTED_MODULE_21__components_textarea__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return __WEBPACK_IMPORTED_MODULE_22__components_image__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Checker", function() { return __WEBPACK_IMPORTED_MODULE_23__components_checker__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "IconChecker", function() { return __WEBPACK_IMPORTED_MODULE_23__components_checker__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CheckerGroup", function() { return __WEBPACK_IMPORTED_MODULE_23__components_checker__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Picker", function() { return __WEBPACK_IMPORTED_MODULE_24__components_picker__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TimePicker", function() { return __WEBPACK_IMPORTED_MODULE_24__components_picker__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DatePicker", function() { return __WEBPACK_IMPORTED_MODULE_24__components_picker__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FormRow", function() { return __WEBPACK_IMPORTED_MODULE_25__components_form__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Swiper", function() { return __WEBPACK_IMPORTED_MODULE_26__components_swiper__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SwiperItem", function() { return __WEBPACK_IMPORTED_MODULE_26__components_swiper__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SwipeOut", function() { return __WEBPACK_IMPORTED_MODULE_27__components_swipeout__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SwipeOutAction", function() { return __WEBPACK_IMPORTED_MODULE_27__components_swipeout__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Tabs", function() { return __WEBPACK_IMPORTED_MODULE_28__components_Tabs__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPane", function() { return __WEBPACK_IMPORTED_MODULE_28__components_Tabs__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Badge", function() { return __WEBPACK_IMPORTED_MODULE_30__components_badge__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Loading", function() { return __WEBPACK_IMPORTED_MODULE_31__components_loading__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Draggable", function() { return __WEBPACK_IMPORTED_MODULE_32__directives_draggable__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BadgeDirective", function() { return __WEBPACK_IMPORTED_MODULE_29__directives_badge__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AutoSize", function() { return __WEBPACK_IMPORTED_MODULE_33__directives_autosize__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Helper", function() { return __WEBPACK_IMPORTED_MODULE_35__helper__["d"]; });






































var Components = [__WEBPACK_IMPORTED_MODULE_1__components_page__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__components_layout__["a" /* Box */], __WEBPACK_IMPORTED_MODULE_2__components_layout__["b" /* Row */], __WEBPACK_IMPORTED_MODULE_3__components_button__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__components_topbar__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__components_forward__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__components_overlay__["a" /* default */], __WEBPACK_IMPORTED_MODULE_7__components_masker__["a" /* default */], __WEBPACK_IMPORTED_MODULE_8__components_popup__["a" /* default */], __WEBPACK_IMPORTED_MODULE_9__components_actionsheet__["a" /* ActionSheet */], __WEBPACK_IMPORTED_MODULE_9__components_actionsheet__["b" /* ActionSheetItem */], __WEBPACK_IMPORTED_MODULE_10__components_modal__["a" /* default */], __WEBPACK_IMPORTED_MODULE_11__components_toast__["a" /* default */], __WEBPACK_IMPORTED_MODULE_12__components_segment__["a" /* default */], __WEBPACK_IMPORTED_MODULE_13__components_dropdown__["a" /* default */], __WEBPACK_IMPORTED_MODULE_14__components_popover__["a" /* Popover */], __WEBPACK_IMPORTED_MODULE_14__components_popover__["b" /* PopoverAction */], __WEBPACK_IMPORTED_MODULE_15__components_scroll__["b" /* Scroll */], __WEBPACK_IMPORTED_MODULE_15__components_scroll__["a" /* Pulldown2refresh */], __WEBPACK_IMPORTED_MODULE_16__components_list__["a" /* default */], __WEBPACK_IMPORTED_MODULE_17__components_search__["a" /* default */], __WEBPACK_IMPORTED_MODULE_18__components_searchbar__["a" /* default */], __WEBPACK_IMPORTED_MODULE_19__components_input__["a" /* default */], __WEBPACK_IMPORTED_MODULE_20__components_switch__["a" /* default */], __WEBPACK_IMPORTED_MODULE_21__components_textarea__["a" /* default */], __WEBPACK_IMPORTED_MODULE_22__components_image__["a" /* default */], __WEBPACK_IMPORTED_MODULE_23__components_checker__["a" /* Checker */], __WEBPACK_IMPORTED_MODULE_23__components_checker__["c" /* IconChecker */], __WEBPACK_IMPORTED_MODULE_23__components_checker__["b" /* CheckerGroup */], __WEBPACK_IMPORTED_MODULE_24__components_picker__["b" /* Picker */], __WEBPACK_IMPORTED_MODULE_24__components_picker__["c" /* TimePicker */], __WEBPACK_IMPORTED_MODULE_24__components_picker__["a" /* DatePicker */], __WEBPACK_IMPORTED_MODULE_25__components_form__["a" /* FormRow */], __WEBPACK_IMPORTED_MODULE_26__components_swiper__["a" /* Swiper */], __WEBPACK_IMPORTED_MODULE_26__components_swiper__["b" /* SwiperItem */], __WEBPACK_IMPORTED_MODULE_27__components_swipeout__["a" /* SwipeOut */], __WEBPACK_IMPORTED_MODULE_27__components_swipeout__["b" /* SwipeOutAction */], __WEBPACK_IMPORTED_MODULE_28__components_Tabs__["a" /* Tabs */], __WEBPACK_IMPORTED_MODULE_28__components_Tabs__["b" /* TabsPane */], __WEBPACK_IMPORTED_MODULE_30__components_badge__["a" /* default */], __WEBPACK_IMPORTED_MODULE_31__components_loading__["a" /* default */], __WEBPACK_IMPORTED_MODULE_32__directives_draggable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_29__directives_badge__["a" /* default */], __WEBPACK_IMPORTED_MODULE_33__directives_autosize__["a" /* default */]];

function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    __WEBPACK_IMPORTED_MODULE_35__helper__["d" /* default */].Util.$$ = Vue;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var Component = _step.value;

            Component.install(Vue);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    Object(__WEBPACK_IMPORTED_MODULE_34__config__["a" /* default */])(options);
}



/* harmony default export */ __webpack_exports__["default"] = ({
    install: install,
    Helper: __WEBPACK_IMPORTED_MODULE_35__helper__["d" /* default */]
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(14)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./base.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./base.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "[class^=\"vm-\"] {\n    font-size: 14px;\n    color: #333;\n}", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__page__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__page___default.a));

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(35)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(38),
  /* template */
  __webpack_require__(40),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/page/page.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] page.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-05aae55b", Component.options)
  } else {
    hotAPI.reload("data-v-05aae55b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("8fc6d3dc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-05aae55b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./page.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-05aae55b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./page.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-page {\n    position: fixed;\n    z-index: 10000;\n    width: 100%;\n    height: 100%;\n    background: #fff;\n    display: flex;\n    flex-direction: column;\n}\n.vm-page-content {\n    overflow: hidden;\n    flex: 1;\n}\n.vm-page-footer {\n    width: 100%;\n    text-align: center;\n}\n", ""]);

// exports


/***/ }),
/* 37 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
};

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'page',

    data: function data() {
        return {
            style: {
                background: Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('page.background') || Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('theme')
            }
        };
    }
});

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_util__ = __webpack_require__(12);
var _theme$boxMarginTop;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["a"] = (_theme$boxMarginTop = {
    'theme': '#E74D4D',
    'box.margin-top': '12px',
    // components
    'page.background': '#fff',
    'topbar.padding-top': '0px',
    'topbar.border-bottom': '0px',
    'topbar.background': '#fff',
    'topbar.color': '#000',
    'topbar.font-size': '18px',
    'button.radius': '100px',
    'button.sizes': ['46px', '36px', '23px', '23px'], // large|normal|small|mini
    'button.colors': {
        primary: ''
    },
    'segment.color': '#fff',
    'segment.active-color': '',
    'loading.color': '',
    'tabs.header-active-color': ''
}, _defineProperty(_theme$boxMarginTop, 'loading.color', ''), _defineProperty(_theme$boxMarginTop, 'scroll.ignores', null), _defineProperty(_theme$boxMarginTop, 'scroll.use-transform', false), _defineProperty(_theme$boxMarginTop, 'list.label.page', 'page'), _defineProperty(_theme$boxMarginTop, 'list.label.persize', 'size'), _defineProperty(_theme$boxMarginTop, 'swipeout-action.background', ''), _defineProperty(_theme$boxMarginTop, 'swipeout-action.color', '#fff'), _defineProperty(_theme$boxMarginTop, 'popover.background', '#333'), _defineProperty(_theme$boxMarginTop, 'popover.actions-gap', '0.5px solid #eee'), _defineProperty(_theme$boxMarginTop, 'popover.actions-color', '#fff'), _defineProperty(_theme$boxMarginTop, 'form-row.label-min-width', '80px'), _defineProperty(_theme$boxMarginTop, 'input.pre-themes', {}), _defineProperty(_theme$boxMarginTop, 'checker.color', ''), _defineProperty(_theme$boxMarginTop, 'checker.icon-size', '16px'), _defineProperty(_theme$boxMarginTop, 'checker.square-radius', '2px'), _defineProperty(_theme$boxMarginTop, 'switch.color', ''), _defineProperty(_theme$boxMarginTop, 'timepicker.units', ['时', '分']), _defineProperty(_theme$boxMarginTop, 'datepicker.units', ['年', '月', '日']), _defineProperty(_theme$boxMarginTop, 'modal.button.normal', ''), _defineProperty(_theme$boxMarginTop, 'modal.button.confirm', ''), _defineProperty(_theme$boxMarginTop, 'swiper.indicator-color', 'rgba(0, 0, 0, 0.2)'), _defineProperty(_theme$boxMarginTop, 'swiper.indicator-active-color', ''), _theme$boxMarginTop);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vm-page"
  }, [_c('div', {
    ref: "header",
    staticClass: "vm-page-header"
  }, [_vm._t("header")], 2), _vm._v(" "), _c('div', {
    staticClass: "vm-page-content"
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    ref: "footer",
    staticClass: "vm-page-footer"
  }, [_vm._t("footer")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-05aae55b", module.exports)
  }
}

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(12);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var css3s = ['transform', 'transition', 'animation'];

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector;
}

/* harmony default export */ __webpack_exports__["a"] = ({
    getTransform: function getTransform(element) {
        var matrix = window.getComputedStyle(element, null);
        var x;var y;

        matrix = matrix.webkitTransform.split(')')[0].split(', ');
        x = +(matrix[12] || matrix[4]);
        y = +(matrix[13] || matrix[5]);

        return {
            x: isNaN(x) ? 0 : x,
            y: isNaN(y) ? 0 : y
        };
    },
    offset: function offset(element) {
        var top = 0;var left = 0;

        do {
            top += element.offsetTop;
            left += element.offsetLeft;
        } while (element = element.offsetParent);

        return {
            left: left,
            top: top
        };
    },
    matches: function matches(target, selector) {
        return target.matches(selector);
    },
    siblings: function siblings(element) {
        return [].filter.call(element.parentNode.children, function (child) {
            return child !== element;
        });
    },
    nexts: function nexts(element) {
        var els = [];

        while (element = element.nextSibling) {
            if (element.nodeType == 1) {
                els.push(element);
            }
        }

        return els;
    },
    height: function height(element) {
        return this.isDoc(element) ? document.documentElement.clientHeight : element.offsetHeight;
    },
    width: function width(element) {
        return this.isDoc(element) ? document.documentElement.clientWidth : element.offsetWidth;
    },
    size: function size(element) {
        return { width: this.width(element), height: this.height(element) };
    },
    rect: function rect(element) {
        return element.getBoundingClientRect();
    },
    isDoc: function isDoc(element) {
        return element === document.documentElement || element === document;
    },
    contains: function contains(root, el) {
        var containSelf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        return root === el && containSelf || !!(root.compareDocumentPosition(el) & 16);
    },
    css: function css(element, name, value) {
        if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object') {
            for (var key in name) {
                this.css(element, key, name[key]);
            }
        } else {
            var css3name;

            if (this.css3(name)) {
                css3name = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].l2camel('-webkit-' + name);
            }

            var property = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].l2camel(name);

            if (typeof value == 'undefined') {
                return element.style[css3name || property] || window.getComputedStyle(element).getPropertyValue(css3name || name);
            } else {
                value += typeof value == 'number' && !/^(?:opacity|zIndex)$/.test(property) ? 'px' : '';
                element.style[property] = value;

                if (css3name) {
                    element.style[css3name] = value;
                }
            }
        }
    },
    css3: function css3(name) {
        return css3s.indexOf(name) > -1;
    },
    $: function $(str) {
        var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

        return typeof str == 'string' ? root.querySelector(str) : str;
    },
    $$: function $$(str) {
        var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

        return (typeof str == 'string' ? root.querySelectorAll(str) : str) || [];
    },
    hasClass: function hasClass(element, className) {
        return element.className.match(new RegExp('(\\s+|^)' + className + '(\\s+|$)'));
    },
    addClass: function addClass(element, className) {
        if (!this.hasClass(element, className)) {
            element.className += ' ' + className;
        }
    },
    removeClass: function removeClass(element, className) {
        element.className = element.className.replace(new RegExp('(\\s+|^)' + className + '(\\s+|$)'), '');
    },
    create: function create(str) {
        var el = document.createElement('div');

        el.innerHTML = str;
        return el.childNodes[0];
    }
});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    on: function on(element, event, callback, options) {
        event.split(' ').forEach(function (event) {
            element.addEventListener(event, callback, options);
        });
    },
    off: function off(element, event, callback) {
        element.removeEventListener(event, callback);
    },
    trigger: function trigger(element, event) {
        var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var bubbles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        var evt = document.createEvent('HTMLEvents');

        evt.initEvent(event, bubbles, true);
        evt.data = data;
        return !element.dispatchEvent(evt);
    }
});

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__box__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__box___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__box__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__row__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__row___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__row__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(0);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__box___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__row___default.a; });




__WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__box___default.a);
__WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_1__row___default.a);



/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(45)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(47),
  /* template */
  __webpack_require__(48),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/layout/box.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] box.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6356874a", Component.options)
  } else {
    hotAPI.reload("data-v-6356874a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(46);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("2af68e8e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6356874a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./box.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6356874a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./box.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-box-header,\n.vm-box-footer {\n  height: 40px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0px 12px;\n}\n.vm-box-inner {\n  border-top: 1px solid #eee;\n  border-bottom: 1px solid #eee;\n}\n", ""]);

// exports


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'box',

	data: function data() {
		return {
			style: {
				marginTop: Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('box.margin-top')
			}
		};
	}
});

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vm-box",
    style: (_vm.style)
  }, [(_vm.$slots.header) ? _c('div', {
    staticClass: "vm-box-header"
  }, [_vm._t("header")], 2) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "vm-box-inner"
  }, [_vm._t("default")], 2), _vm._v(" "), (_vm.$slots.footer) ? _c('div', {
    staticClass: "vm-box-footer"
  }, [_vm._t("footer")], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6356874a", module.exports)
  }
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(50)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(52),
  /* template */
  __webpack_require__(53),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/layout/row.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] row.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9ca7b84e", Component.options)
  } else {
    hotAPI.reload("data-v-9ca7b84e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(51);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("e7e34ce2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9ca7b84e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./row.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9ca7b84e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./row.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-row {\n  height: auto;\n  display: flex;\n  background: #fff;\n  align-items: stretch;\n  padding-left: 12px;\n}\n.vm-row-icon {\n  display: flex;\n  align-items: center;\n}\n.vm-row-icon {\n  border-bottom: 1px solid transparent;\n  margin-right: 12px;\n}\n.vm-row-content {\n  display: flex;\n  flex: 1;\n  align-items: center;\n  padding: 6px 0px;\n  padding-right: 12px;\n  box-sizing: border-box;\n  border-bottom: 1px solid #eee;\n}\n.vm-row:nth-last-child(1) .vm-row-icon,\n.vm-row:nth-last-child(1) .vm-row-content {\n  border-bottom: 0px;\n}\n", ""]);

// exports


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'row'
});

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vm-row"
  }, [(_vm.$slots.icon) ? _c('span', {
    staticClass: "vm-row-icon"
  }, [_vm._t("icon")], 2) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "vm-row-content"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9ca7b84e", module.exports)
  }
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(55)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(57),
  /* template */
  __webpack_require__(58),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/button/button.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] button.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9acae40a", Component.options)
  } else {
    hotAPI.reload("data-v-9acae40a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(56);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("1b822756", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9acae40a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./button.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9acae40a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./button.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-button {\n  font-size: 14px;\n  box-sizing: border-box;\n  color: #fff;\n  display: inline-block;\n  margin: auto;\n  background: transparent;\n  -webkit-tap-highlight-color: transparent;\n  outline: none;\n  border: 0px;\n  word-break: keep-all;\n  padding: 0px 15px;\n  line-height: 1;\n}\n.vm-button:active {\n  opacity: 0.7;\n}\n.vm-button[disabled] {\n  border: 0 !important;\n  color: #fff !important;\n  background: #e1e1e1 !important;\n}\n.vm-button[disabled]:active {\n  opacity: 1;\n}\n.vm-button-normal {\n  min-width: 100px;\n}\n.vm-button-large {\n  font-size: 16px;\n  display: block;\n  width: 100%;\n}\n.vm-button-small,\n.vm-button-mini {\n  min-width: 0px;\n  font-size: 12px;\n}\n", ""]);

// exports


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);
//
//
//
//
//
//




var SIZES = ['large', 'normal', 'small', 'mini'];

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'button',

    props: {
        type: {
            type: String,
            default: 'primary'
        },

        radius: {
            type: [Number, String],
            default: function _default() {
                return Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('button.radius');
            }
        },

        size: {
            type: String,
            default: 'normal'
        },

        square: {
            type: Boolean,
            default: false
        },

        hollow: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        },

        border: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        style: function style() {
            var square = this.square,
                radius = this.radius,
                hollow = this.hollow,
                type = this.type,
                size = this.size;

            var height = Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('button.sizes')[SIZES.indexOf(size)];
            var color = Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('button.colors')[type] || (type == 'primary' ? Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('theme') : type);

            var style = {
                'border-radius': square ? '0px' : __WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].n2p(radius),
                'height': height
            };

            if (hollow) {
                style.color = color;

                if (this.border) {
                    style.border = '1px solid ' + color;
                }
            } else {
                style.background = color;
            }

            return style;
        },
        className: function className() {
            return ['vm-button', 'vm-button-' + this.size];
        }
    }
});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    class: _vm.className,
    style: (_vm.style),
    attrs: {
      "disabled": _vm.disabled
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        return _vm.$emit('click')
      }
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9acae40a", module.exports)
  }
}

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__topbar__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__topbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__topbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__topbar___default.a));

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(61)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(63),
  /* template */
  __webpack_require__(70),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/topbar/topbar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] topbar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-23e65c7b", Component.options)
  } else {
    hotAPI.reload("data-v-23e65c7b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(62);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("4e22b9c5", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-23e65c7b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./topbar.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-23e65c7b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./topbar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-topbar {\n  height: 44px;\n  padding: 0px 16px;\n}\n.vm-topbar-inner {\n  position: relative;\n  height: 44px;\n}\n.vm-topbar-left,\n.vm-topbar-right {\n  min-width: 44px;\n  height: 44px;\n  display: inline-block;\n  display: flex;\n  align-items: center;\n  position: absolute;\n  bottom: 0px;\n  font-weight: bold;\n}\n.vm-topbar-left {\n  left: 0px;\n  text-align: left;\n}\n.vm-topbar-right {\n  right: 0px;\n  text-align: right;\n}\n.vm-topbar-title {\n  font-weight: bold;\n  align-items: center;\n  height: 44px;\n  display: flex;\n  justify-content: center;\n}\n", ""]);

// exports


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'topbar',

    props: {
        leftEnabled: {
            type: Boolean,
            default: true
        },

        rightEnabled: {
            type: Boolean,
            default: true
        }
    },

    components: {
        Icon: __WEBPACK_IMPORTED_MODULE_0__icon___default.a
    },

    data: function data() {
        return {
            style: {
                'padding-top': Object(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */])('topbar.padding-top'),
                'border-bottom': Object(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */])('topbar.border-bottom'),
                'background': Object(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */])('topbar.background'),
                'color': Object(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */])('topbar.color'),
                'font-size': Object(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */])('topbar.font-size')
            }
        };
    },


    methods: {
        onBackButtonClick: function onBackButtonClick() {
            history.back();
            this.$emit('back');
        }
    }
});

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iconfont_css__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iconfont_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__iconfont_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'icon',

    props: {
        type: {
            type: String,
            default: ''
        },

        size: {
            type: [String, Number],
            default: null
        },

        color: {
            type: String,
            default: ''
        }
    },

    computed: {
        style: function style() {
            var style = {};

            if (this.size) {
                style.fontSize = __WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].n2p(this.size);
            }

            if (this.color) {
                style.color = this.color;
            }

            return style;
        }
    }
});

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(14)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./iconfont.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./iconfont.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(67);
exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "@font-face {\n    font-family: \"vm-iconfont\";\n    src: url(" + escape(__webpack_require__(68)) + ") format('truetype');\n}\n\n.vm-iconfont {\n    display: inline-block;\n    font-family: \"vm-iconfont\" !important;\n    font-style: normal;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\n.vm-icon-down:before {\n    content: \"\\E68A\";\n}\n\n.vm-icon-search:before {\n    content: \"\\E68B\";\n}\n\n.vm-icon-selected:before {\n    content: \"\\E68C\";\n}\n\n.vm-icon-success:before {\n    content: \"\\E68D\";\n}\n\n.vm-icon-unsuccess:before {\n    content: \"\\E68E\";\n}\n\n.vm-icon-close:before {\n    content: \"\\E699\";\n}\n\n.vm-icon-right:before {\n    content: \"\\E69C\";\n}\n\n.vm-icon-left:before {\n    content: \"\\E69D\";\n}\n\n.vm-icon-up:before {\n    content: \"\\E69E\";\n}", ""]);

// exports


/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url;
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
    }

    return url;
};

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = "data:application/x-font-ttf;base64,AAEAAAALAIAAAwAwR1NVQrD+s+0AAAE4AAAAQk9TLzJW7kiOAAABfAAAAFZjbWFw0rHUpwAAAgAAAAIGZ2x5ZnUIy1wAAAQgAAAEBGhlYWQQGdP9AAAA4AAAADZoaGVhB94DjAAAALwAAAAkaG10eCvpAAAAAAHUAAAALGxvY2EGIgbIAAAECAAAABhtYXhwARoAXQAAARgAAAAgbmFtZT5U/n0AAAgkAAACbXBvc3RoInWFAAAKlAAAAIYAAQAAA4D/gABcBAAAAAAABAAAAQAAAAAAAAAAAAAAAAAAAAsAAQAAAAEAANvML05fDzz1AAsEAAAAAADWfUgAAAAAANZ9SAAAAP+BBAADfwAAAAgAAgAAAAAAAAABAAAACwBRAAUAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKAB4ALAABREZMVAAIAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAAAAQP+AZAABQAIAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABAAHjmngOA/4AAXAOAAIAAAAABAAAAAAAABAAAAAPpAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAAFAAAAAwAAACwAAAAEAAABfgABAAAAAAB4AAMAAQAAACwAAwAKAAABfgAEAEwAAAAKAAgAAgACAHjmjuaZ5p7//wAAAHjmiuaZ5pz//wAAAAAAAAAAAAEACgAKABIAEgAAAAEAAgADAAQABQAGAAcACAAJAAoAAAEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAIgAAAAAAAAACgAAAHgAAAB4AAAAAQAA5ooAAOaKAAAAAgAA5osAAOaLAAAAAwAA5owAAOaMAAAABAAA5o0AAOaNAAAABQAA5o4AAOaOAAAABgAA5pkAAOaZAAAABwAA5pwAAOacAAAACAAA5p0AAOadAAAACQAA5p4AAOaeAAAACgAAAAAAAAB2AI4AygDiAS4BfAHGAdoB7gICAAUAAP/hA7wDGAATACgAMQBEAFAAAAEGKwEiDgIdASEnNC4CKwEVIQUVFxQOAycjJyEHIyIuAz0BFyIGFBYyNjQmFwYHBg8BDgEeATMhMjYnLgInATU0PgI7ATIWHQEBGRsaUxIlHBIDkAEKGCcehf5KAqIBFR8jHA8+Lf5JLD8UMiATCHcMEhIZEhKMCAYFBQgCAgQPDgFtFxYJBQkKBv6kBQ8aFbwfKQIfAQwZJxpMWQ0gGxJhiDRuHSUXCQEBgIABExsgDqc/ERoRERoRfBoWExIZBxANCBgaDSMkFAF35AsYEwwdJuMAAAAAAgAAAAADtwJQAAMABwAAJQcBMwEnATMCIiX+TUoBaR8BkUe/JQG2/kolAZEAAAAAAgAA/6QD5wNeAB4AIgAAJS4BJz4BNx4BFxQGByc+ATUuAScOAQceARcyNjcXBj8BFwcBua/sBATqsa/sBEE8HDc6BNOdotUEBNSgHj8gC0jZHfccIgTqsbDoBQTqsVSYPBw2iEue1QQE0pyd0wQKDSUeex36GgAAAgAAAAAD3wKrAAMABwAAEzcBBycBFwEeHgFkHg8CTh79sgG1Hv6cHg0CTR79swAAAwAA/4ID/gN+AB4AIgAmAAAFJgAnNgA3FgAXFAYHJz4BNSYAJwYABxYAFxY3Fw4BATcXBycBFwECANf+4AYGASDX1wEgBlBJGkVJBf73x8j+8gUFAQzHTlEMK1f+pxrvGhABnBr+ZH0FAR/Z2QEfBQX+4dlnvEkaQ61fyAELBQX+98fH/vcFAR0iERECBxrvGg0BmRr+ZwADAAD/ggP+A34AHgAiACYAAAUmACc2ADcWABcUBgcnPgE1JgAnBgAHFgAXFjcXDgEJARcBAzcBBwIA1/7gBgYBINfXASAGUEkaRUkF/vfHyP7yBQUBDMdOUQwrV/7rAcAa/kAcGgHEGn0FAR/Z2QEfBQX+4dlnvEkaQ61fyAELBQX+98fH/vcFAR0iEREBJwHFGv47AcQa/kAaAAADAAD/gQP/A38ACwAXACMAAAEnBycHFwcXNxc3JwMGAAcWABc2ADcmAAMmACc2ADcWABcGAALuGtLWG9fUGtTVGtUc2f7gBQUBINnZASAFBf7g2cj+9gYGAQrIyAEKBgb+9gJUG9XUGtTXGtfSGtIB/gX+4NnZ/uAFBQEg2dkBIPwvBgEKyMgBCgYG/vbIyP72AAAAAQAA/74C3AMrAAUAAAkCFQkBASUBb/6RAbb+SgLj/pL+lEsBtAG4AAEAAP++AtwDKwAFAAAlCQE1CQEC2/6RAW/+SgG2BgFvAWxJ/k3+RwABAAAAAAO3AlAABQAANwkBMwkBkQFvAWxK/k3+R5oBbv6SAbb+SgAAAAASAN4AAQAAAAAAAAAVAAAAAQAAAAAAAQAIABUAAQAAAAAAAgAHAB0AAQAAAAAAAwAIACQAAQAAAAAABAAIACwAAQAAAAAABQALADQAAQAAAAAABgAIAD8AAQAAAAAACgArAEcAAQAAAAAACwATAHIAAwABBAkAAAAqAIUAAwABBAkAAQAQAK8AAwABBAkAAgAOAL8AAwABBAkAAwAQAM0AAwABBAkABAAQAN0AAwABBAkABQAWAO0AAwABBAkABgAQAQMAAwABBAkACgBWARMAAwABBAkACwAmAWkKQ3JlYXRlZCBieSBpY29uZm9udAppY29uZm9udFJlZ3VsYXJpY29uZm9udGljb25mb250VmVyc2lvbiAxLjBpY29uZm9udEdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAAoAQwByAGUAYQB0AGUAZAAgAGIAeQAgAGkAYwBvAG4AZgBvAG4AdAAKAGkAYwBvAG4AZgBvAG4AdABSAGUAZwB1AGwAYQByAGkAYwBvAG4AZgBvAG4AdABpAGMAbwBuAGYAbwBuAHQAVgBlAHIAcwBpAG8AbgAgADEALgAwAGkAYwBvAG4AZgBvAG4AdABHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAAAAgAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAQIBAwEEAQUBBgEHAQgBCQEKAQsBDAABeAVkb3dueAxzZWFyY2hfYmx1ZXgJc2VsZWN0ZWR4CHN1Y2Nlc3N4CnVuc3VjY2Vzc3gGY2xvc2V4BnJpZ2h0eAVsZWZ0eANvbngAAAAA"

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('i', {
    staticClass: "vm-iconfont",
    class: 'vm-icon-' + _vm.type,
    style: (_vm.style)
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-770e66a0", module.exports)
  }
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vm-topbar",
    style: (_vm.style)
  }, [_c('div', {
    staticClass: "vm-topbar-inner"
  }, [(_vm.leftEnabled) ? _c('div', {
    staticClass: "vm-topbar-left"
  }, [_vm._t("left", [_c('icon', {
    attrs: {
      "type": "left"
    },
    nativeOn: {
      "click": function($event) {
        return _vm.onBackButtonClick($event)
      }
    }
  })])], 2) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "vm-topbar-title"
  }, [_vm._t("default", [_vm._v("页面标题")])], 2), _vm._v(" "), (_vm.rightEnabled) ? _c('div', {
    staticClass: "vm-topbar-right"
  }, [_vm._t("right")], 2) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-23e65c7b", module.exports)
  }
}

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forward__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forward___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__forward__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__forward___default.a));

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(73)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(75),
  /* template */
  __webpack_require__(76),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/forward/forward.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] forward.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-342ed872", Component.options)
  } else {
    hotAPI.reload("data-v-342ed872", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(74);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("2d3cd582", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-342ed872\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./forward.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-342ed872\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./forward.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-forward-wraper {\n  display: inline-flex;\n  margin-start: auto;\n  -webkit-margin-start: auto;\n  justify-content: flex-end;\n  align-items: center;\n  color: #555;\n  font-size: 14px;\n}\n.vm-forward {\n  -webkit-tap-highlight-color: transparent;\n  text-decoration: none;\n  display: inline-flex;\n  color: inherit;\n  align-items: center;\n}\n.vm-forward .vm-forward-content {\n  margin-right: 6px;\n}\n.vm-forward .vm-iconfont {\n  font-weight: bold;\n}\n.vm-forward-ll {\n  margin-start: initial;\n  -webkit-margin-start: auto;\n  justify-content: flex-start;\n}\n", ""]);

// exports


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'forward',
    components: {
        Icon: __WEBPACK_IMPORTED_MODULE_0__icon___default.a
    },

    data: function data() {
        return {
            leftLayout: true
        };
    },
    mounted: function mounted() {
        var parentNode = this.$el.parentNode;
        var display = __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].css(parentNode, 'display');

        this.leftLayout = parentNode.childNodes[0] === this.$el;

        if (display == 'block') {
            __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].css(parentNode, 'display', 'flex');
        }
    }
});

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    class: ['vm-forward-wraper', _vm.leftLayout ? 'vm-forward-ll' : ''],
    on: {
      "click": function($event) {
        return _vm.$emit('click')
      }
    }
  }, [_c('a', {
    staticClass: "vm-forward",
    attrs: {
      "href": "javascript:"
    }
  }, [(_vm.$slots.default) ? _c('span', {
    staticClass: "vm-forward-content"
  }, [_vm._t("default")], 2) : _vm._e(), _vm._v(" "), _c('icon', {
    attrs: {
      "type": "right"
    }
  })], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-342ed872", module.exports)
  }
}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(78)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(80),
  /* template */
  __webpack_require__(81),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/overlay/overlay.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] overlay.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-19d97e46", Component.options)
  } else {
    hotAPI.reload("data-v-19d97e46", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(79);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("015b64e2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-19d97e46\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./overlay.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-19d97e46\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./overlay.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-overlay {\n    position: fixed;\n    z-index: 10000;\n}\n.vm-overlay-center {\n    top: 50%;\n    transform: translate(0px, -50%);\n    -webkit-transform: translate(0px, -50%);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n}\n.vm-overlay-left,\n.vm-overlay-top {\n    left: 0px;\n    top: 0px;\n}\n.vm-overlay-left,\n.vm-overlay-right {\n    height: 100%;\n}\n.vm-overlay-top,\n.vm-overlay-bottom {\n    width: 100%;\n}\n.vm-overlay-bottom {\n    bottom: 0px;\n    left: 0px;\n}\n.vm-overlay-right {\n    right: 0px;\n    top: 0px;\n}\n.vm-fx-enter-active,\n.vm-fx-leave-active,\n.vm-fx-center-enter-active,\n.vm-fx-center-leave-active,\n.vm-fx-left-enter-active,\n.vm-fx-left-leave-active,\n.vm-fx-right-enter-active,\n.vm-fx-right-leave-active,\n.vm-fx-bottom-enter-active,\n.vm-fx-bottom-leave-active,\n.vm-fx-top-enter-active,\n.vm-fx-top-leave-active {\n    transition: transform .3s ease, opacity .3s ease;\n    -webkit-transition: transform .3s ease, opacity .3s ease;\n}\n.vm-fx-enter,\n.vm-fx-leave-active,\n.vm-fx-center-enter,\n.vm-fx-center-leave-active {\n    opacity: 0;\n}\n.vm-fx-left-enter,\n.vm-fx-left-leave-active {\n    transform: translateX(-100%);\n    -webkit-transform: translateX(-100%);\n}\n.vm-fx-right-enter,\n.vm-fx-right-leave-active {\n    transform: translateX(100%);\n    -webkit-transform: translateX(100%);\n}\n.vm-fx-bottom-enter,\n.vm-fx-bottom-leave-active {\n    transform: translateY(100%);\n    -webkit-transform: translateY(100%);\n}\n.vm-fx-top-enter,\n.vm-fx-top-leave-active {\n    transform: translateY(-100%);\n    -webkit-transform: translateY(-100%);\n}\n", ""]);

// exports


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'overlay',

    model: {
        prop: 'visible',
        event: 'update:visible'
    },

    props: {
        fx: {
            type: Boolean,
            default: true
        },

        visible: {
            type: Boolean,
            default: false
        },

        position: {
            type: String,
            default: null
        },

        transition: {
            type: String,
            default: null
        }
    },

    data: function data() {
        return {
            visibility: false,
            destroyed: false
        };
    },


    watch: {
        visible: function visible(v) {
            v ? this.show() : this.hide();
        },
        visibility: function visibility(v) {
            this.$emit('update:visible', v);
        }
    },

    computed: {
        className: function className() {
            var c = ['vm-overlay'];

            if (this.position) {
                c.push('vm-overlay-' + this.position);
            }

            c.push(this.class || '');

            return c;
        }
    },

    mounted: function mounted() {
        this.visible && this.show();
    },

    methods: {
        show: function show() {
            if (this.visibility) return false;

            this.visibility = true;
            this.$nextTick(function () {
                this.$emit('show');
            });
        },
        hide: function hide() {
            if (!this.visibility) return false;

            this.visibility = false;
            this.$nextTick(function () {
                this.$emit('hide');
            });
        },
        destroy: function destroy() {
            var _this = this;

            var fx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.fx;

            if (this.destroyed) return;

            this.hide();

            if (fx) {
                __WEBPACK_IMPORTED_MODULE_0__helper__["b" /* Event */].on(this.$el, 'transitionend webkitTransitionEnd', function () {
                    _this._destroy();
                });
            } else {
                this._destroy();
            }
        },
        _destroy: function _destroy() {
            this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
            this.$emit('destroy');
            this.destroyed = true;
        }
    }
});

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": _vm.transition || (_vm.fx ? 'vm-fx-' + (_vm.position || 'center') : '')
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.visibility),
      expression: "visibility"
    }],
    class: _vm.className,
    on: {
      "click": function($event) {
        return _vm.$emit('click')
      }
    }
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-19d97e46", module.exports)
  }
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(83)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(85),
  /* template */
  __webpack_require__(86),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/masker/masker.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] masker.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-baff27ca", Component.options)
  } else {
    hotAPI.reload("data-v-baff27ca", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(84);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("2f5abff0", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-baff27ca\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./masker.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-baff27ca\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./masker.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-masker.vm-overlay {\n    overflow: hidden;\n    width: 100%;\n    height: 100%;\n    left: 0px;\n    top: 0px;\n    background: rgba(0, 0, 0, 0.6);\n}\n", ""]);

// exports


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overlay__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_0__overlay__["a" /* default */]],

    name: 'masker',

    components: {
        Overlay: __WEBPACK_IMPORTED_MODULE_0__overlay__["a" /* default */]
    }
});

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('overlay', {
    staticClass: "vm-masker",
    attrs: {
      "fx": _vm.fx
    },
    on: {
      "click": function($event) {
        return _vm.$emit('click')
      }
    },
    model: {
      value: (_vm.visibility),
      callback: function($$v) {
        _vm.visibility = $$v
      },
      expression: "visibility"
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-baff27ca", module.exports)
  }
}

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(88),
  /* template */
  __webpack_require__(89),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/popup/popup.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] popup.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-19258256", Component.options)
  } else {
    hotAPI.reload("data-v-19258256", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__masker__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__overlay__ = __webpack_require__(5);
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'popup',

    mixins: [__WEBPACK_IMPORTED_MODULE_1__overlay__["a" /* default */]],

    components: {
        Masker: __WEBPACK_IMPORTED_MODULE_0__masker__["a" /* default */],
        Overlay: __WEBPACK_IMPORTED_MODULE_1__overlay__["a" /* default */]
    },

    props: {
        clickBg2hide: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        onMaskerClick: function onMaskerClick(e) {
            e.target === this.$el && this.clickBg2hide && this.hide();
        }
    }
});

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('masker', {
    staticClass: "vm-popup",
    nativeOn: {
      "click": function($event) {
        return _vm.onMaskerClick($event)
      }
    },
    model: {
      value: (_vm.visibility),
      callback: function($$v) {
        _vm.visibility = $$v
      },
      expression: "visibility"
    }
  }, [_c('overlay', {
    attrs: {
      "position": _vm.position
    },
    model: {
      value: (_vm.visibility),
      callback: function($$v) {
        _vm.visibility = $$v
      },
      expression: "visibility"
    }
  }, [_vm._t("default")], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-19258256", module.exports)
  }
}

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionsheet__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionsheet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__actionsheet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__item__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(0);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__actionsheet___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__item___default.a; });




__WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__actionsheet___default.a);
__WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_1__item___default.a);



/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(92)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(94),
  /* template */
  __webpack_require__(99),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/actionsheet/actionsheet.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] actionsheet.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-baa751e2", Component.options)
  } else {
    hotAPI.reload("data-v-baa751e2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(93);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("7a0589e1", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-baa751e2\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./actionsheet.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-baa751e2\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./actionsheet.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-actionsheet-items,\n.vm-actionsheet-cancel {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 5px;\n}\n", ""]);

// exports


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popup__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__item__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__item__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'actionsheet',

    mixins: [__WEBPACK_IMPORTED_MODULE_0__popup__["a" /* default */]],

    props: {
        cancelDisabled: {
            type: Boolean,
            default: false
        },

        clickBg2hide: {
            type: Boolean,
            default: true
        },

        actions: {
            type: Array,
            default: null
        }
    },

    components: {
        Popup: __WEBPACK_IMPORTED_MODULE_0__popup__["a" /* default */],
        Item: __WEBPACK_IMPORTED_MODULE_1__item___default.a
    }
});

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(96);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("24a52adc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1d2a4fdd\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./item.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1d2a4fdd\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./item.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-actionsheet-item {\n    text-decoration: none;\n    background: #fff;\n    font-weight: bold;\n    padding: 10px 0px;\n    display: inline-flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    font-size: 16px;\n    color: #222222;\n    border-top: 1px solid #eee;\n}\n.vm-actionsheet-item:nth-child(1) {\n    border-top: 0px;\n}\n.vm-actionsheet-item-disabled {\n    color: #ccc;\n}\n.vm-actionsheet-item-extras {\n    font-size: 12px;\n    color: #666;\n    font-weight: normal;\n    margin-top: 5px;\n}\n", ""]);

// exports


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'actionsheet-item',

    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        extras: {
            type: String,
            default: null
        }
    },

    methods: {
        onClick: function onClick() {
            if (this.disabled) return false;

            this.$emit('click');
        }
    }
});

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', {
    class: ['vm-actionsheet-item', _vm.disabled ? 'vm-actionsheet-item-disabled' : ''],
    attrs: {
      "href": "javascript:"
    },
    on: {
      "click": _vm.onClick
    }
  }, [_vm._t("default"), _vm._v(" "), (_vm.extras) ? _c('span', {
    staticClass: "vm-actionsheet-item-extras",
    domProps: {
      "innerHTML": _vm._s(_vm.extras)
    }
  }) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1d2a4fdd", module.exports)
  }
}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('popup', {
    staticClass: "vm-actionsheet",
    attrs: {
      "visible": _vm.visibility,
      "click-bg2hide": _vm.clickBg2hide,
      "position": "bottom"
    },
    nativeOn: {
      "click": function($event) {
        return _vm.hide($event)
      }
    }
  }, [_c('div', {
    staticClass: "vm-actionsheet-items"
  }, [_vm._t("default", [(_vm.actions) ? _vm._l((_vm.options), function(action, key) {
    return _c('item', {
      key: key,
      attrs: {
        "disabled": action.disabled,
        "extras": action.extras
      },
      on: {
        "click": action.handler
      }
    }, [_vm._v("\n                    " + _vm._s(action.title) + "\n                ")])
  }) : _vm._e()])], 2), _vm._v(" "), (!_vm.cancelDisabled) ? _c('div', {
    staticClass: "vm-actionsheet-cancel"
  }, [_vm._t("cancel", [_c('item', {
    on: {
      "click": _vm.hide
    }
  }, [_vm._v("取消")])])], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-baa751e2", module.exports)
  }
}

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modal__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




function create(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    options.message = message;

    var instance = __WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].factory(__WEBPACK_IMPORTED_MODULE_0__modal___default.a, options);
    instance.$on('hide', function () {
        instance.destroy();
        instance = null;
    });
    instance.show();

    return instance;
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__modal___default.a, false, function (Vue) {
    Vue.prototype.$alert = create;
    Vue.prototype.$confirm = function (message) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return create(message, _extends({
            'cancelButton': '取消'
        }, options));
    };
}));

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(102)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(104),
  /* template */
  __webpack_require__(105),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/modal/modal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] modal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-70519d17", Component.options)
  } else {
    hotAPI.reload("data-v-70519d17", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(103);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("5d70f810", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-70519d17\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./modal.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-70519d17\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./modal.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-modal {\n    width: 70%;\n    margin: auto;\n    border-radius: 10px;\n    background: #fff;\n    overflow: hidden;\n}\n.vm-modal-title {\n    height: 40px;\n    line-height: 40px;\n    font-size: 16px;\n    text-align: center;\n    border-bottom: 1px solid #eee;\n}\n.vm-modal-content {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 20px 10px;\n}\n.vm-modal-buttons {\n    border-top: 1px solid #eee;\n    display: flex;\n}\n.vm-modal-cancel, .vm-modal-confirm {\n    height: 40px !important;\n    flex: 1;\n    font-size: 14px;\n    border-radius: 0px !important;\n    border: 0px !important;\n}\n.vm-modal-cancel {\n    border-right: 1px solid #eee !important;\n}\n", ""]);

// exports


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popup__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__button__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'modal',

    mixins: [__WEBPACK_IMPORTED_MODULE_0__popup__["a" /* default */]],

    components: {
        Popup: __WEBPACK_IMPORTED_MODULE_0__popup__["a" /* default */],
        Btn: __WEBPACK_IMPORTED_MODULE_1__button__["a" /* default */]
    },

    props: {
        title: {
            type: String,
            default: ''
        },

        message: {
            type: String,
            default: ''
        },

        confirmButton: {
            type: String,
            default: '确定'
        },

        cancelButton: {
            type: String,
            default: ''
        },

        buttonClick2hide: {
            type: Boolean,
            default: true
        }
    },

    data: function data() {
        return {
            confirmStyle: {
                color: Object(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */])('theme')
            }
        };
    },


    methods: {
        onConfirm: function onConfirm() {
            this.$emit('confirm');
            this.buttonClick2hide && this.hide();
        },
        onCancel: function onCancel() {
            this.$emit('cancel');
            this.buttonClick2hide && this.hide();
        }
    }
});

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('popup', {
    attrs: {
      "position": "center"
    },
    model: {
      value: (_vm.visibility),
      callback: function($$v) {
        _vm.visibility = $$v
      },
      expression: "visibility"
    }
  }, [_c('div', {
    staticClass: "vm-modal"
  }, [(_vm.title || _vm.$slots.title) ? _c('div', {
    staticClass: "vm-modal-title"
  }, [_vm._t("title", [_vm._v(_vm._s(_vm.title))])], 2) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "vm-modal-content"
  }, [_vm._t("default", [_vm._v(_vm._s(_vm.message))])], 2), _vm._v(" "), _c('div', {
    staticClass: "vm-modal-buttons"
  }, [(_vm.cancelButton) ? _c('btn', {
    staticClass: "vm-modal-cancel",
    attrs: {
      "hollow": "",
      "type": "#333"
    },
    on: {
      "click": _vm.onCancel
    }
  }, [_vm._v("\n                " + _vm._s(_vm.cancelButton) + "\n            ")]) : _vm._e(), _vm._v(" "), _c('btn', {
    staticClass: "vm-modal-confirm",
    style: (_vm.confirmStyle),
    attrs: {
      "hollow": ""
    },
    on: {
      "click": _vm.onConfirm
    }
  }, [_vm._v("\n                " + _vm._s(_vm.confirmButton) + "\n            ")])], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-70519d17", module.exports)
  }
}

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toast__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toast___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__toast__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



var instance = void 0;

function Toast(options, type) {
    Toast.destroy(false);

    var props = {
        duration: 1000,
        visible: true
    };

    if (typeof options == 'string') {
        props.message = options;
    } else {
        props = Object.assign(props, options);
    }

    type && (props.type = type);

    instance = __WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].factory(__WEBPACK_IMPORTED_MODULE_0__toast___default.a, props);

    if (props.duration && props.duration > 0) {
        instance.$id = setTimeout(Toast.destroy, props.duration);
    }

    return instance;
}

Toast.destroy = function () {
    var fx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (instance) {
        instance.destroy(fx);
        instance.$id && clearTimeout(instance.$id);
        instance = null;
    }
};

['success', 'loading'].forEach(function (type) {
    Toast[type] = function (options) {
        return Toast(options, type);
    };
});

Toast.Component = __WEBPACK_IMPORTED_MODULE_0__toast___default.a;
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(Toast, false, function (Vue) {
    Vue.prototype.$toast = Toast;
}));

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(108)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(110),
  /* template */
  null,
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/toast/toast.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c8012ea", Component.options)
  } else {
    hotAPI.reload("data-v-4c8012ea", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(109);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("a751e4a0", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4c8012ea\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./toast.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4c8012ea\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./toast.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-toast {\n    text-align: center;\n    flex-direction: column;\n    align-items: center;\n    display: flex;\n    max-width: 70%;\n    font-size: 16px;\n    color: #FFFFFF;\n    line-height: 28px;\n    padding: 8px 15px;\n    word-break: break-all;\n    word-wrap: break-word;\n    background: rgba(0, 0, 0, 0.7);\n    border-radius: 4px;\n}\n", ""]);

// exports


/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overlay__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__popup__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tick__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loading__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







var Icons = _extends({
    success: __WEBPACK_IMPORTED_MODULE_2__tick__["a" /* default */],
    loading: __WEBPACK_IMPORTED_MODULE_3__loading__["a" /* default */]
}, Object(__WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */])('toast.icons'));

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'toast',

    mixins: [__WEBPACK_IMPORTED_MODULE_0__overlay__["a" /* default */]],

    props: {
        type: {
            type: String,
            default: null
        },

        message: {
            type: String,
            default: ''
        },

        masker: {
            type: Boolean,
            default: false
        }
    },

    render: function render(h) {
        return h(this.masker ? __WEBPACK_IMPORTED_MODULE_1__popup__["a" /* default */] : __WEBPACK_IMPORTED_MODULE_0__overlay__["a" /* default */], {
            class: 'vm-toast-container',
            props: {
                position: 'center',
                visible: this.visibility,
                clickBg2hide: false
            }
        }, [h('div', {
            class: 'vm-toast'
        }, [this.$scopedSlots.icon || Icons[this.type] ? h(Icons[this.type], {
            props: {
                size: 25
            },

            style: {
                marginBottom: '5px'
            }
        }) : '', h('div', {
            domProps: this.message ? { innerHTML: this.message } : null
        }, [this.$slots.default])])]);
    }
});

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(4);



/* harmony default export */ __webpack_exports__["a"] = ({
    render: function render(h) {
        return h(__WEBPACK_IMPORTED_MODULE_0__icon___default.a, {
            props: {
                type: 'selected',
                color: '#009933',
                size: 25
            }
        });
    }
});

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(113)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(115),
  /* template */
  __webpack_require__(116),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/loading/loading.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] loading.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-415c22b5", Component.options)
  } else {
    hotAPI.reload("data-v-415c22b5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(114);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("f4646718", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-415c22b5\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./loading.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-415c22b5\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./loading.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n@keyframes vm-loading-rotate {\n0% {\n    transform: rotate(0deg);\n}\nto {\n    transform: rotate(360deg);\n}\n}\n.vm-loading {\n  margin: 0px 10px;\n  box-sizing: border-box;\n  border-width: 1px;\n  border-left-width: 2px;\n  border-right-color: transparent !important;\n  display: inline-block;\n  animation: vm-loading-rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-style: solid;\n  border-radius: 10000px;\n}\n", ""]);

// exports


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(4);
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'loading',

    props: {
        size: {
            type: [Number, String],
            default: 20
        },

        color: {
            type: String,
            default: function _default() {
                return Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('loading.color') || Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('theme');
            }
        }
    },

    data: function data() {
        return {
            style: {
                borderColor: this.color,
                width: this.size + 'px',
                height: this.size + 'px'
            }
        };
    }
});

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('i', {
    staticClass: "vm-loading",
    style: (_vm.style)
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-415c22b5", module.exports)
  }
}

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__segment__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__segment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__segment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__segment___default.a));

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(119)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(121),
  /* template */
  __webpack_require__(122),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/segment/segment.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] segment.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e0a4deba", Component.options)
  } else {
    hotAPI.reload("data-v-e0a4deba", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(120);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("d8e97bea", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e0a4deba\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./segment.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e0a4deba\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./segment.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-segment {\n  height: 22px;\n  border-radius: 4px;\n  display: flex;\n}\n.vm-segment button {\n  margin: 0px;\n  padding: 0px 10px;\n  flex-grow: 1;\n  background: transparent;\n  height: 100%;\n  color: #000;\n  background: #fff;\n  border: 0px;\n  border-left: 1px solid #000;\n  height: 22px;\n  line-height: 22px;\n  border-radius: 0px;\n  outline: none;\n}\n.vm-segment button:nth-child(1) {\n  border-left: 0px;\n  border-top-left-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.vm-segment button:nth-last-child(1) {\n  border-top-right-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n", ""]);

// exports


/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'segment',

    props: {
        options: {
            type: Array,
            default: function _default() {
                return [];
            }
        },

        color: {
            type: String,
            default: function _default() {
                return Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('segment.color');
            }
        },

        activeColor: {
            type: String,
            default: function _default() {
                return Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('segment.active-color') || Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('theme');
            }
        },

        defaultIndex: {
            type: Number,
            default: 0
        }
    },

    data: function data() {
        return {
            index: this.defaultIndex
        };
    },


    computed: {
        containerStyle: function containerStyle() {
            return {
                border: '1px solid ' + this.activeColor
            };
        },
        style: function style() {
            return {
                color: this.color,
                background: this.activeColor,
                borderColor: this.color
            };
        },
        activeStyle: function activeStyle() {
            return {
                color: this.activeColor,
                background: this.color,
                borderColor: this.color
            };
        }
    },

    methods: {
        onItemClick: function onItemClick(index) {
            this.$emit('item:click', index, this.options[index]);
            this.switch(index);
        },
        switch: function _switch() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            if (index == this.index) {
                return false;
            }

            this.index = index;
            this.$emit('switch', index, this.options[index]);
        }
    }
});

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "vm-segment",
    style: (_vm.containerStyle)
  }, _vm._l((_vm.options), function(item, key) {
    return _c('button', {
      key: key,
      style: (_vm.index == key ? _vm.activeStyle : _vm.style),
      on: {
        "click": function($event) {
          return _vm.onItemClick(key)
        }
      }
    }, [_vm._v("\n            " + _vm._s(item.label || item) + "\n        ")])
  }), 0)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e0a4deba", module.exports)
  }
}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(124)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(126),
  /* template */
  null,
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/dropdown/dropdown.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0119b8ca", Component.options)
  } else {
    hotAPI.reload("data-v-0119b8ca", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(125);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("345e47b5", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0119b8ca\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./dropdown.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0119b8ca\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./dropdown.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-dropbox .vm-overlay{\n    position: absolute;\n}\n", ""]);

// exports


/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__popup__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay__ = __webpack_require__(5);





/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_1__popup__["a" /* default */]],

    name: 'dropdown',

    data: function data() {
        return {
            above: false,
            boxStyle: {}
        };
    },


    components: {
        Popup: __WEBPACK_IMPORTED_MODULE_1__popup__["a" /* default */]
    },

    computed: {
        pos: function pos() {
            return this.above ? 'bottom' : 'top';
        }
    },

    watch: {
        visibility: function visibility(value) {
            value && this.resetPosition();
        }
    },

    mounted: function mounted() {
        var _this = this;

        this.$nextTick(function () {
            __WEBPACK_IMPORTED_MODULE_0__helper__["b" /* Event */].on(document.body, 'click', function (e) {
                !__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].contains(_this.$el, e.target) && _this.hide();
            });
        });
    },


    methods: {
        onLabelClick: function onLabelClick() {
            var _this2 = this;

            // fixed android bug
            setTimeout(function () {
                _this2.toggle();
            }, 50);
        },
        onBoxBgClick: function onBoxBgClick(e) {
            e.stopPropagation();
            this.hide();
        },
        onBoxInnerClick: function onBoxInnerClick(e) {
            e.target !== this.$refs.inner && e.stopPropagation();
        },
        toggle: function toggle() {
            this.visibility ? this.hide() : this.show();
        },
        resetPosition: function resetPosition() {
            var BODY_HEIGHT = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].height(document);

            var _Dom$rect = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].rect(this.$el),
                top = _Dom$rect.top,
                height = _Dom$rect.height,
                bottom = _Dom$rect.bottom;

            this.above = top + height > BODY_HEIGHT / 2;

            if (this.above) {
                this.boxStyle = {
                    bottom: BODY_HEIGHT - top,
                    height: top
                };
            } else {
                this.boxStyle = {
                    top: bottom,
                    height: BODY_HEIGHT - bottom
                };
            }
        }
    },

    render: function render(h) {
        return h('div', {
            class: 'vm-dropdown'
        }, [h('div', {
            class: 'vm-dropdown-label',
            on: {
                click: this.onLabelClick.bind(this)
            }
        }, [this.$slots.default, this.$scopedSlots.label ? this.$scopedSlots.label(this.visibility) : null, this.visibility ? this.$slots['if-show'] : this.$slots['if-hide']]), h(__WEBPACK_IMPORTED_MODULE_1__popup__["a" /* default */], {
            class: 'vm-dropbox',
            style: this.boxStyle,
            props: {
                visible: this.visibility,
                position: this.pos,
                clickBg2hide: this.clickBg2hide
            },
            nativeOn: {
                click: this.onBoxBgClick.bind(this)
            }
        }, [h('div', {
            class: ['vm-dropbox-inner', 'vm-dropbox-' + this.pos],
            on: {
                click: this.onBoxInnerClick.bind(this)
            },
            ref: 'inner'
        }, [this.$slots.box])])]);
    }
});

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popover__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popover___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__popover__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__action__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__action___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__action__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(0);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__popover___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__action___default.a; });




__WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__popover___default.a);
__WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_1__action___default.a);



/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(129)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(131),
  /* template */
  null,
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/popover/popover.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-452b28f2", Component.options)
  } else {
    hotAPI.reload("data-v-452b28f2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(130);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("40c54d4d", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-452b28f2\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./popover.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-452b28f2\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./popover.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-popover .vm-popup {\n    background: transparent !important;\n}\n.vm-popover .vm-popup .vm-overlay {\n    text-align: initial;\n}\n.vm-popover-box {\n    box-shadow: 0px 0px 10px #333;\n    line-height: initial;\n    font-weight: normal;\n    border-radius: 3px;\n    margin: 12px 0px;\n    position: relative;\n    z-index: 100000;\n    display: inline-block;\n}\n.vm-dropbox-bottom .vm-popover-arrow {\n    border-bottom-color: transparent !important;\n    top: 100%;\n    transform: translate(-8px, -10%);\n}\n.vm-dropbox-top .vm-popover-arrow {\n    border-top-color: transparent !important;\n}\n.vm-popover-arrow {\n    position: absolute;\n    content: \"\";\n    border-width: 8px;\n    border-style: solid;\n    border-left-color: transparent !important;\n    border-right-color: transparent !important;\n    height: 0px;\n    width: 0px;\n    display: inline-block;\n    left: 50%;\n    transform: translate(-8px, -90%);\n}\n.vm-popover-message {\n    display: inline-block;\n    padding: 10px;\n}\n", ""]);

// exports


/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dropdown__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(4);





/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'popover',

    props: {
        bgColor: {
            type: String,
            default: Object(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */])('popover.background') || Object(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */])('theme')
        },

        actionsGap: {
            type: String,
            default: Object(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */])('popover.actions-gap')
        },

        message: {
            type: String,
            default: ''
        }
    },

    data: function data() {
        return {
            boxOffset: 0,
            arrowOffset: 0,
            isOpen: false
        };
    },


    computed: {
        boxStyle: function boxStyle() {
            return {
                left: this.boxOffset,
                background: this.bgColor
            };
        },
        arrowStyle: function arrowStyle() {
            return {
                left: this.arrowOffset,
                borderColor: this.bgColor
            };
        }
    },

    methods: {
        onShow: function onShow() {
            var _this = this;

            setTimeout(function () {
                var _Dom$rect = __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].rect(_this.$refs.box),
                    boxWidth = _Dom$rect.width;

                var _Dom$rect2 = __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].rect(_this.$el),
                    width = _Dom$rect2.width,
                    left = _Dom$rect2.left;

                var BODY_WIDTH = __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].width(document);

                var m = left + width / 2;
                var l = Math.min(Math.max(m - boxWidth / 2, 5), BODY_WIDTH - boxWidth - 5);

                _this.boxOffset = l;
                _this.arrowOffset = m - l;
                _this.isOpen = true;
                _this.$emit('show');
            });
        },
        onHide: function onHide() {
            this.isOpen = false;
            this.$emit('hide');
        }
    },

    render: function render(h) {
        var _this2 = this;

        var actions = (this.$slots.actions || []).filter(function (action) {
            return !!action.tag;
        });
        var max = actions.length - 1;
        var AVNodes = actions.map(function (vnode, index) {
            return h('div', {
                class: 'vm-popover-aw',
                style: index != max ? 'border-bottom: ' + _this2.actionsGap : ''
            }, [vnode]);
        });

        return h(__WEBPACK_IMPORTED_MODULE_0__dropdown__["a" /* default */], {
            class: 'vm-popover',
            on: {
                show: this.onShow.bind(this),
                hide: this.onHide.bind(this)
            }
        }, [this.$slots.default, this.$scopedSlots.label ? this.$scopedSlots.label(this.isOpen) : null, h('div', {
            class: 'vm-popover-box',
            ref: 'box',
            slot: 'box',
            style: this.boxStyle
        }, [h('i', {
            class: 'vm-popover-arrow',
            style: this.arrowStyle
        }), AVNodes.length ? AVNodes : this.$slots.box || h('span', {
            class: 'vm-popover-message',
            style: {
                color: Object(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */])('popover.actions-color')
            },
            domProps: {
                innerHTML: this.message
            }
        })])]);
    }
});

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(133)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(135),
  /* template */
  __webpack_require__(136),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/popover/action.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] action.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32f62fc4", Component.options)
  } else {
    hotAPI.reload("data-v-32f62fc4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(134);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("2aea27c6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-32f62fc4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./action.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-32f62fc4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./action.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-popover-action-icon {\n    margin-right: 5px;\n}\n.vm-popover-action {\n    padding: 0px 10px;\n    height: 35px;\n    line-height: initial;\n    display: flex;\n    align-items: center;\n    font-size: 14px;\n    text-decoration: none;\n}\n", ""]);

// exports


/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(4);
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'popover-action',

    data: function data() {
        return {
            color: Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('popover.actions-color')
        };
    }
});

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', {
    staticClass: "vm-popover-action",
    style: ({
      color: _vm.color
    }),
    attrs: {
      "href": "javascript:"
    }
  }, [_c('span', {
    staticClass: "vm-popover-action-icon"
  }, [_vm._t("icon")], 2), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-32f62fc4", module.exports)
  }
}

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(138);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("0f311210", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-283d099b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./scroll.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-283d099b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./scroll.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-scroll {\n  position: relative;\n  width: 100%;\n}\n.vm-scroll .vm-scroll-content {\n  overflow: hidden;\n}\n.vm-scroll .vm-scrollbars {\n  position: absolute;\n  border-radius: 5px;\n  background: #ccc;\n}\n.vm-scroll-y {\n  overflow: hidden;\n}\n.vm-scroll-y > .vm-scrollbars {\n  right: 0px;\n  width: 2px;\n  height: 0px;\n  top: 0px;\n}\n.vm-scroll-y .vm-scroll-inner {\n  min-height: 100%;\n  transform: translate3d(0px, 0px, 0px);\n  -webkit-transform: translate3d(0px, 0px, 0px);\n  -webkit-backface-visibility: hidden;\n  -webkit-transform-style: preserve-3d;\n}\n.vm-scroll-x {\n  overflow-x: hidden;\n  overflow-y: auto;\n  _height: 1%;\n}\n.vm-scroll-x > .vm-scrollbars {\n  height: 2px;\n  width: 0px;\n  left: 0px;\n  bottom: 0px;\n}\n.vm-scroll-x > .vm-scroll-inner {\n  float: left;\n  white-space: nowrap;\n  min-width: 100%;\n}\n", ""]);

// exports


/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_autosize__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_draggable__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






var FUNCTIONS = {
    ease: {
        style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
        fn: function fn(k) {
            return Math.sqrt(1 - --k * k);
        }
    },

    back: {
        style: 'cubic-bezier(0.175, 0.885, 0.32, 1.1)',
        fn: function fn(k) {
            var b = 4;
            return (k = k - 1) * k * ((b + 1) * k + b) + 1;
        }
    }
};

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'scroll',

    props: {
        scrollbars: {
            type: Boolean,
            default: false
        },

        axis: {
            type: String,
            default: 'y'
        },

        ignores: {
            type: [RegExp, Function, String],
            default: Object(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */])('scroll.ignores')
        },

        boundary: {
            type: Array,
            default: function _default() {
                return [0, 0];
            }
        },

        disabled: {
            type: Boolean,
            default: false
        },

        useTransform: {
            type: Boolean,
            default: Object(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */])('scroll.use-transform')
        }
    },

    directives: {
        Autosize: __WEBPACK_IMPORTED_MODULE_0__directives_autosize__["a" /* default */],
        Draggable: __WEBPACK_IMPORTED_MODULE_1__directives_draggable__["a" /* default */]
    },

    provide: function provide() {
        return {
            _$scroller: this
        };
    },
    data: function data() {
        return {
            stick: 1,
            barVisible: false
        };
    },
    mounted: function mounted() {
        var _this = this;

        this.pos = 0;
        this.$actived = true;
        this.initEvents();
        this.$nextTick(function () {
            return _this.refresh();
        });
    },


    methods: {
        initEvents: function initEvents() {
            var _this2 = this;

            __WEBPACK_IMPORTED_MODULE_2__helper__["b" /* Event */].on(this.$refs.inner, 'transitionend webkitTransitionEnd', function () {
                _this2.triggerScrollEnd();
            });

            __WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].observer(this.$refs.inner, {
                childList: true,
                subtree: true
            }, function () {
                _this2.refresh();
            });

            __WEBPACK_IMPORTED_MODULE_2__helper__["b" /* Event */].on(window, 'resize', function () {
                _this2.refresh();
            });
        },
        canDrag: function canDrag() {
            return !!this.eSize && !this.disabled;
        },
        refresh: function refresh() {
            var style = this.axis == 'x' ? 'width' : 'height';
            var s1 = this.eSize = __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* Dom */][style](this.$el);
            var s2 = this.iSize = __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* Dom */][style](this.$refs.inner);

            this.maxPos = this.boundary[0] || 0;
            this.minPos = Math.min(0, s1 - s2) - (this.boundary[1] || 0);

            if (this.scrollbars && s1 && s2) {
                __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* Dom */].css(this.$refs.bar, style, 100 * (s1 / Math.max(s1, s2)) + '%');
            }

            this.basePos < this.minPos && this.scrollTo(-this.minPos, 300);
        },
        resetBase: function resetBase(time, pos) {
            this.baseTime = time || Date.now();
            this.basePos = pos || this.getComputedPos();
        },
        onNativeScroll: function onNativeScroll() {
            var name = this.axis == 'y' ? 'scrollTop' : 'scrollLeft';

            if (!this.$el[name]) return false;

            this.scrollTo(this.$el[name]);
            this.$el[name] = 0;
        },
        onDragStart: function onDragStart(event) {
            var pos = this.pos = event.data[this.axis];

            this.cancel();
            this.refresh();
            this.resetBase();
            this.now = Date.now();
            this.direction = 0;
            this.$emit('drag:start', pos);
        },
        onDraging: function onDraging(event) {
            var now = Date.now(),
                pos = event.data[this.axis];
            var duration = now - this.now;

            if (pos > this.pos) {
                this.direction == -1 && this.resetBase(now, pos);
                this.direction = 1;
            } else if (pos < this.pos) {
                this.direction == 1 && this.resetBase(now, pos);
                this.direction = -1;
            } else if (duration > 100) {
                this.resetBase(now, pos);
            }

            this.draging = true;
            this.now = now;
            this.stick = pos >= this.maxPos || pos <= this.minPos ? 3 : 1;
            this.triggerScrolling(pos);
            this.scrollBarTo(pos);
            this.$emit('draging', pos);
        },
        onDragEnd: function onDragEnd(event) {
            if (!this.draging) return false;

            this.draging = false;

            var now = Date.now(),
                target = this.pos,
                fn = 'ease';
            var duration = 1000;
            var unt = false;

            if (this.pos >= this.maxPos) {
                target = this.maxPos;
            } else if (this.pos > 0 && this.pos < this.maxPos) {
                target = 0;
            } else if (this.pos <= this.minPos) {
                target = this.minPos;
            } else if (now - this.now < 50) {
                var distance = this.pos - this.basePos;
                var speed = Math.max(0.1, Math.min(1.2, Math.abs(distance) / (now - this.baseTime)));
                var deceleration = 0.0006;

                target = Math.round(this.pos + Math.pow(speed, 2) / (2 * deceleration) * (distance < 0 ? -1 : 1));
                duration = 2 * speed / deceleration;

                if (target < this.minPos || target > 0) {
                    var f = target < this.minPos ? this.minPos : 0;
                    duration = Math.max(300, duration * Math.abs(f - this.pos) / Math.abs(this.pos - target));
                    target = f;
                    fn = duration < 1500 ? 'back' : 'ease';
                }
            } else {
                unt = true;
            }

            this.$emit('drag:end', this.pos, target, duration);
            !unt && this.translateTo(target, duration, fn);
        },
        triggerScrolling: function triggerScrolling(pos) {
            this.$emit('scrolling', this.pos = pos);
        },
        scrollTo: function scrollTo(pos) {
            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var fn = arguments[3];

            if (this.draging) return false;

            if (limit) {
                pos = Math.max(this.minPos, Math.min(pos, this.maxPos));
            }

            this.cancel();
            this.translateTo(pos, duration, fn);
        },
        scrollToElement: function scrollToElement(el, duration, limit, fn) {
            var eOffset = __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* Dom */].offset(el);var offset = __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* Dom */].offset(this.$el);
            var prop = this.axis ? 'left' : 'top';

            this.refresh();
            this.scrollTo(eOffset[prop] - offset[prop], duration, limit, fn);
        },
        cancel: function cancel() {
            this.baseTime = null;
            this.basePos = null;

            if (!this.$fx || !this.$actived) return;

            this.useTransform ? clearTimeout(this.$fx) : __WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].crfa(this.$fx);
            this.$fx = null;

            var pos = this.getComputedPos();

            this.useTransform && this.translateByC3(this.$refs.inner, pos);
            this.scrollBarTo(pos);
            this.$emit('scroll:cancel');
            this.triggerScrollEnd();
        },
        triggerScrollEnd: function triggerScrollEnd() {
            this.$emit('scroll:end', this.pos);
        },
        translateTo: function translateTo(pos, duration) {
            var _this3 = this;

            var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ease';

            this.$emit('translate', pos, duration);

            if (!duration) {
                this.translateByC3(this.$refs.inner, pos, duration, fn);
                this.triggerScrolling(pos);
            } else if (this.useTransform) {
                this.translateByC3(this.$refs.inner, pos, duration, fn);

                var f = function f() {
                    if (_this3.$fx) {
                        _this3.triggerScrolling(_this3.getComputedPos());
                        _this3.$fx = setTimeout(f, 50);
                    }
                };

                this.$fx = setTimeout(f, 50);
            } else {
                var now = Date.now();
                var tp = this.pos;
                var range = pos - this.pos;

                var _f = function _f() {
                    var a = Date.now() - now;

                    if (a >= duration) {
                        _this3.translateByC3(_this3.$refs.inner, pos);
                        _this3.triggerScrolling(pos);
                        _this3.triggerScrollEnd();
                    } else {
                        var p = tp + FUNCTIONS[fn].fn(a / duration) * range;
                        _this3.translateByC3(_this3.$refs.inner, p);
                        _this3.$fx = __WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].rfa(_f);
                        _this3.triggerScrolling(p);
                    }
                };

                this.$fx = __WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].rfa(_f);
            }

            this.scrollBarTo(pos, duration, fn);
        },
        scrollBarTo: function scrollBarTo(pos) {
            var _this4 = this;

            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var fn = arguments[2];

            if (this.scrollbars && this.eSize && this.iSize) {
                this.barVisible = true;
                clearTimeout(this.bartid);
                this.bartid = setTimeout(function () {
                    _this4.barVisible = false;
                }, 3000);

                this.translateByC3(this.$refs.bar, this.eSize * (pos / this.iSize) * -1, duration, fn, true);
            }
        },
        translateByC3: function translateByC3(el, pos) {
            var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var fn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'ease';
            var useTransform = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.useTransform;

            useTransform && __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* Dom */].css(el, {
                'transition-duration': duration + 'ms',
                'transition-timing-function': fn === false && !duration ? '' : FUNCTIONS[fn].style
            });

            __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* Dom */].css(el, 'transform', 'translate' + this.axis.toUpperCase() + '(' + pos + 'px) translateZ(0px)');
        },
        getComputedPos: function getComputedPos() {
            return __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* Dom */].getTransform(this.$refs.inner)[this.axis];
        },
        limitType: function limitType() {
            return this.isAtTop() ? 1 : this.isAtBottom() ? -1 : 0;
        },
        isAtBottom: function isAtBottom() {
            return this.pos <= this.minPos;
        },
        isAtTop: function isAtTop() {
            return this.pos >= this.maxPos;
        },
        getPos: function getPos() {
            return this.pos;
        }
    },

    activated: function activated() {
        this.$actived = true;
    },
    deactivated: function deactivated() {
        this.$actived = false;
    }
});

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var AutoSize = function () {
    function AutoSize(root) {
        var _this = this;

        _classCallCheck(this, AutoSize);

        this.$root = root;
        this.$root.$autosize = this;
        this.$listens = {};
        this.$mutation = null;
        setTimeout(function () {
            _this.initEvent();
        }, 1000);
    }

    _createClass(AutoSize, [{
        key: 'initEvent',
        value: function initEvent() {
            var self = this;

            __WEBPACK_IMPORTED_MODULE_0__helper__["b" /* Event */].on(window, 'resize', function () {
                self.resizeAll(true);
            });
        }
    }, {
        key: 'listen',
        value: function listen() {
            var _this2 = this;

            if (this.$mutation) return false;

            this.$mutation = __WEBPACK_IMPORTED_MODULE_0__helper__["c" /* Util */].observer(this.$root, {
                childList: true,
                attributes: true,
                subtree: true
            }, function (mutations) {
                _this2.resizeAll();
            });
        }
    }, {
        key: 'pause',
        value: function pause() {
            if (!this.$mutation) return false;
            this.$mutation.disconnect();
            this.$mutation = null;
        }
    }, {
        key: 'observer',
        value: function observer(element) {
            if (element.style.height) return false;

            element.$autosize = this;

            this.$listens[element.$autosizeid = Date.now()] = {
                element: element,
                rect: {}
            };
            this.resize(element);
            this.listen();
        }
    }, {
        key: 'unobserver',
        value: function unobserver(element) {
            delete this.$listens[element.$autosizeid];
            delete element.$autosize;
            delete element.$autosizeid;
        }
    }, {
        key: 'resizeAll',
        value: function resizeAll() {
            var _this3 = this;

            var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            clearTimeout(this.$timer);
            this.$timer = setTimeout(function () {
                _this3.pause();
                for (var i in _this3.$listens) {
                    _this3.resize(_this3.$listens[i].element, force);
                }
                _this3.listen();
            }, 300);
        }
    }, {
        key: 'resize',
        value: function resize(element) {
            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var newRect = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].rect(element);

            if (!newRect.width) {
                return false;
            }

            var info = this.$listens[element.$autosizeid];

            var oldRect = info.rect;

            if (newRect.top == info.rect.top && !force) {
                return false;
            }

            info.rect = newRect;

            element.style.height = 'auto';

            var chains = [element];
            var maxHeight;var parent = element;var hasSetHeight = false;

            while (parent = parent.parentNode) {
                chains.push(parent);

                if (parent === document.body) {
                    maxHeight = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].height(document.documentElement);
                    break;
                }

                if (__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].css(parent, 'max-height') != 'none') {
                    hasSetHeight = true;
                    maxHeight = Math.min(parseFloat(__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].height(parent)), parseFloat(__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].css(parent, 'max-height')));
                    break;
                }

                if (parent.style.height) {
                    hasSetHeight = true;
                    maxHeight = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].height(parent);
                    break;
                }
            }

            maxHeight = parseFloat(maxHeight);

            var top = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].offset(element).top;

            if (!hasSetHeight || top + __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].height(element.parentNode) > maxHeight) {
                var otherHeight = 0;

                chains.pop();
                chains.forEach(function (ele) {
                    __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].nexts(ele).forEach(function (next) {
                        if (!/absolute|fixed/.test(__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].css(next, 'position')) && next.offsetTop != ele.offsetTop) {
                            otherHeight += __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].height(next) + parseFloat(__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].css(ele, 'margin-bottom') || 0);
                        }
                    });

                    otherHeight += parseFloat(__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].css(ele, 'margin-bottom') || 0);
                });

                element.style.overflow = 'hidden';
                element.style.height = maxHeight - (top - __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].offset(parent).top) - otherHeight + 'px';
                __WEBPACK_IMPORTED_MODULE_0__helper__["b" /* Event */].trigger(element, 'autosize');
            } else {
                element.style.overflow = '';
            }
        }
    }]);

    return AutoSize;
}();

/* harmony default export */ __webpack_exports__["a"] = ({
    bind: function bind(element, data, VNode) {
        if (data.value && data.value.enable == false) {
            return false;
        }

        setTimeout(function () {
            var root = VNode.context.$root.$el;
            var instance = root.$autosize || new AutoSize(root);

            instance.observer(element);
        });
    },
    unbind: function unbind(element) {
        element.$autosize && element.$autosize.unobserver(element);
    },
    resize: function resize(element) {
        setTimeout(function () {
            element = element.$el || element;
            element.$autosize.resize(element, true);
        }, 10);
    },


    Constructor: AutoSize,
    name: 'autosize'
});

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Draggable = function () {
    function Draggable(element) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Draggable);

        this.dom = element;
        this.dom.$draggable = this;
        this.options = {
            axis: 'xy',
            stick: 1,
            ignores: null,
            canDrag: function canDrag() {
                return true;
            }
        };
        this.setOptions(options);
        this.initEvent();
    }

    _createClass(Draggable, [{
        key: 'setOptions',
        value: function setOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.options = _extends({}, this.options, options);
        }
    }, {
        key: 'isIgnoresTouch',
        value: function isIgnoresTouch(target) {
            var ignores = this.options.ignores;

            if (!ignores) return false;

            switch (typeof ignores === 'undefined' ? 'undefined' : _typeof(ignores)) {
                case 'function':
                    return ignores(target);

                case 'string':
                    return __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].matches(target, ignores);

                default:
                    return ignores.test(target.tagName);
            };
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.touch = null;
        }
    }, {
        key: 'initEvent',
        value: function initEvent() {
            var _this = this;

            var first;

            __WEBPACK_IMPORTED_MODULE_0__helper__["b" /* Event */].on(this.dom, 'touchstart mousedown', function (e) {
                _this.handler = e.target;
                first = true;

                if (_this.isIgnoresTouch(_this.handler)) return false;

                var _translates = _this.translates = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].getTransform(_this.dom),
                    x = _translates.x,
                    y = _translates.y;

                var _ref = e.touches ? e.touches[0] : e,
                    clientX = _ref.clientX,
                    clientY = _ref.clientY;

                _this.touch = { clientX: clientX, clientY: clientY };

                __WEBPACK_IMPORTED_MODULE_0__helper__["b" /* Event */].trigger(_this.dom, 'drag:start', {
                    x: x, y: y, clientX: clientX, clientY: clientY, e: e
                });
            }, {
                passive: false
            });

            __WEBPACK_IMPORTED_MODULE_0__helper__["b" /* Event */].on(this.dom, 'touchmove mousemove', function (e) {
                if (!_this.touch) return false;

                e.preventDefault();

                var options = _this.options;
                var touch = e.touches ? e.touches[0] : e;
                var _touch = _this.touch,
                    clientX = _touch.clientX,
                    clientY = _touch.clientY;

                var axis = options.axis;
                var x = 0;
                var y = 0;
                var rx = (touch.clientX - clientX) / options.stick;
                var ry = (touch.clientY - clientY) / options.stick;

                if (/x/.test(axis)) {
                    x = rx + _this.translates.x;
                }

                if (/y/.test(axis)) {
                    y = ry + _this.translates.y;
                }

                var info = {
                    x: x, y: y, clientX: touch.clientX, clientY: touch.clientY, e: e, rx: rx, ry: ry
                };

                _this.touch = {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                };

                if (first) {
                    first = false;
                    _this.collectDragablesOnSameTree(info);

                    if (_this.isOtherAxisDraggable(info)) {
                        __WEBPACK_IMPORTED_MODULE_0__helper__["b" /* Event */].trigger(_this.dom, 'drag:other', info);
                        _this.cancel();
                        return false;
                    }
                }

                _this.isCanDrag = _this.options.canDrag(info);

                if (!_this.isCanDrag) {
                    __WEBPACK_IMPORTED_MODULE_0__helper__["b" /* Event */].trigger(_this.dom, 'drag:reject', info);
                    return false;
                }

                if (_this.isOtherDraggable()) {
                    __WEBPACK_IMPORTED_MODULE_0__helper__["b" /* Event */].trigger(_this.dom, 'drag:reject', info);
                    return false;
                }

                _this.translates = { x: x, y: y };

                __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].css(_this.dom, 'transform', 'translate3d(' + parseInt(x) + 'px, ' + parseInt(y) + 'px, 0px)');
                __WEBPACK_IMPORTED_MODULE_0__helper__["b" /* Event */].trigger(_this.dom, 'draging', info);
            }, {
                passive: false
            });

            __WEBPACK_IMPORTED_MODULE_0__helper__["b" /* Event */].on(document, 'touchend mouseup', function (e) {
                if (!_this.touch) return false;

                _this.touch = null;
                __WEBPACK_IMPORTED_MODULE_0__helper__["b" /* Event */].trigger(_this.dom, 'drag:end', {
                    x: _this.translates.x,
                    y: _this.translates.y,
                    e: e
                });
            });
        }
    }, {
        key: 'setStick',
        value: function setStick() {
            var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            this.options.stick = times;
        }
    }, {
        key: 'collectDragablesOnSameTree',
        value: function collectDragablesOnSameTree(info) {
            this.$draggables = [];

            var isX = Math.abs(info.rx) > Math.abs(info.ry);
            var handler = this.handler;

            do {
                var $draggable = handler.$draggable;

                if ($draggable && (isX && $draggable.options.axis == 'x' || !isX && $draggable.options.axis == 'y' || $draggable.options.axis == 'xy')) {
                    this.$draggables.push($draggable);
                }

                handler = handler.parentNode;
            } while (handler);
        }
    }, {
        key: 'isOtherAxisDraggable',
        value: function isOtherAxisDraggable() {
            var _this2 = this;

            if (!this.$draggables.length) return false;

            return this.$draggables.every(function ($draggable) {
                return $draggable !== _this2;
            });
        }
    }, {
        key: 'isOtherDraggable',
        value: function isOtherDraggable() {
            var $draggables = this.$draggables;
            var l = $draggables.length;

            for (var i = 0; i < l; i++) {
                var $draggable = this.$draggables[i];

                if ($draggable === this) {
                    return false;
                }

                if ($draggable.isCanDrag) {
                    return true;
                }
            }

            return false;
        }
    }]);

    return Draggable;
}();

/* harmony default export */ __webpack_exports__["a"] = ({
    bind: function bind(element, data) {
        // eslint-disable-next-line no-new
        new Draggable(element, data.value);
    },
    update: function update(element, data) {
        element.$draggable.setOptions(data.value);
    },


    Constructor: Draggable,
    name: 'draggable'
});

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "autosize",
      rawName: "v-autosize",
      value: ({
        enable: _vm.axis == 'y'
      }),
      expression: "{enable: axis == 'y'}"
    }],
    class: 'vm-scroll vm-scroll-' + _vm.axis,
    on: {
      "scroll": _vm.onNativeScroll
    }
  }, [_c('div', {
    directives: [{
      name: "draggable",
      rawName: "v-draggable",
      value: ({
        axis: _vm.axis,
        stick: _vm.stick,
        ignores: _vm.ignores,
        canDrag: _vm.canDrag
      }),
      expression: "{\n            axis: axis,\n            stick: stick,\n            ignores: ignores,\n            canDrag: canDrag\n        }"
    }],
    ref: "inner",
    staticClass: "vm-scroll-inner",
    on: {
      "drag:start": _vm.onDragStart,
      "draging": _vm.onDraging,
      "drag:end": _vm.onDragEnd
    }
  }, [_vm._t("header"), _vm._v(" "), _c('div', {
    staticClass: "vm-scroll-content"
  }, [_vm._t("default")], 2), _vm._v(" "), _vm._t("footer")], 2), _vm._v(" "), (_vm.scrollbars) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.barVisible),
      expression: "barVisible"
    }],
    ref: "bar",
    staticClass: "vm-scrollbars"
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-283d099b", module.exports)
  }
}

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(144)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(146),
  /* template */
  __webpack_require__(147),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/scroll/pulldown2refresh.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pulldown2refresh.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0319a59e", Component.options)
  } else {
    hotAPI.reload("data-v-0319a59e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(145);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("2cf7c416", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0319a59e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pulldown2refresh.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0319a59e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pulldown2refresh.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-pulldown2refresh {\n  padding: 10px 0px;\n  color: #878787;\n  font-size: 14px;\n  width: 100%;\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: translateY(-100%);\n  -webkit-transform: translateY(-100%);\n}\n", ""]);

// exports


/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroll__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loading__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(0);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'pulldown2refresh',

    props: {
        scrollbars: {
            type: Boolean,
            default: true
        }
    },

    data: function data() {
        return {
            isRefreshing: false,
            isMax: false,
            maxPos: 0
        };
    },


    computed: {
        statusBoxHeight: function statusBoxHeight() {
            return __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* Dom */].height(this.$refs.status);
        }
    },

    components: {
        Loading: __WEBPACK_IMPORTED_MODULE_1__loading__["a" /* default */],
        Scroll: __WEBPACK_IMPORTED_MODULE_0__scroll___default.a
    },

    mounted: function mounted() {
        var _this = this;

        setTimeout(function () {
            _this.$scroll = _this.$refs.scroll;
            _this.maxPos = _this.statusBoxHeight;
        }, 0);
    },


    methods: {
        onScrolling: function onScrolling(translate) {
            this.isMax = this.limitType() == 1;
            this.$emit('scrolling', translate);
        },
        onScrollEnd: function onScrollEnd() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            this.$emit.apply(this, ['scroll:end'].concat(_toConsumableArray(args)));
        },
        onTranslate: function onTranslate() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            this.$emit.apply(this, ['translate'].concat(_toConsumableArray(args)));
        },
        onDragStart: function onDragStart() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            this.$emit.apply(this, ['drag:start'].concat(_toConsumableArray(args)));
        },
        onDraging: function onDraging() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            this.$emit.apply(this, ['draging'].concat(_toConsumableArray(args)));
        },
        onDragEnd: function onDragEnd() {
            this.limitType() == 1 && this.refresh();

            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
            }

            this.$emit.apply(this, ['drag:end'].concat(_toConsumableArray(args)));
        },
        refresh: function refresh() {
            var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (this.isRefreshing) return;

            this.isRefreshing = true;
            animation && this.scrollTo(-this.statusBoxHeight, 500);
            trigger && this.$emit('refresh', this.recover);
        },
        recover: function recover() {
            if (this.isRefreshing) {
                this.isRefreshing = false;
                this.scrollTo(0, 1000);
                this.$emit('recover');
            }
        },
        limitType: function limitType() {
            return this.$scroll.limitType();
        },
        scrollTo: function scrollTo() {
            var _$scroll;

            return (_$scroll = this.$scroll).scrollTo.apply(_$scroll, arguments);
        },
        scrollToElement: function scrollToElement() {
            var _$scroll2;

            return (_$scroll2 = this.$scroll).scrollToElement.apply(_$scroll2, arguments);
        },
        getPos: function getPos() {
            return this.$scroll.getPos();
        }
    }
});

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('scroll', {
    ref: "scroll",
    attrs: {
      "boundary": [_vm.maxPos, 0],
      "scrollbars": _vm.scrollbars
    },
    on: {
      "drag:start": _vm.onDragStart,
      "draging": _vm.onDraging,
      "drag:end": _vm.onDragEnd,
      "scrolling": _vm.onScrolling,
      "scroll:end": _vm.onScrollEnd,
      "translate": _vm.onTranslate
    }
  }, [_c('div', {
    ref: "status",
    staticClass: "vm-pulldown2refresh",
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._t("pull-status", [(!_vm.isRefreshing && !_vm.isMax) ? _vm._t("if-pulldown", [_vm._v("下拉刷新数据")]) : _vm._e(), _vm._v(" "), (!_vm.isRefreshing && _vm.isMax) ? _vm._t("if-pullleave", [_vm._v("松手刷新数据")]) : _vm._e(), _vm._v(" "), (_vm.isRefreshing) ? _vm._t("if-refreshing", [_c('loading'), _vm._v("正在刷新数据")]) : _vm._e()])], 2), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0319a59e", module.exports)
  }
}

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__list__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__list___default.a));

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(150)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(152),
  /* template */
  __webpack_require__(153),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/list/list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1da6b28a", Component.options)
  } else {
    hotAPI.reload("data-v-1da6b28a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(151);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("16fc2162", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1da6b28a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./list.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1da6b28a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-list-status {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px 0px;\n  color: #878787;\n  width: 100%;\n  font-size: 14px;\n}\n.vm-list-status-box {\n  display: inline-block;\n  padding: 20px 0px;\n}\n", ""]);

// exports


/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroll__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loading__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'list',

    components: {
        Loading: __WEBPACK_IMPORTED_MODULE_1__loading__["a" /* default */]
    },

    props: {
        optimize: {
            type: Boolean,
            default: true
        },

        scrollbars: {
            type: Boolean,
            default: true
        },

        autoRefresh: {
            type: Boolean,
            default: true
        },

        api: {
            type: Function,
            default: null
        },

        maxCountPerPage: {
            type: Number,
            default: 20
        },

        params: {
            type: Object,
            default: function _default() {
                return {};
            }
        },

        pulldown2refresh: {
            type: Boolean,
            default: false
        },

        pullup2load: {
            type: Boolean,
            default: false
        }
    },

    data: function data() {
        return {
            Component: !this.pulldown2refresh ? __WEBPACK_IMPORTED_MODULE_0__scroll__["b" /* Scroll */] : __WEBPACK_IMPORTED_MODULE_0__scroll__["a" /* Pulldown2refresh */],
            data: [],
            rows: [],
            _params: {},
            isLoading: false,
            isCompleted: false,
            page: 0,
            error: null,
            $scroll: null,
            _source: '',
            unitHeights: []
        };
    },


    computed: {
        ifLoading: function ifLoading() {
            return !this.isCompleted && this.pullup2load && !this.error && this.page >= 1;
        },
        ifFailed: function ifFailed() {
            return !this.isCompleted && this.error && !this.isLoading;
        },
        ifCompleted: function ifCompleted() {
            return this.page >= 1 && this.rows.length && this.isCompleted;
        },
        ifEmpty: function ifEmpty() {
            return !this.rows.length && this.isCompleted;
        }
    },

    mounted: function mounted() {
        var _this = this;

        this.setParams(this.params);
        this.$nextTick(function () {
            _this.$scroll = _this.$refs.scroll;
            _this.autoRefresh && _this.refresh(false);
        });
    },


    watch: {
        source: function source() {
            this.autoRefresh && this.refresh();
        },


        params: {
            deep: true,
            handler: function handler(v) {
                this.setParams(v);
                this.autoRefresh && this.refresh();
            }
        }
    },

    methods: {
        try2load: function try2load() {
            this.pullup2load && this.page > 0 && this.$scroll.limitType() == -1 && this.load();
        },
        onScrolling: function onScrolling() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            this.$emit.apply(this, ['scrolling'].concat(_toConsumableArray(args)));
        },
        setParams: function setParams(params, append) {
            this._params = _extends({}, append ? this._params : {}, params);
        },
        setData: function setData() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            this.data = [];
            this.addData(data);
        },
        scrollTo: function scrollTo() {
            var _$scroll;

            (_$scroll = this.$scroll).scrollTo.apply(_$scroll, arguments);
        },
        scrollToElement: function scrollToElement() {
            var _$scroll2;

            (_$scroll2 = this.$scroll).scrollToElement.apply(_$scroll2, arguments);
        },
        addData: function addData(data) {
            this.data = this.data.concat(data || []);
            this.$emit('data:add', data);
        },
        refresh: function refresh() {
            var _this2 = this;

            var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this.page = 0;
            this.isCompleted = false;
            this.isLoading = false;
            this.$scroll.refresh(animation, false);
            this.$emit('refresh');
            setTimeout(function () {
                return _this2.load();
            }, 10);
        },
        load: function load() {
            this.error = null;

            if (this.isCompleted || this.isLoading) {
                return false;
            }

            if (this.rows.length == this.data.length || this.page == 0) {
                this.loadByRemote();
            } else {
                this.renderRows();
            }
        },
        loadByRemote: function loadByRemote() {
            var _this3 = this;

            var params = _extends({}, this._params);

            params[Object(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */])('list.label.page')] = this.page + 1;
            params[Object(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */])('list.label.persize')] = this.maxCountPerPage;

            this.isLoading = true;

            var ajax = this.api(params);

            __WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].acm(ajax, this).then(function (data) {
                _this3.page == 0 ? _this3.setData(data) : _this3.addData(data);
                _this3.$emit('fetch:success', data);
                _this3.fetchComplete();
            }, function (data) {
                _this3.error = true;
                _this3.$emit('fetch:fail', data);
                _this3.fetchComplete();
            });
        },
        fetchComplete: function fetchComplete() {
            if (!this.error) {
                var page = ++this.page;
                var rows = this.data.slice(this.maxCountPerPage * (page - 1), this.maxCountPerPage * page);

                if (!this.pullup2load || rows.length < this.maxCountPerPage) {
                    this.isCompleted = true;
                    this.$emit('nomore');
                }

                if (page == 1) {
                    this.rows = rows;
                    this.$emit('refresh:success', rows);
                    this.pulldown2refresh && this.$scroll.recover();
                } else {
                    this.rows = this.rows.concat(rows);
                }
            } else if (this.page == 0) {
                this.$emit('refresh:error', this.rows = []);
                this.pulldown2refresh && this.$scroll.recover();
            }

            this.$emit('rows:render', this.rows);
            this.isLoading = false;
        }
    }
});

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.Component, {
    ref: "scroll",
    tag: "component",
    staticClass: "vm-list",
    attrs: {
      "scrollbars": _vm.scrollbars
    },
    on: {
      "refresh": _vm.refresh,
      "scrolling": _vm.onScrolling,
      "draging": _vm.try2load,
      "scroll:end": _vm.try2load
    }
  }, [(_vm.$slots.header) ? _c('div', {
    staticClass: "vm-list-header"
  }, [_vm._t("header")], 2) : _vm._e(), _vm._v(" "), _c('div', [_vm._t("rows", _vm._l((_vm.rows), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "vm-list-row",
      on: {
        "click": function($event) {
          return _vm.$emit('row:click', item, index)
        }
      }
    }, [_vm._t("row", [_vm._v(_vm._s(item))], {
      "data": item,
      "index": index
    })], 2)
  }), {
    "data": _vm.rows
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "vm-list-status"
  }, [(_vm.ifLoading) ? _vm._t("if-loading", [_c('loading'), _vm._v(" 正在加载中\n        ")]) : (_vm.ifFailed) ? _vm._t("if-failed", [_c('span', {
    staticClass: "vm-list-status-box"
  }, [_vm._v("网络异常，加载失败")])]) : (_vm.ifEmpty) ? _vm._t("if-empty", [_c('span', {
    staticClass: "vm-list-status-box"
  }, [_vm._v("神马都木有~")])]) : (_vm.isCompleted) ? _vm._t("if-nomore", [_vm._v("就这么多啦~")]) : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "vm-list-footer"
  }, [_vm._t("footer")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1da6b28a", module.exports)
  }
}

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__search__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__search___default.a));

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(156)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(158),
  /* template */
  __webpack_require__(174),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/search/search.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] search.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c8c458a", Component.options)
  } else {
    hotAPI.reload("data-v-2c8c458a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(157);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("46ac4b20", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2c8c458a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./search.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2c8c458a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./search.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-search {\n  background: #fff;\n  width: 100%;\n  height: 100%;\n}\n.vm-search-cancel {\n  width: 32px;\n  display: inline-block;\n  text-decoration: none;\n  margin-left: 16px;\n  color: inherit;\n}\n.vm-search-panel {\n  padding: 15px 16px;\n}\n.vm-search-word {\n  padding: 10px 0px;\n  border-bottom: 1px solid #eee;\n}\n.vm-search-word:nth-last-child(1) {\n  border-bottom: 0px;\n}\n", ""]);

// exports


/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__searchbar__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scroll__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__history__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__history___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__history__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_model__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'search',
    mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_model__["a" /* default */]],

    model: {
        prop: 'value',
        event: 'confirm'
    },

    components: {
        Searchbar: __WEBPACK_IMPORTED_MODULE_0__searchbar__["a" /* default */],
        Historys: __WEBPACK_IMPORTED_MODULE_2__history___default.a,
        Scroll: __WEBPACK_IMPORTED_MODULE_1__scroll__["c" /* default */]
    },

    provide: function provide() {
        return {
            _$search: this
        };
    },


    props: {
        api: {
            type: Function,
            default: null
        },

        barStyle: {
            type: [String, Object],
            default: null
        },

        barInnerStyle: {
            type: [String, Object],
            default: null
        },

        maxlength: null,
        placeholder: null,
        autofocus: null,
        historyId: null,

        cache: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        barSty: function barSty() {
            return this.barStyle || {
                background: Object(__WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */])('topbar.background') || Object(__WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */])('search.bar.background')
            };
        }
    },

    data: function data() {
        return {
            caches: {},
            words: []
        };
    },


    methods: {
        onInput: function onInput() {
            if (this.val) {
                if (this.caches[this.val]) {
                    this.words = this.caches[this.val];
                } else {
                    this.fetch();
                }
            } else {
                this.words = [];
            }

            this.$emit('input', this.val);
        },


        fetch: __WEBPACK_IMPORTED_MODULE_5__helper__["c" /* Util */].debounce(function () {
            var _this = this;

            var val = this.val;

            __WEBPACK_IMPORTED_MODULE_5__helper__["c" /* Util */].acm(this.api(this.val), this).then(function (words) {
                _this.caches[val] = _this.words = words || [];
            });
        }, 300),

        onConfirm: function onConfirm(val) {
            this.$emit('confirm', this.val = val);
        },
        onCancel: function onCancel() {
            this.$emit('cancel');
        },
        focus: function focus() {
            var _this2 = this;

            setTimeout(function () {
                _this2.$refs.bar.focus();
            }, 300);
        },
        blur: function blur() {
            this.$refs.bar.blur();
        }
    }
});

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(160)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(162),
  /* template */
  __webpack_require__(168),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/searchbar/searchbar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] searchbar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2a6cec13", Component.options)
  } else {
    hotAPI.reload("data-v-2a6cec13", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(161);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("6acbd67e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2a6cec13\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./searchbar.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2a6cec13\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./searchbar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-searchbar {\n  padding: 0px 16px;\n  height: 46px;\n  display: flex;\n  align-items: center;\n  margin: 0px;\n  box-sizing: border-box;\n  width: 100%;\n}\n.vm-searchbar ::-webkit-search-cancel-button {\n  -webkit-appearance: none;\n}\n.vm-searchbar-helper {\n  height: 36px;\n  box-sizing: border-box;\n  border: 1px solid #eee;\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  font-size: 14px;\n  border-radius: 100px;\n}\n.vm-searchbar-inner {\n  flex: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n.vm-searchbar-box {\n  flex: 1;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  position: relative;\n}\n.vm-searchbar-placeholder {\n  display: flex;\n  opacity: 0.7;\n  transition: opacity .3s ease;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  align-items: center;\n  justify-content: center;\n  top: 0px;\n  left: 0px;\n}\n.vm-searchbar-placeholder-text {\n  transition: flex .3s ease;\n  flex-shrink: 1;\n  opacity: 0.7;\n}\n.vm-searchbar-x .vm-searchbar-placeholder {\n  opacity: 1;\n}\n.vm-searchbar-x .vm-searchbar-placeholder .vm-searchbar-placeholder-icon {\n  font-weight: bold;\n}\n.vm-searchbar-x .vm-searchbar-placeholder .vm-searchbar-placeholder-text {\n  flex-grow: 1;\n}\n.vm-searchbar-x-input {\n  margin-right: 10px;\n  position: relative;\n  z-index: 1;\n  margin-left: 25px;\n}\n.vm-searchbar-icon {\n  width: 15px;\n  flex-shrink: 0;\n  font-size: 14px;\n  display: inline-block;\n  margin-left: 10px;\n  margin-right: 10px;\n  font-weight: bold;\n}\n", ""]);

// exports


/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_model__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'searchbar',

    mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_model__["a" /* default */]],

    props: {
        maxlength: {
            type: Number,
            default: 50
        },

        placeholder: {
            type: String,
            default: '请输入关键字'
        },

        readonly: null,
        autofocus: null,

        searchButtonEnabled: {
            type: Boolean,
            default: false
        },

        innerStyle: {
            type: [String, Object],
            default: null
        }
    },

    components: {
        Icon: __WEBPACK_IMPORTED_MODULE_0__icon___default.a,
        xInput: __WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */]
    },

    computed: {
        classes: function classes() {
            return ['vm-searchbar', this.focusing || this.val ? 'vm-searchbar-x' : ''];
        },
        placeholderStyle: function placeholderStyle() {
            return {
                visibility: this.val ? 'hidden' : 'visible'
            };
        }
    },

    data: function data() {
        return {
            focusing: false
        };
    },


    methods: {
        focus: function focus() {
            this.$refs.input.focus();
        },
        blur: function blur() {
            this.$refs.input.blur();
        },
        onFocus: function onFocus() {
            this.focusing = true;
            this.$emit('focus');
        },
        onBlur: function onBlur() {
            this.focusing = false;
            this.$emit('blur');
        },
        onClick: function onClick() {
            this.$emit('click');
        },
        onInput: function onInput(v) {
            this.setValue(v);
        },
        onSubmit: function onSubmit() {
            this.$emit('submit', this.val);
            this.blur();
        },
        setValue: function setValue(v) {
            this.val = v.trim();
        }
    }
});

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(164)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(166),
  /* template */
  __webpack_require__(167),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/input/input.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] input.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a9a8091", Component.options)
  } else {
    hotAPI.reload("data-v-7a9a8091", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(165);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("7aac6ec6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a9a8091\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./input.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a9a8091\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./input.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-input {\n  height: 30px;\n  display: flex;\n  color: #333;\n  flex: 1;\n  align-items: center;\n}\n.vm-input-helper {\n  flex: 1;\n}\n.vm-input-helper input {\n  caret-color: #333;\n  background: transparent;\n  width: 100%;\n  display: inline-block;\n  color: inherit;\n  border: 0px;\n  outline: 0px;\n  font-size: 14px;\n}\n.vm-input-helper input::-webkit-input-placeholder {\n  font-weight: 300;\n  opacity: 0.7;\n}\n.vm-input-clear {\n  color: inherit;\n  margin-left: 5px;\n  font-weight: bold;\n}\n", ""]);

// exports


/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_input__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





var INPUT_PRE_STYLES = _extends({
    'default': 'background: #F3F6FB',
    'transparent': 'background: transparent',
    'underline': 'border-bottom: 1px solid #333'
}, Object(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */])('input.pre-themes'));

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'input',

    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_input__["a" /* default */]],

    inject: {
        rowAlign: {
            default: function _default() {
                return 'left';
            }
        }
    },

    props: {
        clearable: {
            type: Boolean,
            default: false
        },

        type: {
            type: String,
            default: 'text'
        },

        align: {
            type: String,
            default: function _default() {
                return this.rowAlign;
            }
        },

        theme: {
            type: String,
            default: 'default'
        }
    },

    components: {
        Icon: __WEBPACK_IMPORTED_MODULE_1__icon___default.a
    },

    data: function data() {
        return {
            style: INPUT_PRE_STYLES[this.theme]
        };
    },


    methods: {
        onClearClick: function onClearClick() {
            this.val = '';
            this.focus();
        },
        focus: function focus() {
            this.$refs.input.focus();
        },
        blur: function blur() {
            this.$refs.input.blur();
        }
    }
});

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vm-input",
    style: (_vm.style)
  }, [_c('div', {
    staticClass: "vm-input-helper"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.val),
      expression: "val"
    }],
    ref: "input",
    style: ({
      'text-align': _vm.align
    }),
    attrs: {
      "placeholder": _vm.placeholder,
      "readonly": _vm.readonly,
      "autofocus": _vm.autofocus,
      "type": "text",
      "maxlength": _vm.maxlength
    },
    domProps: {
      "value": (_vm.val)
    },
    on: {
      "blur": _vm.onBlur,
      "focus": _vm.onFocus,
      "click": _vm.onClick,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.val = $event.target.value
      }
    }
  })]), _vm._v(" "), (_vm.val && !_vm.readonly) ? _c('icon', {
    staticClass: "vm-input-clear",
    attrs: {
      "type": "close"
    },
    nativeOn: {
      "click": function($event) {
        return _vm.onClearClick($event)
      }
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7a9a8091", module.exports)
  }
}

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    class: _vm.classes,
    attrs: {
      "method": "javascript:;"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        return _vm.onSubmit()
      }
    }
  }, [_vm._t("left"), _vm._v(" "), _c('div', {
    staticClass: "vm-searchbar-helper",
    style: (_vm.innerStyle)
  }, [_c('div', {
    staticClass: "vm-searchbar-inner"
  }, [_vm._t("inner-left"), _vm._v(" "), _c('div', {
    staticClass: "vm-searchbar-box"
  }, [_c('div', {
    staticClass: "vm-searchbar-placeholder"
  }, [_c('icon', {
    staticClass: "vm-searchbar-icon",
    attrs: {
      "type": "search"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "vm-searchbar-placeholder-text",
    style: (_vm.placeholderStyle)
  }, [_vm._v("\n                        " + _vm._s(_vm.placeholder) + "\n                    ")])], 1), _vm._v(" "), _c('x-input', {
    ref: "input",
    staticClass: "vm-searchbar-x-input",
    attrs: {
      "theme": "transparent",
      "type": _vm.searchButtonEnabled ? 'search' : 'text',
      "maxlength": _vm.maxlength,
      "autofocus": _vm.autofocus,
      "readonly": _vm.readonly
    },
    on: {
      "input": _vm.onInput,
      "blur": _vm.onBlur,
      "focus": _vm.onFocus,
      "click": _vm.onClick
    },
    model: {
      value: (_vm.val),
      callback: function($$v) {
        _vm.val = $$v
      },
      expression: "val"
    }
  })], 1)], 2)]), _vm._v(" "), _vm._t("right")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2a6cec13", module.exports)
  }
}

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(170)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(172),
  /* template */
  __webpack_require__(173),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/search/history.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] history.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f57d18de", Component.options)
  } else {
    hotAPI.reload("data-v-f57d18de", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(171);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("777ad059", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f57d18de\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./history.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f57d18de\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./history.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-search-history-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    font-size: 12px;\n    color: #999;\n}\n.vm-search-history-item {\n    background: #eee;\n    margin-right: 10px;\n    margin-top: 10px;\n    height: 30px;\n    line-height: 30px;\n    border-radius: 5px;\n    display: inline-block;\n    padding: 0px 11px;\n    text-decoration: none;\n    font-size: 13px;\n    color: #666;\n}\n.vm-searcy-history-clear {\n    text-decoration: none;\n    font-size: 12px;\n    color: #999;\n}\n", ""]);

// exports


/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var MAX = 10;

function id(id) {
    return '__vm__history__' + id;
}

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        title: {
            type: String,
            default: '搜索记录'
        },

        id: {
            type: String,
            default: function _default() {
                if (location.hash) {
                    return location.hash.replace(/\?.*/, '');
                }

                return location.pathname;
            }
        }
    },

    inject: ['_$search'],

    data: function data() {
        return {
            historys: __WEBPACK_IMPORTED_MODULE_0__helper__["c" /* Util */].storage(id(this.id)) || []
        };
    },
    mounted: function mounted() {
        this._$search.$on('confirm', this.add.bind(this));
    },


    methods: {
        add: function add(word) {
            if (!word.trim()) return false;

            this.historys.indexOf(word) == -1 && this.historys.push(word);
            this.save();
        },
        clear: function clear() {
            this.historys = [];
            this.save();
        },
        save: function save() {
            __WEBPACK_IMPORTED_MODULE_0__helper__["c" /* Util */].storage(id(this.id), this.historys = this.historys.slice(0, MAX));
        },
        onHistoryClick: function onHistoryClick(history) {
            this.$emit('select', history);
        }
    }
});

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vm-search-history"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.historys.length),
      expression: "historys.length"
    }],
    staticClass: "vm-search-history-inner"
  }, [_c('div', {
    staticClass: "vm-search-history-header"
  }, [_vm._v("\n            " + _vm._s(_vm.title) + "\n            "), _c('a', {
    staticClass: "vm-searcy-history-clear",
    attrs: {
      "href": "javascript:"
    },
    on: {
      "click": _vm.clear
    }
  }, [_vm._t("clear", [_vm._v("清除")])], 2)]), _vm._v(" "), _c('div', {
    staticClass: "vm-search-historys"
  }, _vm._l((_vm.historys), function(item, index) {
    return _c('a', {
      key: index,
      staticClass: "vm-search-history-item",
      attrs: {
        "href": "javascript:"
      },
      on: {
        "click": function($event) {
          return _vm.onHistoryClick(item)
        }
      }
    }, [_vm._t("history", [_vm._v("\n                    " + _vm._s(item.length > 20 ? item.substring(0, 15) + '..' : item) + "\n                ")], {
      "data": item,
      "index": index
    })], 2)
  }), 0)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f57d18de", module.exports)
  }
}

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vm-search"
  }, [_c('searchbar', {
    ref: "bar",
    style: (_vm.barSty),
    attrs: {
      "placeholder": _vm.placeholder,
      "maxlength": _vm.maxlength,
      "autofocus": _vm.autofocus,
      "inner-style": _vm.barInnerStyle
    },
    on: {
      "input": _vm.onInput,
      "submit": _vm.onConfirm
    },
    model: {
      value: (_vm.val),
      callback: function($$v) {
        _vm.val = $$v
      },
      expression: "val"
    }
  }, [_c('a', {
    staticClass: "vm-search-cancel",
    attrs: {
      "slot": "right",
      "href": "javascript:"
    },
    on: {
      "click": _vm.onCancel
    },
    slot: "right"
  }, [_vm._v("\n            取消\n        ")])]), _vm._v(" "), _c('scroll', [_c('div', {
    staticClass: "vm-search-panel"
  }, [_c('historys', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.val),
      expression: "!val"
    }],
    attrs: {
      "id": _vm.historyId
    },
    on: {
      "select": _vm.onConfirm
    }
  }), _vm._v(" "), _vm._t("default"), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.words.length),
      expression: "words.length"
    }],
    staticClass: "vm-search-words",
    attrs: {
      "slot": "words"
    },
    slot: "words"
  }, _vm._l((_vm.words), function(word, index) {
    return _c('div', {
      key: index,
      staticClass: "vm-search-word"
    }, [_vm._t("word", [_c('div', {
      on: {
        "click": function($event) {
          return _vm.onConfirm(word)
        }
      }
    }, [_vm._v(_vm._s(word))])], {
      "word": "word",
      "index": "index"
    })], 2)
  }), 0)], 2)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2c8c458a", module.exports)
  }
}

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__switch__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__switch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__switch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__switch___default.a));

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(177)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(179),
  /* template */
  __webpack_require__(180),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/switch/switch.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] switch.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6e3807bb", Component.options)
  } else {
    hotAPI.reload("data-v-6e3807bb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(178);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("4034bc5f", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6e3807bb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./switch.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6e3807bb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./switch.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-switch {\n  box-shadow: inset 0px 0px 1px 1px #eee;\n  display: inline-block;\n  width: 50px;\n  height: 30px;\n  position: relative;\n  border-radius: 100px;\n  transition: background .15s ease;\n}\n.vm-switch-disabled {\n  opacity: 0.7;\n}\n.vm-switch-inner {\n  background: #fff;\n  position: absolute;\n  right: 2px;\n  top: 2px;\n  height: 26px;\n  transition: all .15s ease;\n  border-radius: 100px;\n  width: 48px;\n}\n.vm-switch-checked .vm-switch-inner {\n  width: 26px;\n}\n.vm-switch-ball {\n  box-shadow: -2px 2px 8px 0px rgba(0, 0, 0, 0.2);\n  border-radius: 100px;\n  width: 26px;\n  height: 26px;\n}\n.vm-switch-checked .vm-switch-ball {\n  box-shadow: none;\n}\n", ""]);

// exports


/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(4);
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'switch',

    model: {
        prop: 'checked',
        event: 'change'
    },

    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        color: {
            type: String,
            default: function _default() {
                return Object(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */])('theme') || Object(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */])('switch.color');
            }
        },

        checked: {
            type: Boolean,
            default: false
        }
    },

    data: function data() {
        return {
            selected: this.checked
        };
    },


    watch: {
        checked: function checked(_checked) {
            this.selected = _checked;
        }
    },

    computed: {
        styles: function styles() {
            return {
                background: this.selected ? this.color : '#fff'
            };
        },
        classes: function classes() {
            return ['vm-switch', this.selected ? 'vm-switch-checked' : '', this.disabled ? 'vm-switch-disabled' : ''];
        }
    },

    methods: {
        onClick: function onClick() {
            if (this.disabled) return false;

            this.$emit('change', this.selected = !this.selected);
        }
    }
});

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.classes,
    style: (_vm.styles),
    on: {
      "click": _vm.onClick
    }
  }, [_vm._m(0)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vm-switch-inner"
  }, [_c('div', {
    staticClass: "vm-switch-ball"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6e3807bb", module.exports)
  }
}

/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__textarea__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__textarea___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__textarea__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__textarea___default.a));

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(183)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(185),
  /* template */
  __webpack_require__(186),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/textarea/textarea.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] textarea.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-56db91bb", Component.options)
  } else {
    hotAPI.reload("data-v-56db91bb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(184);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("395c257d", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-56db91bb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./textarea.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-56db91bb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./textarea.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-textarea {\n  font-size: 14px;\n  resize: none;\n  color: #333;\n  font-weight: 300;\n  flex: 1;\n  padding: 5px 0px;\n  outline: none;\n  overflow: hidden;\n  display: block;\n  box-sizing: border-box;\n  min-height: 40px;\n  border: 0px;\n}\n.vm-textarea::-webkit-input-placeholder {\n  font-weight: 300;\n  opacity: 0.7;\n}\n", ""]);

// exports


/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_input__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'textarea',

    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_input__["a" /* default */]],

    methods: {
        onInput: function onInput(e) {
            var el = e.target;
            el.style.height = 'auto';
            el.style.height = el.scrollHeight + 'px';
        }
    }
});

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('textarea', {
    staticClass: "vm-textarea needsclick",
    attrs: {
      "placeholder": _vm.placeholder,
      "readonly": _vm.readonly,
      "autofocus": _vm.autofocus
    },
    on: {
      "input": _vm.onInput
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-56db91bb", module.exports)
  }
}

/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__image__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__image___default.a));

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(189)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(191),
  /* template */
  __webpack_require__(193),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/image/image.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] image.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-40481c1a", Component.options)
  } else {
    hotAPI.reload("data-v-40481c1a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(190);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("ac8f92bc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-40481c1a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./image.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-40481c1a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./image.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-image {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 340px;\n    height: 200px;\n}\n.vm-image img {\n    width: 100%;\n}\n", ""]);

// exports


/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loading__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(0);
//
//
//
//
//
//
//





var HEIGHT = __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* Dom */].height(document),
    WIDTH = __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* Dom */].height(document);

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'image',

    props: {
        src: {
            type: String,
            default: null
        }
    },

    components: {
        Loading: __WEBPACK_IMPORTED_MODULE_1__loading__["a" /* default */]
    },

    mounted: function mounted() {
        __WEBPACK_IMPORTED_MODULE_0____["a" /* default */].on(this);
        this.try2load();
    },
    data: function data() {
        return {
            url: null
        };
    },


    methods: {
        try2load: function try2load() {
            if (this.url) return false;

            var _Dom$rect = __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* Dom */].rect(this.$el),
                top = _Dom$rect.top,
                left = _Dom$rect.left;

            if (top < HEIGHT && left < WIDTH && left >= 0) {
                this.url = this.src;
                __WEBPACK_IMPORTED_MODULE_0____["a" /* default */].off(this);
            }
        }
    },

    activated: function activated() {
        !this.url && __WEBPACK_IMPORTED_MODULE_0____["a" /* default */].on(this);
    },
    deactivated: function deactivated() {
        __WEBPACK_IMPORTED_MODULE_0____["a" /* default */].off(this);
    },
    beforeDestroy: function beforeDestroy() {
        __WEBPACK_IMPORTED_MODULE_0____["a" /* default */].off(this);
    }
});

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);


var _ = void 0;

/* harmony default export */ __webpack_exports__["a"] = ({
    on: function on(instance) {
        if (!_) {
            _ = {};

            __WEBPACK_IMPORTED_MODULE_0__helper__["c" /* Util */].observer(instance.$root.$el, {
                childList: true,
                attributes: true,
                subtree: true
            }, __WEBPACK_IMPORTED_MODULE_0__helper__["c" /* Util */].debounce(function () {
                for (var i in _) {
                    _[i].try2load();
                }
            }, 1000));
        }

        if (!instance._$id) {
            instance._$id = Math.random();
        }

        _[instance._$id] = instance;
    },
    off: function off(instance) {
        delete _[instance._$id];
    }
});

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vm-image"
  }, [(!_vm.url) ? _c('loading') : _c('img', {
    attrs: {
      "src": _vm.url
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-40481c1a", module.exports)
  }
}

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__checker__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__checker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__checker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__group__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper__ = __webpack_require__(0);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__icon___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__checker___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__group___default.a; });





__WEBPACK_IMPORTED_MODULE_3__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__icon___default.a);
__WEBPACK_IMPORTED_MODULE_3__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_1__checker___default.a);
__WEBPACK_IMPORTED_MODULE_3__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_2__group___default.a);



/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(196);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("3961c3ee", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-baae4a12\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./icon.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-baae4a12\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./icon.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-icon-checker {\n  display: flex;\n  align-items: center;\n}\n.vm-icon-checker input {\n  display: none;\n}\n.vm-icon-checker-icon {\n  border-width: 1px;\n  border-style: solid;\n  box-sizing: border-box;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 4px;\n}\n.vm-icon-checker-tick {\n  transform: scale(0.7);\n  font-weight: bold;\n}\n", ""]);

// exports


/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__abstract__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icon__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'icon-checker',

    mixins: [__WEBPACK_IMPORTED_MODULE_0__abstract___default.a],

    components: {
        Icon: __WEBPACK_IMPORTED_MODULE_2__icon___default.a
    },

    props: {
        iconSize: {
            type: [String, Number],
            default: function _default() {
                return Object(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */])('checker.icon-size');
            }
        }
    },

    computed: {
        checkerStyle: function checkerStyle() {
            var size = __WEBPACK_IMPORTED_MODULE_3__helper__["c" /* Util */].n2p(this.iconSize);

            return {
                borderRadius: this.square ? Object(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */])('checker.square-radius') : '100px',
                width: size,
                height: size,
                borderColor: this.disabled ? '#ccc' : this.selected ? this.highColor : '#999',
                background: this.disabled ? '#ccc' : this.selected ? this.highColor : '#fff'
            };
        }
    }
});

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(199);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("c95fb2f6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-909a21c0\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./abstract.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-909a21c0\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./abstract.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-checker {\n    margin-right: 10px;\n}\n", ""]);

// exports


/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);




/* harmony default export */ __webpack_exports__["default"] = ({
    model: {
        prop: 'checked',
        event: 'change'
    },

    inject: {
        _$group: {
            default: function _default() {
                return null;
            }
        }
    },

    props: {
        label: {
            type: [String, Number],
            default: ''
        },

        highColor: {
            type: String,
            default: function _default() {
                return Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('checker.high-color') || Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('theme');
            }
        },

        checked: {
            type: Boolean,
            default: false
        },

        square: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        },

        value: ''
    },

    data: function data() {
        return {
            selected: this.checked
        };
    },


    watch: {
        checked: function checked(_checked) {
            this.selected = _checked;
        }
    },

    mounted: function mounted() {
        var _this = this;

        if (this._$group) {
            this._$group.$on('change', function () {
                _this.selected = _this._$group.contains(_this.value);
            });

            this.selected = this._$group.contains(this.value);
        }
    },


    methods: {
        onClick: function onClick() {
            if (this.disabled || this._$group && !this._$group.shouldToggle(this.value)) return false;

            this.$emit('change', this.selected = !this.selected);
            this._$group && this._$group.toggleValue(this.value);
        }
    }
});

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vm-checker vm-icon-checker",
    on: {
      "click": _vm.onClick
    }
  }, [_c('i', {
    staticClass: "vm-icon-checker-icon",
    style: (_vm.checkerStyle)
  }, [_c('icon', {
    staticClass: "vm-icon-checker-tick",
    attrs: {
      "type": "selected",
      "size": _vm.iconSize,
      "color": "#fff"
    }
  })], 1), _vm._v(" "), _c('div', [_vm._t("default", [_vm._v("\n            " + _vm._s(_vm.label) + "\n        ")])], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-baae4a12", module.exports)
  }
}

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(203);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("3e630f35", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-64332da7\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./checker.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-64332da7\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./checker.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-btn-checker {\n  color: #333;\n  display: inline-block;\n  border-width: 1px;\n  border-style: solid;\n  height: 24px;\n  overflow: hidden;\n  min-width: 50px;\n}\n.vm-btn-checker input {\n  display: none;\n}\n.vm-btn-checker-inner {\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0px 8px;\n}\n", ""]);

// exports


/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__abstract__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'checker',

    mixins: [__WEBPACK_IMPORTED_MODULE_0__abstract___default.a],

    computed: {
        checkerStyle: function checkerStyle() {
            var square = this.square,
                disabled = this.disabled,
                selected = this.selected,
                highColor = this.highColor;


            return {
                borderRadius: square ? Object(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */])('checker.square-radius') : '100px',
                borderColor: disabled ? '#ccc' : selected ? highColor : 'transparent',
                background: disabled ? '#f8f8f8' : selected ? highColor : '#f3f6fb',
                borderStyle: disabled ? 'dashed' : 'solid'
            };
        },
        innerStyle: function innerStyle() {
            var selected = this.selected,
                highColor = this.highColor,
                disabled = this.disabled;


            return {
                color: selected ? highColor : 'inherit',
                opacity: disabled ? 0.7 : 1,
                background: selected ? 'rgba(255, 255, 255, 0.8)' : 'transparent'
            };
        }
    }
});

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vm-checker vm-btn-checker",
    style: (_vm.checkerStyle),
    on: {
      "click": _vm.onClick
    }
  }, [_c('div', {
    staticClass: "vm-btn-checker-inner",
    style: (_vm.innerStyle)
  }, [_vm._t("default", [_vm._v("\n            " + _vm._s(_vm.label) + "\n        ")])], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-64332da7", module.exports)
  }
}

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(207)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(209),
  /* template */
  null,
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/checker/group.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a0e2e41e", Component.options)
  } else {
    hotAPI.reload("data-v-a0e2e41e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(208);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("2df79e0e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a0e2e41e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./group.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a0e2e41e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./group.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-checker-group {\n    display: flex;\n    flex-wrap: wrap;\n}\n", ""]);

// exports


/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__checker__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__checker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__checker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_model__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'checker-group',

    mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_model__["a" /* default */]],

    provide: function provide() {
        return {
            _$group: this
        };
    },


    model: {
        prop: 'value',
        event: 'change'
    },

    props: {
        options: {
            type: Array,
            default: []
        },

        iconType: {
            type: Boolean,
            default: false
        },

        radio: {
            type: Boolean,
            default: false
        },

        value: null
    },

    watch: {
        val: function val(v) {
            this.$emit('change', v);
        }
    },

    data: function data() {
        return {
            val: this.radio ? this.value : this.value ? __WEBPACK_IMPORTED_MODULE_3__helper__["c" /* Util */].makeArray(this.value) : []
        };
    },


    methods: {
        toggleValue: function toggleValue(value) {
            if (this.radio) {
                this.val = value;
            } else {
                var i = this.index(value);
                i == -1 ? this.val.push(value) : this.val.splice(i, 1);
            }
        },
        shouldToggle: function shouldToggle(value) {
            return !this.radio || !this.contains(value) && this.radio;
        },
        contains: function contains(value) {
            return this.radio ? this.val === value : this.index(value) > -1;
        },
        index: function index(value) {
            return this.val.indexOf(value);
        }
    },

    render: function render(h) {
        var _this = this;

        return h('div', {
            class: 'vm-checker-group'
        }, this.options.length ? this.options.map(function (option) {
            return h(_this.iconType ? __WEBPACK_IMPORTED_MODULE_1__icon___default.a : __WEBPACK_IMPORTED_MODULE_0__checker___default.a, {
                props: _extends({}, option)
            });
        }) : this.$slots.default);
    }
});

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__picker__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__time__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__date__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper__ = __webpack_require__(0);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__picker___default.a; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__time__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__date__["a"]; });





__WEBPACK_IMPORTED_MODULE_3__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__picker___default.a);
__WEBPACK_IMPORTED_MODULE_3__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_1__time__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_3__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_2__date__["a" /* default */]);



/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(212);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("686966be", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-04434e7b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./picker.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-04434e7b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./picker.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-picker.vm-overlay {\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  z-index: 10001;\n  background: #f5f5f5;\n}\n.vm-picker-header {\n  display: flex;\n  height: 44px;\n  background: #fff;\n  font-size: 14px;\n  justify-content: space-between;\n}\n.vm-picker-header .vm-picker-title {\n  font-weight: bold;\n  height: 44px;\n  line-height: 44px;\n}\n.vm-picker-header a {\n  display: inline-block;\n  height: 44px;\n  text-decoration: none;\n  line-height: 44px;\n  width: 50px;\n  color: #ddd;\n  text-align: center;\n  font-size: 14px;\n}\n.vm-picker-header .vm-picker-confirm {\n  color: #7792cb;\n}\n.vm-picker-inner {\n  width: 100%;\n  height: 175px;\n  display: flex;\n  background: #fff;\n}\n.vm-picker-column {\n  flex-grow: 1;\n}\n.vm-picker-column-inner {\n  padding: 70px 0px;\n}\n.vm-picker-column-inner a {\n  color: #333;\n  display: block;\n  height: 35px;\n  line-height: 35px;\n  text-align: center;\n  text-decoration: none;\n  opacity: 0.3;\n  font-size: 13px;\n}\n", ""]);

// exports


/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroll__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__popup__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_model__ = __webpack_require__(8);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







var HEIGHT = 35;

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'picker',

    mixins: [__WEBPACK_IMPORTED_MODULE_1__popup__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_model__["a" /* default */]],

    props: {
        title: {
            type: String,
            default: ''
        },

        cancelText: {
            type: String,
            default: '取消'
        },

        confirmText: {
            type: String,
            default: '确定'
        },

        options: {
            type: Array,
            default: function _default() {
                return [];
            }
        }
    },

    components: {
        Scroll: __WEBPACK_IMPORTED_MODULE_0__scroll__["c" /* default */],
        Popup: __WEBPACK_IMPORTED_MODULE_1__popup__["a" /* default */]
    },

    data: function data() {
        var color = Object(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */])('theme');

        return {
            theme: color,
            allData: [],
            renderLists: [],
            vals: [],
            val: __WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].makeArray(this.value),
            activedStyle: {
                opacity: 1,
                color: color
            }
        };
    },


    watch: {
        options: function options(_options) {
            this.render(_options);
        }
    },

    mounted: function mounted() {
        this.options.length > 0 && this.render();
    },


    methods: {
        render: function render() {
            var _this = this;

            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options;

            options = __WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].makeArray(options);

            if (!Array.isArray(options[0])) {
                options = [options];
            }

            var promises = options.map(function (data, key) {
                if (typeof data == 'function') {
                    return __WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].acm(data(), _this, key);
                } else {
                    return data;
                }
            });

            Promise.all(promises).then(function (data) {
                _this.$emit('data:ready', data);

                var i = 0,
                    render = 0;

                for (var _i = 0; _i < data.length; _i++) {
                    if (_this.allData[_i] != data[_i]) {
                        render = _i;
                        break;
                    }
                }

                _this.allData = data;
                _this.renderColumns(_this.allData[render], render);
            });
        },
        renderColumns: function renderColumns(data, level) {
            var _this2 = this;

            this.renderLists.splice(level, 1, data);

            if (!data.length) return false;

            var select = [data[0], 0, level];

            for (var i = 0; i < data.length; i++) {
                if (data[i].value == this.val[level]) {
                    select = [data[i], i, level];
                    break;
                }
            }

            setTimeout(function () {
                return _this2.select.apply(_this2, _toConsumableArray(select));
            }, 10);
        },
        select: function select(data, index, level, duration) {
            var _this3 = this;

            var $scroll = this.$refs.scrolls[level];

            setTimeout(function () {
                $scroll.scrollTo(-HEIGHT * index, duration || 400);
                _this3.vals.splice(level, 100000, data);

                if (data.children) {
                    _this3.renderColumns(data.children, level + 1);
                } else if (level < _this3.allData.length - 1) {
                    _this3.renderColumns(_this3.allData[level + 1], level + 1);
                }

                _this3.$emit('select', _this3.vals);
            }, 0);
        },
        listen: function listen(level) {
            var _this4 = this;

            var $scroll = this.$refs.scrolls[level];

            $scroll.$on('drag:end', function (pos) {
                var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pos;
                var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

                var list = _this4.renderLists[level];
                var index = Math.min(list.length - 1, Math.round(Math.abs(target) / HEIGHT));
                _this4.select(list[index], index, level, duration);
            });

            level === this.allData.length - 1 && setTimeout(function () {
                return _this4.$emit('scroll:ready');
            }, 20);
        },
        isActived: function isActived(item, index) {
            return this.vals[index] && item.value === this.vals[index].value;
        },
        onConfirm: function onConfirm() {
            this.val = this.vals.map(function (item) {
                return item.value;
            });

            this.$emit('confirm', this.val, this.vals);
            this.hide();
        },
        setValue: function setValue(v) {
            v = __WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].makeArray(v);

            if (v.toString() === this.val.toString()) {
                return false;
            }

            this.render();
            this.val = v;
        }
    }
});

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('popup', {
    attrs: {
      "visible": _vm.visibility,
      "position": "bottom"
    }
  }, [_c('div', {
    staticClass: "vm-picker-header"
  }, [_c('a', {
    attrs: {
      "href": "javascript:"
    },
    on: {
      "click": _vm.hide
    }
  }, [_vm._v("\n            " + _vm._s(_vm.cancelText) + "\n        ")]), _vm._v(" "), _c('div', {
    staticClass: "vm-picker-title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('a', {
    staticClass: "vm-picker-confirm",
    style: ({
      color: _vm.theme
    }),
    attrs: {
      "href": "javascript:"
    },
    on: {
      "click": _vm.onConfirm
    }
  }, [_vm._v("\n            " + _vm._s(_vm.confirmText) + "\n        ")])]), _vm._v(" "), _c('div', {
    staticClass: "vm-picker-inner"
  }, _vm._l((_vm.renderLists), function(list, index) {
    return _c('scroll', {
      key: index,
      ref: "scrolls",
      refInFor: true,
      staticClass: "vm-picker-colum",
      staticStyle: {
        "height": "100%"
      },
      on: {
        "hook:mounted": function($event) {
          return _vm.listen(index)
        }
      }
    }, [_c('div', {
      staticClass: "vm-picker-column-inner"
    }, _vm._l((list), function(item, key) {
      return _c('a', {
        key: key,
        style: (_vm.isActived(item, index) ? _vm.activedStyle : ''),
        attrs: {
          "href": "javascript:"
        },
        on: {
          "click": function($event) {
            return _vm.select(item, key, index)
          }
        }
      }, [_vm._v("\n                    " + _vm._s(item.label) + "\n                ")])
    }), 0)])
  }), 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-04434e7b", module.exports)
  }
}

/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__picker__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__time__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper__ = __webpack_require__(0);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();







var MAXS = [12, null, 23, 59];
var FIELDS = ['years', 'months', 'days', 'hours', 'minutes'];

var DatePicker = {
    name: 'datepicker',

    mixins: [__WEBPACK_IMPORTED_MODULE_1__time__["a" /* default */]],

    props: {
        minDate: {
            type: [String, Date],
            default: '1970-01-01'
        },

        maxDate: {
            type: [String, Date],
            default: function _default() {
                return new Date();
            }
        },

        formatter: {
            type: String,
            default: 'yyyy/mm/dd'
        },

        units: {
            type: Array,
            default: function _default() {
                return Object(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */])('datepicker.units').concat(Object(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */])('timepicker.units'));
            }
        }
    },

    computed: {
        startDate: function startDate() {
            return __WEBPACK_IMPORTED_MODULE_4__helper__["c" /* Util */].date(this.minDate);
        },
        endDate: function endDate() {
            return __WEBPACK_IMPORTED_MODULE_4__helper__["c" /* Util */].date(this.maxDate);
        }
    },

    data: function data() {
        return {
            years: [],
            months: [],
            days: [],
            hours: [],
            minutes: []
        };
    },
    mounted: function mounted() {
        this.columns = DatePicker.columns(this.formatter);
        this.years = __WEBPACK_IMPORTED_MODULE_1__time__["a" /* default */].lv(this.endDate.getFullYear(), this.startDate.getFullYear(), this.units[0]);
        this.mins = DatePicker.serialize(this.startDate);
        this.maxs = DatePicker.serialize(this.endDate);
    },


    methods: {
        onSelect: function onSelect(vals) {
            if (vals.length < this.columns) {
                this[FIELDS[vals.length]] = this.analyse(vals.map(function (val) {
                    return val.value;
                }));
            }
        },
        analyse: function analyse(vals) {
            var l = vals.length;
            var mins = this.mins.slice(0, l);
            var maxs = this.maxs.slice(0, l);
            var f = void 0,
                max = void 0,
                min = void 0;

            if (vals.toString() == mins.toString()) {
                min = this.mins[l];
            } else {
                min = l >= 3 ? 0 : 1;
            }

            if (vals.toString() == maxs.toString()) {
                max = this.maxs[l];
            } else if (l == 2) {
                max = new Date(vals[0], vals[1], 0).getDate();
            } else {
                max = MAXS[l - 1];
            }

            return __WEBPACK_IMPORTED_MODULE_1__time__["a" /* default */].lv(max, min, this.units[l]);
        },
        onConfirm: function onConfirm(vals) {
            var _vals = _slicedToArray(vals, 5),
                year = _vals[0],
                month = _vals[1],
                day = _vals[2],
                hh = _vals[3],
                ii = _vals[4];

            var str = this.formatter.replace('yyyy', year).replace('yy', year % 100).replace('mm', __WEBPACK_IMPORTED_MODULE_4__helper__["c" /* Util */].pad(month)).replace('dd', __WEBPACK_IMPORTED_MODULE_4__helper__["c" /* Util */].pad(day)).replace('hh', __WEBPACK_IMPORTED_MODULE_4__helper__["c" /* Util */].pad(hh)).replace('ii', __WEBPACK_IMPORTED_MODULE_4__helper__["c" /* Util */].pad(ii));

            this.val = str;
            this.$emit('confirm', str, vals);
        },
        analyseValue: function analyseValue(date) {
            return DatePicker.serialize(new Date(date)).slice(0, this.columns);
        }
    },

    render: function render(h) {
        var options = [this.years, this.months, this.days, this.hours, this.minutes].slice(0, this.columns);

        return h(__WEBPACK_IMPORTED_MODULE_0__picker___default.a, {
            props: {
                options: options,
                visible: this.visibility,
                value: this.vals
            },

            on: {
                hide: this.hide,
                confirm: this.onConfirm,
                select: this.onSelect
            }
        });
    }
};

DatePicker.serialize = function (date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()];
};

DatePicker.columns = function (formatter) {
    if (/hh:ii/.test(formatter)) return 5;
    if (!/dd/.test(formatter)) return 2;

    return 3;
};

/* harmony default export */ __webpack_exports__["a"] = (DatePicker);

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__row__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__row___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__row__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__row___default.a; });



__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__row___default.a);



/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(218)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(220),
  /* template */
  __webpack_require__(221),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/form/row.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] row.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-323fc31a", Component.options)
  } else {
    hotAPI.reload("data-v-323fc31a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(219);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("f813c244", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-323fc31a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./row.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-323fc31a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./row.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-form-row {\n  padding-left: 12px;\n}\n.vm-form-row-inner {\n  padding: 6px 12px 6px 0px;\n  border-bottom: 1px solid #eee;\n}\n.vm-form-row:nth-last-child(1) .vm-form-row-inner {\n  border-bottom: 0px;\n}\n.vm-form-label {\n  display: flex;\n  align-items: center;\n}\n.vm-form-row-horizontal .vm-form-row-main {\n  min-height: 30px;\n  display: flex;\n}\n.vm-form-row-horizontal .vm-form-label {\n  height: 30px;\n}\n.vm-form-row-right .vm-form-row-fill {\n  justify-content: flex-end;\n}\n.vm-form-tips {\n  color: #aaa;\n  margin-start: auto;\n  -webkit-margin-start: auto;\n  font-size: 12px;\n}\n.vm-form-row-fill {\n  padding-left: 12px;\n  display: flex;\n  align-items: center;\n  flex: 1;\n}\n.vm-form-row-vertical .vm-form-row-fill {\n  padding-left: 0px;\n}\n.vm-form-row-vertical .vm-form-label {\n  margin-bottom: 6px;\n}\n", ""]);

// exports


/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'form-row',

    provide: function provide() {
        return {
            rowAlign: this.align
        };
    },


    props: {
        label: null,

        align: {
            type: String,
            defualt: 'left'
        },

        verticalLayout: {
            type: Boolean,
            default: false
        }
    },

    data: function data() {
        return {
            layout: this.verticalLayout || this.$slots.tips ? 'vertical' : 'horizontal',
            labelStyle: {
                minWidth: Object(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */])('form-row.label-min-width')
            }
        };
    },


    computed: {
        classes: function classes() {
            return 'vm-form-row vm-form-row-' + this.layout + ' vm-form-row-' + this.align;
        }
    }
});

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.classes
  }, [_c('div', {
    staticClass: "vm-form-row-inner"
  }, [_c('div', {
    staticClass: "vm-form-row-main"
  }, [(_vm.$slots.label || _vm.label) ? _c('div', {
    staticClass: "vm-form-label",
    style: (_vm.labelStyle)
  }, [_vm._t("label", [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), (_vm.$slots.tips) ? _c('span', {
    staticClass: "vm-form-tips"
  }, [_vm._t("tips")], 2) : _vm._e()], 2) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "vm-form-row-fill"
  }, [_vm._t("default")], 2)]), _vm._v(" "), _c('div', {
    staticClass: "vm-form-row-extras"
  }, [_vm._t("extras")], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-323fc31a", module.exports)
  }
}

/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__swiper__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__swiper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__swiper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__item__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(0);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__swiper___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__item___default.a; });




__WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__swiper___default.a);
__WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_1__item___default.a);



/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(224)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(226),
  /* template */
  __webpack_require__(227),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/swiper/swiper.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] swiper.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4115133b", Component.options)
  } else {
    hotAPI.reload("data-v-4115133b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(225);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("6b4d6784", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4115133b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./swiper.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4115133b\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./swiper.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-swiper {\n  width: 100%;\n  overflow: hidden;\n  position: relative;\n}\n.vm-swiper-indicators {\n  position: absolute;\n  bottom: 0px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.vm-swiper-y {\n  height: 100%;\n}\n.vm-swiper-y .vm-swiper-indicators {\n  flex-direction: column;\n  height: 100%;\n  width: 30px;\n  right: 0px;\n  top: 0px;\n}\n.vm-swiper-y .vm-swiper-indicator {\n  margin: 3px 0px;\n}\n.vm-swiper-y .vm-swiper-indicator-active {\n  height: 12px;\n}\n.vm-swiper-x .vm-swiper-indicators {\n  width: 100%;\n  height: 30px;\n  bottom: 0px;\n}\n.vm-swiper-x .vm-swiper-indicator {\n  margin: 0px 3px;\n}\n.vm-swiper-x .vm-swiper-indicator-active {\n  width: 12px;\n}\n.vm-swiper-indicator {\n  opacity: 0.9;\n  width: 6px;\n  height: 6px;\n  border-radius: 100px;\n  display: inline-block;\n  transition: background .5s ease;\n  -webkit-transition: background .5s ease;\n}\n.vm-swiper-inner {\n  display: flex;\n  flex-flow: row;\n  align-items: flex-start;\n  margin-top: 0px;\n  width: 100000000000px;\n}\n.vm-swiper-y .vm-swiper-inner {\n  flex-flow: column;\n  width: auto;\n  height: 10000000000px;\n}\n.vm-swiper-fxing .vm-swiper-inner {\n  transition: transform .5s ease;\n  -webkit-transition: transform .5s ease;\n}\n", ""]);

// exports


/***/ }),
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_draggable__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'swiper',

    directives: {
        Draggable: __WEBPACK_IMPORTED_MODULE_0__directives_draggable__["a" /* default */]
    },

    props: {
        axis: {
            type: String,
            default: 'x'
        },

        ratio: {
            type: Number,
            default: 0.25
        },

        defaultIndex: {
            type: Number,
            default: 0
        },

        autoplay: {
            type: Boolean,
            default: true
        },

        interval: {
            type: Number,
            default: 5000
        },

        indicatorDots: {
            type: Boolean,
            default: true
        },

        indicatorColor: {
            type: String,
            default: function _default() {
                return Object(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */])('swiper.indicator-color');
            }
        },

        indicatorActiveColor: {
            type: String,
            default: function _default() {
                return Object(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */])('swiper.indicator-active-color') || Object(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */])('theme');
            }
        }
    },

    data: function data() {
        return {
            fxing: false,
            max: 0,
            min: 0,
            index: null,
            draggableOptions: {
                axis: this.axis,
                canDrag: this.canDrag
            }
        };
    },


    computed: {
        classes: function classes() {
            return ['vm-swiper', 'vm-swiper-' + this.axis, this.fxing ? 'vm-swiper-fxing' : ''];
        }
    },

    mounted: function mounted() {
        var _this = this;

        this.$nextTick(function () {
            __WEBPACK_IMPORTED_MODULE_1__helper__["b" /* Event */].on(_this.$inner = _this.$refs.inner, 'transitionend webkitTransitionEnd', _this.complete.bind(_this));

            _this.max = _this.$inner.children.length;
            _this.to(_this.defaultIndex, false, true);
        });
    },
    updated: function updated() {
        this.max = this.$inner.children.length;
    },
    activated: function activated() {
        this.autoPlay();
    },
    deactivated: function deactivated() {
        this.cancelAutoPlay();
    },


    methods: {
        autoPlay: function autoPlay() {
            var _this2 = this;

            if (!this.autoplay || this._$autoid) return false;

            this._$autoid = setTimeout(function () {
                _this2.to(_this2.index + 1 == _this2.max ? 0 : _this2.index + 1);
            }, this.interval);
        },
        cancelAutoPlay: function cancelAutoPlay() {
            if (!this._$autoid) return false;

            clearTimeout(this._$autoid);
            this._$autoid = null;
        },
        onDragStart: function onDragStart(event) {
            this.cancelAutoPlay();
            this.fxing = false;
            this.min = -(this.max - 1) * this.getDocumentSize();
            this.$emit('drag:start');
        },
        onDraging: function onDraging(event) {
            this.isMoving = true;
            this.$emit('draging', event);
        },
        onDragEnd: function onDragEnd(event) {
            if (!this.isMoving) {
                return false;
            }

            this.isMoving = false;

            var start = -this.$inner.children[this.index][this.axis == 'x' ? 'offsetLeft' : 'offsetTop'];
            var end = event.data[this.axis];
            var moved = end - start;
            var index = this.index + (Math.abs(moved) / this.getDocumentSize() < this.ratio ? 0 : moved > 0 ? -1 : 1);

            this.$emit('drag:end');
            this.to(index);
        },
        to: function to(index) {
            var fx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var untrigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var offset = index * this.getDocumentSize();

            if (index == this.index) {
                this.$emit('reject', index);
            } else {
                var oldIndex = this.index;

                this.index = index;
                !untrigger && this.$emit('switch', this.index, oldIndex);
            }

            this.fxing = fx;
            __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].css(this.$inner, 'transform', 'translate' + this.axis.toUpperCase() + '(-' + offset + 'px)');
            !fx && this.complete();
        },
        complete: function complete() {
            this.fxing = false;
            this.$emit('switch:complete', this.index);
            this.autoPlay();
        },
        canDrag: function canDrag(info) {
            var offset = info[this.axis];

            return offset > this.min && offset < 0;
        },
        getDocumentSize: function getDocumentSize() {
            return this.axis == 'x' ? __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].width(document) : __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].height(document);
        }
    }
});

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.classes
  }, [_c('div', {
    directives: [{
      name: "draggable",
      rawName: "v-draggable",
      value: (_vm.draggableOptions),
      expression: "draggableOptions"
    }],
    ref: "inner",
    staticClass: "vm-swiper-inner",
    on: {
      "drag:start": _vm.onDragStart,
      "draging": _vm.onDraging,
      "drag:end": _vm.onDragEnd
    }
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    staticClass: "vm-swiper-indicators"
  }, _vm._l((_vm.max), function(a) {
    return _c('i', {
      key: a,
      class: {
        'vm-swiper-indicator': true,
        'vm-swiper-indicator-active': a == _vm.index + 1
      },
      style: ({
        background: a == _vm.index + 1 ? _vm.indicatorActiveColor : _vm.indicatorColor
      })
    })
  }), 0)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4115133b", module.exports)
  }
}

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(229)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(231),
  /* template */
  __webpack_require__(232),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/swiper/item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-de81a1d4", Component.options)
  } else {
    hotAPI.reload("data-v-de81a1d4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(230);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("9edfb39e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-de81a1d4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./item.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-de81a1d4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./item.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-swiper-item {\n    overflow: hidden;\n}\n", ""]);

// exports


/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(0);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'swiper-item',

    mounted: function mounted() {
        var _this = this;

        __WEBPACK_IMPORTED_MODULE_0__helper__["b" /* Event */].on(window, 'resize', function () {
            return _this.resize();
        });
        this.resize();
    },


    methods: {
        resize: function resize() {
            this.$el.style.width = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].width(document) + 'px';

            if (this.$parent.axis == 'y') {
                this.$el.style.height = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* Dom */].height(document) + 'px';
            }
        }
    }
});

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vm-swiper-item"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-de81a1d4", module.exports)
  }
}

/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__swipeout__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__swipeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__swipeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__action__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__action___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__action__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(0);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__swipeout___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__action___default.a; });





__WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__swipeout___default.a);
__WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_1__action___default.a);



/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(235)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(237),
  /* template */
  __webpack_require__(238),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/swipeout/swipeout.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] swipeout.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5fadbefb", Component.options)
  } else {
    hotAPI.reload("data-v-5fadbefb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(236);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("7a156f27", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5fadbefb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./swipeout.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5fadbefb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./swipeout.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-swipeout {\n  position: relative;\n  -webkit-user-select: none;\n}\n.vm-swipeout-fx {\n  transition: transform 300ms ease;\n}\n.vm-swipeout-content {\n  position: relative;\n  z-index: 1;\n}\n.vm-swipeout-actions {\n  position: absolute;\n  right: 0px;\n  top: 0px;\n  height: 100%;\n  z-index: 0;\n  display: flex;\n}\n", ""]);

// exports


/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_draggable__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'swipeout',

    directives: {
        Draggable: __WEBPACK_IMPORTED_MODULE_0__directives_draggable__["a" /* default */]
    },

    data: function data() {
        return {
            fxing: false,
            isOpen: false
        };
    },
    mounted: function mounted() {
        var _this = this;

        this.$nextTick(function () {
            _this.actionsWidth = __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].width(_this.$refs.actions);
            __WEBPACK_IMPORTED_MODULE_1__helper__["b" /* Event */].on(_this.$refs.content, 'transitionend webkitTransitionEnd', function () {
                _this.fxing = false;
            });

            __WEBPACK_IMPORTED_MODULE_1__helper__["b" /* Event */].on(document.body, 'touchstart', function () {
                if (_this.fxing) {
                    _this.$refs.content.$draggable.cancel();
                    return false;
                }

                if (_this.isOpen) {
                    _this.$refs.content.$draggable.cancel();
                    _this.close();
                }
            });
        });
    },


    methods: {
        onDragEnd: function onDragEnd(e) {
            e.data.x / this.actionsWidth <= -0.5 ? this.open() : this.recover();
        },
        canDrag: function canDrag(info) {
            return info.x < 0 && info.x >= -this.actionsWidth && !this.fxing;
        },
        toggle: function toggle() {
            this.isOpen ? this.close() : this.open();
        },
        open: function open() {
            if (this.isOpen) return false;

            this.$emit('open');
            this.fxing = true;
            this.isOpen = true;
            __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].css(this.$refs.content, 'transform', 'translateX(-' + this.actionsWidth + 'px)');
        },
        close: function close() {
            if (!this.isOpen) return false;

            this.$emit('close');
            this.recover();
        },
        recover: function recover() {
            this.fxing = true;
            this.isOpen = false;
            __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].css(this.$refs.content, 'transform', 'translateX(0px)');
        }
    }
});

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vm-swipeout"
  }, [_c('div', {
    directives: [{
      name: "draggable",
      rawName: "v-draggable",
      value: ({
        axis: 'x',
        canDrag: _vm.canDrag
      }),
      expression: "{\n            axis: 'x',\n            canDrag: canDrag\n        }"
    }],
    ref: "content",
    class: ['vm-swipeout-content', _vm.fxing ? 'vm-swipeout-fx' : ''],
    on: {
      "drag:end": _vm.onDragEnd
    }
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    ref: "actions",
    staticClass: "vm-swipeout-actions"
  }, [_vm._t("actions")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5fadbefb", module.exports)
  }
}

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(240)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(242),
  /* template */
  __webpack_require__(243),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/swipeout/action.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] action.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ef34b3c6", Component.options)
  } else {
    hotAPI.reload("data-v-ef34b3c6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(241);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("0945f018", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ef34b3c6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./action.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ef34b3c6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./action.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-swipeout-action {\n  min-width: 70px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  line-height: 1;\n  text-align: center;\n  text-decoration: none;\n}\n", ""]);

// exports


/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(4);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'swipeout-action',

    data: function data() {
        return {
            style: {
                background: Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('swipeout-action.background') || Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('theme'),
                color: Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('swipeout-action.color')
            }
        };
    },


    methods: {
        onClick: function onClick() {
            this.$emit('click');
        }
    }
});

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', {
    staticClass: "vm-swipeout-action",
    style: (_vm.style),
    attrs: {
      "href": "javascript:"
    },
    on: {
      "click": _vm.onClick
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ef34b3c6", module.exports)
  }
}

/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__tabs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pane__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pane___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__pane__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(0);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__tabs___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__pane___default.a; });




__WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_1__pane___default.a);
__WEBPACK_IMPORTED_MODULE_2__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__tabs___default.a);



/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(246)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(248),
  /* template */
  __webpack_require__(251),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/Tabs/tabs.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] tabs.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0ab6baca", Component.options)
  } else {
    hotAPI.reload("data-v-0ab6baca", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(247);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("9f2502e4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0ab6baca\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tabs.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0ab6baca\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tabs.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-tabs {\n  width: 100%;\n}\n.vm-tabs-headers {\n  box-sizing: border-box;\n  padding: 0px 8px;\n  width: 100%;\n  white-space: nowrap;\n  height: 44px;\n  font-size: 14px;\n  text-align: center;\n  background: #fff;\n}\n.vm-tabs-header {\n  display: inline-flex;\n  margin: 0px 8px;\n  height: 100%;\n  align-items: center;\n  font-weight: 500;\n  color: #333;\n  font-size: 14px;\n  box-sizing: border-box;\n  text-decoration: none;\n}\n.vm-tabs-header-actived {\n  border-bottom: 4px solid #E74D4D;\n  color: #E74D4D;\n}\n.vm-tabs-panes {\n  width: 100%;\n}\n.vm-tabs-panes-inner {\n  width: 100%;\n  white-space: nowrap;\n  min-height: 100px;\n  transition: transform 300ms ease;\n}\n", ""]);

// exports


/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroll__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_wipe__ = __webpack_require__(249);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'tabs',

    directives: {
        Wipe: __WEBPACK_IMPORTED_MODULE_3__directives_wipe__["a" /* default */]
    },

    components: {
        Scroll: __WEBPACK_IMPORTED_MODULE_0__scroll__["c" /* default */],
        Headers: Headers
    },

    props: {
        centerLayout: {
            type: Boolean,
            default: true
        },

        headers: {
            type: Array,
            default: function _default() {
                return [];
            }
        },

        headersStyle: {
            type: [String, Object],
            default: ''
        },

        headerActiveColor: {
            type: String,
            default: function _default() {
                return Object(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */])('tabs.header-active-color') || Object(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */])('theme');
            }
        },

        defaultIndex: {
            type: Number,
            default: 0
        }
    },

    data: function data() {
        return {
            index: null
        };
    },
    mounted: function mounted() {
        this.switch(this.defaultIndex, true);
    },


    methods: {
        onPanesWipe: function onPanesWipe(direction) {
            if (direction == -1 && this.index == this.headers.length - 1 || direction == 1 && this.index == 0) {
                return false;
            }

            this.switch(direction > 0 ? this.index - 1 : this.index + 1);
        },
        onHeaderClick: function onHeaderClick(index) {
            this.$emit('header:click', index, this.headers[index]);
            this.switch(index);
        },
        switch: function _switch() {
            var _this = this;

            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var untrigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (index == this.index) {
                return false;
            }

            [].map.call(this.$refs.panes.children || [], function (child, key) {
                if (key == index || key == _this.index) {
                    __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].css(child, 'height', 'auto');
                } else {
                    __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].css(child, 'height', '1px');
                }
            });

            this.index = index;
            this.try2scroll();
            this.fxPanes();
            !untrigger && this.$emit('switch', index, this.headers[index]);
        },
        try2scroll: function try2scroll() {
            var _this2 = this;

            setTimeout(function () {
                var left = __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].$('.vm-tabs-header-actived', _this2.$el).offsetLeft;

                _this2.$refs.headers.scrollTo(-left + 130, 300, true);
            }, 100);
        },
        fxPanes: function fxPanes() {
            __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].css(this.$refs.panes, 'transform', 'translateX(-' + this.index * 100 + '%)');
        }
    }
});

/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wipe__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__wipe__["a" /* default */], true));

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__draggable__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);
/* eslint-disable standard/no-callback-literal */



var MIN_PERCENT = 0.3;

/* harmony default export */ __webpack_exports__["a"] = ({
    bind: function bind(element, data) {
        var percent = void 0,
            callback = void 0;

        if (typeof data.value == 'function') {
            callback = data.value;
        } else {
            percent = data.value.percent;
            callback = data.value.callback;
        }

        var min = void 0;

        setTimeout(function () {
            min = __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].width(element) * (percent || MIN_PERCENT);
        }, 100);

        var instance = new __WEBPACK_IMPORTED_MODULE_0__draggable__["a" /* default */].Constructor(element, {
            axis: 'x',
            canDrag: function canDrag() {
                return false;
            }
        });

        var x = void 0;

        __WEBPACK_IMPORTED_MODULE_1__helper__["b" /* Event */].on(element, 'drag:start', function (e) {
            x = e.data.clientX;
        });

        __WEBPACK_IMPORTED_MODULE_1__helper__["b" /* Event */].on(element, 'drag:end', function (e) {
            var change = e.data.e.changedTouches[0].clientX - x;

            Math.abs(change) > min && callback(change > 0 ? 1 : -1);
        });
    },


    name: 'wipe'
});

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vm-tabs"
  }, [_c('scroll', {
    ref: "headers",
    style: (_vm.headersStyle),
    attrs: {
      "axis": "x"
    }
  }, [_c('div', {
    staticClass: "vm-tabs-headers"
  }, _vm._l((_vm.headers), function(item, key) {
    return _c('a', {
      key: key,
      class: {
        'vm-tabs-header': true,
        'vm-tabs-header-actived': key == _vm.index
      },
      style: ({
        color: key == _vm.index ? _vm.headerActiveColor : 'inherit',
        borderBottomColor: key == _vm.index ? _vm.headerActiveColor : 'inherit'
      }),
      on: {
        "click": function($event) {
          return _vm.onHeaderClick(key)
        }
      }
    }, [_vm._v("\n                    " + _vm._s(item.label || item) + "\n                ")])
  }), 0)]), _vm._v(" "), _c('div', {
    directives: [{
      name: "wipe",
      rawName: "v-wipe",
      value: (_vm.onPanesWipe),
      expression: "onPanesWipe"
    }],
    staticClass: "vm-tabs-panes"
  }, [_c('div', {
    ref: "panes",
    staticClass: "vm-tabs-panes-inner"
  }, [_vm._t("default")], 2)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0ab6baca", module.exports)
  }
}

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(253)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(255),
  /* template */
  __webpack_require__(256),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/Tabs/pane.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pane.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6ed4cd85", Component.options)
  } else {
    hotAPI.reload("data-v-6ed4cd85", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(254);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("65f62a33", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6ed4cd85\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pane.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6ed4cd85\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pane.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-tabs-pane {\n  width: 100%;\n  height: 1px;\n  overflow: hidden;\n  display: inline-block;\n  vertical-align: top;\n}\n", ""]);

// exports


/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'tabs-pane'
});

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vm-tabs-pane"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6ed4cd85", module.exports)
  }
}

/***/ }),
/* 257 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__badge_js__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].register(__WEBPACK_IMPORTED_MODULE_0__badge_js__["a" /* default */], true));

/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_badge__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = ({
    bind: function bind(element, data, VNode) {
        var instance = element.$$badge = __WEBPACK_IMPORTED_MODULE_1__helper__["c" /* Util */].factory(__WEBPACK_IMPORTED_MODULE_0__components_badge__["a" /* default */], {
            text: data.value.text || data.value,
            color: data.value.color
        }, element);

        var el = instance.$el;

        if (!/fixed|absolute/.test(__WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].css(element, 'position'))) {
            __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].css(element, 'position', 'relative');
        }

        __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* Dom */].css(el, {
            position: 'absolute',
            top: 0,
            right: 0,
            transform: 'translate(50%, -50%) scale(0.5)'
        });
    },
    update: function update(element, data) {
        element.$$badge.setText(data.value);
    },


    name: 'badge',

    Component: __WEBPACK_IMPORTED_MODULE_0__components_badge__["a" /* default */]
});

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(260)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(262),
  /* template */
  null,
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zhanghao/Code/vm/src/components/badge/badge.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52453883", Component.options)
  } else {
    hotAPI.reload("data-v-52453883", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(261);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("e2e897ca", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-52453883\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./badge.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-52453883\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/less-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./badge.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.vm-badge {\n  color: #fff;\n  display: inline-block;\n  min-width: 18px;\n  padding: 0px 7px;\n  height: 32px;\n  line-height: 32px;\n  transform: scale(0.5);\n  font-size: 20px;\n  text-align: center;\n  border-radius: 100px;\n}\n.vm-badge:empty {\n  width: 20px;\n  min-width: 0px;\n  height: 20px;\n  padding: 0px;\n}\n", ""]);

// exports


/***/ }),
/* 262 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(4);



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'badge',

    props: {
        color: {
            type: String,
            default: Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('badge.color') || Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])('theme')
        },

        text: {
            type: [Number, String]
        }
    },

    data: function data() {
        return {
            txt: this.text
        };
    },


    watch: {
        text: function text(_text) {
            this.setText(_text);
        }
    },

    methods: {
        setText: function setText(text) {
            this.txt = text;
        }
    },

    render: function render(h) {
        return h('span', {
            class: 'vm-badge',
            style: {
                background: this.color
            }
        }, [this.txt ? this.txt : this.$slots.default]);
    }
});

/***/ })
/******/ ]);
});