import { ICommand, ICommandHandler } from "./command";

export type CommandHandlerConstructor<T, F extends ICommand, E extends ICommandHandler<T>> = new (
    fault: F
) => E;

export class CommandHandlerFactory {
    // data memebrs

    private static store: Map<string, any> = new Map<string, any>();

    // public functions

    static create<T>(
        commandTypeName: string        
    ): ICommandHandler<T> {        
        const clazz = CommandHandlerFactory.store.get(commandTypeName);

        if (clazz) {
            const instance = Object.create(clazz.prototype);

            return instance.constructor.call(instance);
        }

        throw new Error("Impossible to map the command with the command handler");
    }

    static register<T, F extends ICommand, E extends ICommandHandler<T>>(
        clazz: CommandHandlerConstructor<T, F, E>,
        typeName: string,
    ) {
        CommandHandlerFactory.store.set(typeName, clazz);
    }
}
