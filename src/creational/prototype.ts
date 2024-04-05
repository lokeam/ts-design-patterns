interface UserDetails {
  name: string;
  age: number;
  email: string;
}
/* Interface tightly coupled here for simplicity of creating an example */
interface Prototype {
  clone(): Prototype;
  getUserDetails(): UserDetails;
}

class ConcretePrototype implements Prototype {
  constructor(private user: UserDetails) {}

  /* Heart of prototype operation. Clones existing instances */
  public clone(): Prototype {

    /*
      Note: while Object.create() allows you to create a shallow copy of object,
      the Prototype pattern allows you to create deep copies allowing for independent
      modifications.
     */
    const clone = Object.create(this);

    clone.user = { ...this.user };
    return clone;
  }

  public getUserDetails(): UserDetails {
    return this.user;
  }
}

/*
  Implementation in action: creating two separate instances of user1 class.
*/
let user1 = new ConcretePrototype({
  name: "John",
  age: 32,
  email: "john@test.com"
});

let user2 = user1.clone();
if (user1 === user2) {
  console.log('Both instances are the same');
} else {
  console.log('Cloned objects are separate instances');
}

/*
  Example use case:
*/
interface ShapeProperties {
  color: string;
  x: number;
  y: number;
}

abstract class Shape {
  constructor(public properties: ShapeProperties) {}
  abstract clone(): Shape;
}

class Rectangle extends Shape {
  constructor(
    properties: ShapeProperties,
    public width: number,
    public height: number,
  ) {
    super(properties);
  }

  public clone(): Shape {
    let clonedProperties: ShapeProperties = {
      color: this.properties.color,
      x: this.properties.x,
      y: this.properties.y,
    };

    return new Rectangle(clonedProperties, this.width, this.height);
  }
}

class Circle extends Shape {
  constructor(
    properties: ShapeProperties,
    public radius: number,
  ) {
    super(properties);
  }

  public clone(): Shape {
    let clonedProperties: ShapeProperties = {
      color: this.properties.color,
      x: this.properties.x,
      y: this.properties.y,
    };

    return new Circle(clonedProperties, this.radius);
  }
}

let redRectangle: Shape = new Rectangle({ color: "red", x: 20, y: 100,}, 10, 20);
let differentRectangle: Shape = redRectangle.clone();

differentRectangle.properties.color = "blue";

console.log(redRectangle);
console.log(differentRectangle);

/*
  When to Consider:
  * Complex Object Creation: If system where obj creation is complex due to many attrs, etc
  * High Cost of Object Creation: If situation where creating each obj is expensive in RE: CPU/memory
  * Similar Object Instances: If multiple similar objs needed
  * Dynamic Type / Run-time Configuration: If exact type/state may only be determined at runtime
  * Preserving Historical States: Need to save state of an obj to return to later
  * Large Object Graphs: If app works with complex data structures and if user action may result in change to graph, cloning may be more efficient

  Prototype Advantages:
  + Avoid Reference Errors: In JS/TS when you assign an obj to a new variable, you're assigning a *reference* to the original, instead of creating a new one.
  + Efficient Object Cloning: If creating an object involves heavy db read/computation, cloning may save resources.
  + Efficiency of Add/Removal of properties at Runtime: If creation of an object is memory intensive, cloning may avoid this overhead.
  + Simplify Object Creation: In systems with complex object relationships/configurations, cloning may ensure these relationships are maintained.

  Prototype Disadvantges:
  - Shallow vs Deep Copying: In JS/TS obj assignment, nested objects are only copied by by *reference* not by *value* If you want distinct copies of
    nested objects then you'll need to perform a more expensive/complex deep-copy.

  Prototype Use Cases:
  * Graphics Editors: Clone identical copies of complex objects
  * Game Development: Efficiently spawn similar units or entities
  * User Interface Development: Efficiently spawn similar units or entities
  * Distributed Systems/DBs: Efficiently spawn similar units or entities
  * Data Processing Pipelines: Use template objs for operations
*/