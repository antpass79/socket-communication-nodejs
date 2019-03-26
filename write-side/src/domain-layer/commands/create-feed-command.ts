import { Command, ICommandHandler } from "../ddd/command";
import { CommandHandlerFactory } from "../ddd/command-handler-factory";

export class CreateFeedCommand extends Command {

    private _text = '';
    get text() {
        return this._text;
    }

    constructor(text: string) {
        super();

        this._text = text;
    }
}

export class CreateFeedCommandHandler implements ICommandHandler<CreateFeedCommand> {

    handle(command: CreateFeedCommand): void {
        if (!command)
        throw new Error("Invalid command");
    }
}

CommandHandlerFactory.register<CreateFeedCommand>(CreateFeedCommandHandler, 'CreateFeedCommandHandler');
