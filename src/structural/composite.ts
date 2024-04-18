
interface Employee {
  getName(): string;
  getSalary(): number;
  getRole(): string;
}

class Developer implements Employee {
  constructor(private name: string, private salary: number) {}

  public getName(): string {
    return this.name;
  }

  public getSalary(): number {
    return this.salary;
  }

  public getRole(): string {
    return 'Developer';
  }
}

class Designer implements Employee {
  constructor(private name: string, private salary: number) {}

  public getName(): string {
    return this.name;
  }

  public getSalary(): number {
    return this.salary;
  }

  public getRole(): string {
    return 'Designer';
  }
}

interface CompositeEmployee extends Employee {
  addEmployee(employee: Employee): void;
  removeEmployee(employee: Employee): void;
  getEmployees(): Employee[];
}

class Manager implements CompositeEmployee {
  private employees: Employee[] = [];
  constructor(private name: string, private salary: number) {}

  public getName(): string {
    return this.name;
  }

  public getSalary(): number {
    return this.salary;
  }

  public getRole(): string {
    return 'Manager';
  }

  public addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  public removeEmployee(employee: Employee): void {
    const index = this.employees.indexOf(employee);

    if (index !== -1) {
      this.employees.splice(index, 1);
    }
  }

  public public getEmployees(): Employee[] {
    return this.employees;
  }
}

let dev1 = new Developer('John Wick', 15000);
let dev2 = new Developer('Caine Lee', 15000);
let designer = new Designer('Charon', 12000);

let manager = new Manager('Winston', 25000);
manager.addEmployee(dev1);
manager.addEmployee(dev2);
manager.addEmployee(designer);

console.log(manager);
console.log(manager.getRole());
console.log(manager.getSalary());


/*
  Example use case:
*/

interface FileSystemComponent {
  getName(): string;
  getSize(): number;
}

class FileComponent implements FileSystemComponent {
  constructor(private name: string, private size: number) {}

  public getName(): string {
    return this.name;
  }

  public getSize(): number {
    return this.size;
  }
}

interface CompositeFileSystemComponent extends FileSystemComponent {
  addComponent(component: FileSystemComponent): void;
  removeComponent(component: FileSystemComponent): void;
  getComponents(): FileSystemComponent[];
}

class Folder implements CompositeFileSystemComponent {
  private components: FileSystemComponent[] = [];
  constructor(private name: string) {}

  public getName(): string {
    return this.name;
  }

  public getSize(): number {
    return this.components.reduce(
      (total, component) => total + component.getSize(), 0
    );
  }

  public addComponent(component: FileSystemComponent): void {
    this.components.push(component);
  }

  public removeComponent(component: FileSystemComponent): void {
    const index = this.components.indexOf(component);
    if (index !== -1) {
      this.components.splice(index, 1);
    }
  }

  public public getComponents(): FileSystemComponent[] {
    return this.components;
  }
}


let file1 = new FileComponent('file.text', 500);
let file2 = new FileComponent('file.text', 800);
let file3 = new FileComponent('file.text', 1200);

let folder = new Folder('Example Folder');
folder.addComponent(file1);
folder.addComponent(file2);
folder.addComponent(file3);

console.log(`Folder ${folder.getName()} contains: `);

folder.getComponents().map(
  (component) =>
    console.log(`- ${component.getName()} | Size: ${component.getSize()} bytes`)
);

console.log(`Total Size: ${folder.getSize()} bytes`);

/*
  When to Consider:
  * Desire for a Nested Object: If you have a heirarchy of objects with a parent object containing multiple properties
    and these properties also have mulitple properties, nested objects or arrays of objects
  * Desire for Nested Operations: If you need to perform operations on a collection of objects in the same manner that you do so on a single object

  Composite Advantages:
  + Simplifies Client Code: Client may treat composite structures and individual objects uniformly
  + Ease of adding new component types: New types of leaf/composite components simply need to implement component interface
  + Easily represents heirarchies: Structure of pattern lends itself to tree-like patterns

  Composite Disadvantges:
  - May Violate Single Responsibility Principle: Multiple areas of responsibilities may exist within the same class
  - Difficulty in Type Checking: You may need additional, complex type type checking when one component complies with more than one interface
  - Difficulty in Restricting Components of Composite: See type checking example above
  - Indirect Coupling: Methods may become dependent to their specific class

  Composite Use Cases:
  * File Systems: Treats files and directories uniformly
  * GUI Components: Helps in uniform treatment of complex and simple GUI components
  * Organizational Structures: Models hierarchies in an organization uniformly
*/
