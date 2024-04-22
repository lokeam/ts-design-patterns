
class Rectangle {
  constructor(private width: number, private height: number) {}

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public area(): number {
    return this.width * this.height;
  }
}

class Square {
  constructor(private side: number){}

  public getSide(): number {
    return this.side;
  }

  public area(): number {
    return this.side * this.side;
  }
}

class SquareToRectangleAdapter {
  constructor(private square: Square) {}

  public getWidth(): number {
    return this.square.getSide();
  }

  public getHeight(): number {
    return this.square.getSide();
  }

  public area(): number {
    return this.square.area();
  }
}

let square = new Square(5);
let adapter = new SquareToRectangleAdapter(square);

console.log(adapter.getHeight());
console.log(adapter.getWidth());
console.log(adapter.area());
console.log(adapter);


/*
  Example use case:
*/


class MySQLDatabase {
  public connectToMySQL(uri: string): void {
    console.log(`Connecting to MySQL at ${uri}`);
  }

  public executeMySQLQuery(query: string): void {
    console.log(`Executing MySQL Query ${query}`);
  }
}

class PostgreSQLDatabase {
  public connectToPostgreSQL(uri: string):void {
    console.log(`Connecting to PostgreSQL ${uri}`);
  }

  public executePostgreSQLQuery(query: string): void {
    console.log(`Executing PostgreSQL query ${query}`);
  }
}

class DatabaseAdapter {
  constructor(private postgreSQL: PostgreSQLDatabase) {}

  public connectToMySQL(uri: string): void {
    this.postgreSQL.connectToPostgreSQL(uri);
  }

  public executeMySQLQuery(query: string): void {
    this.postgreSQL.executePostgreSQLQuery(query);
  }
}

let database = new DatabaseAdapter(new PostgreSQLDatabase());
database.connectToMySQL('postgresql://localhost:3306/mydb')
database.executeMySQLQuery('SELECT * FROM * users');

/*
  When to Consider:
  * Incompatibility of Interfaces: Different system components or third-party libraries that cannot communicate directly
    due to differing interfaces
  * Refactoring Legacy Code: System redesign requires a bridge between old and new interfaces for backward compatibility
  * Alternatives to Multiple Inheritance: A class needs to inhert behavior from multiple soruces in languages that
    don't support multiple inheritance
  * Abstracting Volitle Classes: Encapsulation of classes prone to frequent changes, minimizing impact on the rest of the application

  Adapter Advantages:
  + Reusability and Flexibility: Allows developers to reuse existing code without significant modifications
  + Decoupling: Reduces dependencies between components, making code more maintainable
  + Enabiling Interoperability: Helps different parts of a system work together despite non-matching interfaces

  Adapter Disadvantges:
  - Potential for Confusion: May confuse team members unfamiliar with usage rationale
  - Overuse or Unnecessary Use: May lead to complexity and code that is harder to maintain
  - Performance Overhead: Extra level of indirection could potentially impact performance
  - Hides the Adaptees Capabilities: May limit access to useful features of the underlying system
  - Tight Coupling: Adapter may become tightly coupled to adaptee

  Adapter Use Cases:
  * Interface with External System / Library: If interface of external library doesn't match those current application, may use Adapter pattern
  * Legacy Code Integration: In cases where its difficult to impossible to presently refactor code to a new interface
  * Plug-in Architecture: If application supports extensions/plug-ins, Adapter pattern may help manage variety of interfaces
*/