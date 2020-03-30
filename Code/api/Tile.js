//Each tile has a color and a number associated with it
class Tile{
    constructor(colour, number)
    {
        this.colour = colour;
        this.number = number;
    }

    toString() {
        return `${this.colour} ${this.number}`;
    }
}

module.exports = Tile;
