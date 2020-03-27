class Player {
    constructor(playerData, id)
    {
        this.playerData = playerData;
        this.id = id;
        this.name = null;
        this.host = false;
        this.testEmit();
    }

    testEmit() {
        this.playerData.emit('host', `Welcome ${this.id}`);
    }
}

module.exports = Player;