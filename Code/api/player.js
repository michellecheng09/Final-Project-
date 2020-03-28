class Player {
    constructor(playerData, id)
    {
        this.playerData = playerData;
        this.id = id;
        this.name = null;
        this.host = false;
        this.hand = [];
    }
    
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
        this.playerData.emit('welcome', this.name);
    }

}

module.exports = Player;