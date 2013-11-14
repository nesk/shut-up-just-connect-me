/**
 * Authentication functions
 */

function connect(login, password, successCallback, failureCallback) {
    var data = new FormData();
        data.append('action', 'authenticate');
        data.append('policy_accept', 'false');
        data.append('login', login);
        data.append('password', password);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://controller.sciences-ulyon.fr/portal_api.php', true);

    xhr.addEventListener('error', failureCallback);
    xhr.addEventListener('load', function() {
        var data = JSON.parse(this.responseText);
        if(!data.error)
            successCallback();
        else
            failureCallback();
    });

    xhr.send(data);
}

function disconnect() {
    chrome.storage.sync.remove(['login', 'password']);
}