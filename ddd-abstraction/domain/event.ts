import { VersionedId } from "./versioned-id";

export class Event {

    private _aggregateRootId: VersionedId;
    get aggregateRootId(): VersionedId {
        return this._aggregateRootId;
    }

    constructor(aggregateRootId: VersionedId) {
        this._aggregateRootId = aggregateRootId;
    }
}