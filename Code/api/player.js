class Player {
    constructor(playerData, id, name, host)
    {
        this.playerData = playerData;
        this.id = id;
        this.name = name;
        this.host = host;
        this.hand = [];
    	if(host==true)
        	this.playerData.emit('welcome', {name: this.name, host: this.host});
    }
}

module.exports = Player;
