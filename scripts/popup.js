/**
 * Globals
 */

var storage = chrome.storage.sync;

var panelList = document.querySelector('#panel-list'),
    overlay = document.querySelector('#overlay'),
    alert = document.querySelector('#alert');

var login = document.querySelector('[name=login]'),
    password = document.querySelector('[name=password]');

/**
 * Functions
 */

// Remove the focus on all the inputs
function removeFocus() {
    for(var i = 0, input ; input = document.querySelectorAll('input')[i++] ;) {
        input.blur();
    }
}

function displayPanel(panelNumber) {
    setTimeout(removeFocus, 100); // Oooooh, that's so bad!
    overlay.classList.remove('visible');
    
    // Remove the current class and define the choosed panel 
    panelList.classList.remove(panelList.classList[0]);
    panelList.classList.add('display-panel-'+ panelNumber);
}

/**
 * Launch code
 */

storage.get(['login', 'password'], function(items) {
    if(items.login && items.password)
        displayPanel(2);
    else
        overlay.classList.remove('visible');
});

/**
 * Events
 */

// Handle the authentication form
document.querySelector('#auth-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var loginValue = login.value,
        passwordValue = password.value;

    if(loginValue && passwordValue) {
        removeFocus();

        alert.classList.remove('visible');
        overlay.classList.add('visible');

        connect(loginValue, passwordValue, function success() {
            // Save the credential
            storage.set({
                login: loginValue,
                password: passwordValue
            });

            // Switch to the second panel
            displayPanel(2);
        }, function failure() {
            alert.classList.add('visible');
            overlay.classList.remove('visible');
        });
    }

}, false);

// Handle the disconnect button
document.querySelector('#disconnect').addEventListener('click', function() {
    disconnect();
    displayPanel(1);
    login.value = password.value = '';
});