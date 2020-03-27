const addToLobby = (player) => {
    const parent = document.querySelector('#lobby');
    const el = document.createElement('li');
    el.innerHTML = player;
    parent.appendChild(el);
}

const onFormSubmitted = (event) => {
    event.preventDefault();
    const input = document.querySelector('#name')
    const text = input.value;
    sock.emit('name', text);
}

const showHost = (text) => {
    const parent = document.querySelector('#banner');
    const el = document.createElement('h2');
    el.innerHTML = text;
    parent.appendChild(el);
}

const sock = io();
sock.on('name', addToLobby);
sock.on('host', showHost)

document.querySelector('#sign-in').addEventListener('submit', onFormSubmitted);