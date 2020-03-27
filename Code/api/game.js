class Rummy {
    constructor(p1, p2)
    {
        this._players = [p1, p2];
        this._turns = [null, null];

        this._sendToPlayer(0, 'Welcome Player 1');
        this._sendToPlayer(1, 'Welcome Player 2');
    }

    _sendToPlayer(playerIndex, msg) {
        this._players[playerIndex].emit('message', msg);
    }
}

module.exports = Rummy;