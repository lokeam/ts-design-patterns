interface Builder {
  setSectionA(): void;
  setSectionB(): void;
  setSectionC(): void;
}

class EcommerceProduct {
  private sections: string[] = [];

  public add(section: string): void {
    this.sections.push(section);
  }

  public listSections():void {
    console.log(`Product sections: ${this.sections.join(', ')}`);
  }
}

class ActualBuilder implements Builder {
  private product!: EcommerceProduct;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new EcommerceProduct();
  }

  public setSectionA(): void {
    this.product.add('Section A');
  }

  public setSectionB(): void {
    this.product.add('Section B');
  }

  public setSectionC(): void {
    this.product.add('Section C');
  }

  public getProduct(): EcommerceProduct {
    const result = this.product;
    this.reset();
    return result;
  }
}

class EcommerceDirector {
  private builder!: Builder;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimumProduct(): void {
    this.builder.setSectionA();
  }

  public buildFullProduct():void {
    this.builder.setSectionA();
    this.builder.setSectionB();
    this.builder.setSectionC();
  }
}

const builder = new ActualBuilder();
const ecDirector = new EcommerceDirector();
ecDirector.setBuilder(builder);

ecDirector.buildMinimumProduct();
let minimumProduct = builder.getProduct();
console.log(minimumProduct);

ecDirector.buildFullProduct();
let fullProduct = builder.getProduct();
console.log(fullProduct);

/*
  Example use case:
*/

interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
}

interface ICustomerBuilder {
  setFirstName(firstName: string): ICustomerBuilder;
  setLastName(lastName: string): ICustomerBuilder;
  setEmail(email: string): ICustomerBuilder;
  setphoneNumber(phoneNumber: number): ICustomerBuilder;
  build(): ICustomer;
}

class Customer implements ICustomer {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: number
  ) {}
}

class CustomerBuilder implements ICustomerBuilder {
  private firstName: string = '';
  private lastName: string = '';
  private email: string = '';
  private phoneNumber: number = 0;

  constructor() {}

  public setFirstName(firstName: string): ICustomerBuilder {
    this.firstName = firstName;
    return this;
  }

  public setLastName(lastName: string): ICustomerBuilder {
    this.lastName = lastName;
    return this;
  }

  public setEmail(email: string): ICustomerBuilder {
    this.email = email;
    return this;
  }

  public setphoneNumber(phoneNumber: number): ICustomerBuilder {
    this.phoneNumber = phoneNumber;
    return this;
  }

  public build(): ICustomer {
    return new Customer(
      this.firstName,
      this.lastName,
      this.email,
      this.phoneNumber,
    )
  }
}

class CustomerDirector {
  constructor(private builder: ICustomerBuilder) {}

  public buildMinimalCustomer(
    firstName: string,
    lastName: string,
    email: string,
  ) {
      return this.builder
        .setFirstName(firstName)
        .setLastName(lastName)
        .setEmail(email)
        .build();
    }
}

const customerBuilder: ICustomerBuilder = new CustomerBuilder();
const customerDirector: CustomerDirector = new CustomerDirector(customerBuilder);
const customer: ICustomer = customerDirector.buildMinimalCustomer(
  'John',
  'Wick',
  'john@babayaga.com'
);

console.log(customer);

/*
  When to Consider:
  * Complex Object Creation: If system where obj creation is complex due to many attrs, some are optional or mandatory
  * Step-by-step Object Creation: If obj must be created in multiple steps in a specific order
  * Combination Explosrion: aka "Telescoping Constructor" problem - If dealing with obj that may be configured in multiple ways.
  * Constructing Composite Structures: If need to constructor composite or heirarchical structure (tree)
  * Immutable Objects: If you want to construct an immutable obj with many attrs

  Builder Advantages:
  + Fluent Inteface: Makes client code more readable
  + Separation of Logic: Construction logic separated from business logic
  + Multiple Representations: Same construction process, different results
  + Object Integrity: Ensures validity of object construction
  + Reduced Parameter Complexity: Manages many parameters efficiently
  + Immutability: Often returns immutable objects
  + Easiser to Extend: Adding new features becomes easier

  Builder Disadvantges:
  - Increased Complexity: Involves additional abstraction layer and more classes
  - Additional Code: Can result in adding additional code
  - Runtime Errors: No protection of runtime errors. Lack of built-in compile-time checks
  - Mutability Concerns: Issues handling mutable objects
  - Refactoring Difficulties: Requires updating builder on class changes
  - Performance: More steps and more resources
  - Documentation: Extra complexity means that you need to write more things down

  Builder Use Cases:
  * Product Ordering System: Manages complex configurations of objects/entities
  * Construction Industry: Encapsulates building processes
  * Game Development: Builds diverse chars
*/