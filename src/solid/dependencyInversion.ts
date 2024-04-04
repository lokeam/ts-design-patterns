/*
  Ensure that high level modules are not dependant upon low level classes.
  Classes interact with each other via abstractions instead of each other
*/

interface IDatabase {
  save(data: string): void;
}

class MySqlDatabase implements IDatabase {
  save(data: string): void {
    console.log(`${data} saved via MySQL`);
  }
}

class MongoDbDatabase implements IDatabase {
  save(data: string): void {
    console.log(`${data} saved via MongoDB`);
  }
}

class HighLevelModule {
  constructor(private database: IDatabase) {}

  execute(data: string) {
    this.database.save(data);
  }
}

let mysqlInstance: MySqlDatabase = new MySqlDatabase();
let mongoDBInstance: MongoDbDatabase = new MongoDbDatabase();

let user: HighLevelModule = new HighLevelModule(mysqlInstance);
user.execute("John");

let post: HighLevelModule = new HighLevelModule(mongoDBInstance);
post.execute("New Post");
