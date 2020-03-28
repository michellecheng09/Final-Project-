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

    const startButton = document.getElementById('start').firstElementChild;
    startButton.style.display = 'block';
}

// function that fires when the game is started
const onStartButton = (event) => {
    event.preventDefault();
    sock.emit('start', 'testing');
    console.log('game started')
}

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
sock.on('welcome', (name) => {
    const parent = document.getElementById('banner');
    const el = document.createElement('h3');
    el.innerHTML = `Welcome ${name}`;
    parent.appendChild(el);
})

document.getElementById('sign-in').addEventListener('submit', signupFormSubmit);
document.getElementById('start').addEventListener('submit', onStartButton);
