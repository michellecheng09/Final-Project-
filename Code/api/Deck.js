//Initialize the deck of tiles
class Deck{
	contructor()
	{
		const Deck=[];
		const color=["Red", "Blue", "Yellow", "Green"];
		for (var i = 0; i <= 4; i++) 
			for (var j = 0; j < 13; j++)
				Deck.push(new Tile(color[i],j));
		
	}
}

module.exports = Deck;