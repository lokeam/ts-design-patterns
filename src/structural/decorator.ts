interface Coffee {
cost(): number;
description(): string
}

class SimpleCoffee implements Coffee {
  public cost(): number {
    return 3;
  }

  public description(): string {
    return 'Simple coffee'
  }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee){}

  abstract cost(): number;
  abstract description(): string;
}

class MilkDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  public cost(): number {
    return this.coffee.cost() + 2;
  }

  public description(): string {
    return `${this.coffee.description()}, milk added`
  }
}

let coffee: Coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);

console.log(`Cost: ${coffee.cost()}`);
console.log(`Description: ${coffee.description()}`);

/*
  Example use case:
*/

interface ServerRequest {
  handle(request: any): void;
}

class BaseServer implements ServerRequest {
  public handle(request: any): void {
    console.log(`Handling request: ${request}`);
  }
}

abstract class ServerRequestDecorator implements ServerRequest {
  constructor(protected serverReqeust: ServerRequest) {}


  abstract handle(request: any): void;
}

class LoggingMiddleWare extends ServerRequestDecorator {
  public handle(request: any): void {
    console.log(`Logging request: ${request}`);

    this.serverReqeust.handle(request);
  }
}

class AuthMiddleWare extends ServerRequestDecorator {
  public handle(request: any): void {
    if (request.isAuthenticated) {
      console.log('Request authentication confirmed');

      this.serverReqeust.handle(request);
    } else {
      console.log('Request authentication denied')
    }
  }
}

const request = {
  isAuthenticated: true,
  body: 'hello world'
};

let server: ServerRequest = new BaseServer();
server = new LoggingMiddleWare(server);
server = new AuthMiddleWare(server);
server.handle(request);



/*
  When to Consider:
  * Updating Objects After Instantiation: If you want to add responsibilities or modify objects after creation
  * Different Types of Object Modification Needed: When you need to create very unique objects with differing types of modifications
  * When extending Class isn't a Viable Option: Client code is overexposed to the internals of a subsystem, decouples classes from modifications
    and provides clean interface to do so
  * When System Needs to be Very Extendable: When differing variants products/objects that change regularly

  Decorator Advantages:
  + Flexible Alternative to Subclassing: Extends behavior down to object (as opposed to class) level
  + Functionality May be Added at Runtime: Grants additional flexibility to featureset
  + Promotes Code Reuse and Reduces Redundancy: Each decorator encapsulates a specific feature. Only one piece of functionality per class
  + Keeps Code Simple: Avoids overload of subclasses
  + Follows Single Responsibility Principle: Each decorator is responsible for a specific feature

  Decorator Disadvantges:
  - Over-complication: Can result in many small objects, potentially adding needless complexity to design
  - Requires Interface Compatibility: Decorator must match the interface of the component it decorates
  - Not Suitable for Adding NEW Methods: Designed for adding functionality to existing methods
  - Over-complication: Can result in many small objects, potentially adding needless complexity to design, may be overkill for simple additions
  - Unexpected Behavior with Other Code: Code that relies on the object identity will fail when decorators are introduced
  - Ordering of Decorators Important: Results may vary depending upon order in which decorators are applied

  Decorator Use Cases:
  * GUI Toolkits: Add features to visual components directly
  * Java I/O Classes: Provide a flexible way of adding functionality to read/write streams
  * Middleware in Web Development: Add features such as caching, logging, validation, authentication, etc
*/