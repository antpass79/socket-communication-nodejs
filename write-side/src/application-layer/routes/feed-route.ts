import * as express from "express";
import { FeedController } from "../controllers/feed-controller";
import { FeedServiceHub } from "../services/feed-service-hub";

export class FeedRoute {

    private feedController: FeedController = new FeedController();

    constructor() {
    }

    initRoute(app: express.Application): express.Router {

        const router = express.Router()
        router.post('/add', (req, res) => this.feedController.add(req, res));
        router.post('/remove', (req, res) => this.feedController.remove(req, res));

        return router;
    }
}
