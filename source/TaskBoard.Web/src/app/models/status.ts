export class Status {
    public id: number;
    public name: string;
    public boardId: number;

    constructor(status: Omit<Status, 'id'>) {
        this.name = status.name;
        this.boardId = status.boardId;
    }
}