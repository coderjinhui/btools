import {createConnection, Connection} from "typeorm";

export default class DBManager {
    private static _instance: DBManager = null;
    private connection: Connection = null;
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public async getConnection() {
        if (!this.connection) {
            this.connection = await createConnection();
        }
        return this.connection;
    }
}