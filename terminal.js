const input = document.getElementById('cmd');
const cons = document.getElementById('console');
const inputContainer = document.getElementById('input-container');

// Base64 encoded payload to hide it from DevTools snoopers
const securePayload = "ewogICJjdXJyZW50X25vZGUiOiAiVHV0b3JpYWwgSGFsbCIsCiAgInN0YXR1cyI6ICJDb21wbGV0ZSIsCiAgIm5leHRfbm9kZV9zcGVjcyI6IHsKICAgICJzdXJmYWNlX2hleCI6ICIjNDE5ODBhIiwKICAgICJtYXhfY29uY3VycmVudF91c2VycyI6IDIwLAogICAgInJ1bnRpbWVfbGltaXQiOiAiOTAgbWlucyIsCiAgICAicHJpbWFyeV9vYmplY3RpdmUiOiAiQnlwYXNzIHRoZSBrZWVwZXIiLAogICAgInVzcl9jb21tZW50cyI6ICJBdCB0aGUgcGVhayBvZiB0aGUgcGFsYWNlLCBsaWVzIGEgY3J5c3RhbCB5b3Ugc2Vlay4gSW4gdGhlIGNpdHkgb2YgbWVuLCB5b3Ugd2lsbCBmaW5kIHVzIHVuaXRlZCIKICB9Cn0=";

document.body.addEventListener('click', () => input.focus());

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let rawCmd = input.value;
        let cmdParts = rawCmd.trim().split(/\s+/);
        let baseCmd = cmdParts[0].toLowerCase();
        let args = cmdParts.slice(1).join(' ');
        let response = "";

        if (baseCmd === '') {
            // Do nothing
        } else if (baseCmd === 'help') {
            response = "if you need help now, you may as well give up";
        } else if (baseCmd === 'echo') {
            response = args;
        } else if (baseCmd === 'ls') {
            response = "clue.txt   read_only.json";
        } else if (baseCmd === 'vim' || baseCmd === 'vi' || baseCmd === 'nano') {
            response = "permission denied: this isnt what you think it is";
        } else if (baseCmd === 'cat') {
            if (args === 'read_only.json') {
                // Decodes the Base64 string back into readable JSON when the right command is typed
                response = atob(securePayload);
            } else if (args === 'clue.txt') {
                response = "cat: clue.txt: Permission denied";
            } else if (args === '') {
                response = "cat: missing operand";
            } else {
                response = `cat: ${args}: No such file or directory`;
            }
        } else if (baseCmd === 'exit') {
            inputContainer.style.display = 'none';
            document.body.innerHTML += "<div style='color:#f85149; font-weight:bold; margin-top:10px;'>[Process completed] Connection closed by foreign host.</div>";
            setTimeout(() => window.close(), 1500);
            return;
        } else if (baseCmd === 'clear') {
            cons.innerHTML = "";
            input.value = "";
            return;
        } else {
            response = `bash: ${baseCmd}: command not found`;
        }

        let cmdOutput = `<div class="prompt-line"><span class="prompt-text">user@hunt:~$</span><span>${rawCmd}</span></div>`;
        if (response) {
            cmdOutput += `<div class="output">${response}</div>`;
        }
        
        cons.innerHTML += cmdOutput;
        input.value = '';
        window.scrollTo(0, document.body.scrollHeight);
    }
});
