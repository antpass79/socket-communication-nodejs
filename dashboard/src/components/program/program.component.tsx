import React from 'react';
import { FeedAdd } from './feed-add/feed-add.component';
import { FeedList } from './feed-list/feed-list.component';

import './program.component.css';
import { Feed } from '../../models/feed';
import { FeedService } from '../../services/feed.service';

type props = {
};
type state = {
    feeds: Array<Feed>,
    loading: boolean
};
export class Program extends React.Component<props, state> {

    private _feedService: FeedService = new FeedService();

    constructor(props: Readonly<props>) {
        super(props);

        this.state = {
            feeds: [],
            loading: false
        };
    }

    setBusy = (busy: boolean) => {

        this.setState(() => {
            const loading = busy;
            return {
                loading
            };
        });
    }

    handleAddFeed = (feed: Feed) => {

        this.setBusy(true);

        this._feedService.add(feed).then((response) => {

            response.json().then((insertedFeed: Feed) => {

                console.log(insertedFeed);

                this.setState(state => {
                    const feeds = [...state.feeds, insertedFeed];
                    return {
                        feeds
                    };
                });
            })
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            this.setBusy(false);
        });
    }

    handleRemoveFeed = (feed: Feed) => {

        this.setBusy(true);

        this._feedService.remove(feed.id).then(() => {

            this.setState(state => {
                const feeds = state.feeds.filter((item) => item.id != feed.id);
                return {
                    feeds
                };
            });
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            this.setBusy(false);
        });
    }

    renderFeedAdd() {
        return <FeedAdd onAddFeed={this.handleAddFeed} busy={this.state.loading} />;
    }

    renderFeedList() {
        return <FeedList feeds={this.state.feeds} onRemoveFeed={this.handleRemoveFeed} />;
    }

    render() {
        return (
            <div className="program">
                {this.renderFeedAdd()}
                {this.renderFeedList()}
            </div>
        );
    }
}
