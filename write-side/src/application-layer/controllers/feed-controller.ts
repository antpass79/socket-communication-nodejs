import { Feed } from '../../models/feed';
import { CreateFeedCommand } from "../../domain-layer/commands/create-feed-command";
import { CommandBus } from '../../domain-layer/commands/command-bus';

export class FeedController {

    async add(req: any, res: any) {

        let feed: Feed = req.body.feed;
        console.log('write-side feed:');
        console.log(feed);

        try {
            CommandBus.dispatch<CreateFeedCommand>(new CreateFeedCommand(feed.text));
            res.sendStatus(200);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }

    async remove(req: any, res: any) {

        // let feedId: string = req.body.feedId;
        // console.log('feedId');
        // console.log(feedId);

        // let result = await this.feedServiceHub.remove(feedId);
        // console.log('result');
        // console.log(result);

        // if (result) {
        //     res.send(200);
        // }
        // else {
        //     res.sendStatus(500);
        // }
    }
}