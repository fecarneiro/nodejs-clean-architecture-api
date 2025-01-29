export class BaseRepository {
    constructor(tableName, db){
        this.tableName = tableName;
        this.db = db;
    }
}