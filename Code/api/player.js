class Player {
    constructor(playerData, id, host)
    {
        this.playerData = playerData;
        this.id = id;
        this.name = null;
        this.host = host;
        this.hand = [];
    }

    playerSignedIn(name) {
        this.name = name;
        this.playerData.emit('welcome', {name: this.name, host: this.host});
    }

}

module.exports = Player;
