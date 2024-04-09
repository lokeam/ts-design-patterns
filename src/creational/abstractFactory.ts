interface ProductAInterface {
  operationA(): string;
}

interface ProductBInterface {
  operationB(): string;
  combinedOperation(collaborator: ProductAInterface): string;
}

interface FactoryInterface {
  createProductA(): ProductAInterface;
  createProductB(): ProductBInterface;
}

class ProductA implements ProductAInterface {
  public operationA(): string {
    return 'Result of Operation A';
  }

}

class ProductB implements ProductBInterface {
  public operationB(): string {
    return 'Result of Operation B';
  }

  public combinedOperation(collaborator: ProductAInterface): string {
    const result = collaborator.operationA();
    return `Result of Product B collaborating with ${result}`;
  }
}

class Factory implements FactoryInterface {
  public createProductA(): ProductAInterface {
    return new ProductA();
  }

  public createProductB(): ProductBInterface {
    return new ProductB();
  }
}

const factoryExample = new Factory();

const productAExample = factoryExample.createProductA();
console.log(productAExample.operationA());

const productBExample = factoryExample.createProductB();
console.log(productBExample.combinedOperation(productAExample));
console.log(productBExample.operationB());


/*
  Example use case:
*/

interface Button {
  render(): void;
  onClick(f: Function): void;
}

interface Checkbox {
  render(): void;
  toggle(): void;
}

interface GUIFactory {
  createButton(): Button;
  createCheckbox(button: Button): Checkbox;
}

class WindowsButton implements Button {
  public render(): void {
    console.log('Rendering Windows style button');
  }

  public onClick(f: Function): void {
    console.log('Windows button clicked');
  }
}

class WindowsCheckbox implements Checkbox {
  constructor(private button: Button) {}

  public render():void {
    console.log('Rendering a Windows style checkbox');
  }

  public toggle():void {
    this.button.onClick(() => {
      console.log('Windows button toggled');
    });
  }
}

class MacOSButton implements Button {
  public render(): void {
    console.log('Rendering MacOS style button');
  }

  public onClick(f: Function): void {
    console.log('MacOS button clicked');
  }
}

class MacOSCheckbox implements Checkbox {
  constructor(private button: Button) {}

  public render():void {
    console.log('Rendering a MacOS style checkbox');
  }

  public toggle():void {
    this.button.onClick(() => {
      console.log('MacOS button toggled');
    });
  }
}

class WindowsFactory implements GUIFactory {
  public createButton(): Button {
    return new WindowsButton();
  }

  public createCheckbox(button: Button): Checkbox {
    return new WindowsCheckbox(button);
  }
}

class MacOSFactory implements GUIFactory {
  public createButton(): Button {
    return new MacOSButton();
  }

  public createCheckbox(button: Button): Checkbox {
    return new MacOSCheckbox(button);
  }
}

function renderUI(factory: GUIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox(button);

  button.render();
  checkbox.render();

  button.onClick(() => console.log('button clicked'));
  checkbox.toggle();
}

renderUI(new WindowsFactory());
renderUI(new MacOSFactory());

/*
  When to Consider:
  * Objects that are Interdependant of Each Other: When you have the SAME products that are created in different ways
    so that they require their own Factories.
  * Supporting Different Types of Environments: When you have more than one type of Factory that needs support in order to
    switch between creating families of objects/classes.

  Abstract Factory Advantages:
  + Consistency Among Products: Products of same family are always compatible
  + Avoid Concrete Product Classes: Client code only interacts with abstract product interfaces
  + Code Reusability & Swapping Product Factories: Product families may be swapped easily without changing client code
  + Single Responsibility Principle: Each factory is only responsible for creating products of a specific variant
  + Open/Closed Principle: Easy to introduce new factories and product families without modifying client code

  Abstract Factory Disadvantages:
  - Increased Complexity: Code is very complicated to developed and maintain. Involves additional abstraction + more classes
  - Modifying Product Families: Changes to factory interface affect ALL factory implementations
  - Code Maintenance: Maintenance may be difficult as number of factories increase
  - Dependency: Client code is not dependent upon factory interface
  - Unit Testing: Increased complexity for individual products due to tight coupling of products to one factory

  Abstract Factory Use Cases:
  * GUI Libraries: Support for different designs across systems
  * Databases: Handle creation of connections and queries for different types of dbs
  * Cross-platform Development: Allows different sets of objects depending on running platform
*/
