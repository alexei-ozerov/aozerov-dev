(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./lib/theme.js":
/*!**********************!*\
  !*** ./lib/theme.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @chakra-ui/react */ "@chakra-ui/react");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/theme-tools */ "@chakra-ui/theme-tools");
/* harmony import */ var _chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_1__);


const styles = {
  global: props => ({
    body: {
      bg: (0,_chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_1__.mode)('#f0e7db', '#202023')(props)
    }
  })
};
const components = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: '#525252',
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4
      }
    }
  },
  Link: {
    baseStyle: props => ({
      color: (0,_chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_1__.mode)('#3d7aed', '#ff63c3')(props),
      textUnderlineOffset: 3
    })
  }
};
const fonts = {
  heading: "'M PLUS Rounded 1c'"
};
const colors = {
  glassTeal: '#88ccca'
};
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
};
const theme = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.extendTheme)({
  config,
  styles,
  components,
  fonts,
  colors
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);

/***/ }),

/***/ "./node_modules/next/dist/client/head-manager.js":
/*!*******************************************************!*\
  !*** ./node_modules/next/dist/client/head-manager.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = initHeadManager;
exports.DOMAttributeNames = void 0;
const DOMAttributeNames = {
  acceptCharset: 'accept-charset',
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv',
  noModule: 'noModule'
};
exports.DOMAttributeNames = DOMAttributeNames;

function reactElementToDOM({
  type,
  props
}) {
  const el = document.createElement(type);

  for (const p in props) {
    if (!props.hasOwnProperty(p)) continue;
    if (p === 'children' || p === 'dangerouslySetInnerHTML') continue; // we don't render undefined props to the DOM

    if (props[p] === undefined) continue;
    const attr = DOMAttributeNames[p] || p.toLowerCase();

    if (type === 'script' && (attr === 'async' || attr === 'defer' || attr === 'noModule')) {
      el[attr] = !!props[p];
    } else {
      el.setAttribute(attr, props[p]);
    }
  }

  const {
    children,
    dangerouslySetInnerHTML
  } = props;

  if (dangerouslySetInnerHTML) {
    el.innerHTML = dangerouslySetInnerHTML.__html || '';
  } else if (children) {
    el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
  }

  return el;
}

function updateElements(type, components) {
  const headEl = document.getElementsByTagName('head')[0];
  const headCountEl = headEl.querySelector('meta[name=next-head-count]');

  if (true) {
    if (!headCountEl) {
      console.error('Warning: next-head-count is missing. https://nextjs.org/docs/messages/next-head-count-missing');
      return;
    }
  }

  const headCount = Number(headCountEl.content);
  const oldTags = [];

  for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = j.previousElementSibling) {
    if (j.tagName.toLowerCase() === type) {
      oldTags.push(j);
    }
  }

  const newTags = components.map(reactElementToDOM).filter(newTag => {
    for (let k = 0, len = oldTags.length; k < len; k++) {
      const oldTag = oldTags[k];

      if (oldTag.isEqualNode(newTag)) {
        oldTags.splice(k, 1);
        return false;
      }
    }

    return true;
  });
  oldTags.forEach(t => t.parentNode.removeChild(t));
  newTags.forEach(t => headEl.insertBefore(t, headCountEl));
  headCountEl.content = (headCount - oldTags.length + newTags.length).toString();
}

function initHeadManager() {
  let updatePromise = null;
  return {
    mountedInstances: new Set(),
    updateHead: head => {
      const promise = updatePromise = Promise.resolve().then(() => {
        if (promise !== updatePromise) return;
        updatePromise = null;
        const tags = {};
        head.forEach(h => {
          if ( // If the font tag is loaded only on client navigation
          // it won't be inlined. In this case revert to the original behavior
          h.type === 'link' && h.props['data-optimized-fonts'] && !document.querySelector(`style[data-href="${h.props['data-href']}"]`)) {
            h.props.href = h.props['data-href'];
            h.props['data-href'] = undefined;
          }

          const components = tags[h.type] || [];
          components.push(h);
          tags[h.type] = components;
        });
        const titleComponent = tags.title ? tags.title[0] : null;
        let title = '';

        if (titleComponent) {
          const {
            children
          } = titleComponent.props;
          title = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
        }

        if (title !== document.title) document.title = title;
        ['meta', 'base', 'link', 'style', 'script'].forEach(type => {
          updateElements(type, tags[type] || []);
        });
      });
    }
  };
}

/***/ }),

/***/ "./node_modules/next/dist/client/request-idle-callback.js":
/*!****************************************************************!*\
  !*** ./node_modules/next/dist/client/request-idle-callback.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.requestIdleCallback = exports.cancelIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "./node_modules/next/dist/client/script.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/script.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.initScriptLoader = initScriptLoader;
exports.default = void 0;

var _react = __webpack_require__(/*! react */ "react");

var _headManagerContext = __webpack_require__(/*! ../shared/lib/head-manager-context */ "../shared/lib/head-manager-context");

var _headManager = __webpack_require__(/*! ./head-manager */ "./node_modules/next/dist/client/head-manager.js");

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const ScriptCache = new Map();
const LoadCache = new Set();
const ignoreProps = ['onLoad', 'dangerouslySetInnerHTML', 'children', 'onError', 'strategy'];

const loadScript = props => {
  const {
    src,
    id,
    onLoad = () => {},
    dangerouslySetInnerHTML,
    children = '',
    strategy = 'afterInteractive',
    onError
  } = props;
  const cacheKey = id || src; // Script has already loaded

  if (cacheKey && LoadCache.has(cacheKey)) {
    return;
  } // Contents of this script are already loading/loaded


  if (ScriptCache.has(src)) {
    LoadCache.add(cacheKey); // Execute onLoad since the script loading has begun

    ScriptCache.get(src).then(onLoad, onError);
    return;
  }

  const el = document.createElement('script');
  const loadPromise = new Promise((resolve, reject) => {
    el.addEventListener('load', function (e) {
      resolve();

      if (onLoad) {
        onLoad.call(this, e);
      }
    });
    el.addEventListener('error', function (e) {
      reject(e);
    });
  }).catch(function (e) {
    if (onError) {
      onError(e);
    }
  });

  if (src) {
    ScriptCache.set(src, loadPromise);
  }

  LoadCache.add(cacheKey);

  if (dangerouslySetInnerHTML) {
    el.innerHTML = dangerouslySetInnerHTML.__html || '';
  } else if (children) {
    el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
  } else if (src) {
    el.src = src;
  }

  for (const [k, value] of Object.entries(props)) {
    if (value === undefined || ignoreProps.includes(k)) {
      continue;
    }

    const attr = _headManager.DOMAttributeNames[k] || k.toLowerCase();
    el.setAttribute(attr, value);
  }

  el.setAttribute('data-nscript', strategy);
  document.body.appendChild(el);
};

function handleClientScriptLoad(props) {
  const {
    strategy = 'afterInteractive'
  } = props;

  if (strategy === 'afterInteractive') {
    loadScript(props);
  } else if (strategy === 'lazyOnload') {
    window.addEventListener('load', () => {
      (0, _requestIdleCallback).requestIdleCallback(() => loadScript(props));
    });
  }
}

function loadLazyScript(props) {
  if (document.readyState === 'complete') {
    (0, _requestIdleCallback).requestIdleCallback(() => loadScript(props));
  } else {
    window.addEventListener('load', () => {
      (0, _requestIdleCallback).requestIdleCallback(() => loadScript(props));
    });
  }
}

function initScriptLoader(scriptLoaderItems) {
  scriptLoaderItems.forEach(handleClientScriptLoad);
}

function Script(props) {
  const {
    src = '',
    onLoad = () => {},
    dangerouslySetInnerHTML,
    strategy = 'afterInteractive',
    onError
  } = props,
        restProps = _objectWithoutProperties(props, ["src", "onLoad", "dangerouslySetInnerHTML", "strategy", "onError"]); // Context is available only during SSR


  const {
    updateScripts,
    scripts,
    getIsSsr
  } = (0, _react).useContext(_headManagerContext.HeadManagerContext);
  (0, _react).useEffect(() => {
    if (strategy === 'afterInteractive') {
      loadScript(props);
    } else if (strategy === 'lazyOnload') {
      loadLazyScript(props);
    }
  }, [props, strategy]);

  if (strategy === 'beforeInteractive') {
    if (updateScripts) {
      scripts.beforeInteractive = (scripts.beforeInteractive || []).concat([_objectSpread({
        src,
        onLoad,
        onError
      }, restProps)]);
      updateScripts(scripts);
    } else if (getIsSsr && getIsSsr()) {
      // Script has already loaded during SSR
      LoadCache.add(restProps.id || src);
    } else if (getIsSsr && !getIsSsr()) {
      loadScript(props);
    }
  }

  return null;
}

var _default = Script;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/pages/_document.js":
/*!***************************************************!*\
  !*** ./node_modules/next/dist/pages/_document.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const _excluded = ["strategy"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "DocumentContext", ({
  enumerable: true,
  get: function () {
    return _utils.DocumentContext;
  }
}));
Object.defineProperty(exports, "DocumentInitialProps", ({
  enumerable: true,
  get: function () {
    return _utils.DocumentInitialProps;
  }
}));
Object.defineProperty(exports, "DocumentProps", ({
  enumerable: true,
  get: function () {
    return _utils.DocumentProps;
  }
}));
exports.Html = Html;
exports.Main = Main;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _server = _interopRequireDefault(__webpack_require__(/*! styled-jsx/server */ "styled-jsx/server"));

var _constants = __webpack_require__(/*! ../shared/lib/constants */ "../shared/lib/constants");

var _utils = __webpack_require__(/*! ../shared/lib/utils */ "../shared/lib/utils");

var _getPageFiles = __webpack_require__(/*! ../server/get-page-files */ "../server/get-page-files");

var _utils1 = __webpack_require__(/*! ../server/utils */ "../server/utils");

var _htmlescape = __webpack_require__(/*! ../server/htmlescape */ "../server/htmlescape");

