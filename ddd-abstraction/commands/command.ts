import { Guid } from "../../../utilities/guid";

export abstract class Command {

    private _id: any;
    get id(): any {
        return this._id;
    }

    constructor() {
        this._id = Guid.newGuid();
    }
}

export interface ICommandHandler<T extends Command> {
    handle(command: T): Promise<any>;
}

export abstract class CommandHandler<T extends Command>  implements ICommandHandler<T> {

    // public functions

    async handle(command: T): Promise<any> {
        if (!this.validate(command))
            throw new Error("The command is null");

        return this.onHandle(command);
    }
    
    // protected functions
    
    protected abstract async onHandle(command: T): Promise<any>;

    protected validate(command: T): boolean {
        return command ? true: false;
    }
}