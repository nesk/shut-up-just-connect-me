// Handle the authentication form
document.querySelector('#auth-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var login = this.querySelector('[name=login]').value,
        password = this.querySelector('[name=password]').value;

    if(login && password) {
        // Remove the focus on all the inputs
        for(var i = 0, input ; input = document.querySelectorAll('input')[i++] ;) {
            input.blur();
        }

        document.querySelector('#overlay').classList.add('active');

        connect(login, password);

        // Save the credential
        chrome.storage.sync.set({
            login: login,
            password: password
        });
    }

}, false);