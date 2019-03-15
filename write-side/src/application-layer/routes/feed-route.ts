import * as express from "express";
import { FeedController } from "../controllers/feed-controller";

export class FeedRoute {

    private feedController = new FeedController();

    initRoute(app: express.Application): express.Router {

        const router = express.Router()
        router.post('/add', this.feedController.add);
        router.post('/remove', this.feedController.remove);

        return router;
    }
}
