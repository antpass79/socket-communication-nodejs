export interface IWrite<T> {
    create(item: T): Promise<{ ok: boolean, insertedId: string }>;
    update(id: string, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}