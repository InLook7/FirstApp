export class Status {
    public id: number;
    public name: string;

    constructor(status: Omit<Status, 'id'>) {
        this.name = status.name;
    }
}