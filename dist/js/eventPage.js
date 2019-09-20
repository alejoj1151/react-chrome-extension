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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/eventPage.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/eventPage.ts":
/*!**************************!*\
  !*** ./src/eventPage.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Google Analytics bootstrap
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-108017342-1']);
var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = true;
ga.src = 'https://ssl.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);
// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // onMessage must return "true" if response is async.
    var isResponseAsync = false;
    if (request.changeShortcuts) {
        chrome.tabs.create({
            active: true,
            url: 'chrome://extensions/shortcuts',
        });
    }
    else if (request.contactDeveloper) {
        contactDeveloper();
    }
    else if (request.isActive !== undefined) {
        chrome.browserAction.setBadgeBackgroundColor({
            color: '#201c55',
        });
        chrome.browserAction.setBadgeText({
            text: request.isActive ? 'ON' : 'OFF',
        });
    }
    else if (request.goFundMe) {
        _gaq.push(['_trackEvent', 'telemetry', 'goFundMe']);
    }
    else if (request.announcementShown) {
        _gaq.push(['_trackEvent', 'telemetry', 'announcementShown']);
    }
    return isResponseAsync;
});
// This function hits the mailto protocol and returns user to current tab.
function contactDeveloper() {
    chrome.tabs.query({
        active: true,
    }, function (tabs) {
        // Caches current user tab so we can returnto it.
        var currentTabId = tabs[0].id;
        chrome.tabs.create({
            active: true,
            url: 'mailto:aljaramillohi@unal.edu.co?subject=[FiltrosProjectCO]%20Subject',
        }, function (mailToTab) {
            setTimeout(function () {
                // Closes tab created by mailto protocol.
                chrome.tabs.remove(mailToTab.id);
                // Makes previously focused tab selected.
                chrome.tabs.update(currentTabId, {
                    highlighted: true,
                });
            }, 150);
        });
    });
}
// Listens for hotkeys to be pressed and notifies content script.
chrome.commands.onCommand.addListener(function (command) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTab = tabs[0].id;
        chrome.tabs.sendMessage(currentTab, { getActiveElement: true }, function (isInInput) {
            // If user is typing in an input, ignore commands.
            if (isInInput) {
                return;
            }
            switch (command) {
                // toggleExtension
                case 'command0': {
                    chrome.tabs.sendMessage(currentTab, {
                        toggleExtension: true,
                    });
                    break;
                }
                // futbin
                case 'command1': {
                    _gaq.push(['_trackEvent', 'telemetry', 'futbin']);
                    chrome.tabs.sendMessage(currentTab, { futbin: true });
                    break;
                }
                // storeInClub
                case 'command2': {
                    _gaq.push(['_trackEvent', 'telemetry', 'storeInClub']);
                    chrome.tabs.sendMessage(currentTab, {
                        storeInClub: true,
                    });
                    break;
                }
                // buyNow
                case 'command3': {
                    _gaq.push(['_trackEvent', 'telemetry', 'buyNow']);
                    chrome.tabs.sendMessage(currentTab, { buyNow: true });
                    break;
                }
                // comparePrice
                case 'command4': {
                    _gaq.push(['_trackEvent', 'telemetry', 'comparePrice']);
                    chrome.tabs.sendMessage(currentTab, {
                        comparePrice: true,
                    });
                    break;
                }
                // quickSell
                case 'command5': {
                    _gaq.push(['_trackEvent', 'telemetry', 'quickSell']);
                    chrome.tabs.sendMessage(currentTab, {
                        quickSell: true,
                    });
                    break;
                }
                // sendToTransferList
                case 'command6': {
                    _gaq.push(['_trackEvent', 'telemetry', 'sendToTransferList']);
                    chrome.tabs.sendMessage(currentTab, {
                        sendToTransferList: true,
                    });
                    break;
                }
                // listMinBin
                case 'command7': {
                    _gaq.push(['_trackEvent', 'telemetry', 'listMinBin']);
                    chrome.tabs.sendMessage(currentTab, {
                        listMinBin: true,
                    });
                    break;
                }
                // list
                case 'command8': {
                    _gaq.push(['_trackEvent', 'telemetry', 'listItem']);
                    chrome.tabs.sendMessage(currentTab, {
                        list: true,
                    });
                    break;
                }
                // buyBronzePack
                case 'command9': {
                    _gaq.push(['_trackEvent', 'telemetry', 'buyBronzePack']);
                    chrome.tabs.sendMessage(currentTab, {
                        buyBronzePack: true,
                    });
                    break;
                }
                // quickSellAll
                case 'command10': {
                    _gaq.push(['_trackEvent', 'telemetry', 'quickSellAll']);
                    chrome.tabs.sendMessage(currentTab, {
                        quickSellAll: true,
                    });
                    break;
                }
                // storeAllInClub
                case 'command11': {
                    _gaq.push(['_trackEvent', 'telemetry', 'storeAllInClub']);
                    chrome.tabs.sendMessage(currentTab, {
                        storeAllInClub: true,
                    });
                    break;
                }
                // watch
                case 'command12': {
                    _gaq.push(['_trackEvent', 'telemetry', 'watch']);
                    chrome.tabs.sendMessage(currentTab, {
                        watch: true,
                    });
                    break;
                }
                // makeBid
                case 'command13': {
                    _gaq.push(['_trackEvent', 'telemetry', 'makeBid']);
                    chrome.tabs.sendMessage(currentTab, {
                        makeBid: true,
                    });
                    break;
                }
                // search
                case 'command14': {
                    _gaq.push(['_trackEvent', 'telemetry', 'search']);
                    chrome.tabs.sendMessage(currentTab, {
                        search: true,
                    });
                    break;
                }
                // decreaseMinBidPrice
                case 'command15': {
                    _gaq.push(['_trackEvent', 'telemetry', 'decreaseMinBidPrice']);
                    chrome.tabs.sendMessage(currentTab, {
                        decreaseMinBidPrice: true,
                    });
                    break;
                }
                // increaseMinBidPrice
                case 'command16': {
                    _gaq.push(['_trackEvent', 'telemetry', 'increaseMinBidPrice']);
                    chrome.tabs.sendMessage(currentTab, {
                        increaseMinBidPrice: true,
                    });
                    break;
                }
                // decreaseMaxBidPrice
                case 'command17': {
                    _gaq.push(['_trackEvent', 'telemetry', 'decreaseMaxBidPrice']);
                    chrome.tabs.sendMessage(currentTab, {
                        decreaseMaxBidPrice: true,
                    });
                    break;
                }
                // increaseMaxBidPrice
                case 'command18': {
                    _gaq.push(['_trackEvent', 'telemetry', 'increaseMaxBidPrice']);
                    chrome.tabs.sendMessage(currentTab, {
                        increaseMaxBidPrice: true,
                    });
                    break;
                }
            }
        });
    });
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50UGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoRkEsNkJBQTZCO0FBQzdCLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7QUFDN0MsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQyxFQUFFLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO0FBQzVCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLEVBQUUsQ0FBQyxHQUFHLEdBQUcsd0NBQXdDLENBQUM7QUFDbEQsSUFBSSxD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LFdBQVcsQ0FBQyxDQUFDO29CQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQztvQkFDL0QsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFO3dCQUNoQyxtQkFBbUIsRUFBRSxJQUFJO3FCQUM1QixDQUFDLENBQUM7b0JBQ0gsTUFBTTtpQkFDVDtnQkFDRCxzQkFBc0I7Z0JBQ3RCLEtBQUssV0FBVyxDQUFDLENBQUM7b0JBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDO29CQUMvRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUU7d0JBQ2hDLG1CQUFtQixFQUFFLElBQUk7cUJBQzVCLENBQUMsQ0FBQztvQkFDSCxNQUFNO2lCQUNUO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiZXZlbnRQYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZXZlbnRQYWdlLnRzXCIpO1xuIiwiaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi91dGlscy9sb2dnZXInO1xuXG4vLyBHb29nbGUgQW5hbHl0aWNzIGJvb3RzdHJhcFxudmFyIF9nYXEgPSBfZ2FxIHx8IFtdO1xuX2dhcS5wdXNoKFsnX3NldEFjY291bnQnLCAnVUEtMTA4MDE3MzQyLTEnXSk7XG52YXIgZ2EgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbmdhLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbmdhLmFzeW5jID0gdHJ1ZTtcbmdhLnNyYyA9ICdodHRwczovL3NzbC5nb29nbGUtYW5hbHl0aWNzLmNvbS9nYS5qcyc7XG52YXIgcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbnMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZ2EsIHMpO1xuXG4vLyBMaXN0ZW4gdG8gbWVzc2FnZXMgc2VudCBmcm9tIG90aGVyIHBhcnRzIG9mIHRoZSBleHRlbnNpb24uXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgLy8gb25NZXNzYWdlIG11c3QgcmV0dXJuIFwidHJ1ZVwiIGlmIHJlc3BvbnNlIGlzIGFzeW5jLlxuICAgIGxldCBpc1Jlc3BvbnNlQXN5bmMgPSBmYWxzZTtcblxuICAgIGlmIChyZXF1ZXN0LmNoYW5nZVNob3J0Y3V0cykge1xuICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgdXJsOiAnY2hyb21lOi8vZXh0ZW5zaW9ucy9zaG9ydGN1dHMnLFxuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHJlcXVlc3QuY29udGFjdERldmVsb3Blcikge1xuICAgICAgICBjb250YWN0RGV2ZWxvcGVyKCk7XG4gICAgfSBlbHNlIGlmIChyZXF1ZXN0LmlzQWN0aXZlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3Ioe1xuICAgICAgICAgICAgY29sb3I6ICcjMjAxYzU1JyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7XG4gICAgICAgICAgICB0ZXh0OiByZXF1ZXN0LmlzQWN0aXZlID8gJ09OJyA6ICdPRkYnLFxuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHJlcXVlc3QuZ29GdW5kTWUpIHtcbiAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLCAndGVsZW1ldHJ5JywgJ2dvRnVuZE1lJ10pO1xuICAgIH0gZWxzZSBpZiAocmVxdWVzdC5hbm5vdW5jZW1lbnRTaG93bikge1xuICAgICAgICBfZ2FxLnB1c2goWydfdHJhY2tFdmVudCcsICd0ZWxlbWV0cnknLCAnYW5ub3VuY2VtZW50U2hvd24nXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzUmVzcG9uc2VBc3luYztcbn0pO1xuXG4vLyBUaGlzIGZ1bmN0aW9uIGhpdHMgdGhlIG1haWx0byBwcm90b2NvbCBhbmQgcmV0dXJucyB1c2VyIHRvIGN1cnJlbnQgdGFiLlxuZnVuY3Rpb24gY29udGFjdERldmVsb3BlcigpIHtcbiAgICBjaHJvbWUudGFicy5xdWVyeShcbiAgICAgICAge1xuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB0YWJzID0+IHtcbiAgICAgICAgICAgIC8vIENhY2hlcyBjdXJyZW50IHVzZXIgdGFiIHNvIHdlIGNhbiByZXR1cm50byBpdC5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUYWJJZCA9IHRhYnNbMF0uaWQ7XG5cbiAgICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZShcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnbWFpbHRvOmFsamFyYW1pbGxvaGlAdW5hbC5lZHUuY28/c3ViamVjdD1bRmlsdHJvc1Byb2plY3RDT10lMjBTdWJqZWN0JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1haWxUb1RhYiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2xvc2VzIHRhYiBjcmVhdGVkIGJ5IG1haWx0byBwcm90b2NvbC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnJlbW92ZShtYWlsVG9UYWIuaWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNYWtlcyBwcmV2aW91c2x5IGZvY3VzZWQgdGFiIHNlbGVjdGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMudXBkYXRlKGN1cnJlbnRUYWJJZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICk7XG59XG5cbi8vIExpc3RlbnMgZm9yIGhvdGtleXMgdG8gYmUgcHJlc3NlZCBhbmQgbm90aWZpZXMgY29udGVudCBzY3JpcHQuXG5jaHJvbWUuY29tbWFuZHMub25Db21tYW5kLmFkZExpc3RlbmVyKGNvbW1hbmQgPT4ge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIHRhYnMgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50VGFiID0gdGFic1swXS5pZDtcblxuICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShjdXJyZW50VGFiLCB7IGdldEFjdGl2ZUVsZW1lbnQ6IHRydWUgfSwgKGlzSW5JbnB1dDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgLy8gSWYgdXNlciBpcyB0eXBpbmcgaW4gYW4gaW5wdXQsIGlnbm9yZSBjb21tYW5kcy5cbiAgICAgICAgICAgIGlmIChpc0luSW5wdXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaCAoY29tbWFuZCkge1xuICAgICAgICAgICAgICAgIC8vIHRvZ2dsZUV4dGVuc2lvblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbW1hbmQwJzoge1xuICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShjdXJyZW50VGFiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVFeHRlbnNpb246IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZnV0YmluXG4gICAgICAgICAgICAgICAgY2FzZSAnY29tbWFuZDEnOiB7XG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JywgJ3RlbGVtZXRyeScsICdmdXRiaW4nXSk7XG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGN1cnJlbnRUYWIsIHsgZnV0YmluOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gc3RvcmVJbkNsdWJcbiAgICAgICAgICAgICAgICBjYXNlICdjb21tYW5kMic6IHtcbiAgICAgICAgICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLCAndGVsZW1ldHJ5JywgJ3N0b3JlSW5DbHViJ10pO1xuICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShjdXJyZW50VGFiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZUluQ2x1YjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBidXlOb3dcbiAgICAgICAgICAgICAgICBjYXNlICdjb21tYW5kMyc6IHtcbiAgICAgICAgICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLCAndGVsZW1ldHJ5JywgJ2J1eU5vdyddKTtcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoY3VycmVudFRhYiwgeyBidXlOb3c6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjb21wYXJlUHJpY2VcbiAgICAgICAgICAgICAgICBjYXNlICdjb21tYW5kNCc6IHtcbiAgICAgICAgICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLCAndGVsZW1ldHJ5JywgJ2NvbXBhcmVQcmljZSddKTtcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoY3VycmVudFRhYiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGFyZVByaWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHF1aWNrU2VsbFxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbW1hbmQ1Jzoge1xuICAgICAgICAgICAgICAgICAgICBfZ2FxLnB1c2goWydfdHJhY2tFdmVudCcsICd0ZWxlbWV0cnknLCAncXVpY2tTZWxsJ10pO1xuICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShjdXJyZW50VGFiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWlja1NlbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gc2VuZFRvVHJhbnNmZXJMaXN0XG4gICAgICAgICAgICAgICAgY2FzZSAnY29tbWFuZDYnOiB7XG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JywgJ3RlbGVtZXRyeScsICdzZW5kVG9UcmFuc2Zlckxpc3QnXSk7XG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGN1cnJlbnRUYWIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRUb1RyYW5zZmVyTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBsaXN0TWluQmluXG4gICAgICAgICAgICAgICAgY2FzZSAnY29tbWFuZDcnOiB7XG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JywgJ3RlbGVtZXRyeScsICdsaXN0TWluQmluJ10pO1xuICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShjdXJyZW50VGFiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0TWluQmluOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGxpc3RcbiAgICAgICAgICAgICAgICBjYXNlICdjb21tYW5kOCc6IHtcbiAgICAgICAgICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLCAndGVsZW1ldHJ5JywgJ2xpc3RJdGVtJ10pO1xuICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShjdXJyZW50VGFiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGJ1eUJyb256ZVBhY2tcbiAgICAgICAgICAgICAgICBjYXNlICdjb21tYW5kOSc6IHtcbiAgICAgICAgICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLCAndGVsZW1ldHJ5JywgJ2J1eUJyb256ZVBhY2snXSk7XG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGN1cnJlbnRUYWIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1eUJyb256ZVBhY2s6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gcXVpY2tTZWxsQWxsXG4gICAgICAgICAgICAgICAgY2FzZSAnY29tbWFuZDEwJzoge1xuICAgICAgICAgICAgICAgICAgICBfZ2FxLnB1c2goWydfdHJhY2tFdmVudCcsICd0ZWxlbWV0cnknLCAncXVpY2tTZWxsQWxsJ10pO1xuICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShjdXJyZW50VGFiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWlja1NlbGxBbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gc3RvcmVBbGxJbkNsdWJcbiAgICAgICAgICAgICAgICBjYXNlICdjb21tYW5kMTEnOiB7XG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JywgJ3RlbGVtZXRyeScsICdzdG9yZUFsbEluQ2x1YiddKTtcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoY3VycmVudFRhYiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVBbGxJbkNsdWI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gd2F0Y2hcbiAgICAgICAgICAgICAgICBjYXNlICdjb21tYW5kMTInOiB7XG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JywgJ3RlbGVtZXRyeScsICd3YXRjaCddKTtcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoY3VycmVudFRhYiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2F0Y2g6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gbWFrZUJpZFxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbW1hbmQxMyc6IHtcbiAgICAgICAgICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLCAndGVsZW1ldHJ5JywgJ21ha2VCaWQnXSk7XG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGN1cnJlbnRUYWIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ha2VCaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gc2VhcmNoXG4gICAgICAgICAgICAgICAgY2FzZSAnY29tbWFuZDE0Jzoge1xuICAgICAgICAgICAgICAgICAgICBfZ2FxLnB1c2goWydfdHJhY2tFdmVudCcsICd0ZWxlbWV0cnknLCAnc2VhcmNoJ10pO1xuICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShjdXJyZW50VGFiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2g6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZGVjcmVhc2VNaW5CaWRQcmljZVxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbW1hbmQxNSc6IHtcbiAgICAgICAgICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLCAndGVsZW1ldHJ5JywgJ2RlY3JlYXNlTWluQmlkUHJpY2UnXSk7XG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGN1cnJlbnRUYWIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY3JlYXNlTWluQmlkUHJpY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaW5jcmVhc2VNaW5CaWRQcmljZVxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbW1hbmQxNic6IHtcbiAgICAgICAgICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLCAndGVsZW1ldHJ5JywgJ2luY3JlYXNlTWluQmlkUHJpY2UnXSk7XG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGN1cnJlbnRUYWIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY3JlYXNlTWluQmlkUHJpY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZGVjcmVhc2VNYXhCaWRQcmljZVxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbW1hbmQxNyc6IHtcbiAgICAgICAgICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLCAndGVsZW1ldHJ5JywgJ2RlY3JlYXNlTWF4QmlkUHJpY2UnXSk7XG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGN1cnJlbnRUYWIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY3JlYXNlTWF4QmlkUHJpY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaW5jcmVhc2VNYXhCaWRQcmljZVxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbW1hbmQxOCc6IHtcbiAgICAgICAgICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLCAndGVsZW1ldHJ5JywgJ2luY3JlYXNlTWF4QmlkUHJpY2UnXSk7XG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGN1cnJlbnRUYWIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY3JlYXNlTWF4QmlkUHJpY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9