import {createConnection} from "typeorm";

export default class DBManager {
    private static _instance: DBManager = null;
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public async getConnection() {
        return await createConnection();
    }
}