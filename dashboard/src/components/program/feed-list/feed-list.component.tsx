import React from 'react';

import './feed-list.component.css';
import { Feed } from '../../../models/feed';

type props = {
    onRemoveFeed?: any,
    feeds: Array<Feed>
};
export class FeedList extends React.Component<props> {

    constructor(props: Readonly<props>) {
        super(props);
    }

    onRemoveFeed = (feed: Feed) => () => {
        this.props.onRemoveFeed(feed);
    }

    render() {

        const list = (items: Array<Feed>) => {
            const listItems = items.map((feed, index) => (
                <div className="feed" key={index}>
                    <li>{feed.text}</li>
                    <button onClick={this.onRemoveFeed(feed)}>Remove</button>
                </div>
            ));

            return <ul>{listItems}</ul>;
        };

        return (
            <ul>
                {list(this.props.feeds)}
            </ul>
        );
    }
}
