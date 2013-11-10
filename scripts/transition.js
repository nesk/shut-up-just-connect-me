/*
 * No, I'm not crazy. Chrome extensions can't execute inline scripts so
 * here is just a three-line script in a single file. FUCK YEAH!
 */

setTimeout(function() {
    document.querySelector('#loading').classList.add('visible');
}, 200);