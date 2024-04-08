abstract class Car {
  constructor(
    public model: string,
    public productionYear: number
  ) {}

  abstract displayCarInfo(): void;
}


class Sedan extends Car {
  public displayCarInfo(): void {
    console.log(`This is a Sedan. Model: ${this.model}, Production Year: ${this.productionYear}`);
  }
}

class SUV extends Car {
  public displayCarInfo(): void {
    console.log(`This is a SUV. Model ${this.model}, Production Year: ${this.productionYear}`)
  }
}

class HatchBack extends Car {
  public displayCarInfo(): void {
    console.log(`This is a Hatchback. Model ${this.model}, Production Year: ${this.productionYear}`);
  }
}

class CarFactory {
  public createCar(
    type: 'sedan' | 'suv' | 'hatchback',
    model: string,
    productionYear: number,
  ): Car {
    switch(type) {
      case 'sedan':
        return new Sedan(model, productionYear);
      case 'suv':
        return new SUV(model, productionYear);
      case 'hatchback':
        return new HatchBack(model, productionYear);
      default:
        throw new Error('Invalid car type');
    }
  }
}

const carFactory = new CarFactory();

const sedan = carFactory.createCar('sedan', 'Accord', 2023);
sedan.displayCarInfo();

const suv = carFactory.createCar('suv', '4Runner', 2023);
sedan.displayCarInfo();

const hatchback = carFactory.createCar('hatchback', 'Mazda3', 2023);
sedan.displayCarInfo();


/*
  Example use case:
*/

abstract class PaymentProcessor {
  constructor(public amount: number) {}

  abstract processPayment(): void;
}

class PayPalProcessor extends PaymentProcessor {
  public processPayment(): void {
    console.log(`Processing PayPal Payment: $${this.amount}`);
  }
}

class StripeProcessor extends PaymentProcessor {
  public processPayment(): void {
    console.log(`Processing Stripe Payment: $${this.amount}`);
  }
}

class BankTransferProcessor extends PaymentProcessor {
  public processPayment(): void {
    console.log(`Processing Bank Transfer: $${this.amount}`);
  }
}

class PaymentProcessorFactory {
  public createProcessor(type: 'paypal' | 'stripe' | 'bank', amount: number) {
    switch(type) {
      case 'paypal':
        return new PayPalProcessor(amount);
      case 'stripe':
        return new StripeProcessor(amount);
      case 'bank':
        return new BankTransferProcessor(amount);
    }
  }
}

const processorFactory = new PaymentProcessorFactory();

const payPayment = processorFactory.createProcessor('paypal', 250);
const stripePayment = processorFactory.createProcessor('paypal', 500);

payPayment.processPayment();
stripePayment.processPayment();


/*
  When to Consider:
  * Similar/Uncertain Classes/Objects: If working with large number of classes or objects
    that share a common superclass and you need to instatiate BUT you don't know what these
    objects will be UNTIL runtime.
  * Pluggablity and Flexibility: You want to hide complexity and provide a common interface and want to provide
    users with a way to extend your library with their own classes.
  * Replacing Direct Object Construction: If you see code that is directly constructing instances of a class,
    where directly constructing objs can make code more brittle, harder test and less flexible.

  Factory Advantages:
  + Decoupling: Decouples client code from concrete classes
  + Flexibility: Provides flexibility when adding new types of objs without affecting client code
  + Encapsulation: Encapsulates details of obj creation. Factory is responsible for knowing which
    concrete classes the system may instantiate and how it can instantiate them.

  Factory Disadvantges:
  - Hidden Types: Actual object may be obsecured due to decoupling from client code
  - Refactoring Challenge: Difficult to introduce into large codebase
  - Increased Complexity: Involves additional abstraction layer and more classes
  - Increased Number of Classes: More classes = more complexity = more potential problems
  - Testing: Increased complexity due to factory setup

  Factory Use Cases:
  * Product Ordering System: Manages complex configurations of objects/entities
  * Construction Industry: Encapsulates building processes
  * Game Development: Builds diverse chars
*/