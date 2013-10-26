var storage = chrome.storage.sync;

document.querySelector('#auth-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var login = this.querySelector('[name=login]').value,
        password = this.querySelector('[name=password]').value;

    connect(login, password);

    storage.set({
        login: login,
        password: password
    });

}, false);