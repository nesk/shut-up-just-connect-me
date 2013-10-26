/**
 * Authentication functions
 */

function connect(login, password) {
    var data = new FormData();
        data.append('action', 'authenticate');
        data.append('policy_accept', 'false');
        data.append('login', login);
        data.append('password', password);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://controller.sciences-ulyon.fr/portal_api.php', false);
    xhr.send(data);

    return xhr;
}