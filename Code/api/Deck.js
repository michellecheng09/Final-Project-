//Initialize the deck of tiles
class Deck 
{
    constructor() {
        const Tile = require('./Tile');
        //Four player game works with 108
        this.deck=[];
        const colour=["Red", "Blue", "Yellow", "Green"];

        for (let r = 0; r < 2; r++)
        {
            for (var i = 0; i < colour.length; i++) 
            {
                for (var j = 1; j <= 13; j++) 
                {
                    this.deck.push(new Tile(colour[i],j));
                }
            }
        };

        //Add jokers
        for (var i = 1; i <= 4; i++) 
        {
            this.deck.push(new Tile("joker", i));
        }
    }

    printDeck() {
        return this.deck;
    }
}

module.exports = Deck;
