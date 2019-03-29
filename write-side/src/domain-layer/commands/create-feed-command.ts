import { FeedServiceHub } from "../../application-layer/services/feed-service-hub";
import { Feed } from "../../models/feed";
// import { CommandHandler, Command } from "../ddd/commands/command";
import { CommandHandler, Command } from 'ddd-abstraction/lib/index';

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

export class CreateFeedCommandHandler extends CommandHandler<CreateFeedCommand> {

    constructor(private feedServiceHub: FeedServiceHub) {
        super();
    }

    // protected functions

    protected async onHandle(command: CreateFeedCommand): Promise<any> {

        let feed: Feed = {
            id: command.id,
            text: command.text
        };

        let result = await this.feedServiceHub.add(feed);
        console.log('write-side result: ' + result);        

        if (!result) {
            throw new Error("write-side adding feed failed");
        }
    }

    protected validate(command: CreateFeedCommand): boolean {
        return super.validate(command) && !!command.text;
    }
}
