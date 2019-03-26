import { Guid } from "../../utilities/guid";

export interface ICommand {
    readonly id: any;
    readonly sent: Date;
}

export abstract class Command implements ICommand {

    private _id: any;
    get id(): any {
        return this._id;
    }

    private _sent: Date;
    get sent(): Date {
        return this._sent;
    }

    constructor() {
        this._id = Guid.newGuid();
        this._sent = new Date();
    }
}

export interface ICommandHandler<T> {
    handle(command: T): void;
}