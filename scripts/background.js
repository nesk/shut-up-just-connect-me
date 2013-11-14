/*
 * So, let me explain what the fucking fuck is happening in this file. We
 * authenticate the user with a simple POST request, then we want to redirect
 * him to the webpage he asked for... BUT! This is not possible. Well, not
 * immediately. When the UCOPIA firewall responds to your authentication request,
 * it could seems logical that the user is authenticated, however this is not the
 * case... Once you get the response, there is a delay (~1s) before the user is
 * fully authenticated and can connect to a website. So, don't freak out because
 * I put a `setTimeout` call, I didn't have the choice.
 */

/**
 * Globals
 */

var storage = chrome.storage.sync,
    credential;

/**
 * Functions
 */

function interceptControllerRequest(details) {
    var url = details.url,
        requestedURL = decodeURIComponent(url.substring(url.indexOf('=') + 1));

    // Display the waiting page
    chrome.tabs.update(details.tabId, {
        url: chrome.extension.getURL('templates/transition.html')
    });

    // Display the requested page once the authentication is completed
    if(connect(credential.login, credential.password)) {
        setTimeout(function() {
            chrome.tabs.update(details.tabId, {
                url: requestedURL
            });
        }, 1000);

        return { cancel: true };
    }

    // If the authentication fails, fallback to the default behavior of the UCOPIA firewall
    return { cancel: false };
}

function loadCredential() {
    storage.get(['login', 'password'], function(items) {
        credential = items;
    });
}

/**
 * Events
 */

chrome.webRequest.onBeforeRequest.addListener(
    interceptControllerRequest,
    {
        urls: ['https://controller.sciences-ulyon.fr/?dst=*']
    },
    ['blocking']
);

chrome.storage.onChanged.addListener(loadCredential);

// At launch, load the user credential for the first time
loadCredential();