var _script = _interopRequireDefault(__webpack_require__(/*! ../client/script */ "./node_modules/next/dist/client/script.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

function getDocumentFiles(buildManifest, pathname, inAmpMode) {
  const sharedFiles = (0, _getPageFiles).getPageFiles(buildManifest, '/_app');
  const pageFiles = inAmpMode ? [] : (0, _getPageFiles).getPageFiles(buildManifest, pathname);
  return {
    sharedFiles,
    pageFiles,
    allFiles: [...new Set([...sharedFiles, ...pageFiles])]
  };
}

function getPolyfillScripts(context, props) {
  // polyfills.js has to be rendered as nomodule without async
  // It also has to be the first script to load
  const {
    assetPrefix,
    buildManifest,
    devOnlyCacheBusterQueryString,
    disableOptimizedLoading
  } = context;
  return buildManifest.polyfillFiles.filter(polyfill => polyfill.endsWith('.js') && !polyfill.endsWith('.module.js')).map(polyfill => /*#__PURE__*/_react.default.createElement("script", {
    key: polyfill,
    defer: !disableOptimizedLoading,
    nonce: props.nonce,
    crossOrigin: props.crossOrigin || undefined,
    noModule: true,
    src: `${assetPrefix}/_next/${polyfill}${devOnlyCacheBusterQueryString}`
  }));
}

function getPreNextScripts(context, props) {
  const {
    scriptLoader,
    disableOptimizedLoading
  } = context;
  return (scriptLoader.beforeInteractive || []).map((file, index) => {
    const {
      strategy
    } = file,
          scriptProps = _objectWithoutProperties(file, _excluded);

    return /*#__PURE__*/_react.default.createElement("script", Object.assign({}, scriptProps, {
      key: scriptProps.src || index,
      defer: !disableOptimizedLoading,
      nonce: props.nonce,
      "data-nscript": "beforeInteractive",
      crossOrigin: props.crossOrigin || undefined
    }));
  });
}

function getDynamicChunks(context, props, files) {
  const {
    dynamicImports,
    assetPrefix,
    isDevelopment,
    devOnlyCacheBusterQueryString,
    disableOptimizedLoading
  } = context;
  return dynamicImports.map(file => {
    if (!file.endsWith('.js') || files.allFiles.includes(file)) return null;
    return /*#__PURE__*/_react.default.createElement("script", {
      async: !isDevelopment && disableOptimizedLoading,
      defer: !disableOptimizedLoading,
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: props.nonce,
      crossOrigin: props.crossOrigin || undefined
    });
  });
}

function getScripts(context, props, files) {
  var ref;
  const {
    assetPrefix,
    buildManifest,
    isDevelopment,
    devOnlyCacheBusterQueryString,
    disableOptimizedLoading
  } = context;
  const normalScripts = files.allFiles.filter(file => file.endsWith('.js'));
  const lowPriorityScripts = (ref = buildManifest.lowPriorityFiles) === null || ref === void 0 ? void 0 : ref.filter(file => file.endsWith('.js'));
  return [...normalScripts, ...lowPriorityScripts].map(file => {
    return /*#__PURE__*/_react.default.createElement("script", {
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: props.nonce,
      async: !isDevelopment && disableOptimizedLoading,
      defer: !disableOptimizedLoading,
      crossOrigin: props.crossOrigin || undefined
    });
  });
}

class Document1 extends _react.Component {
  /**
  * `getInitialProps` hook returns the context object with the addition of `renderPage`.
  * `renderPage` callback executes `React` rendering logic synchronously to support server-rendering wrappers
  */
  static async getInitialProps(ctx) {
    const enhanceApp = App => {
      return props => /*#__PURE__*/_react.default.createElement(App, Object.assign({}, props));
    };

    const {
      html,
      head
    } = await ctx.renderPage({
      enhanceApp
    });
    const styles = [...(0, _server).default()];
    return {
      html,
      head,
      styles
    };
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(Html, null, /*#__PURE__*/_react.default.createElement(Head, null), /*#__PURE__*/_react.default.createElement("body", null, /*#__PURE__*/_react.default.createElement(Main, null), /*#__PURE__*/_react.default.createElement(NextScript, null)));
  }

}

exports.default = Document1;

function Html(props) {
  const {
    inAmpMode,
    docComponentsRendered,
    locale
  } = (0, _react).useContext(_utils.HtmlContext);
  docComponentsRendered.Html = true;
  return /*#__PURE__*/_react.default.createElement("html", Object.assign({}, props, {
    lang: props.lang || locale || undefined,
    amp: inAmpMode ? '' : undefined,
    "data-ampdevmode": inAmpMode && true ? '' : undefined
  }));
}

class Head extends _react.Component {
  getCssLinks(files) {
    const {
      assetPrefix,
      devOnlyCacheBusterQueryString,
      dynamicImports
    } = this.context;
    const cssFiles = files.allFiles.filter(f => f.endsWith('.css'));
    const sharedFiles = new Set(files.sharedFiles); // Unmanaged files are CSS files that will be handled directly by the
    // webpack runtime (`mini-css-extract-plugin`).

    let unmangedFiles = new Set([]);
    let dynamicCssFiles = Array.from(new Set(dynamicImports.filter(file => file.endsWith('.css'))));

    if (dynamicCssFiles.length) {
      const existing = new Set(cssFiles);
      dynamicCssFiles = dynamicCssFiles.filter(f => !(existing.has(f) || sharedFiles.has(f)));
      unmangedFiles = new Set(dynamicCssFiles);
      cssFiles.push(...dynamicCssFiles);
    }

    let cssLinkElements = [];
    cssFiles.forEach(file => {
      const isSharedFile = sharedFiles.has(file);

      if (true) {
        cssLinkElements.push( /*#__PURE__*/_react.default.createElement("link", {
          key: `${file}-preload`,
          nonce: this.props.nonce,
          rel: "preload",
          href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
          as: "style",
          crossOrigin: this.props.crossOrigin || undefined
        }));
      }

      const isUnmanagedFile = unmangedFiles.has(file);
      cssLinkElements.push( /*#__PURE__*/_react.default.createElement("link", {
        key: file,
        nonce: this.props.nonce,
        rel: "stylesheet",
        href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
        crossOrigin: this.props.crossOrigin || undefined,
        "data-n-g": isUnmanagedFile ? undefined : isSharedFile ? '' : undefined,
        "data-n-p": isUnmanagedFile ? undefined : isSharedFile ? undefined : ''
      }));
    });

    if (false) {}

    return cssLinkElements.length === 0 ? null : cssLinkElements;
  }

  getPreloadDynamicChunks() {
    const {
      dynamicImports,
      assetPrefix,
      devOnlyCacheBusterQueryString
    } = this.context;
    return dynamicImports.map(file => {
      if (!file.endsWith('.js')) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement("link", {
        rel: "preload",
        key: file,
        href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
        as: "script",
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined
      });
    }) // Filter out nulled scripts
    .filter(Boolean);
  }

  getPreloadMainLinks(files) {
    const {
      assetPrefix,
      devOnlyCacheBusterQueryString,
      scriptLoader
    } = this.context;
    const preloadFiles = files.allFiles.filter(file => {
      return file.endsWith('.js');
    });
    return [...(scriptLoader.beforeInteractive || []).map(file => /*#__PURE__*/_react.default.createElement("link", {
      key: file.src,
      nonce: this.props.nonce,
      rel: "preload",
      href: file.src,
      as: "script",
      crossOrigin: this.props.crossOrigin || undefined
    })), ...preloadFiles.map(file => /*#__PURE__*/_react.default.createElement("link", {
      key: file,
      nonce: this.props.nonce,
      rel: "preload",
      href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      as: "script",
      crossOrigin: this.props.crossOrigin || undefined
    }))];
  }

  getDynamicChunks(files) {
    return getDynamicChunks(this.context, this.props, files);
  }

  getPreNextScripts() {
    return getPreNextScripts(this.context, this.props);
  }

  getScripts(files) {
    return getScripts(this.context, this.props, files);
  }

  getPolyfillScripts() {
    return getPolyfillScripts(this.context, this.props);
  }

  handleDocumentScriptLoaderItems(children) {
    const {
      scriptLoader
    } = this.context;
    const scriptLoaderItems = [];
    const filteredChildren = [];

    _react.default.Children.forEach(children, child => {
      if (child.type === _script.default) {
        if (child.props.strategy === 'beforeInteractive') {
          scriptLoader.beforeInteractive = (scriptLoader.beforeInteractive || []).concat([_objectSpread({}, child.props)]);
          return;
        } else if (['lazyOnload', 'afterInteractive'].includes(child.props.strategy)) {
          scriptLoaderItems.push(child.props);
          return;
        }
      }

      filteredChildren.push(child);
    });

    this.context.__NEXT_DATA__.scriptLoader = scriptLoaderItems;
    return filteredChildren;
  }

  makeStylesheetInert(node) {
    return _react.default.Children.map(node, c => {
      if (c.type === 'link' && c.props['href'] && _constants.OPTIMIZED_FONT_PROVIDERS.some(({
        url
      }) => c.props['href'].startsWith(url))) {
        const newProps = _objectSpread({}, c.props || {});

        newProps['data-href'] = newProps['href'];
        newProps['href'] = undefined;
        return /*#__PURE__*/_react.default.cloneElement(c, newProps);
      } else if (c.props && c.props['children']) {
        c.props['children'] = this.makeStylesheetInert(c.props['children']);
      }

      return c;
    });
  }

  render() {
    const {
      styles,
      ampPath,
      inAmpMode,
      hybridAmp,
      canonicalBase,
      __NEXT_DATA__,
      dangerousAsPath,
      headTags,
      unstable_runtimeJS,
      unstable_JsPreload,
      disableOptimizedLoading
    } = this.context;
    const disableRuntimeJS = unstable_runtimeJS === false;
    const disableJsPreload = unstable_JsPreload === false || !disableOptimizedLoading;
    this.context.docComponentsRendered.Head = true;
    let {
      head
    } = this.context;
    let cssPreloads = [];
    let otherHeadElements = [];

    if (head) {
      head.forEach(c => {
        if (c && c.type === 'link' && c.props['rel'] === 'preload' && c.props['as'] === 'style') {
          cssPreloads.push(c);
        } else {
          c && otherHeadElements.push(c);
        }
      });
      head = cssPreloads.concat(otherHeadElements);
    }

    let children = _react.default.Children.toArray(this.props.children).filter(Boolean); // show a warning if Head contains <title> (only in development)


    if (true) {
      children = _react.default.Children.map(children, child => {
        var ref;
        const isReactHelmet = child === null || child === void 0 ? void 0 : (ref = child.props) === null || ref === void 0 ? void 0 : ref['data-react-helmet'];

        if (!isReactHelmet) {
          var ref1;

          if ((child === null || child === void 0 ? void 0 : child.type) === 'title') {
            console.warn("Warning: <title> should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-title");
          } else if ((child === null || child === void 0 ? void 0 : child.type) === 'meta' && (child === null || child === void 0 ? void 0 : (ref1 = child.props) === null || ref1 === void 0 ? void 0 : ref1.name) === 'viewport') {
            console.warn("Warning: viewport meta tags should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-viewport-meta");
          }
        }

        return child;
      });
      if (this.props.crossOrigin) console.warn('Warning: `Head` attribute `crossOrigin` is deprecated. https://nextjs.org/docs/messages/doc-crossorigin-deprecated');
    }

    if (false) {}

    children = this.handleDocumentScriptLoaderItems(children);
    let hasAmphtmlRel = false;
    let hasCanonicalRel = false; // show warning and remove conflicting amp head tags

    head = _react.default.Children.map(head || [], child => {
      if (!child) return child;
      const {
        type,
        props
      } = child;

      if (inAmpMode) {
        let badProp = '';

        if (type === 'meta' && props.name === 'viewport') {
          badProp = 'name="viewport"';
        } else if (type === 'link' && props.rel === 'canonical') {
          hasCanonicalRel = true;
        } else if (type === 'script') {
          // only block if
          // 1. it has a src and isn't pointing to ampproject's CDN
          // 2. it is using dangerouslySetInnerHTML without a type or
          // a type of text/javascript
          if (props.src && props.src.indexOf('ampproject') < -1 || props.dangerouslySetInnerHTML && (!props.type || props.type === 'text/javascript')) {
            badProp = '<script';
            Object.keys(props).forEach(prop => {
              badProp += ` ${prop}="${props[prop]}"`;
            });
            badProp += '/>';
          }
        }

        if (badProp) {
          console.warn(`Found conflicting amp tag "${child.type}" with conflicting prop ${badProp} in ${__NEXT_DATA__.page}. https://nextjs.org/docs/messages/conflicting-amp-tag`);
          return null;
        }
      } else {
        // non-amp mode
        if (type === 'link' && props.rel === 'amphtml') {
          hasAmphtmlRel = true;
        }
      }

      return child;
    }); // try to parse styles from fragment for backwards compat

    const curStyles = Array.isArray(styles) ? styles : [];

    if (inAmpMode && styles && // @ts-ignore Property 'props' does not exist on type ReactElement
    styles.props && // @ts-ignore Property 'props' does not exist on type ReactElement
    Array.isArray(styles.props.children)) {
      const hasStyles = el => {
        var ref2, ref3;
        return el === null || el === void 0 ? void 0 : (ref2 = el.props) === null || ref2 === void 0 ? void 0 : (ref3 = ref2.dangerouslySetInnerHTML) === null || ref3 === void 0 ? void 0 : ref3.__html;
      }; // @ts-ignore Property 'props' does not exist on type ReactElement


      styles.props.children.forEach(child => {
        if (Array.isArray(child)) {
          child.forEach(el => hasStyles(el) && curStyles.push(el));
        } else if (hasStyles(child)) {
          curStyles.push(child);
        }
      });
    }

    const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);

    var _nonce, _nonce1;

    return /*#__PURE__*/_react.default.createElement("head", Object.assign({}, this.props), this.context.isDevelopment && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("style", {
      "data-next-hide-fouc": true,
      "data-ampdevmode": inAmpMode ? 'true' : undefined,
      dangerouslySetInnerHTML: {
        __html: `body{display:none}`
      }
    }), /*#__PURE__*/_react.default.createElement("noscript", {
      "data-next-hide-fouc": true,
      "data-ampdevmode": inAmpMode ? 'true' : undefined
    }, /*#__PURE__*/_react.default.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: `body{display:block}`
      }
    }))), children,  false && /*#__PURE__*/0, head, /*#__PURE__*/_react.default.createElement("meta", {
      name: "next-head-count",
      content: _react.default.Children.count(head || []).toString()
    }), inAmpMode && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("meta", {
      name: "viewport",
      content: "width=device-width,minimum-scale=1,initial-scale=1"
    }), !hasCanonicalRel && /*#__PURE__*/_react.default.createElement("link", {
      rel: "canonical",
      href: canonicalBase + (0, _utils1).cleanAmpPath(dangerousAsPath)
    }), /*#__PURE__*/_react.default.createElement("link", {
      rel: "preload",
      as: "script",
      href: "https://cdn.ampproject.org/v0.js"
    }), styles && /*#__PURE__*/_react.default.createElement("style", {
      "amp-custom": "",
      dangerouslySetInnerHTML: {
        __html: curStyles.map(style => style.props.dangerouslySetInnerHTML.__html).join('').replace(/\/\*# sourceMappingURL=.*\*\//g, '').replace(/\/\*@ sourceURL=.*?\*\//g, '')
      }
    }), /*#__PURE__*/_react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`
      }
    }), /*#__PURE__*/_react.default.createElement("noscript", null, /*#__PURE__*/_react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`
      }
    })), /*#__PURE__*/_react.default.createElement("script", {
      async: true,
      src: "https://cdn.ampproject.org/v0.js"
    })), !inAmpMode && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !hasAmphtmlRel && hybridAmp && /*#__PURE__*/_react.default.createElement("link", {
      rel: "amphtml",
      href: canonicalBase + getAmpPath(ampPath, dangerousAsPath)
    }),  true && this.getCssLinks(files),  true && /*#__PURE__*/_react.default.createElement("noscript", {
      "data-n-css": (_nonce = this.props.nonce) !== null && _nonce !== void 0 ? _nonce : ''
    }),  false && /*#__PURE__*/0, !disableRuntimeJS && !disableJsPreload && this.getPreloadDynamicChunks(), !disableRuntimeJS && !disableJsPreload && this.getPreloadMainLinks(files), !disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(), !disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(), !disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files), !disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files),  false && 0,  false && /*#__PURE__*/0, this.context.isDevelopment && // this element is used to mount development styles so the
    // ordering matches production
    // (by default, style-loader injects at the bottom of <head />)

    /*#__PURE__*/
    _react.default.createElement("noscript", {
      id: "__next_css__DO_NOT_USE__"
    }), styles || null), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {}, ...(headTags || [])));
  }

}

exports.Head = Head;
Head.contextType = _utils.HtmlContext;

function Main() {
  const {
    inAmpMode,
    docComponentsRendered
  } = (0, _react).useContext(_utils.HtmlContext);
  docComponentsRendered.Main = true;
  if (inAmpMode) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _constants.BODY_RENDER_TARGET);
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "__next"
  }, _constants.BODY_RENDER_TARGET);
}

class NextScript extends _react.Component {
  getDynamicChunks(files) {
    return getDynamicChunks(this.context, this.props, files);
  }

  getPreNextScripts() {
    return getPreNextScripts(this.context, this.props);
  }

  getScripts(files) {
    return getScripts(this.context, this.props, files);
  }

  getPolyfillScripts() {
    return getPolyfillScripts(this.context, this.props);
  }

  static getInlineScriptSource(context) {
    const {
      __NEXT_DATA__
    } = context;

    try {
      const data = JSON.stringify(__NEXT_DATA__);
      return (0, _htmlescape).htmlEscapeJsonString(data);
    } catch (err) {
      if (err.message.indexOf('circular structure')) {
        throw new Error(`Circular structure in "getInitialProps" result of page "${__NEXT_DATA__.page}". https://nextjs.org/docs/messages/circular-structure`);
      }

      throw err;
    }
  }

  render() {
    const {
      assetPrefix,
      inAmpMode,
      buildManifest,
      unstable_runtimeJS,
      docComponentsRendered,
      devOnlyCacheBusterQueryString,
      disableOptimizedLoading
    } = this.context;
    const disableRuntimeJS = unstable_runtimeJS === false;
    docComponentsRendered.NextScript = true;

    if (inAmpMode) {
      if (false) {}

      const ampDevFiles = [...buildManifest.devFiles, ...buildManifest.polyfillFiles, ...buildManifest.ampDevFiles];
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, disableRuntimeJS ? null : /*#__PURE__*/_react.default.createElement("script", {
        id: "__NEXT_DATA__",
        type: "application/json",
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined,
        dangerouslySetInnerHTML: {
          __html: NextScript.getInlineScriptSource(this.context)
        },
        "data-ampdevmode": true
      }), ampDevFiles.map(file => /*#__PURE__*/_react.default.createElement("script", {
        key: file,
        src: `${assetPrefix}/_next/${file}${devOnlyCacheBusterQueryString}`,
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined,
        "data-ampdevmode": true
      })));
    }

    if (true) {
      if (this.props.crossOrigin) console.warn('Warning: `NextScript` attribute `crossOrigin` is deprecated. https://nextjs.org/docs/messages/doc-crossorigin-deprecated');
    }

    const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !disableRuntimeJS && buildManifest.devFiles ? buildManifest.devFiles.map(file => /*#__PURE__*/_react.default.createElement("script", {
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined
    })) : null, disableRuntimeJS ? null : /*#__PURE__*/_react.default.createElement("script", {
      id: "__NEXT_DATA__",
      type: "application/json",
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined,
      dangerouslySetInnerHTML: {
        __html: NextScript.getInlineScriptSource(this.context)
      }
    }), disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(), disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(), disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files), disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files));
  }

}

exports.NextScript = NextScript;
NextScript.contextType = _utils.HtmlContext;
NextScript.safariNomoduleFix = '!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();';

function getAmpPath(ampPath, asPath) {
  return ampPath || `${asPath}${asPath.includes('?') ? '&' : '?'}amp=1`;
}

/***/ }),

/***/ "./pages/_document.js":
/*!****************************!*\
  !*** ./pages/_document.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Document)
/* harmony export */ });
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @chakra-ui/react */ "@chakra-ui/react");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ "./node_modules/next/document.js");
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/theme */ "./lib/theme.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/aozerov/projects/aozerov-dev/pages/_document.js";




class Document extends (next_document__WEBPACK_IMPORTED_MODULE_1___default()) {
  render() {
    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {
      lang: "en",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 9,
        columnNumber: 9
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("body", {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_0__.ColorModeScript, {
          initialColorMode: _lib_theme__WEBPACK_IMPORTED_MODULE_2__.default.config.intialColorMode
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 11,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 12,
          columnNumber: 11
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 13,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 10,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 7
    }, this);
  }

}

/***/ }),

/***/ "./node_modules/next/document.js":
/*!***************************************!*\
  !*** ./node_modules/next/document.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./dist/pages/_document */ "./node_modules/next/dist/pages/_document.js")


/***/ }),

/***/ "@chakra-ui/react":
/*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@chakra-ui/react");

/***/ }),

/***/ "@chakra-ui/theme-tools":
/*!*****************************************!*\
  !*** external "@chakra-ui/theme-tools" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@chakra-ui/theme-tools");

/***/ }),

