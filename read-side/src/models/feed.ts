export interface Feed {
    id: string,
    text: string;
}

export function initialFeed(): Feed {

    return {
        id: '',
        text: ''
    };
}