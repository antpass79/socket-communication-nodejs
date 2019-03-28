import { Event } from "./event";
import { VersionedId } from "./versioned-id";
import { IEventSource } from "../event-store/event-source";

export abstract class AggregateRoot implements IEventSource<Event> {

    private id: VersionedId;
    private unsavedEvents: Event[];
    private notifications: Notification[];
    
    public constructor(id: VersionedId) {
        this.id = id;
        this.unsavedEvents = [];
        this.notifications = [];
    }
    
    protected abstract onEvent(event: Event): void;

    protected apply(event: Event): void {
        this.onEvent(event);
        this.unsavedEvents.push(event);
    }

    protected notify(notification: Notification): void {
        //Validate.notNull(notification, "notification is required");
        this.notifications.push(notification);
    }
    
    public getVersionedId(): VersionedId {
        return this.id;
    }

    public loadFromHistory(events: Event[]): void  {
        events.forEach(event => this.onEvent(event));
    }

    public getUnsavedEvents(): Event[] {
        return this.unsavedEvents; // the original code create a new array passing in the .ctor this.events
    }
    
    public clearUnsavedEvents(): void {
        this.unsavedEvents.splice(0, this.unsavedEvents.length);
    }

    public getNotifications(): Notification[] {
        return this.notifications; // the original code create a new array passing in the .ctor this.events
    }
    
    public clearNotifications(): void {
        this.notifications.splice(0, this.notifications.length);
    }
}