/***/ "../server/get-page-files":
/*!*****************************************************!*\
  !*** external "next/dist/server/get-page-files.js" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/get-page-files.js");

/***/ }),

/***/ "../server/htmlescape":
/*!*************************************************!*\
  !*** external "next/dist/server/htmlescape.js" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/htmlescape.js");

/***/ }),

/***/ "../server/utils":
/*!********************************************!*\
  !*** external "next/dist/server/utils.js" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/utils.js");

/***/ }),

/***/ "../shared/lib/constants":
/*!****************************************************!*\
  !*** external "next/dist/shared/lib/constants.js" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ "../shared/lib/head-manager-context":
/*!***************************************************************!*\
  !*** external "next/dist/shared/lib/head-manager-context.js" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ "../shared/lib/utils":
/*!************************************************!*\
  !*** external "next/dist/shared/lib/utils.js" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "styled-jsx/server":
/*!************************************!*\
  !*** external "styled-jsx/server" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("styled-jsx/server");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_document.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUE7QUFBQTtBQUFBLGdCQUhGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUZGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURGO0FBVUQ7O0FBWmdEOzs7Ozs7Ozs7O0FDSm5ELGlIQUFrRDs7Ozs7Ozs7Ozs7O0FDQWxEOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYW96ZXJvdi1kZXYvLi9saWIvdGhlbWUuanMiLCJ3ZWJwYWNrOi8vYW96ZXJvdi1kZXYvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9oZWFkLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vYW96ZXJvdi1kZXYvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9yZXF1ZXN0LWlkbGUtY2FsbGJhY2suanMiLCJ3ZWJwYWNrOi8vYW96ZXJvdi1kZXYvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vYW96ZXJvdi1kZXYvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3BhZ2VzL19kb2N1bWVudC5qcyIsIndlYnBhY2s6Ly9hb3plcm92LWRldi8uL3BhZ2VzL19kb2N1bWVudC5qcyIsIndlYnBhY2s6Ly9hb3plcm92LWRldi8uL25vZGVfbW9kdWxlcy9uZXh0L2RvY3VtZW50LmpzIiwid2VicGFjazovL2FvemVyb3YtZGV2L2V4dGVybmFsIFwiQGNoYWtyYS11aS9yZWFjdFwiIiwid2VicGFjazovL2FvemVyb3YtZGV2L2V4dGVybmFsIFwiQGNoYWtyYS11aS90aGVtZS10b29sc1wiIiwid2VicGFjazovL2FvemVyb3YtZGV2L2V4dGVybmFsIFwibmV4dC9kaXN0L3NlcnZlci9nZXQtcGFnZS1maWxlcy5qc1wiIiwid2VicGFjazovL2FvemVyb3YtZGV2L2V4dGVybmFsIFwibmV4dC9kaXN0L3NlcnZlci9odG1sZXNjYXBlLmpzXCIiLCJ3ZWJwYWNrOi8vYW96ZXJvdi1kZXYvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2VydmVyL3V0aWxzLmpzXCIiLCJ3ZWJwYWNrOi8vYW96ZXJvdi1kZXYvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9jb25zdGFudHMuanNcIiIsIndlYnBhY2s6Ly9hb3plcm92LWRldi9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL2hlYWQtbWFuYWdlci1jb250ZXh0LmpzXCIiLCJ3ZWJwYWNrOi8vYW96ZXJvdi1kZXYvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi91dGlscy5qc1wiIiwid2VicGFjazovL2FvemVyb3YtZGV2L2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly9hb3plcm92LWRldi9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIiwid2VicGFjazovL2FvemVyb3YtZGV2L2V4dGVybmFsIFwic3R5bGVkLWpzeC9zZXJ2ZXJcIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHRlbmRUaGVtZSB9IGZyb20gJ0BjaGFrcmEtdWkvcmVhY3QnXG5pbXBvcnQgeyBtb2RlIH0gZnJvbSAnQGNoYWtyYS11aS90aGVtZS10b29scydcblxuY29uc3Qgc3R5bGVzID0ge1xuICBnbG9iYWw6IHByb3BzID0+ICh7XG4gICAgYm9keToge1xuICAgICAgYmc6IG1vZGUoJyNmMGU3ZGInLCAnIzIwMjAyMycpKHByb3BzKVxuICAgIH1cbiAgfSlcbn1cblxuY29uc3QgY29tcG9uZW50cyA9IHtcbiAgSGVhZGluZzoge1xuICAgIHZhcmlhbnRzOiB7XG4gICAgICAnc2VjdGlvbi10aXRsZSc6IHtcbiAgICAgICAgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLFxuICAgICAgICBmb250U2l6ZTogMjAsXG4gICAgICAgIHRleHRVbmRlcmxpbmVPZmZzZXQ6IDYsXG4gICAgICAgIHRleHREZWNvcmF0aW9uQ29sb3I6ICcjNTI1MjUyJyxcbiAgICAgICAgdGV4dERlY29yYXRpb25UaGlja25lc3M6IDQsXG4gICAgICAgIG1hcmdpblRvcDogMyxcbiAgICAgICAgbWFyZ2luQm90dG9tOiA0XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBMaW5rOiB7XG4gICAgYmFzZVN0eWxlOiBwcm9wcyA9PiAoe1xuICAgICAgY29sb3I6IG1vZGUoJyMzZDdhZWQnLCAnI2ZmNjNjMycpKHByb3BzKSxcbiAgICAgIHRleHRVbmRlcmxpbmVPZmZzZXQ6IDNcbiAgICB9KVxuICB9XG59XG5cbmNvbnN0IGZvbnRzID0ge1xuICBoZWFkaW5nOiBcIidNIFBMVVMgUm91bmRlZCAxYydcIlxufVxuXG5jb25zdCBjb2xvcnMgPSB7XG4gIGdsYXNzVGVhbDogJyM4OGNjY2EnXG59XG5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgaW5pdGlhbENvbG9yTW9kZTogJ2RhcmsnLFxuICB1c2VTeXN0ZW1Db2xvck1vZGU6IHRydWVcbn1cblxuY29uc3QgdGhlbWUgPSBleHRlbmRUaGVtZSh7IGNvbmZpZywgc3R5bGVzLCBjb21wb25lbnRzLCBmb250cywgY29sb3JzIH0pXG5leHBvcnQgZGVmYXVsdCB0aGVtZVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpbml0SGVhZE1hbmFnZXI7XG5leHBvcnRzLkRPTUF0dHJpYnV0ZU5hbWVzID0gdm9pZCAwO1xuY29uc3QgRE9NQXR0cmlidXRlTmFtZXMgPSB7XG4gICAgYWNjZXB0Q2hhcnNldDogJ2FjY2VwdC1jaGFyc2V0JyxcbiAgICBjbGFzc05hbWU6ICdjbGFzcycsXG4gICAgaHRtbEZvcjogJ2ZvcicsXG4gICAgaHR0cEVxdWl2OiAnaHR0cC1lcXVpdicsXG4gICAgbm9Nb2R1bGU6ICdub01vZHVsZSdcbn07XG5leHBvcnRzLkRPTUF0dHJpYnV0ZU5hbWVzID0gRE9NQXR0cmlidXRlTmFtZXM7XG5mdW5jdGlvbiByZWFjdEVsZW1lbnRUb0RPTSh7IHR5cGUgLCBwcm9wcyAgfSkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICBmb3IoY29uc3QgcCBpbiBwcm9wcyl7XG4gICAgICAgIGlmICghcHJvcHMuaGFzT3duUHJvcGVydHkocCkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAocCA9PT0gJ2NoaWxkcmVuJyB8fCBwID09PSAnZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwnKSBjb250aW51ZTtcbiAgICAgICAgLy8gd2UgZG9uJ3QgcmVuZGVyIHVuZGVmaW5lZCBwcm9wcyB0byB0aGUgRE9NXG4gICAgICAgIGlmIChwcm9wc1twXSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgYXR0ciA9IERPTUF0dHJpYnV0ZU5hbWVzW3BdIHx8IHAudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzY3JpcHQnICYmIChhdHRyID09PSAnYXN5bmMnIHx8IGF0dHIgPT09ICdkZWZlcicgfHwgYXR0ciA9PT0gJ25vTW9kdWxlJykpIHtcbiAgICAgICAgICAgIGVsW2F0dHJdID0gISFwcm9wc1twXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyLCBwcm9wc1twXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgeyBjaGlsZHJlbiAsIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MICB9ID0gcHJvcHM7XG4gICAgaWYgKGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MKSB7XG4gICAgICAgIGVsLmlubmVySFRNTCA9IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLl9faHRtbCB8fCAnJztcbiAgICB9IGVsc2UgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgIGVsLnRleHRDb250ZW50ID0gdHlwZW9mIGNoaWxkcmVuID09PSAnc3RyaW5nJyA/IGNoaWxkcmVuIDogQXJyYXkuaXNBcnJheShjaGlsZHJlbikgPyBjaGlsZHJlbi5qb2luKCcnKSA6ICcnO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG59XG5mdW5jdGlvbiB1cGRhdGVFbGVtZW50cyh0eXBlLCBjb21wb25lbnRzKSB7XG4gICAgY29uc3QgaGVhZEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICBjb25zdCBoZWFkQ291bnRFbCA9IGhlYWRFbC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9bmV4dC1oZWFkLWNvdW50XScpO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmICghaGVhZENvdW50RWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1dhcm5pbmc6IG5leHQtaGVhZC1jb3VudCBpcyBtaXNzaW5nLiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9uZXh0LWhlYWQtY291bnQtbWlzc2luZycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGhlYWRDb3VudCA9IE51bWJlcihoZWFkQ291bnRFbC5jb250ZW50KTtcbiAgICBjb25zdCBvbGRUYWdzID0gW107XG4gICAgZm9yKGxldCBpID0gMCwgaiA9IGhlYWRDb3VudEVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7IGkgPCBoZWFkQ291bnQ7IGkrKywgaiA9IGoucHJldmlvdXNFbGVtZW50U2libGluZyl7XG4gICAgICAgIGlmIChqLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgb2xkVGFncy5wdXNoKGopO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IG5ld1RhZ3MgPSBjb21wb25lbnRzLm1hcChyZWFjdEVsZW1lbnRUb0RPTSkuZmlsdGVyKChuZXdUYWcpPT57XG4gICAgICAgIGZvcihsZXQgayA9IDAsIGxlbiA9IG9sZFRhZ3MubGVuZ3RoOyBrIDwgbGVuOyBrKyspe1xuICAgICAgICAgICAgY29uc3Qgb2xkVGFnID0gb2xkVGFnc1trXTtcbiAgICAgICAgICAgIGlmIChvbGRUYWcuaXNFcXVhbE5vZGUobmV3VGFnKSkge1xuICAgICAgICAgICAgICAgIG9sZFRhZ3Muc3BsaWNlKGssIDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICBvbGRUYWdzLmZvckVhY2goKHQpPT50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodClcbiAgICApO1xuICAgIG5ld1RhZ3MuZm9yRWFjaCgodCk9PmhlYWRFbC5pbnNlcnRCZWZvcmUodCwgaGVhZENvdW50RWwpXG4gICAgKTtcbiAgICBoZWFkQ291bnRFbC5jb250ZW50ID0gKGhlYWRDb3VudCAtIG9sZFRhZ3MubGVuZ3RoICsgbmV3VGFncy5sZW5ndGgpLnRvU3RyaW5nKCk7XG59XG5mdW5jdGlvbiBpbml0SGVhZE1hbmFnZXIoKSB7XG4gICAgbGV0IHVwZGF0ZVByb21pc2UgPSBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICAgIG1vdW50ZWRJbnN0YW5jZXM6IG5ldyBTZXQoKSxcbiAgICAgICAgdXBkYXRlSGVhZDogKGhlYWQpPT57XG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gdXBkYXRlUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdXBkYXRlUHJvbWlzZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVByb21pc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSB7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBoZWFkLmZvckVhY2goKGgpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmICgvLyBJZiB0aGUgZm9udCB0YWcgaXMgbG9hZGVkIG9ubHkgb24gY2xpZW50IG5hdmlnYXRpb25cbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgd29uJ3QgYmUgaW5saW5lZC4gSW4gdGhpcyBjYXNlIHJldmVydCB0byB0aGUgb3JpZ2luYWwgYmVoYXZpb3JcbiAgICAgICAgICAgICAgICAgICAgaC50eXBlID09PSAnbGluaycgJiYgaC5wcm9wc1snZGF0YS1vcHRpbWl6ZWQtZm9udHMnXSAmJiAhZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc3R5bGVbZGF0YS1ocmVmPVwiJHtoLnByb3BzWydkYXRhLWhyZWYnXX1cIl1gKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaC5wcm9wcy5ocmVmID0gaC5wcm9wc1snZGF0YS1ocmVmJ107XG4gICAgICAgICAgICAgICAgICAgICAgICBoLnByb3BzWydkYXRhLWhyZWYnXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRzID0gdGFnc1toLnR5cGVdIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLnB1c2goaCk7XG4gICAgICAgICAgICAgICAgICAgIHRhZ3NbaC50eXBlXSA9IGNvbXBvbmVudHM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGVDb21wb25lbnQgPSB0YWdzLnRpdGxlID8gdGFncy50aXRsZVswXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IHRpdGxlID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgY2hpbGRyZW4gIH0gPSB0aXRsZUNvbXBvbmVudC5wcm9wcztcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgPSB0eXBlb2YgY2hpbGRyZW4gPT09ICdzdHJpbmcnID8gY2hpbGRyZW4gOiBBcnJheS5pc0FycmF5KGNoaWxkcmVuKSA/IGNoaWxkcmVuLmpvaW4oJycpIDogJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aXRsZSAhPT0gZG9jdW1lbnQudGl0bGUpIGRvY3VtZW50LnRpdGxlID0gdGl0bGU7XG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnbWV0YScsXG4gICAgICAgICAgICAgICAgICAgICdiYXNlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmsnLFxuICAgICAgICAgICAgICAgICAgICAnc3R5bGUnLFxuICAgICAgICAgICAgICAgICAgICAnc2NyaXB0J1xuICAgICAgICAgICAgICAgIF0uZm9yRWFjaCgodHlwZSk9PntcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRWxlbWVudHModHlwZSwgdGFnc1t0eXBlXSB8fCBbXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlYWQtbWFuYWdlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucmVxdWVzdElkbGVDYWxsYmFjayA9IGV4cG9ydHMuY2FuY2VsSWRsZUNhbGxiYWNrID0gdm9pZCAwO1xuY29uc3QgcmVxdWVzdElkbGVDYWxsYmFjayA9IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLnJlcXVlc3RJZGxlQ2FsbGJhY2sgJiYgc2VsZi5yZXF1ZXN0SWRsZUNhbGxiYWNrLmJpbmQod2luZG93KSB8fCBmdW5jdGlvbihjYikge1xuICAgIGxldCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNiKHtcbiAgICAgICAgICAgIGRpZFRpbWVvdXQ6IGZhbHNlLFxuICAgICAgICAgICAgdGltZVJlbWFpbmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIDUwIC0gKERhdGUubm93KCkgLSBzdGFydCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCAxKTtcbn07XG5leHBvcnRzLnJlcXVlc3RJZGxlQ2FsbGJhY2sgPSByZXF1ZXN0SWRsZUNhbGxiYWNrO1xuY29uc3QgY2FuY2VsSWRsZUNhbGxiYWNrID0gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuY2FuY2VsSWRsZUNhbGxiYWNrICYmIHNlbGYuY2FuY2VsSWRsZUNhbGxiYWNrLmJpbmQod2luZG93KSB8fCBmdW5jdGlvbihpZCkge1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQoaWQpO1xufTtcbmV4cG9ydHMuY2FuY2VsSWRsZUNhbGxiYWNrID0gY2FuY2VsSWRsZUNhbGxiYWNrO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXF1ZXN0LWlkbGUtY2FsbGJhY2suanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmluaXRTY3JpcHRMb2FkZXIgPSBpbml0U2NyaXB0TG9hZGVyO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9yZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbnZhciBfaGVhZE1hbmFnZXJDb250ZXh0ID0gcmVxdWlyZShcIi4uL3NoYXJlZC9saWIvaGVhZC1tYW5hZ2VyLWNvbnRleHRcIik7XG52YXIgX2hlYWRNYW5hZ2VyID0gcmVxdWlyZShcIi4vaGVhZC1tYW5hZ2VyXCIpO1xudmFyIF9yZXF1ZXN0SWRsZUNhbGxiYWNrID0gcmVxdWlyZShcIi4vcmVxdWVzdC1pZGxlLWNhbGxiYWNrXCIpO1xuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICAgIGZvcih2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspe1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uKHN5bSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gICAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge1xuICAgIH07XG4gICAgdmFyIHRhcmdldCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpO1xuICAgIHZhciBrZXksIGk7XG4gICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgICAgdmFyIHNvdXJjZVN5bWJvbEtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSk7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAga2V5ID0gc291cmNlU3ltYm9sS2V5c1tpXTtcbiAgICAgICAgICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzb3VyY2UsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICAgIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHtcbiAgICB9O1xuICAgIHZhciB0YXJnZXQgPSB7XG4gICAgfTtcbiAgICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gICAgdmFyIGtleSwgaTtcbiAgICBmb3IoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmNvbnN0IFNjcmlwdENhY2hlID0gbmV3IE1hcCgpO1xuY29uc3QgTG9hZENhY2hlID0gbmV3IFNldCgpO1xuY29uc3QgaWdub3JlUHJvcHMgPSBbXG4gICAgJ29uTG9hZCcsXG4gICAgJ2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MJyxcbiAgICAnY2hpbGRyZW4nLFxuICAgICdvbkVycm9yJyxcbiAgICAnc3RyYXRlZ3knLCBcbl07XG5jb25zdCBsb2FkU2NyaXB0ID0gKHByb3BzKT0+e1xuICAgIGNvbnN0IHsgc3JjICwgaWQgLCBvbkxvYWQgPSgpPT57XG4gICAgfSAsIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MICwgY2hpbGRyZW4gPScnICwgc3RyYXRlZ3kgPSdhZnRlckludGVyYWN0aXZlJyAsIG9uRXJyb3IgLCAgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNhY2hlS2V5ID0gaWQgfHwgc3JjO1xuICAgIC8vIFNjcmlwdCBoYXMgYWxyZWFkeSBsb2FkZWRcbiAgICBpZiAoY2FjaGVLZXkgJiYgTG9hZENhY2hlLmhhcyhjYWNoZUtleSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBDb250ZW50cyBvZiB0aGlzIHNjcmlwdCBhcmUgYWxyZWFkeSBsb2FkaW5nL2xvYWRlZFxuICAgIGlmIChTY3JpcHRDYWNoZS5oYXMoc3JjKSkge1xuICAgICAgICBMb2FkQ2FjaGUuYWRkKGNhY2hlS2V5KTtcbiAgICAgICAgLy8gRXhlY3V0ZSBvbkxvYWQgc2luY2UgdGhlIHNjcmlwdCBsb2FkaW5nIGhhcyBiZWd1blxuICAgICAgICBTY3JpcHRDYWNoZS5nZXQoc3JjKS50aGVuKG9uTG9hZCwgb25FcnJvcik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBjb25zdCBsb2FkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICBpZiAob25Mb2FkKSB7XG4gICAgICAgICAgICAgICAgb25Mb2FkLmNhbGwodGhpcywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfSk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAob25FcnJvcikge1xuICAgICAgICAgICAgb25FcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChzcmMpIHtcbiAgICAgICAgU2NyaXB0Q2FjaGUuc2V0KHNyYywgbG9hZFByb21pc2UpO1xuICAgIH1cbiAgICBMb2FkQ2FjaGUuYWRkKGNhY2hlS2V5KTtcbiAgICBpZiAoZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpIHtcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwuX19odG1sIHx8ICcnO1xuICAgIH0gZWxzZSBpZiAoY2hpbGRyZW4pIHtcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSB0eXBlb2YgY2hpbGRyZW4gPT09ICdzdHJpbmcnID8gY2hpbGRyZW4gOiBBcnJheS5pc0FycmF5KGNoaWxkcmVuKSA/IGNoaWxkcmVuLmpvaW4oJycpIDogJyc7XG4gICAgfSBlbHNlIGlmIChzcmMpIHtcbiAgICAgICAgZWwuc3JjID0gc3JjO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtrLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocHJvcHMpKXtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgaWdub3JlUHJvcHMuaW5jbHVkZXMoaykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGF0dHIgPSBfaGVhZE1hbmFnZXIuRE9NQXR0cmlidXRlTmFtZXNba10gfHwgay50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xuICAgIH1cbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbnNjcmlwdCcsIHN0cmF0ZWd5KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKTtcbn07XG5mdW5jdGlvbiBoYW5kbGVDbGllbnRTY3JpcHRMb2FkKHByb3BzKSB7XG4gICAgY29uc3QgeyBzdHJhdGVneSA9J2FmdGVySW50ZXJhY3RpdmUnICB9ID0gcHJvcHM7XG4gICAgaWYgKHN0cmF0ZWd5ID09PSAnYWZ0ZXJJbnRlcmFjdGl2ZScpIHtcbiAgICAgICAgbG9hZFNjcmlwdChwcm9wcyk7XG4gICAgfSBlbHNlIGlmIChzdHJhdGVneSA9PT0gJ2xhenlPbmxvYWQnKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCk9PntcbiAgICAgICAgICAgICgwLCBfcmVxdWVzdElkbGVDYWxsYmFjaykucmVxdWVzdElkbGVDYWxsYmFjaygoKT0+bG9hZFNjcmlwdChwcm9wcylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGxvYWRMYXp5U2NyaXB0KHByb3BzKSB7XG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgKDAsIF9yZXF1ZXN0SWRsZUNhbGxiYWNrKS5yZXF1ZXN0SWRsZUNhbGxiYWNrKCgpPT5sb2FkU2NyaXB0KHByb3BzKVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCk9PntcbiAgICAgICAgICAgICgwLCBfcmVxdWVzdElkbGVDYWxsYmFjaykucmVxdWVzdElkbGVDYWxsYmFjaygoKT0+bG9hZFNjcmlwdChwcm9wcylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluaXRTY3JpcHRMb2FkZXIoc2NyaXB0TG9hZGVySXRlbXMpIHtcbiAgICBzY3JpcHRMb2FkZXJJdGVtcy5mb3JFYWNoKGhhbmRsZUNsaWVudFNjcmlwdExvYWQpO1xufVxuZnVuY3Rpb24gU2NyaXB0KHByb3BzKSB7XG4gICAgY29uc3QgeyBzcmMgPScnICwgb25Mb2FkID0oKT0+e1xuICAgIH0gLCBkYW5nZXJvdXNseVNldElubmVySFRNTCAsIHN0cmF0ZWd5ID0nYWZ0ZXJJbnRlcmFjdGl2ZScgLCBvbkVycm9yICB9ID0gcHJvcHMsIHJlc3RQcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhwcm9wcywgW1wic3JjXCIsIFwib25Mb2FkXCIsIFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIiwgXCJzdHJhdGVneVwiLCBcIm9uRXJyb3JcIl0pO1xuICAgIC8vIENvbnRleHQgaXMgYXZhaWxhYmxlIG9ubHkgZHVyaW5nIFNTUlxuICAgIGNvbnN0IHsgdXBkYXRlU2NyaXB0cyAsIHNjcmlwdHMgLCBnZXRJc1NzciAgfSA9ICgwLCBfcmVhY3QpLnVzZUNvbnRleHQoX2hlYWRNYW5hZ2VyQ29udGV4dC5IZWFkTWFuYWdlckNvbnRleHQpO1xuICAgICgwLCBfcmVhY3QpLnVzZUVmZmVjdCgoKT0+e1xuICAgICAgICBpZiAoc3RyYXRlZ3kgPT09ICdhZnRlckludGVyYWN0aXZlJykge1xuICAgICAgICAgICAgbG9hZFNjcmlwdChwcm9wcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RyYXRlZ3kgPT09ICdsYXp5T25sb2FkJykge1xuICAgICAgICAgICAgbG9hZExhenlTY3JpcHQocHJvcHMpO1xuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICBwcm9wcyxcbiAgICAgICAgc3RyYXRlZ3lcbiAgICBdKTtcbiAgICBpZiAoc3RyYXRlZ3kgPT09ICdiZWZvcmVJbnRlcmFjdGl2ZScpIHtcbiAgICAgICAgaWYgKHVwZGF0ZVNjcmlwdHMpIHtcbiAgICAgICAgICAgIHNjcmlwdHMuYmVmb3JlSW50ZXJhY3RpdmUgPSAoc2NyaXB0cy5iZWZvcmVJbnRlcmFjdGl2ZSB8fCBbXSkuY29uY2F0KFtcbiAgICAgICAgICAgICAgICBfb2JqZWN0U3ByZWFkKHtcbiAgICAgICAgICAgICAgICAgICAgc3JjLFxuICAgICAgICAgICAgICAgICAgICBvbkxvYWQsXG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3JcbiAgICAgICAgICAgICAgICB9LCByZXN0UHJvcHMpLCBcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgdXBkYXRlU2NyaXB0cyhzY3JpcHRzKTtcbiAgICAgICAgfSBlbHNlIGlmIChnZXRJc1NzciAmJiBnZXRJc1NzcigpKSB7XG4gICAgICAgICAgICAvLyBTY3JpcHQgaGFzIGFscmVhZHkgbG9hZGVkIGR1cmluZyBTU1JcbiAgICAgICAgICAgIExvYWRDYWNoZS5hZGQocmVzdFByb3BzLmlkIHx8IHNyYyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2V0SXNTc3IgJiYgIWdldElzU3NyKCkpIHtcbiAgICAgICAgICAgIGxvYWRTY3JpcHQocHJvcHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxudmFyIF9kZWZhdWx0ID0gU2NyaXB0O1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjcmlwdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkRvY3VtZW50Q29udGV4dFwiLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3V0aWxzLkRvY3VtZW50Q29udGV4dDtcbiAgICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkRvY3VtZW50SW5pdGlhbFByb3BzXCIsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfdXRpbHMuRG9jdW1lbnRJbml0aWFsUHJvcHM7XG4gICAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEb2N1bWVudFByb3BzXCIsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfdXRpbHMuRG9jdW1lbnRQcm9wcztcbiAgICB9XG59KTtcbmV4cG9ydHMuSHRtbCA9IEh0bWw7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG52YXIgX3NlcnZlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInN0eWxlZC1qc3gvc2VydmVyXCIpKTtcbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZShcIi4uL3NoYXJlZC9saWIvY29uc3RhbnRzXCIpO1xudmFyIF91dGlscyA9IHJlcXVpcmUoXCIuLi9zaGFyZWQvbGliL3V0aWxzXCIpO1xudmFyIF9nZXRQYWdlRmlsZXMgPSByZXF1aXJlKFwiLi4vc2VydmVyL2dldC1wYWdlLWZpbGVzXCIpO1xudmFyIF91dGlsczEgPSByZXF1aXJlKFwiLi4vc2VydmVyL3V0aWxzXCIpO1xudmFyIF9odG1sZXNjYXBlID0gcmVxdWlyZShcIi4uL3NlcnZlci9odG1sZXNjYXBlXCIpO1xudmFyIF9zY3JpcHQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9jbGllbnQvc2NyaXB0XCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgfTtcbn1cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikge1xuICAgIGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbmV3T2JqID0ge1xuICAgICAgICB9O1xuICAgICAgICBpZiAob2JqICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIG9iail7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIDoge1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG5ld09iai5kZWZhdWx0ID0gb2JqO1xuICAgICAgICByZXR1cm4gbmV3T2JqO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldERvY3VtZW50RmlsZXMoYnVpbGRNYW5pZmVzdCwgcGF0aG5hbWUsIGluQW1wTW9kZSkge1xuICAgIGNvbnN0IHNoYXJlZEZpbGVzID0gKDAsIF9nZXRQYWdlRmlsZXMpLmdldFBhZ2VGaWxlcyhidWlsZE1hbmlmZXN0LCAnL19hcHAnKTtcbiAgICBjb25zdCBwYWdlRmlsZXMgPSBpbkFtcE1vZGUgPyBbXSA6ICgwLCBfZ2V0UGFnZUZpbGVzKS5nZXRQYWdlRmlsZXMoYnVpbGRNYW5pZmVzdCwgcGF0aG5hbWUpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNoYXJlZEZpbGVzLFxuICAgICAgICBwYWdlRmlsZXMsXG4gICAgICAgIGFsbEZpbGVzOiBbXG4gICAgICAgICAgICAuLi5uZXcgU2V0KFtcbiAgICAgICAgICAgICAgICAuLi5zaGFyZWRGaWxlcyxcbiAgICAgICAgICAgICAgICAuLi5wYWdlRmlsZXNcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF1cbiAgICB9O1xufVxuZnVuY3Rpb24gZ2V0UG9seWZpbGxTY3JpcHRzKGNvbnRleHQsIHByb3BzKSB7XG4gICAgLy8gcG9seWZpbGxzLmpzIGhhcyB0byBiZSByZW5kZXJlZCBhcyBub21vZHVsZSB3aXRob3V0IGFzeW5jXG4gICAgLy8gSXQgYWxzbyBoYXMgdG8gYmUgdGhlIGZpcnN0IHNjcmlwdCB0byBsb2FkXG4gICAgY29uc3QgeyBhc3NldFByZWZpeCAsIGJ1aWxkTWFuaWZlc3QgLCBkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyAsIGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nICwgIH0gPSBjb250ZXh0O1xuICAgIHJldHVybiBidWlsZE1hbmlmZXN0LnBvbHlmaWxsRmlsZXMuZmlsdGVyKChwb2x5ZmlsbCk9PnBvbHlmaWxsLmVuZHNXaXRoKCcuanMnKSAmJiAhcG9seWZpbGwuZW5kc1dpdGgoJy5tb2R1bGUuanMnKVxuICAgICkubWFwKChwb2x5ZmlsbCk9Pi8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCB7XG4gICAgICAgICAgICBrZXk6IHBvbHlmaWxsLFxuICAgICAgICAgICAgZGVmZXI6ICFkaXNhYmxlT3B0aW1pemVkTG9hZGluZyxcbiAgICAgICAgICAgIG5vbmNlOiBwcm9wcy5ub25jZSxcbiAgICAgICAgICAgIGNyb3NzT3JpZ2luOiBwcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOLFxuICAgICAgICAgICAgbm9Nb2R1bGU6IHRydWUsXG4gICAgICAgICAgICBzcmM6IGAke2Fzc2V0UHJlZml4fS9fbmV4dC8ke3BvbHlmaWxsfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YFxuICAgICAgICB9KVxuICAgICk7XG59XG5mdW5jdGlvbiBnZXRQcmVOZXh0U2NyaXB0cyhjb250ZXh0LCBwcm9wcykge1xuICAgIGNvbnN0IHsgc2NyaXB0TG9hZGVyICwgZGlzYWJsZU9wdGltaXplZExvYWRpbmcgIH0gPSBjb250ZXh0O1xuICAgIHJldHVybiAoc2NyaXB0TG9hZGVyLmJlZm9yZUludGVyYWN0aXZlIHx8IFtdKS5tYXAoKGZpbGUsIGluZGV4KT0+e1xuICAgICAgICBjb25zdCB7IHN0cmF0ZWd5ICwgLi4uc2NyaXB0UHJvcHMgfSA9IGZpbGU7XG4gICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIH0sIHNjcmlwdFByb3BzLCB7XG4gICAgICAgICAgICBrZXk6IHNjcmlwdFByb3BzLnNyYyB8fCBpbmRleCxcbiAgICAgICAgICAgIGRlZmVyOiAhZGlzYWJsZU9wdGltaXplZExvYWRpbmcsXG4gICAgICAgICAgICBub25jZTogcHJvcHMubm9uY2UsXG4gICAgICAgICAgICBcImRhdGEtbnNjcmlwdFwiOiBcImJlZm9yZUludGVyYWN0aXZlXCIsXG4gICAgICAgICAgICBjcm9zc09yaWdpbjogcHJvcHMuY3Jvc3NPcmlnaW4gfHwgcHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTlxuICAgICAgICB9KSkpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZ2V0RHluYW1pY0NodW5rcyhjb250ZXh0LCBwcm9wcywgZmlsZXMpIHtcbiAgICBjb25zdCB7IGR5bmFtaWNJbXBvcnRzICwgYXNzZXRQcmVmaXggLCBpc0RldmVsb3BtZW50ICwgZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcgLCBkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAsICB9ID0gY29udGV4dDtcbiAgICByZXR1cm4gZHluYW1pY0ltcG9ydHMubWFwKChmaWxlKT0+e1xuICAgICAgICBpZiAoIWZpbGUuZW5kc1dpdGgoJy5qcycpIHx8IGZpbGVzLmFsbEZpbGVzLmluY2x1ZGVzKGZpbGUpKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCB7XG4gICAgICAgICAgICBhc3luYzogIWlzRGV2ZWxvcG1lbnQgJiYgZGlzYWJsZU9wdGltaXplZExvYWRpbmcsXG4gICAgICAgICAgICBkZWZlcjogIWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLFxuICAgICAgICAgICAga2V5OiBmaWxlLFxuICAgICAgICAgICAgc3JjOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLFxuICAgICAgICAgICAgbm9uY2U6IHByb3BzLm5vbmNlLFxuICAgICAgICAgICAgY3Jvc3NPcmlnaW46IHByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZ2V0U2NyaXB0cyhjb250ZXh0LCBwcm9wcywgZmlsZXMpIHtcbiAgICB2YXIgcmVmO1xuICAgIGNvbnN0IHsgYXNzZXRQcmVmaXggLCBidWlsZE1hbmlmZXN0ICwgaXNEZXZlbG9wbWVudCAsIGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nICwgZGlzYWJsZU9wdGltaXplZExvYWRpbmcgLCAgfSA9IGNvbnRleHQ7XG4gICAgY29uc3Qgbm9ybWFsU2NyaXB0cyA9IGZpbGVzLmFsbEZpbGVzLmZpbHRlcigoZmlsZSk9PmZpbGUuZW5kc1dpdGgoJy5qcycpXG4gICAgKTtcbiAgICBjb25zdCBsb3dQcmlvcml0eVNjcmlwdHMgPSAocmVmID0gYnVpbGRNYW5pZmVzdC5sb3dQcmlvcml0eUZpbGVzKSA9PT0gbnVsbCB8fCByZWYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlZi5maWx0ZXIoKGZpbGUpPT5maWxlLmVuZHNXaXRoKCcuanMnKVxuICAgICk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgLi4ubm9ybWFsU2NyaXB0cyxcbiAgICAgICAgLi4ubG93UHJpb3JpdHlTY3JpcHRzXG4gICAgXS5tYXAoKGZpbGUpPT57XG4gICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwge1xuICAgICAgICAgICAga2V5OiBmaWxlLFxuICAgICAgICAgICAgc3JjOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLFxuICAgICAgICAgICAgbm9uY2U6IHByb3BzLm5vbmNlLFxuICAgICAgICAgICAgYXN5bmM6ICFpc0RldmVsb3BtZW50ICYmIGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLFxuICAgICAgICAgICAgZGVmZXI6ICFkaXNhYmxlT3B0aW1pemVkTG9hZGluZyxcbiAgICAgICAgICAgIGNyb3NzT3JpZ2luOiBwcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOXG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbmNsYXNzIERvY3VtZW50MSBleHRlbmRzIF9yZWFjdC5Db21wb25lbnQge1xuICAgIC8qKlxuICAgKiBgZ2V0SW5pdGlhbFByb3BzYCBob29rIHJldHVybnMgdGhlIGNvbnRleHQgb2JqZWN0IHdpdGggdGhlIGFkZGl0aW9uIG9mIGByZW5kZXJQYWdlYC5cbiAgICogYHJlbmRlclBhZ2VgIGNhbGxiYWNrIGV4ZWN1dGVzIGBSZWFjdGAgcmVuZGVyaW5nIGxvZ2ljIHN5bmNocm9ub3VzbHkgdG8gc3VwcG9ydCBzZXJ2ZXItcmVuZGVyaW5nIHdyYXBwZXJzXG4gICAqLyBzdGF0aWMgYXN5bmMgZ2V0SW5pdGlhbFByb3BzKGN0eCkge1xuICAgICAgICBjb25zdCBlbmhhbmNlQXBwID0gKEFwcCk9PntcbiAgICAgICAgICAgIHJldHVybiAocHJvcHMpPT4vKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoQXBwLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgICAgICB9LCBwcm9wcykpXG4gICAgICAgICAgICA7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHsgaHRtbCAsIGhlYWQgIH0gPSBhd2FpdCBjdHgucmVuZGVyUGFnZSh7XG4gICAgICAgICAgICBlbmhhbmNlQXBwXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzdHlsZXMgPSBbXG4gICAgICAgICAgICAuLi4oMCwgX3NlcnZlcikuZGVmYXVsdCgpXG4gICAgICAgIF07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBodG1sLFxuICAgICAgICAgICAgaGVhZCxcbiAgICAgICAgICAgIHN0eWxlc1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoSHRtbCwgbnVsbCwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEhlYWQsIG51bGwpLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJib2R5XCIsIG51bGwsIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChNYWluLCBudWxsKSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KE5leHRTY3JpcHQsIG51bGwpKSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IERvY3VtZW50MTtcbmZ1bmN0aW9uIEh0bWwocHJvcHMpIHtcbiAgICBjb25zdCB7IGluQW1wTW9kZSAsIGRvY0NvbXBvbmVudHNSZW5kZXJlZCAsIGxvY2FsZSAgfSA9ICgwLCBfcmVhY3QpLnVzZUNvbnRleHQoX3V0aWxzLkh0bWxDb250ZXh0KTtcbiAgICBkb2NDb21wb25lbnRzUmVuZGVyZWQuSHRtbCA9IHRydWU7XG4gICAgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImh0bWxcIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgfSwgcHJvcHMsIHtcbiAgICAgICAgbGFuZzogcHJvcHMubGFuZyB8fCBsb2NhbGUgfHwgdW5kZWZpbmVkLFxuICAgICAgICBhbXA6IGluQW1wTW9kZSA/ICcnIDogdW5kZWZpbmVkLFxuICAgICAgICBcImRhdGEtYW1wZGV2bW9kZVwiOiBpbkFtcE1vZGUgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICcnIDogdW5kZWZpbmVkXG4gICAgfSkpKTtcbn1cbmNsYXNzIEhlYWQgZXh0ZW5kcyBfcmVhY3QuQ29tcG9uZW50IHtcbiAgICBnZXRDc3NMaW5rcyhmaWxlcykge1xuICAgICAgICBjb25zdCB7IGFzc2V0UHJlZml4ICwgZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcgLCBkeW5hbWljSW1wb3J0cyAgfSA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgY3NzRmlsZXMgPSBmaWxlcy5hbGxGaWxlcy5maWx0ZXIoKGYpPT5mLmVuZHNXaXRoKCcuY3NzJylcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgc2hhcmVkRmlsZXMgPSBuZXcgU2V0KGZpbGVzLnNoYXJlZEZpbGVzKTtcbiAgICAgICAgLy8gVW5tYW5hZ2VkIGZpbGVzIGFyZSBDU1MgZmlsZXMgdGhhdCB3aWxsIGJlIGhhbmRsZWQgZGlyZWN0bHkgYnkgdGhlXG4gICAgICAgIC8vIHdlYnBhY2sgcnVudGltZSAoYG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luYCkuXG4gICAgICAgIGxldCB1bm1hbmdlZEZpbGVzID0gbmV3IFNldChbXSk7XG4gICAgICAgIGxldCBkeW5hbWljQ3NzRmlsZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoZHluYW1pY0ltcG9ydHMuZmlsdGVyKChmaWxlKT0+ZmlsZS5lbmRzV2l0aCgnLmNzcycpXG4gICAgICAgICkpKTtcbiAgICAgICAgaWYgKGR5bmFtaWNDc3NGaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gbmV3IFNldChjc3NGaWxlcyk7XG4gICAgICAgICAgICBkeW5hbWljQ3NzRmlsZXMgPSBkeW5hbWljQ3NzRmlsZXMuZmlsdGVyKChmKT0+IShleGlzdGluZy5oYXMoZikgfHwgc2hhcmVkRmlsZXMuaGFzKGYpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHVubWFuZ2VkRmlsZXMgPSBuZXcgU2V0KGR5bmFtaWNDc3NGaWxlcyk7XG4gICAgICAgICAgICBjc3NGaWxlcy5wdXNoKC4uLmR5bmFtaWNDc3NGaWxlcyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNzc0xpbmtFbGVtZW50cyA9IFtdO1xuICAgICAgICBjc3NGaWxlcy5mb3JFYWNoKChmaWxlKT0+e1xuICAgICAgICAgICAgY29uc3QgaXNTaGFyZWRGaWxlID0gc2hhcmVkRmlsZXMuaGFzKGZpbGUpO1xuICAgICAgICAgICAgaWYgKCFwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfQ1NTKSB7XG4gICAgICAgICAgICAgICAgY3NzTGlua0VsZW1lbnRzLnB1c2goLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLCB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogYCR7ZmlsZX0tcHJlbG9hZGAsXG4gICAgICAgICAgICAgICAgICAgIG5vbmNlOiB0aGlzLnByb3BzLm5vbmNlLFxuICAgICAgICAgICAgICAgICAgICByZWw6IFwicHJlbG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICBocmVmOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLFxuICAgICAgICAgICAgICAgICAgICBhczogXCJzdHlsZVwiLFxuICAgICAgICAgICAgICAgICAgICBjcm9zc09yaWdpbjogdGhpcy5wcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaXNVbm1hbmFnZWRGaWxlID0gdW5tYW5nZWRGaWxlcy5oYXMoZmlsZSk7XG4gICAgICAgICAgICBjc3NMaW5rRWxlbWVudHMucHVzaCgvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIsIHtcbiAgICAgICAgICAgICAgICBrZXk6IGZpbGUsXG4gICAgICAgICAgICAgICAgbm9uY2U6IHRoaXMucHJvcHMubm9uY2UsXG4gICAgICAgICAgICAgICAgcmVsOiBcInN0eWxlc2hlZXRcIixcbiAgICAgICAgICAgICAgICBocmVmOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLFxuICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU4sXG4gICAgICAgICAgICAgICAgXCJkYXRhLW4tZ1wiOiBpc1VubWFuYWdlZEZpbGUgPyB1bmRlZmluZWQgOiBpc1NoYXJlZEZpbGUgPyAnJyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBcImRhdGEtbi1wXCI6IGlzVW5tYW5hZ2VkRmlsZSA/IHVuZGVmaW5lZCA6IGlzU2hhcmVkRmlsZSA/IHVuZGVmaW5lZCA6ICcnXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdkZXZlbG9wbWVudCcgJiYgcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0ZPTlRTKSB7XG4gICAgICAgICAgICBjc3NMaW5rRWxlbWVudHMgPSB0aGlzLm1ha2VTdHlsZXNoZWV0SW5lcnQoY3NzTGlua0VsZW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3NzTGlua0VsZW1lbnRzLmxlbmd0aCA9PT0gMCA/IG51bGwgOiBjc3NMaW5rRWxlbWVudHM7XG4gICAgfVxuICAgIGdldFByZWxvYWREeW5hbWljQ2h1bmtzKCkge1xuICAgICAgICBjb25zdCB7IGR5bmFtaWNJbXBvcnRzICwgYXNzZXRQcmVmaXggLCBkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyAgfSA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgcmV0dXJuIGR5bmFtaWNJbXBvcnRzLm1hcCgoZmlsZSk9PntcbiAgICAgICAgICAgIGlmICghZmlsZS5lbmRzV2l0aCgnLmpzJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIsIHtcbiAgICAgICAgICAgICAgICByZWw6IFwicHJlbG9hZFwiLFxuICAgICAgICAgICAgICAgIGtleTogZmlsZSxcbiAgICAgICAgICAgICAgICBocmVmOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLFxuICAgICAgICAgICAgICAgIGFzOiBcInNjcmlwdFwiLFxuICAgICAgICAgICAgICAgIG5vbmNlOiB0aGlzLnByb3BzLm5vbmNlLFxuICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSkvLyBGaWx0ZXIgb3V0IG51bGxlZCBzY3JpcHRzXG4gICAgICAgIC5maWx0ZXIoQm9vbGVhbik7XG4gICAgfVxuICAgIGdldFByZWxvYWRNYWluTGlua3MoZmlsZXMpIHtcbiAgICAgICAgY29uc3QgeyBhc3NldFByZWZpeCAsIGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nICwgc2NyaXB0TG9hZGVyICB9ID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCBwcmVsb2FkRmlsZXMgPSBmaWxlcy5hbGxGaWxlcy5maWx0ZXIoKGZpbGUpPT57XG4gICAgICAgICAgICByZXR1cm4gZmlsZS5lbmRzV2l0aCgnLmpzJyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgLi4uKHNjcmlwdExvYWRlci5iZWZvcmVJbnRlcmFjdGl2ZSB8fCBbXSkubWFwKChmaWxlKT0+LyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLCB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogZmlsZS5zcmMsXG4gICAgICAgICAgICAgICAgICAgIG5vbmNlOiB0aGlzLnByb3BzLm5vbmNlLFxuICAgICAgICAgICAgICAgICAgICByZWw6IFwicHJlbG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICBocmVmOiBmaWxlLnNyYyxcbiAgICAgICAgICAgICAgICAgICAgYXM6IFwic2NyaXB0XCIsXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIC4uLnByZWxvYWRGaWxlcy5tYXAoKGZpbGUpPT4vKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIsIHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBmaWxlLFxuICAgICAgICAgICAgICAgICAgICBub25jZTogdGhpcy5wcm9wcy5ub25jZSxcbiAgICAgICAgICAgICAgICAgICAgcmVsOiBcInByZWxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogYCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZW5jb2RlVVJJKGZpbGUpfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxcbiAgICAgICAgICAgICAgICAgICAgYXM6IFwic2NyaXB0XCIsXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSwgXG4gICAgICAgIF07XG4gICAgfVxuICAgIGdldER5bmFtaWNDaHVua3MoZmlsZXMpIHtcbiAgICAgICAgcmV0dXJuIGdldER5bmFtaWNDaHVua3ModGhpcy5jb250ZXh0LCB0aGlzLnByb3BzLCBmaWxlcyk7XG4gICAgfVxuICAgIGdldFByZU5leHRTY3JpcHRzKCkge1xuICAgICAgICByZXR1cm4gZ2V0UHJlTmV4dFNjcmlwdHModGhpcy5jb250ZXh0LCB0aGlzLnByb3BzKTtcbiAgICB9XG4gICAgZ2V0U2NyaXB0cyhmaWxlcykge1xuICAgICAgICByZXR1cm4gZ2V0U2NyaXB0cyh0aGlzLmNvbnRleHQsIHRoaXMucHJvcHMsIGZpbGVzKTtcbiAgICB9XG4gICAgZ2V0UG9seWZpbGxTY3JpcHRzKCkge1xuICAgICAgICByZXR1cm4gZ2V0UG9seWZpbGxTY3JpcHRzKHRoaXMuY29udGV4dCwgdGhpcy5wcm9wcyk7XG4gICAgfVxuICAgIGhhbmRsZURvY3VtZW50U2NyaXB0TG9hZGVySXRlbXMoY2hpbGRyZW4pIHtcbiAgICAgICAgY29uc3QgeyBzY3JpcHRMb2FkZXIgIH0gPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHNjcmlwdExvYWRlckl0ZW1zID0gW107XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkQ2hpbGRyZW4gPSBbXTtcbiAgICAgICAgX3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgKGNoaWxkKT0+e1xuICAgICAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IF9zY3JpcHQuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5wcm9wcy5zdHJhdGVneSA9PT0gJ2JlZm9yZUludGVyYWN0aXZlJykge1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHRMb2FkZXIuYmVmb3JlSW50ZXJhY3RpdmUgPSAoc2NyaXB0TG9hZGVyLmJlZm9yZUludGVyYWN0aXZlIHx8IFtdKS5jb25jYXQoW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmNoaWxkLnByb3BzXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFtcbiAgICAgICAgICAgICAgICAgICAgJ2xhenlPbmxvYWQnLFxuICAgICAgICAgICAgICAgICAgICAnYWZ0ZXJJbnRlcmFjdGl2ZSdcbiAgICAgICAgICAgICAgICBdLmluY2x1ZGVzKGNoaWxkLnByb3BzLnN0cmF0ZWd5KSkge1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHRMb2FkZXJJdGVtcy5wdXNoKGNoaWxkLnByb3BzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbHRlcmVkQ2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbnRleHQuX19ORVhUX0RBVEFfXy5zY3JpcHRMb2FkZXIgPSBzY3JpcHRMb2FkZXJJdGVtcztcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkQ2hpbGRyZW47XG4gICAgfVxuICAgIG1ha2VTdHlsZXNoZWV0SW5lcnQobm9kZSkge1xuICAgICAgICByZXR1cm4gX3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4ubWFwKG5vZGUsIChjKT0+e1xuICAgICAgICAgICAgaWYgKGMudHlwZSA9PT0gJ2xpbmsnICYmIGMucHJvcHNbJ2hyZWYnXSAmJiBfY29uc3RhbnRzLk9QVElNSVpFRF9GT05UX1BST1ZJREVSUy5zb21lKCh7IHVybCAgfSk9PmMucHJvcHNbJ2hyZWYnXS5zdGFydHNXaXRoKHVybClcbiAgICAgICAgICAgICkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdQcm9wcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYy5wcm9wcyB8fCB7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG5ld1Byb3BzWydkYXRhLWhyZWYnXSA9IG5ld1Byb3BzWydocmVmJ107XG4gICAgICAgICAgICAgICAgbmV3UHJvcHNbJ2hyZWYnXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICByZXR1cm4oLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jbG9uZUVsZW1lbnQoYywgbmV3UHJvcHMpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYy5wcm9wcyAmJiBjLnByb3BzWydjaGlsZHJlbiddKSB7XG4gICAgICAgICAgICAgICAgYy5wcm9wc1snY2hpbGRyZW4nXSA9IHRoaXMubWFrZVN0eWxlc2hlZXRJbmVydChjLnByb3BzWydjaGlsZHJlbiddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHN0eWxlcyAsIGFtcFBhdGggLCBpbkFtcE1vZGUgLCBoeWJyaWRBbXAgLCBjYW5vbmljYWxCYXNlICwgX19ORVhUX0RBVEFfXyAsIGRhbmdlcm91c0FzUGF0aCAsIGhlYWRUYWdzICwgdW5zdGFibGVfcnVudGltZUpTICwgdW5zdGFibGVfSnNQcmVsb2FkICwgZGlzYWJsZU9wdGltaXplZExvYWRpbmcgLCAgfSA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3QgZGlzYWJsZVJ1bnRpbWVKUyA9IHVuc3RhYmxlX3J1bnRpbWVKUyA9PT0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGRpc2FibGVKc1ByZWxvYWQgPSB1bnN0YWJsZV9Kc1ByZWxvYWQgPT09IGZhbHNlIHx8ICFkaXNhYmxlT3B0aW1pemVkTG9hZGluZztcbiAgICAgICAgdGhpcy5jb250ZXh0LmRvY0NvbXBvbmVudHNSZW5kZXJlZC5IZWFkID0gdHJ1ZTtcbiAgICAgICAgbGV0IHsgaGVhZCAgfSA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgbGV0IGNzc1ByZWxvYWRzID0gW107XG4gICAgICAgIGxldCBvdGhlckhlYWRFbGVtZW50cyA9IFtdO1xuICAgICAgICBpZiAoaGVhZCkge1xuICAgICAgICAgICAgaGVhZC5mb3JFYWNoKChjKT0+e1xuICAgICAgICAgICAgICAgIGlmIChjICYmIGMudHlwZSA9PT0gJ2xpbmsnICYmIGMucHJvcHNbJ3JlbCddID09PSAncHJlbG9hZCcgJiYgYy5wcm9wc1snYXMnXSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgICAgICAgICBjc3NQcmVsb2Fkcy5wdXNoKGMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGMgJiYgb3RoZXJIZWFkRWxlbWVudHMucHVzaChjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGhlYWQgPSBjc3NQcmVsb2Fkcy5jb25jYXQob3RoZXJIZWFkRWxlbWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjaGlsZHJlbiA9IF9yZWFjdC5kZWZhdWx0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbikuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICAvLyBzaG93IGEgd2FybmluZyBpZiBIZWFkIGNvbnRhaW5zIDx0aXRsZT4gKG9ubHkgaW4gZGV2ZWxvcG1lbnQpXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IF9yZWFjdC5kZWZhdWx0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgKGNoaWxkKT0+e1xuICAgICAgICAgICAgICAgIHZhciByZWY7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNSZWFjdEhlbG1ldCA9IGNoaWxkID09PSBudWxsIHx8IGNoaWxkID09PSB2b2lkIDAgPyB2b2lkIDAgOiAocmVmID0gY2hpbGQucHJvcHMpID09PSBudWxsIHx8IHJlZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVmWydkYXRhLXJlYWN0LWhlbG1ldCddO1xuICAgICAgICAgICAgICAgIGlmICghaXNSZWFjdEhlbG1ldCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChjaGlsZCA9PT0gbnVsbCB8fCBjaGlsZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2hpbGQudHlwZSkgPT09ICd0aXRsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IDx0aXRsZT4gc2hvdWxkIG5vdCBiZSB1c2VkIGluIF9kb2N1bWVudC5qcydzIDxIZWFkPi4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvbm8tZG9jdW1lbnQtdGl0bGVcIik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKGNoaWxkID09PSBudWxsIHx8IGNoaWxkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjaGlsZC50eXBlKSA9PT0gJ21ldGEnICYmIChjaGlsZCA9PT0gbnVsbCB8fCBjaGlsZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogKHJlZjEgPSBjaGlsZC5wcm9wcykgPT09IG51bGwgfHwgcmVmMSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVmMS5uYW1lKSA9PT0gJ3ZpZXdwb3J0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiV2FybmluZzogdmlld3BvcnQgbWV0YSB0YWdzIHNob3VsZCBub3QgYmUgdXNlZCBpbiBfZG9jdW1lbnQuanMncyA8SGVhZD4uIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL25vLWRvY3VtZW50LXZpZXdwb3J0LW1ldGFcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5jcm9zc09yaWdpbikgY29uc29sZS53YXJuKCdXYXJuaW5nOiBgSGVhZGAgYXR0cmlidXRlIGBjcm9zc09yaWdpbmAgaXMgZGVwcmVjYXRlZC4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvZG9jLWNyb3Nzb3JpZ2luLWRlcHJlY2F0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdkZXZlbG9wbWVudCcgJiYgcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0ZPTlRTICYmICFpbkFtcE1vZGUpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gdGhpcy5tYWtlU3R5bGVzaGVldEluZXJ0KGNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgICBjaGlsZHJlbiA9IHRoaXMuaGFuZGxlRG9jdW1lbnRTY3JpcHRMb2FkZXJJdGVtcyhjaGlsZHJlbik7XG4gICAgICAgIGxldCBoYXNBbXBodG1sUmVsID0gZmFsc2U7XG4gICAgICAgIGxldCBoYXNDYW5vbmljYWxSZWwgPSBmYWxzZTtcbiAgICAgICAgLy8gc2hvdyB3YXJuaW5nIGFuZCByZW1vdmUgY29uZmxpY3RpbmcgYW1wIGhlYWQgdGFnc1xuICAgICAgICBoZWFkID0gX3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4ubWFwKGhlYWQgfHwgW10sIChjaGlsZCk9PntcbiAgICAgICAgICAgIGlmICghY2hpbGQpIHJldHVybiBjaGlsZDtcbiAgICAgICAgICAgIGNvbnN0IHsgdHlwZSAsIHByb3BzICB9ID0gY2hpbGQ7XG4gICAgICAgICAgICBpZiAoaW5BbXBNb2RlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJhZFByb3AgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ21ldGEnICYmIHByb3BzLm5hbWUgPT09ICd2aWV3cG9ydCcpIHtcbiAgICAgICAgICAgICAgICAgICAgYmFkUHJvcCA9ICduYW1lPVwidmlld3BvcnRcIic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnbGluaycgJiYgcHJvcHMucmVsID09PSAnY2Fub25pY2FsJykge1xuICAgICAgICAgICAgICAgICAgICBoYXNDYW5vbmljYWxSZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3NjcmlwdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gb25seSBibG9jayBpZlxuICAgICAgICAgICAgICAgICAgICAvLyAxLiBpdCBoYXMgYSBzcmMgYW5kIGlzbid0IHBvaW50aW5nIHRvIGFtcHByb2plY3QncyBDRE5cbiAgICAgICAgICAgICAgICAgICAgLy8gMi4gaXQgaXMgdXNpbmcgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgd2l0aG91dCBhIHR5cGUgb3JcbiAgICAgICAgICAgICAgICAgICAgLy8gYSB0eXBlIG9mIHRleHQvamF2YXNjcmlwdFxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcHMuc3JjICYmIHByb3BzLnNyYy5pbmRleE9mKCdhbXBwcm9qZWN0JykgPCAtMSB8fCBwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCAmJiAoIXByb3BzLnR5cGUgfHwgcHJvcHMudHlwZSA9PT0gJ3RleHQvamF2YXNjcmlwdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWRQcm9wID0gJzxzY3JpcHQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMocHJvcHMpLmZvckVhY2goKHByb3ApPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFkUHJvcCArPSBgICR7cHJvcH09XCIke3Byb3BzW3Byb3BdfVwiYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFkUHJvcCArPSAnLz4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChiYWRQcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRm91bmQgY29uZmxpY3RpbmcgYW1wIHRhZyBcIiR7Y2hpbGQudHlwZX1cIiB3aXRoIGNvbmZsaWN0aW5nIHByb3AgJHtiYWRQcm9wfSBpbiAke19fTkVYVF9EQVRBX18ucGFnZX0uIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2NvbmZsaWN0aW5nLWFtcC10YWdgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBub24tYW1wIG1vZGVcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2xpbmsnICYmIHByb3BzLnJlbCA9PT0gJ2FtcGh0bWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc0FtcGh0bWxSZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHRyeSB0byBwYXJzZSBzdHlsZXMgZnJvbSBmcmFnbWVudCBmb3IgYmFja3dhcmRzIGNvbXBhdFxuICAgICAgICBjb25zdCBjdXJTdHlsZXMgPSBBcnJheS5pc0FycmF5KHN0eWxlcykgPyBzdHlsZXMgOiBbXTtcbiAgICAgICAgaWYgKGluQW1wTW9kZSAmJiBzdHlsZXMgJiYgLy8gQHRzLWlnbm9yZSBQcm9wZXJ0eSAncHJvcHMnIGRvZXMgbm90IGV4aXN0IG9uIHR5cGUgUmVhY3RFbGVtZW50XG4gICAgICAgIHN0eWxlcy5wcm9wcyAmJiAvLyBAdHMtaWdub3JlIFByb3BlcnR5ICdwcm9wcycgZG9lcyBub3QgZXhpc3Qgb24gdHlwZSBSZWFjdEVsZW1lbnRcbiAgICAgICAgQXJyYXkuaXNBcnJheShzdHlsZXMucHJvcHMuY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICBjb25zdCBoYXNTdHlsZXMgPSAoZWwpPT57XG4gICAgICAgICAgICAgICAgdmFyIHJlZjIsIHJlZjM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsID09PSBudWxsIHx8IGVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiAocmVmMiA9IGVsLnByb3BzKSA9PT0gbnVsbCB8fCByZWYyID09PSB2b2lkIDAgPyB2b2lkIDAgOiAocmVmMyA9IHJlZjIuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpID09PSBudWxsIHx8IHJlZjMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlZjMuX19odG1sO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgUHJvcGVydHkgJ3Byb3BzJyBkb2VzIG5vdCBleGlzdCBvbiB0eXBlIFJlYWN0RWxlbWVudFxuICAgICAgICAgICAgc3R5bGVzLnByb3BzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKT0+e1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5mb3JFYWNoKChlbCk9Pmhhc1N0eWxlcyhlbCkgJiYgY3VyU3R5bGVzLnB1c2goZWwpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNTdHlsZXMoY2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1clN0eWxlcy5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWxlcyA9IGdldERvY3VtZW50RmlsZXModGhpcy5jb250ZXh0LmJ1aWxkTWFuaWZlc3QsIHRoaXMuY29udGV4dC5fX05FWFRfREFUQV9fLnBhZ2UsIGluQW1wTW9kZSk7XG4gICAgICAgIHZhciBfbm9uY2UsIF9ub25jZTE7XG4gICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoZWFkXCIsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICB9LCB0aGlzLnByb3BzKSwgdGhpcy5jb250ZXh0LmlzRGV2ZWxvcG1lbnQgJiYgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdC5kZWZhdWx0LkZyYWdtZW50LCBudWxsLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiLCB7XG4gICAgICAgICAgICBcImRhdGEtbmV4dC1oaWRlLWZvdWNcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZGF0YS1hbXBkZXZtb2RlXCI6IGluQW1wTW9kZSA/ICd0cnVlJyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7XG4gICAgICAgICAgICAgICAgX19odG1sOiBgYm9keXtkaXNwbGF5Om5vbmV9YFxuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIiwge1xuICAgICAgICAgICAgXCJkYXRhLW5leHQtaGlkZS1mb3VjXCI6IHRydWUsXG4gICAgICAgICAgICBcImRhdGEtYW1wZGV2bW9kZVwiOiBpbkFtcE1vZGUgPyAndHJ1ZScgOiB1bmRlZmluZWRcbiAgICAgICAgfSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIiwge1xuICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHtcbiAgICAgICAgICAgICAgICBfX2h0bWw6IGBib2R5e2Rpc3BsYXk6YmxvY2t9YFxuICAgICAgICAgICAgfVxuICAgICAgICB9KSkpLCBjaGlsZHJlbiwgcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0ZPTlRTICYmIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm1ldGFcIiwge1xuICAgICAgICAgICAgbmFtZTogXCJuZXh0LWZvbnQtcHJlY29ubmVjdFwiXG4gICAgICAgIH0pLCBoZWFkLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIsIHtcbiAgICAgICAgICAgIG5hbWU6IFwibmV4dC1oZWFkLWNvdW50XCIsXG4gICAgICAgICAgICBjb250ZW50OiBfcmVhY3QuZGVmYXVsdC5DaGlsZHJlbi5jb3VudChoZWFkIHx8IFtdKS50b1N0cmluZygpXG4gICAgICAgIH0pLCBpbkFtcE1vZGUgJiYgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdC5kZWZhdWx0LkZyYWdtZW50LCBudWxsLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIsIHtcbiAgICAgICAgICAgIG5hbWU6IFwidmlld3BvcnRcIixcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwid2lkdGg9ZGV2aWNlLXdpZHRoLG1pbmltdW0tc2NhbGU9MSxpbml0aWFsLXNjYWxlPTFcIlxuICAgICAgICB9KSwgIWhhc0Nhbm9uaWNhbFJlbCAmJiAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIsIHtcbiAgICAgICAgICAgIHJlbDogXCJjYW5vbmljYWxcIixcbiAgICAgICAgICAgIGhyZWY6IGNhbm9uaWNhbEJhc2UgKyAoMCwgX3V0aWxzMSkuY2xlYW5BbXBQYXRoKGRhbmdlcm91c0FzUGF0aClcbiAgICAgICAgfSksIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIiwge1xuICAgICAgICAgICAgcmVsOiBcInByZWxvYWRcIixcbiAgICAgICAgICAgIGFzOiBcInNjcmlwdFwiLFxuICAgICAgICAgICAgaHJlZjogXCJodHRwczovL2Nkbi5hbXBwcm9qZWN0Lm9yZy92MC5qc1wiXG4gICAgICAgIH0pLCBzdHlsZXMgJiYgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIiwge1xuICAgICAgICAgICAgXCJhbXAtY3VzdG9tXCI6IFwiXCIsXG4gICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDoge1xuICAgICAgICAgICAgICAgIF9faHRtbDogY3VyU3R5bGVzLm1hcCgoc3R5bGUpPT5zdHlsZS5wcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTC5fX2h0bWxcbiAgICAgICAgICAgICAgICApLmpvaW4oJycpLnJlcGxhY2UoL1xcL1xcKiMgc291cmNlTWFwcGluZ1VSTD0uKlxcKlxcLy9nLCAnJykucmVwbGFjZSgvXFwvXFwqQCBzb3VyY2VVUkw9Lio/XFwqXFwvL2csICcnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIiwge1xuICAgICAgICAgICAgXCJhbXAtYm9pbGVycGxhdGVcIjogXCJcIixcbiAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7XG4gICAgICAgICAgICAgICAgX19odG1sOiBgYm9keXstd2Via2l0LWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoOy1tb3otYW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGg7LW1zLWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoO2FuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RofUAtd2Via2l0LWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1ALW1vei1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1tcy1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1vLWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1Aa2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm5vc2NyaXB0XCIsIG51bGwsIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIsIHtcbiAgICAgICAgICAgIFwiYW1wLWJvaWxlcnBsYXRlXCI6IFwiXCIsXG4gICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDoge1xuICAgICAgICAgICAgICAgIF9faHRtbDogYGJvZHl7LXdlYmtpdC1hbmltYXRpb246bm9uZTstbW96LWFuaW1hdGlvbjpub25lOy1tcy1hbmltYXRpb246bm9uZTthbmltYXRpb246bm9uZX1gXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsIHtcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3JjOiBcImh0dHBzOi8vY2RuLmFtcHByb2plY3Qub3JnL3YwLmpzXCJcbiAgICAgICAgfSkpLCAhaW5BbXBNb2RlICYmIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3QuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCwgIWhhc0FtcGh0bWxSZWwgJiYgaHlicmlkQW1wICYmIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIiwge1xuICAgICAgICAgICAgcmVsOiBcImFtcGh0bWxcIixcbiAgICAgICAgICAgIGhyZWY6IGNhbm9uaWNhbEJhc2UgKyBnZXRBbXBQYXRoKGFtcFBhdGgsIGRhbmdlcm91c0FzUGF0aClcbiAgICAgICAgfSksICFwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfQ1NTICYmIHRoaXMuZ2V0Q3NzTGlua3MoZmlsZXMpLCAhcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0NTUyAmJiAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJub3NjcmlwdFwiLCB7XG4gICAgICAgICAgICBcImRhdGEtbi1jc3NcIjogKF9ub25jZSA9IHRoaXMucHJvcHMubm9uY2UpICE9PSBudWxsICYmIF9ub25jZSAhPT0gdm9pZCAwID8gX25vbmNlIDogJydcbiAgICAgICAgfSksIHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9JTUFHRVMgJiYgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibWV0YVwiLCB7XG4gICAgICAgICAgICBuYW1lOiBcIm5leHQtaW1hZ2UtcHJlbG9hZFwiXG4gICAgICAgIH0pLCAhZGlzYWJsZVJ1bnRpbWVKUyAmJiAhZGlzYWJsZUpzUHJlbG9hZCAmJiB0aGlzLmdldFByZWxvYWREeW5hbWljQ2h1bmtzKCksICFkaXNhYmxlUnVudGltZUpTICYmICFkaXNhYmxlSnNQcmVsb2FkICYmIHRoaXMuZ2V0UHJlbG9hZE1haW5MaW5rcyhmaWxlcyksICFkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAmJiAhZGlzYWJsZVJ1bnRpbWVKUyAmJiB0aGlzLmdldFBvbHlmaWxsU2NyaXB0cygpLCAhZGlzYWJsZU9wdGltaXplZExvYWRpbmcgJiYgIWRpc2FibGVSdW50aW1lSlMgJiYgdGhpcy5nZXRQcmVOZXh0U2NyaXB0cygpLCAhZGlzYWJsZU9wdGltaXplZExvYWRpbmcgJiYgIWRpc2FibGVSdW50aW1lSlMgJiYgdGhpcy5nZXREeW5hbWljQ2h1bmtzKGZpbGVzKSwgIWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nICYmICFkaXNhYmxlUnVudGltZUpTICYmIHRoaXMuZ2V0U2NyaXB0cyhmaWxlcyksIHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9DU1MgJiYgdGhpcy5nZXRDc3NMaW5rcyhmaWxlcyksIHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9DU1MgJiYgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIiwge1xuICAgICAgICAgICAgXCJkYXRhLW4tY3NzXCI6IChfbm9uY2UxID0gdGhpcy5wcm9wcy5ub25jZSkgIT09IG51bGwgJiYgX25vbmNlMSAhPT0gdm9pZCAwID8gX25vbmNlMSA6ICcnXG4gICAgICAgIH0pLCB0aGlzLmNvbnRleHQuaXNEZXZlbG9wbWVudCAmJiAvLyB0aGlzIGVsZW1lbnQgaXMgdXNlZCB0byBtb3VudCBkZXZlbG9wbWVudCBzdHlsZXMgc28gdGhlXG4gICAgICAgIC8vIG9yZGVyaW5nIG1hdGNoZXMgcHJvZHVjdGlvblxuICAgICAgICAvLyAoYnkgZGVmYXVsdCwgc3R5bGUtbG9hZGVyIGluamVjdHMgYXQgdGhlIGJvdHRvbSBvZiA8aGVhZCAvPilcbiAgICAgICAgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIiwge1xuICAgICAgICAgICAgaWQ6IFwiX19uZXh0X2Nzc19fRE9fTk9UX1VTRV9fXCJcbiAgICAgICAgfSksIHN0eWxlcyB8fCBudWxsKSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdC5kZWZhdWx0LkZyYWdtZW50LCB7XG4gICAgICAgIH0sIC4uLmhlYWRUYWdzIHx8IFtdKSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuSGVhZCA9IEhlYWQ7XG5IZWFkLmNvbnRleHRUeXBlID0gX3V0aWxzLkh0bWxDb250ZXh0O1xuZnVuY3Rpb24gTWFpbigpIHtcbiAgICBjb25zdCB7IGluQW1wTW9kZSAsIGRvY0NvbXBvbmVudHNSZW5kZXJlZCAgfSA9ICgwLCBfcmVhY3QpLnVzZUNvbnRleHQoX3V0aWxzLkh0bWxDb250ZXh0KTtcbiAgICBkb2NDb21wb25lbnRzUmVuZGVyZWQuTWFpbiA9IHRydWU7XG4gICAgaWYgKGluQW1wTW9kZSkgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3QuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCwgX2NvbnN0YW50cy5CT0RZX1JFTkRFUl9UQVJHRVQpKTtcbiAgICByZXR1cm4oLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgaWQ6IFwiX19uZXh0XCJcbiAgICB9LCBfY29uc3RhbnRzLkJPRFlfUkVOREVSX1RBUkdFVCkpO1xufVxuY2xhc3MgTmV4dFNjcmlwdCBleHRlbmRzIF9yZWFjdC5Db21wb25lbnQge1xuICAgIGdldER5bmFtaWNDaHVua3MoZmlsZXMpIHtcbiAgICAgICAgcmV0dXJuIGdldER5bmFtaWNDaHVua3ModGhpcy5jb250ZXh0LCB0aGlzLnByb3BzLCBmaWxlcyk7XG4gICAgfVxuICAgIGdldFByZU5leHRTY3JpcHRzKCkge1xuICAgICAgICByZXR1cm4gZ2V0UHJlTmV4dFNjcmlwdHModGhpcy5jb250ZXh0LCB0aGlzLnByb3BzKTtcbiAgICB9XG4gICAgZ2V0U2NyaXB0cyhmaWxlcykge1xuICAgICAgICByZXR1cm4gZ2V0U2NyaXB0cyh0aGlzLmNvbnRleHQsIHRoaXMucHJvcHMsIGZpbGVzKTtcbiAgICB9XG4gICAgZ2V0UG9seWZpbGxTY3JpcHRzKCkge1xuICAgICAgICByZXR1cm4gZ2V0UG9seWZpbGxTY3JpcHRzKHRoaXMuY29udGV4dCwgdGhpcy5wcm9wcyk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRJbmxpbmVTY3JpcHRTb3VyY2UoY29udGV4dCkge1xuICAgICAgICBjb25zdCB7IF9fTkVYVF9EQVRBX18gIH0gPSBjb250ZXh0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04uc3RyaW5naWZ5KF9fTkVYVF9EQVRBX18pO1xuICAgICAgICAgICAgcmV0dXJuICgwLCBfaHRtbGVzY2FwZSkuaHRtbEVzY2FwZUpzb25TdHJpbmcoZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgaWYgKGVyci5tZXNzYWdlLmluZGV4T2YoJ2NpcmN1bGFyIHN0cnVjdHVyZScpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaXJjdWxhciBzdHJ1Y3R1cmUgaW4gXCJnZXRJbml0aWFsUHJvcHNcIiByZXN1bHQgb2YgcGFnZSBcIiR7X19ORVhUX0RBVEFfXy5wYWdlfVwiLiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9jaXJjdWxhci1zdHJ1Y3R1cmVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgYXNzZXRQcmVmaXggLCBpbkFtcE1vZGUgLCBidWlsZE1hbmlmZXN0ICwgdW5zdGFibGVfcnVudGltZUpTICwgZG9jQ29tcG9uZW50c1JlbmRlcmVkICwgZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcgLCBkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAsICB9ID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCBkaXNhYmxlUnVudGltZUpTID0gdW5zdGFibGVfcnVudGltZUpTID09PSBmYWxzZTtcbiAgICAgICAgZG9jQ29tcG9uZW50c1JlbmRlcmVkLk5leHRTY3JpcHQgPSB0cnVlO1xuICAgICAgICBpZiAoaW5BbXBNb2RlKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYW1wRGV2RmlsZXMgPSBbXG4gICAgICAgICAgICAgICAgLi4uYnVpbGRNYW5pZmVzdC5kZXZGaWxlcyxcbiAgICAgICAgICAgICAgICAuLi5idWlsZE1hbmlmZXN0LnBvbHlmaWxsRmlsZXMsXG4gICAgICAgICAgICAgICAgLi4uYnVpbGRNYW5pZmVzdC5hbXBEZXZGaWxlcywgXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3QuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCwgZGlzYWJsZVJ1bnRpbWVKUyA/IG51bGwgOiAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwge1xuICAgICAgICAgICAgICAgIGlkOiBcIl9fTkVYVF9EQVRBX19cIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBub25jZTogdGhpcy5wcm9wcy5ub25jZSxcbiAgICAgICAgICAgICAgICBjcm9zc09yaWdpbjogdGhpcy5wcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOLFxuICAgICAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7XG4gICAgICAgICAgICAgICAgICAgIF9faHRtbDogTmV4dFNjcmlwdC5nZXRJbmxpbmVTY3JpcHRTb3VyY2UodGhpcy5jb250ZXh0KVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJkYXRhLWFtcGRldm1vZGVcIjogdHJ1ZVxuICAgICAgICAgICAgfSksIGFtcERldkZpbGVzLm1hcCgoZmlsZSk9Pi8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtmaWxlfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxcbiAgICAgICAgICAgICAgICAgICAgbm9uY2U6IHRoaXMucHJvcHMubm9uY2UsXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU4sXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YS1hbXBkZXZtb2RlXCI6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5jcm9zc09yaWdpbikgY29uc29sZS53YXJuKCdXYXJuaW5nOiBgTmV4dFNjcmlwdGAgYXR0cmlidXRlIGBjcm9zc09yaWdpbmAgaXMgZGVwcmVjYXRlZC4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvZG9jLWNyb3Nzb3JpZ2luLWRlcHJlY2F0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWxlcyA9IGdldERvY3VtZW50RmlsZXModGhpcy5jb250ZXh0LmJ1aWxkTWFuaWZlc3QsIHRoaXMuY29udGV4dC5fX05FWFRfREFUQV9fLnBhZ2UsIGluQW1wTW9kZSk7XG4gICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0LmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsICFkaXNhYmxlUnVudGltZUpTICYmIGJ1aWxkTWFuaWZlc3QuZGV2RmlsZXMgPyBidWlsZE1hbmlmZXN0LmRldkZpbGVzLm1hcCgoZmlsZSk9Pi8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCB7XG4gICAgICAgICAgICAgICAga2V5OiBmaWxlLFxuICAgICAgICAgICAgICAgIHNyYzogYCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZW5jb2RlVVJJKGZpbGUpfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxcbiAgICAgICAgICAgICAgICBub25jZTogdGhpcy5wcm9wcy5ub25jZSxcbiAgICAgICAgICAgICAgICBjcm9zc09yaWdpbjogdGhpcy5wcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOXG4gICAgICAgICAgICB9KVxuICAgICAgICApIDogbnVsbCwgZGlzYWJsZVJ1bnRpbWVKUyA/IG51bGwgOiAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwge1xuICAgICAgICAgICAgaWQ6IFwiX19ORVhUX0RBVEFfX1wiLFxuICAgICAgICAgICAgdHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBub25jZTogdGhpcy5wcm9wcy5ub25jZSxcbiAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU4sXG4gICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDoge1xuICAgICAgICAgICAgICAgIF9faHRtbDogTmV4dFNjcmlwdC5nZXRJbmxpbmVTY3JpcHRTb3VyY2UodGhpcy5jb250ZXh0KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgZGlzYWJsZU9wdGltaXplZExvYWRpbmcgJiYgIWRpc2FibGVSdW50aW1lSlMgJiYgdGhpcy5nZXRQb2x5ZmlsbFNjcmlwdHMoKSwgZGlzYWJsZU9wdGltaXplZExvYWRpbmcgJiYgIWRpc2FibGVSdW50aW1lSlMgJiYgdGhpcy5nZXRQcmVOZXh0U2NyaXB0cygpLCBkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAmJiAhZGlzYWJsZVJ1bnRpbWVKUyAmJiB0aGlzLmdldER5bmFtaWNDaHVua3MoZmlsZXMpLCBkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAmJiAhZGlzYWJsZVJ1bnRpbWVKUyAmJiB0aGlzLmdldFNjcmlwdHMoZmlsZXMpKSk7XG4gICAgfVxufVxuZXhwb3J0cy5OZXh0U2NyaXB0ID0gTmV4dFNjcmlwdDtcbk5leHRTY3JpcHQuY29udGV4dFR5cGUgPSBfdXRpbHMuSHRtbENvbnRleHQ7XG5OZXh0U2NyaXB0LnNhZmFyaU5vbW9kdWxlRml4ID0gJyFmdW5jdGlvbigpe3ZhciBlPWRvY3VtZW50LHQ9ZS5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO2lmKCEoXCJub01vZHVsZVwiaW4gdCkmJlwib25iZWZvcmVsb2FkXCJpbiB0KXt2YXIgbj0hMTtlLmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmVsb2FkXCIsZnVuY3Rpb24oZSl7aWYoZS50YXJnZXQ9PT10KW49ITA7ZWxzZSBpZighZS50YXJnZXQuaGFzQXR0cmlidXRlKFwibm9tb2R1bGVcIil8fCFuKXJldHVybjtlLnByZXZlbnREZWZhdWx0KCl9LCEwKSx0LnR5cGU9XCJtb2R1bGVcIix0LnNyYz1cIi5cIixlLmhlYWQuYXBwZW5kQ2hpbGQodCksdC5yZW1vdmUoKX19KCk7JztcbmZ1bmN0aW9uIGdldEFtcFBhdGgoYW1wUGF0aCwgYXNQYXRoKSB7XG4gICAgcmV0dXJuIGFtcFBhdGggfHwgYCR7YXNQYXRofSR7YXNQYXRoLmluY2x1ZGVzKCc/JykgPyAnJicgOiAnPyd9YW1wPTFgO1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1fZG9jdW1lbnQuanMubWFwIiwiaW1wb3J0IHsgQ29sb3JNb2RlU2NyaXB0IH0gZnJvbSAnQGNoYWtyYS11aS9yZWFjdCdcbmltcG9ydCBOZXh0RG9jdW1lbnQsIHsgSHRtbCwgSGVhZCwgTWFpbiwgTmV4dFNjcmlwdH0gZnJvbSAnbmV4dC9kb2N1bWVudCdcbmltcG9ydCB0aGVtZSBmcm9tICcuLi9saWIvdGhlbWUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgTmV4dERvY3VtZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4oXG4gICAgICA8SHRtbCBsYW5nPVwiZW5cIj5cbiAgICAgICAgPEhlYWQgLz5cbiAgICAgICAgPGJvZHk+XG4gICAgICAgICAgPENvbG9yTW9kZVNjcmlwdCBpbml0aWFsQ29sb3JNb2RlPXt0aGVtZS5jb25maWcuaW50aWFsQ29sb3JNb2RlfSAvPlxuICAgICAgICAgIDxNYWluIC8+XG4gICAgICAgICAgPE5leHRTY3JpcHQgLz5cbiAgICAgICAgPC9ib2R5PlxuICAgICAgPC9IdG1sPlxuICAgIClcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvcGFnZXMvX2RvY3VtZW50JylcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBjaGFrcmEtdWkvcmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGNoYWtyYS11aS90aGVtZS10b29sc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2VydmVyL2dldC1wYWdlLWZpbGVzLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zZXJ2ZXIvaHRtbGVzY2FwZS5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2VydmVyL3V0aWxzLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL2NvbnN0YW50cy5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9oZWFkLW1hbmFnZXItY29udGV4dC5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi91dGlscy5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3R5bGVkLWpzeC9zZXJ2ZXJcIik7Il0sIm5hbWVzIjpbImV4dGVuZFRoZW1lIiwibW9kZSIsInN0eWxlcyIsImdsb2JhbCIsInByb3BzIiwiYm9keSIsImJnIiwiY29tcG9uZW50cyIsIkhlYWRpbmciLCJ2YXJpYW50cyIsInRleHREZWNvcmF0aW9uIiwiZm9udFNpemUiLCJ0ZXh0VW5kZXJsaW5lT2Zmc2V0IiwidGV4dERlY29yYXRpb25Db2xvciIsInRleHREZWNvcmF0aW9uVGhpY2tuZXNzIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwiTGluayIsImJhc2VTdHlsZSIsImNvbG9yIiwiZm9udHMiLCJoZWFkaW5nIiwiY29sb3JzIiwiZ2xhc3NUZWFsIiwiY29uZmlnIiwiaW5pdGlhbENvbG9yTW9kZSIsInVzZVN5c3RlbUNvbG9yTW9kZSIsInRoZW1lIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkZWZhdWx0IiwiaW5pdEhlYWRNYW5hZ2VyIiwiRE9NQXR0cmlidXRlTmFtZXMiLCJhY2NlcHRDaGFyc2V0IiwiY2xhc3NOYW1lIiwiaHRtbEZvciIsImh0dHBFcXVpdiIsIm5vTW9kdWxlIiwicmVhY3RFbGVtZW50VG9ET00iLCJ0eXBlIiwiZWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJ1bmRlZmluZWQiLCJhdHRyIiwidG9Mb3dlckNhc2UiLCJzZXRBdHRyaWJ1dGUiLCJjaGlsZHJlbiIsImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIiwiaW5uZXJIVE1MIiwiX19odG1sIiwidGV4dENvbnRlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJqb2luIiwidXBkYXRlRWxlbWVudHMiLCJoZWFkRWwiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImhlYWRDb3VudEVsIiwicXVlcnlTZWxlY3RvciIsImNvbnNvbGUiLCJlcnJvciIsImhlYWRDb3VudCIsIk51bWJlciIsImNvbnRlbnQiLCJvbGRUYWdzIiwiaSIsImoiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwidGFnTmFtZSIsInB1c2giLCJuZXdUYWdzIiwibWFwIiwiZmlsdGVyIiwibmV3VGFnIiwiayIsImxlbiIsImxlbmd0aCIsIm9sZFRhZyIsImlzRXF1YWxOb2RlIiwic3BsaWNlIiwiZm9yRWFjaCIsInQiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJ0b1N0cmluZyIsInVwZGF0ZVByb21pc2UiLCJtb3VudGVkSW5zdGFuY2VzIiwiU2V0IiwidXBkYXRlSGVhZCIsImhlYWQiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwidGFncyIsImgiLCJocmVmIiwidGl0bGVDb21wb25lbnQiLCJ0aXRsZSIsInJlcXVlc3RJZGxlQ2FsbGJhY2siLCJjYW5jZWxJZGxlQ2FsbGJhY2siLCJzZWxmIiwiYmluZCIsIndpbmRvdyIsImNiIiwic3RhcnQiLCJEYXRlIiwibm93Iiwic2V0VGltZW91dCIsImRpZFRpbWVvdXQiLCJ0aW1lUmVtYWluaW5nIiwiTWF0aCIsIm1heCIsImlkIiwiY2xlYXJUaW1lb3V0IiwiaW5pdFNjcmlwdExvYWRlciIsIl9yZWFjdCIsInJlcXVpcmUiLCJfaGVhZE1hbmFnZXJDb250ZXh0IiwiX2hlYWRNYW5hZ2VyIiwiX3JlcXVlc3RJZGxlQ2FsbGJhY2siLCJfZGVmaW5lUHJvcGVydHkiLCJvYmoiLCJrZXkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJfb2JqZWN0U3ByZWFkIiwidGFyZ2V0IiwiYXJndW1lbnRzIiwic291cmNlIiwib3duS2V5cyIsImtleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJjb25jYXQiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJleGNsdWRlZCIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIiwic291cmNlU3ltYm9sS2V5cyIsImluZGV4T2YiLCJwcm90b3R5cGUiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsImNhbGwiLCJzb3VyY2VLZXlzIiwiU2NyaXB0Q2FjaGUiLCJNYXAiLCJMb2FkQ2FjaGUiLCJpZ25vcmVQcm9wcyIsImxvYWRTY3JpcHQiLCJzcmMiLCJvbkxvYWQiLCJzdHJhdGVneSIsIm9uRXJyb3IiLCJjYWNoZUtleSIsImhhcyIsImFkZCIsImdldCIsImxvYWRQcm9taXNlIiwicmVqZWN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJjYXRjaCIsInNldCIsImVudHJpZXMiLCJpbmNsdWRlcyIsImFwcGVuZENoaWxkIiwiaGFuZGxlQ2xpZW50U2NyaXB0TG9hZCIsImxvYWRMYXp5U2NyaXB0IiwicmVhZHlTdGF0ZSIsInNjcmlwdExvYWRlckl0ZW1zIiwiU2NyaXB0IiwicmVzdFByb3BzIiwidXBkYXRlU2NyaXB0cyIsInNjcmlwdHMiLCJnZXRJc1NzciIsInVzZUNvbnRleHQiLCJIZWFkTWFuYWdlckNvbnRleHQiLCJ1c2VFZmZlY3QiLCJiZWZvcmVJbnRlcmFjdGl2ZSIsIl9kZWZhdWx0IiwiX3V0aWxzIiwiRG9jdW1lbnRDb250ZXh0IiwiRG9jdW1lbnRJbml0aWFsUHJvcHMiLCJEb2N1bWVudFByb3BzIiwiSHRtbCIsIk1haW4iLCJfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCIsIl9zZXJ2ZXIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX2NvbnN0YW50cyIsIl9nZXRQYWdlRmlsZXMiLCJfdXRpbHMxIiwiX2h0bWxlc2NhcGUiLCJfc2NyaXB0IiwiX19lc01vZHVsZSIsIm5ld09iaiIsImRlc2MiLCJnZXREb2N1bWVudEZpbGVzIiwiYnVpbGRNYW5pZmVzdCIsInBhdGhuYW1lIiwiaW5BbXBNb2RlIiwic2hhcmVkRmlsZXMiLCJnZXRQYWdlRmlsZXMiLCJwYWdlRmlsZXMiLCJhbGxGaWxlcyIsImdldFBvbHlmaWxsU2NyaXB0cyIsImNvbnRleHQiLCJhc3NldFByZWZpeCIsImRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nIiwiZGlzYWJsZU9wdGltaXplZExvYWRpbmciLCJwb2x5ZmlsbEZpbGVzIiwicG9seWZpbGwiLCJlbmRzV2l0aCIsImRlZmVyIiwibm9uY2UiLCJjcm9zc09yaWdpbiIsInByb2Nlc3MiLCJlbnYiLCJfX05FWFRfQ1JPU1NfT1JJR0lOIiwiZ2V0UHJlTmV4dFNjcmlwdHMiLCJzY3JpcHRMb2FkZXIiLCJmaWxlIiwiaW5kZXgiLCJzY3JpcHRQcm9wcyIsImFzc2lnbiIsImdldER5bmFtaWNDaHVua3MiLCJmaWxlcyIsImR5bmFtaWNJbXBvcnRzIiwiaXNEZXZlbG9wbWVudCIsImFzeW5jIiwiZW5jb2RlVVJJIiwiZ2V0U2NyaXB0cyIsInJlZiIsIm5vcm1hbFNjcmlwdHMiLCJsb3dQcmlvcml0eVNjcmlwdHMiLCJsb3dQcmlvcml0eUZpbGVzIiwiRG9jdW1lbnQxIiwiQ29tcG9uZW50IiwiZ2V0SW5pdGlhbFByb3BzIiwiY3R4IiwiZW5oYW5jZUFwcCIsIkFwcCIsImh0bWwiLCJyZW5kZXJQYWdlIiwicmVuZGVyIiwiSGVhZCIsIk5leHRTY3JpcHQiLCJkb2NDb21wb25lbnRzUmVuZGVyZWQiLCJsb2NhbGUiLCJIdG1sQ29udGV4dCIsImxhbmciLCJhbXAiLCJnZXRDc3NMaW5rcyIsImNzc0ZpbGVzIiwiZiIsInVubWFuZ2VkRmlsZXMiLCJkeW5hbWljQ3NzRmlsZXMiLCJmcm9tIiwiZXhpc3RpbmciLCJjc3NMaW5rRWxlbWVudHMiLCJpc1NoYXJlZEZpbGUiLCJfX05FWFRfT1BUSU1JWkVfQ1NTIiwicmVsIiwiYXMiLCJpc1VubWFuYWdlZEZpbGUiLCJfX05FWFRfT1BUSU1JWkVfRk9OVFMiLCJtYWtlU3R5bGVzaGVldEluZXJ0IiwiZ2V0UHJlbG9hZER5bmFtaWNDaHVua3MiLCJCb29sZWFuIiwiZ2V0UHJlbG9hZE1haW5MaW5rcyIsInByZWxvYWRGaWxlcyIsImhhbmRsZURvY3VtZW50U2NyaXB0TG9hZGVySXRlbXMiLCJmaWx0ZXJlZENoaWxkcmVuIiwiQ2hpbGRyZW4iLCJjaGlsZCIsIl9fTkVYVF9EQVRBX18iLCJub2RlIiwiYyIsIk9QVElNSVpFRF9GT05UX1BST1ZJREVSUyIsInNvbWUiLCJ1cmwiLCJzdGFydHNXaXRoIiwibmV3UHJvcHMiLCJjbG9uZUVsZW1lbnQiLCJhbXBQYXRoIiwiaHlicmlkQW1wIiwiY2Fub25pY2FsQmFzZSIsImRhbmdlcm91c0FzUGF0aCIsImhlYWRUYWdzIiwidW5zdGFibGVfcnVudGltZUpTIiwidW5zdGFibGVfSnNQcmVsb2FkIiwiZGlzYWJsZVJ1bnRpbWVKUyIsImRpc2FibGVKc1ByZWxvYWQiLCJjc3NQcmVsb2FkcyIsIm90aGVySGVhZEVsZW1lbnRzIiwidG9BcnJheSIsImlzUmVhY3RIZWxtZXQiLCJyZWYxIiwid2FybiIsIm5hbWUiLCJoYXNBbXBodG1sUmVsIiwiaGFzQ2Fub25pY2FsUmVsIiwiYmFkUHJvcCIsInByb3AiLCJwYWdlIiwiY3VyU3R5bGVzIiwiaGFzU3R5bGVzIiwicmVmMiIsInJlZjMiLCJfbm9uY2UiLCJfbm9uY2UxIiwiRnJhZ21lbnQiLCJjb3VudCIsImNsZWFuQW1wUGF0aCIsInN0eWxlIiwicmVwbGFjZSIsImdldEFtcFBhdGgiLCJfX05FWFRfT1BUSU1JWkVfSU1BR0VTIiwiY29udGV4dFR5cGUiLCJCT0RZX1JFTkRFUl9UQVJHRVQiLCJnZXRJbmxpbmVTY3JpcHRTb3VyY2UiLCJkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsImh0bWxFc2NhcGVKc29uU3RyaW5nIiwiZXJyIiwibWVzc2FnZSIsIkVycm9yIiwiYW1wRGV2RmlsZXMiLCJkZXZGaWxlcyIsInNhZmFyaU5vbW9kdWxlRml4IiwiYXNQYXRoIiwiQ29sb3JNb2RlU2NyaXB0IiwiTmV4dERvY3VtZW50IiwiRG9jdW1lbnQiLCJpbnRpYWxDb2xvck1vZGUiXSwic291cmNlUm9vdCI6IiJ9