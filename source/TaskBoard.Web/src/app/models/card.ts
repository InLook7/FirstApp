export class Card {
    public id: number;
    public name: string;
    public priorityId: number;
    public dueDate: Date;
    public description: string;
    public statusId: number;
    public priorityName: string;


    constructor(card: Omit<Card, 'id' | 'priorityName'>);
    
    constructor(card: Omit<Card, 'priorityName'>)

    constructor(card: Omit<Card, 'id' | 'priorityName'> | Omit<Card, 'priorityName'>) {
        this.name = card.name;
        this.priorityId = card.priorityId;
        this.dueDate = card.dueDate;
        this.description = card.description;
        this.statusId = card.statusId;

        if('id' in card){
            this.id = card.id;
        }
    }
}