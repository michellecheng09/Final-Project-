class Player {
    constructor(playerData, id)
    {
        this.playerData = playerData;
        this.id = id;
        this.name = null;
        this.host = false;
    }

    playerSignedIn(name) {
        this.name = name;
        this.playerData.emit('welcome', this.name);
    }

}

module.exports = Player;