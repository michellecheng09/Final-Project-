const onFormSubmitted = (event) => {
    event.preventDefault();
    const input = document.querySelector('#name')
    const text = input.value;
    sock.emit('name', text);
}



const sock = io();

sock.on('lobby', (players) => {
    const parent = document.querySelector('#lobby');
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

sock.on('welcome', (name) => {
    const parent = document.querySelector('#banner');
    const el = document.createElement('h3');
    el.innerHTML = `Welcome ${name}`;
    parent.appendChild(el);
})

document.querySelector('#sign-in').addEventListener('submit', onFormSubmitted);