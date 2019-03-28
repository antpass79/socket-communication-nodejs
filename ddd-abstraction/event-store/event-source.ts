import { VersionedId } from "../domain/versioned-id";

export interface IEventSource<T> {

    /**
     * The (globally) unique id of your aggregate. If your aggregate does not
     * have a globally unique id, you can consider using
     * "aggregate-root-type#aggregate-root-id" to ensure uniqueness.
     */
    getVersionedId(): VersionedId;

    /**
     * Loads the history for this {@link EventSource}.
     */
    loadFromHistory(history: T[]): void;
    
    /**
     * The unsaved events for this event source.
     */
    getUnsavedEvents(): T[];

}