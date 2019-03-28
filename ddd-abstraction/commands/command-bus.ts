import { Command, ICommandHandler } from "./command";

export class CommandBus {

    static register<TCommand extends Command>(commandType: string, commandHandler: ICommandHandler<TCommand>) {
        CommandHandlerStore.register(commandType, commandHandler);
    }

    static dispatch<T extends Command>(command: T): void {

        let commandHandler: ICommandHandler<T> = CommandHandlerStore.getCommandHandler((command as Object).constructor.name);
        commandHandler.handle(command);
    }
}

class CommandHandlerStore {
    
    // data members

    private static store: Map<string, any> = new Map<string, any>();

    // public functions

    static register<TCommand extends Command>(commandType: string, commandHandler: ICommandHandler<TCommand>) {

        console.log('CommandHandlerStore.register coommandType: ' + commandType);
        CommandHandlerStore.store.set(commandType, commandHandler);
    }

    static getCommandHandler<T extends Command>(commandType: string): ICommandHandler<T> {
        return CommandHandlerStore.store.get(commandType);
    }
}
