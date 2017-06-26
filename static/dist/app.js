/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function $(selector, callback) {

    if (callback) {

        [].concat(_toConsumableArray(document.querySelectorAll(selector))).forEach(callback);
    } else {

        return document.querySelector(selector) || document.createElement('div');
    }
}

$('.select-state', function (el) {

    el.onchange = function (e) {
        return localStorage.setItem('state', e.target.value);
    };
});

$('.search-btn', function (el) {

    el.onclick = function (e) {

        var path = e.target.getAttribute('data-path');

        var state = e.target.previousElementSibling.value;

        window.location = path + (state === 'all' ? '' : '/' + state);
    };
});

function selectState(s) {

    $('.select-state', function (el) {

        el.value = s;
    });
}

if (window.location.pathname === '/') {
    var fail = function fail() {

        localStorage.setItem('state', 'n/a');
    };

    var parseState = function parseState(json) {

        for (var i = 0; i < json.results.length; i++) {

            var parts = json.results[i].address_components;

            for (var j = 0; j < parts.length; j++) {

                if (parts[j].types.indexOf('administrative_area_level_1') !== -1) {

                    return parts[j].short_name;
                }
            }
        }
    };

    var state = localStorage.getItem('state');

    if (state !== 'n/a') {

        var states = [].concat(_toConsumableArray(document.querySelectorAll('.select-state option'))).map(function (opt) {
            return opt.value;
        });

        if (state && states.indexOf(state) !== -1) {

            selectState(state);
        } else if ('geolocation' in navigator) {

            navigator.geolocation.getCurrentPosition(function (pos) {

                fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.coords.latitude + ',' + pos.coords.longitude + '&components=administrative_area&key=' + atob(document.getElementById('something').innerHTML)).then(function (data) {
                    return data.json();
                }).then(function (json) {
                    return parseState(json);
                }).then(function (s) {

                    if (s && states.indexOf(s) !== -1) {

                        selectState(s);

                        localStorage.setItem('state', s);
                    } else {

                        fail();
                    }
                }).catch(fail);
            });
        } else {

            fail();
        }
    }

    var hero = $('.hero');

    if (hero && window.innerWidth > 400 && window.pageYOffset !== undefined) {
        var p = function p() {

            window.requestAnimationFrame(function () {

                hero.style.height = 380 - parseInt(window.pageYOffset / 4) + 'px';
            });
        };

        window.addEventListener('scroll', p);

        p();
    }
} else {

    selectState($('.select-state').getAttribute('data-init'));
}

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map