# Shut up! Just connect me...

This Chrome extension manages to reconnect automatically the user to the __Sciences-U__ network (a french school). Since the captive portal used by this school is such a crap, I started to create this extension.

## About

### How does it work?

Each connection required by the captive portal can be detected by a simple HTTP trafic analysis. When a HTTP requests calls an URL matching the pattern `https://controller.sciences-ulyon.fr/?dst=*`, a reconnection is needed. The extension intercepts these requests (through the `chrome.webRequest` API) and displays a web page to inform the user about the reconnection (it takes a few seconds).

While displaying the temporary page, we try to authenticate the user (through a simple AJAX call) with the credential provided in the popup. Once it's done, we redirect him to the URL he asked for.

### Anything else?

If you want to contribute to this project, you should check the comments written in the [background.js](scripts/background.js) file, they could be really useful for you to understand how the authentication works.

## Setting up your development environment

This project uses the task runner __Grunt__ to compile the sources. To be able to use it, you must install the latest version of [Node](http://nodejs.org/). Once it's done, run this command with admin/root permissions to install __Grunt__:

    npm install -g grunt-cli

## Tasks

The project can be compiled through two tasks. Open a terminal, navigate to the project's root directory and run this command to compile all the sources into a `build/` folder, this is the default task:

    grunt

Then, you will be able to load this unpacked extension inside Chrome. Refer to [Chrome's documentation](http://developer.chrome.com/extensions/getstarted.html#unpacked) to know more about this operation.

The second task is used to compile the sources and pack it in a `release.zip` file, which can be immediately uploaded to the Chrome web Store:

    grunt release