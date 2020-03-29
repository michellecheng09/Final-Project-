// ===============
// ==   Forms   ==
// ===============

// handles the lobby updating and start button
const signupFormSubmit = (event) => {
    event.preventDefault();
    const input = document.getElementById('name');
    const text = input.value;
    sock.emit('name', text);

    const form = document.getElementById('sign-in');   
    form.style.display = 'none';
}

// handle number of players
const numPlayersForm = (event) => {
    event.preventDefault();
    const input = document.getElementById('pnum');
    const numPlayers = input.value;

    sock.emit('num players', numPlayers);

    console.log(`Ok were gonna have ${numPlayers} players`);
};

// ===========================
// ===   Event Listeners   ===
// ===========================

const sock = io();

// clears lobby ul and creates updated li's
sock.on('lobby', (players) => {
    const parent = document.getElementById('lobby');
    let child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }

    players.forEach((player) => {
        const el = document.createElement('li');
        el.innerHTML = player;
        parent.appendChild(el);
    });
});

// welcomes players
sock.on('welcome', (data) => {
    // writes welcome message
    const parent = document.getElementById('banner');
    const el = document.createElement('h3');
    el.innerHTML = `Welcome ${data.name}`;
    parent.appendChild(el);

    // gives host player (p1) the ability to choose a number of players
    if(data.host) {
        const form = document.createElement('form');
        form.className = 'form'
        form.id = 'num-players'
        form.addEventListener('submit', numPlayersForm);

        // this input could also be changed to a dropdown but idk
        const number = document.createElement('input');
        number.setAttribute('type', 'number');
        number.setAttribute('min', 2);
        number.setAttribute('max', 4);
        number.id = 'pnum'

        const submit = document.createElement('input');
        submit.setAttribute('type', 'submit');

        parent.appendChild(form);
        form.appendChild(number);
        form.appendChild(submit);
    }
});

sock.on('waiting', () => {
    const waiting = document.getElementById('waiting');
    if(waiting) {
        waiting.parentNode.removeChild(waiting);
    }
    // show that players are waiting on more people to join
    const parent = document.getElementById('banner');
    const el = document.createElement('h3');
    el.id = 'waiting'
    el.innerHTML = `Waiting on more players...`;
    parent.appendChild(el);
});

sock.on('start', () => {
    console.log('players are here');
});

document.getElementById('sign-in').addEventListener('submit', signupFormSubmit);
