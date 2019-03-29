import { MongoClient } from "mongodb";

import { NodeConfig } from '../utilities/node-config';

let nodeConfig = new NodeConfig();

export class MongoPool {

    private static _db: any;
    static get instance() {
        return MongoPool._db;
    }

    static async connect() {
        console.log('read-side connecting to mongodb');

        try {
            if (!MongoPool._db) {
                console.log('read-side setting client');
                let client = await MongoClient.connect(nodeConfig.getValue("CONNECTION_STRING"), { useNewUrlParser: true })
                MongoPool._db = client.db(nodeConfig.getValue("DATABASE_NAME"));
            }
        } catch (error) {
            console.log('read-side error during connecting to mongodb: ');
            console.error(error);
        }
    }

    static async disconnect() {
        console.log('read-side disconnecting to mongodb');

        try {
            if (!MongoPool._db) {
                console.log('read-side closing client');
                (MongoPool._db as MongoClient).close();
            }
        } catch (error) {
            console.log('read-side error during disconnecting to mongodb: ');
            console.error(error);
        }
    }
}