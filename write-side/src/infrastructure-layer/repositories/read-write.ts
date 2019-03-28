import { IRead } from "./read";
import { IWrite } from "./write";

export interface IReadWrite<T> extends IRead<T>, IWrite<T> {
}