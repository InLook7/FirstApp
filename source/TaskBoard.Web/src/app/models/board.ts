export class Board {
    public id: number;
    public name: string;

    constructor(board: Omit<Board, 'id'>) {
        this.name = board.name;
    }
}