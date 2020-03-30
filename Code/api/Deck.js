//Initialize the deck of tiles
class Deck {
    contructor() {
        //Four player game works with 108
        const Deck=[];
        const color=["Red", "Blue", "Yellow", "Green"];
        for (var i = 0; i <= color.length; i++) 
        {
            for (var j = 0; j < 26; j++) 
            {
                Deck.push(new Tile(color[i],j));
            }
        }


        //Add jokers
        for (var i = 0; i < 4; i++) 
        {
        	Deck.push(new Tile("joker", i));
        }
    }
}

module.exports = Deck;
