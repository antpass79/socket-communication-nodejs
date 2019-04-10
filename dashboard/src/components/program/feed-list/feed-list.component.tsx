import React, { RefObject } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

import './feed-list.component.css';
import { Feed } from '../../../models/feed';

type props = {
    onChangeFeed?: any,
    onRemoveFeed?: any,    
    feeds: Array<Feed>
};
export class FeedList extends React.Component<props> {

    feedInput: RefObject<HTMLInputElement>;

    constructor(props: Readonly<props>) {
        super(props);

        this.feedInput = React.createRef();
    }

    onChangeFeed = (feed: Feed) => () => {

        let updatedFeed: Feed = {
            id: feed.id,
            text: this.feedInput.current ? this.feedInput.current.value : feed.text
        };

        this.props.onChangeFeed(updatedFeed);
    }

    onRemoveFeed = (feed: Feed) => () => {
        this.props.onRemoveFeed(feed);
    }

    render() {

        const config = {
            showPagination: false,
            sortable: false
        };

        const columns = [
            {
                Header: 'Text',
                accessor: 'text',
                Cell: (props: any) => <span>{props.value}</span> 
            },
            // {
            //     Header: '',
            //     Cell: (props: any) =>(
            //         <div>
            //             <button onClick={this.onChangeFeed(props.original)}>Change</button>
            //             <input type="text" ref={this.feedInput}></input>
            //         </div>
            //     )
            // },
            // {
            //     Header: '',
            //     Cell: (props: any) => <button onClick={this.onRemoveFeed(props.original)}>Remove</button>
            // }
        ]
        const data = this.props.feeds;        

        return (
            <ReactTable data={data} columns={columns} showPagination={config.showPagination} sortable={config.sortable} className="feed-table -striped -highlight" />
        );
    }
}
