import React, { RefObject } from 'react';
import { Feed } from '../../../models/feed';

type props = {
    onAddFeed?: any,
    busy?: boolean
};
export class FeedAdd extends React.Component<props> {

    feedInput: RefObject<HTMLInputElement>;

    constructor(props: Readonly<props>) {
        super(props);

        this.feedInput = React.createRef();
    }

    onAdd = () => {

        let feed: Feed = {
            id: '',
            text: this.feedInput.current ? this.feedInput.current.value : ''
        };

        this.props.onAddFeed(feed);
    }

    render() {
        return (
            <div>
                <input ref={this.feedInput} type="text" />
                <button onClick={this.onAdd}>
                    {this.props.busy ? "adding..." : 'Add Feed'}
                </button>
            </div>
        );
    }
}
