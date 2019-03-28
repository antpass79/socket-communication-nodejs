import { VersionedId } from "./versioned-id";

export interface Repository {
    getById<T>(type: T, id: any): T;    
    getByVersionedId<T>(type: T, id: VersionedId): T;    
    save<T>(aggregate: T): void;
}