const outputDiv = document.getElementById('terminal-output');

// Phase 1 Elements
const passwordLine = document.getElementById('password-line');
const passwordInput = document.getElementById('password-input');

// Phase 2 Elements
const commandLine = document.getElementById('command-line');
const commandInput = document.getElementById('command-input');

let currentPhase = 1;

// Phase 1 Boot Sequence
const bootMessages = [
    "Initialising SSH module...",
    "Setting reverse map node...",
    "IP address identified",
    "Securing reverse proxy to system..."
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runBootSequence() {
    for (let i = 0; i < bootMessages.length; i++) {
        printLine(bootMessages[i]);
        await sleep(800);
    }
    passwordLine.style.display = 'flex';
    outputDiv.appendChild(passwordLine); 
    passwordInput.focus();
}

// Utility to safely clear the screen based on active phase
function clearScreen() {
    if (currentPhase === 1 && passwordLine.parentNode === outputDiv) {
        outputDiv.removeChild(passwordLine);
    } else if (currentPhase === 2 && commandLine.parentNode === outputDiv) {
        outputDiv.removeChild(commandLine);
    }
    outputDiv.innerHTML = '';
}

function printLine(text) {
    const p = document.createElement('p');
    p.textContent = text;
    outputDiv.appendChild(p);
}

function printPre(text) {
    const pre = document.createElement('pre');
    pre.textContent = text;
    outputDiv.appendChild(pre);
}

// Start Phase 2: Swap the elements completely
function startPhase2() {
    currentPhase = 2;
    clearScreen(); 
    
    const fastfetchCat = 
` /\\_/\\   OS: Pink Linux 29.04
( o.o )  Kernel: Linux RISP 0.1
 > ^ <   Memory: 9.2G  / 128G
         Files: 4`;

    printPre(fastfetchCat);
    
    // Display and inject the Phase 2 command line element
    commandLine.style.display = 'flex';
    outputDiv.appendChild(commandLine);
    commandInput.focus();
}

// --- CONSTANTS & DATA ---
const fileList = [
    "key.txt", "location.node", "config.sys", "notes.log", "data.db", 
    "auth.sh", "backup.tar.gz", "readme.md", "image_01.png", "image_02.png",
    "script.py", "index.html", "style.css", "main.js", "todo.txt", 
    "temp_cache", "logs_old.zip", "network.cfg", "users.json", "manifest.xml"
];

// --- HELPER FUNCTIONS ---
function generateNonsense(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// --- PHASE 3 PLACEHOLDER FUNCTIONS ---
function cmd_ls(args) { return fileList.join("    "); }
function cmd_cd(args) { return "Cannot change directory. Error: Static filesystem"; }
function cmd_cat(args) { if (args.length === 0) return "Usage: cat <filename>";
    
    const filename = args[0];

    // 1. Handle key.txt
    if (filename === "key.txt") {
        return `In the modern era, our lives are partitioned into digital silos—bank accounts, medical records, social media archives, and professional correspondences.
 Each of these silos is guarded by a gatekeeper that is as fragile as it is ubiquitous: the password. While the concept of a "secret word" for entry dates back to ancient military watchwords, its digital incarnation has become the primary battleground for personal privacy. 
As we transition deeper into an age of pervasive surveillance and sophisticated cybercrime, the relationship between privacy and passwords has evolved from a simple security measure into a complex sociological and technical dilemma.
To understand the role of passwords, one must first define privacy in a digital context. Privacy is not merely the act of hiding information; it is the power to selectively reveal oneself to the world.
It is the boundary between the individual and the collective. key=pinkisreal In the physical world, walls and locks provide this boundary. 
In the digital world, where data is fluid and easily replicated, the "lock" is encryption, and the "key" is often a password.
`;
    }

    // 2. Handle location.node
    if (filename === "location.node") {
        const password = prompt("ENTER ACCESS KEY:");
        if (password === "pinkisreal") {
            return `[
{
    location: node-24341;
    area: #136d15;
    instruction: find the keeper of secrets at the top of the peakside net;
    cluesets: {
        "at the palace of crystals";
        "lies a city united";
        "where the saints of german";
        "pray for the lightning";
    }
}
]`;
        } else {
            cmd_clear();
            return "Access Denied. Terminal memory cleared.";
        }
    }

    // 3. Handle other files in the list
    if (fileList.includes(filename)) {
        return generateNonsense(200);
    }

    // 4. File not found
    return `cat: ${filename}: No such file or directory`; }

// --- TERMINAL COMMAND FUNCTIONS ---
function cmd_pwd(args) { return "/home/pink"; }
function cmd_whoami(args) { return "pink"; }
function cmd_date(args) { return new Date().toString(); }
function cmd_echo(args) { return args.join(" "); }

function cmd_clear(args) { 
    clearScreen();
    return ""; 
}

function cmd_help(args) {
    return "Available commands: cat, cd, clear, date, echo, help, ip, ls, netscan, ping, pwd, whoami";
}

function cmd_ip(args) {
    return `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.104  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)`;
}

function cmd_netscan(args) {
    return `Scanning local subnet...
Node found: 192.168.1.1   (Router)
Node found: 192.168.1.104 (kimchi)
Node found: 192.168.1.220 (Unknown - Port 80, 443 Open)`;
}

function cmd_ping(args) {
    if (args.length === 0) return "Usage: ping <target>";
    const target = args[0];
    return `PING ${target} (56 data bytes)
64 bytes from ${target}: icmp_seq=1 ttl=64 time=0.042 ms
64 bytes from ${target}: icmp_seq=2 ttl=64 time=0.039 ms
64 bytes from ${target}: icmp_seq=3 ttl=64 time=0.041 ms`;
}

const commands = {
    "ls": cmd_ls,
    "cd": cmd_cd,
    "cat": cmd_cat,
    "pwd": cmd_pwd,
    "whoami": cmd_whoami,
    "date": cmd_date,
    "echo": cmd_echo,
    "clear": cmd_clear,
    "help": cmd_help,
    "ip": cmd_ip,
    "netscan": cmd_netscan,
    "ping": cmd_ping
};

function processCommand(input) {
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    if (cmd === "") return;

    if (commands.hasOwnProperty(cmd)) {
        const result = commands[cmd](args);
        if (result) printPre(result);
    } else {
        printLine(`bash: ${cmd}: command not found`);
    }
}

// --- EVENT LISTENERS ---

// Phase 1 Listener (Password)
passwordInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const inputVal = passwordInput.value;

        if (inputVal.trim() === 'hypervisor') {
            startPhase2();
        } else {
            printLine("Access denied.");
            outputDiv.appendChild(passwordLine); 
            passwordInput.value = ''; 
            passwordInput.focus();
            window.scrollTo(0, document.body.scrollHeight);
        }
    }
});

// Phase 2 Listener (Commands)
commandInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const inputVal = commandInput.value;
        
        printLine(`pink@kimchi $: ${inputVal}`); 
        processCommand(inputVal);
        
        outputDiv.appendChild(commandLine); 
        commandInput.value = '';
        commandInput.focus();
        window.scrollTo(0, document.body.scrollHeight);
    }
});

// Global Click Focus
document.addEventListener('click', () => {
    if (currentPhase === 1 && passwordLine.style.display === 'flex') {
        passwordInput.focus();
    } else if (currentPhase === 2 && commandLine.style.display === 'flex') {
        commandInput.focus();
    }
});

window.onload = runBootSequence;