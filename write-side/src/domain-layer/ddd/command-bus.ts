export interface ICommandBus {
    handle<T>(command: T): void;
}

export abstract class CommandBus implements ICommandBus {

    abstract handle<T>(command: T): void;
}