import { Feed } from "../models/feed";

export class FeedService {

    private _serverRoot: string = 'http://localhost:4000/feeds/';

    async add(feed: Feed) {

        const response = await fetch(this._serverRoot + 'add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ feed: feed }),
        });

        return await response;
    }

    async update(feed: Feed) {

        const response = await fetch(this._serverRoot + 'update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ feed: feed }),
        });

        return await response;
    }

    async remove(feedId: string) {
        const response = await fetch(this._serverRoot + 'add', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ feedId: feedId }),
        });

        return await response;
    }
}