import { IReadWrite } from "../../../infrastructure-layer/repositories/read-write";
import { Guid } from "../../../utilities/guid";

export class InMemoryRepository<T> implements IReadWrite<T> {

    private _store: Map<string, T> = new Map<string, T>();

    find(item: T): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    
    findOne(id: string): Promise<T> {
        if (!this._store.has(id))
            throw new Error("Invalid id: " + id);

        let value: T = this._store.get(id) as T;
        return Promise.resolve<T>(value);
    }

    findAll(): Promise<T[]> {
        return Promise.resolve<T[]>([...this._store.values()]);
    }
    
    create(item: T): Promise<{ ok: boolean; insertedId: string; }> {

        let id = Guid.newGuid();
        this._store.set(id, item);

        let result = {
            ok: true,
            insertedId: id
        };

        return Promise.resolve<{ ok: boolean; insertedId: string; }>(result);
    }
    
    update(id: string, item: T): Promise<boolean> {
        if (!this._store.has(id))
            return Promise.resolve<boolean>(false);

        this._store.set(id, item);
        return Promise.resolve<boolean>(true);
    }
    
    delete(id: string): Promise<boolean> {
        if (!this._store.has(id))
            return Promise.resolve<boolean>(false);

        this._store.delete(id);
        return Promise.resolve<boolean>(true);
    }

}
 