export class AggregateRootNotFoundException extends Error {

    private static serialVersionUID: number = 1;
    private aggregateRootType: string;
    private aggregateRootId: any;

    public constructor(type: string, id: any) {
        super("aggregate root " + type + " with id " + id);
        this.aggregateRootType = type;
        this.aggregateRootId = id;
    }
    
    public getAggregateRootType(): string {
        return this.aggregateRootType;
    }
    
    public getAggregateRootId(): any {
        return this.aggregateRootId;
    }

}