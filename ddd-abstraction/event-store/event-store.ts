import { VersionedId } from "../domain/versioned-id";
import { IEventSource } from "./event-source";

export interface IEventStore<TEvent> {
    storeEventSource(eventSource: IEventSource<TEvent>): void;
    loadEventSource<T>(expectedType: T, eventSourceId: any): T;
    loadEventSource<T>(expectedType: T, eventSourceId: VersionedId): T;
}
 