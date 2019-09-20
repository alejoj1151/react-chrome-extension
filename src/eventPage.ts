import { log } from './utils/logger';

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
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    if (request.changeShortcuts) {
        chrome.tabs.create({
            active: true,
            url: 'chrome://extensions/shortcuts',
        });
    } else if (request.contactDeveloper) {
        contactDeveloper();
    } else if (request.isActive !== undefined) {
        chrome.browserAction.setBadgeBackgroundColor({
            color: '#201c55',
        });
        chrome.browserAction.setBadgeText({
            text: request.isActive ? 'ON' : 'OFF',
        });
    } else if (request.goFundMe) {
        _gaq.push(['_trackEvent', 'telemetry', 'goFundMe']);
    } else if (request.announcementShown) {
        _gaq.push(['_trackEvent', 'telemetry', 'announcementShown']);
    }

    return isResponseAsync;
});

// This function hits the mailto protocol and returns user to current tab.
function contactDeveloper() {
    chrome.tabs.query(
        {
            active: true,
        },
        tabs => {
            // Caches current user tab so we can returnto it.
            const currentTabId = tabs[0].id;

            chrome.tabs.create(
                {
                    active: true,
                    url: 'mailto:aljaramillohi@unal.edu.co?subject=[FiltrosProjectCO]%20Subject',
                },
                mailToTab => {
                    setTimeout(function () {
                        // Closes tab created by mailto protocol.
                        chrome.tabs.remove(mailToTab.id);

                        // Makes previously focused tab selected.
                        chrome.tabs.update(currentTabId, {
                            highlighted: true,
                        });
                    }, 150);
                }
            );
        }
    );
}

// Listens for hotkeys to be pressed and notifies content script.
chrome.commands.onCommand.addListener(command => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const currentTab = tabs[0].id;

        chrome.tabs.sendMessage(currentTab, { getActiveElement: true }, (isInInput: boolean) => {
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
