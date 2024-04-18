class Grinder {
  public grindBeans(): void {
    console.log('Grinding beans...');
  }
}

class Boiler {
  public boilWater(): void {
    console.log('Boiling water...');
  }
}

class Brewer {
  public brewCoffee(): void {
    console.log('Brewing coffee...');
  }
}

class CoffeeMakerFacade {
  constructor(
    private grinder: Grinder,
    private boiler: Boiler,
    private brewer: Brewer
  ) {}

  public makeCoffee() {
    this.grinder.grindBeans();
    this.boiler.boilWater();
    this.brewer.brewCoffee();
    console.log('The coffee is ready');
  }
}


let grinder = new Grinder();
let boiler = new Boiler();
let brewer = new Brewer();

let coffeeMaker = new CoffeeMakerFacade(grinder, boiler, brewer);
coffeeMaker.makeCoffee();


/*
  Example use case:
*/

class Amplifier {
  public turnOn(): void {
    console.log('Amp is turned on');
  }

  public setVolume(level: number): void {
    console.log(`Volume is set to ${level}`);
  }
}

class DVDPlayer {
  public turnOn(): void {
    console.log('DVD player is turned on');
  }

  public playDVD(movie: string) {
    console.log(`Playing DVD: ${movie}`);
  }
}

class Projector {
  public turnOn(): void {
    console.log('Projector is turned on');
  }

  public setInput(dvdPlayer: DVDPlayer): void {
    console.log('Input set to DVD Player');
  }
}

class Lights {
  public dim(level: number): void {
    console.log(`Lights dimmed to ${level}`);
  }
}


class HomeTheaterFacade {
  constructor(
    private amplifier: Amplifier,
    private dvdPlayer: DVDPlayer,
    private projector: Projector,
    private lights: Lights,
  ) {}

  public watchMovie(movie: string, volume: number, brightness: number) {
    console.log(`Getting ready to watch ${movie}`);
    this.lights.dim(brightness);
    this.amplifier.turnOn();
    this.amplifier.setVolume(volume);
    this.dvdPlayer.turnOn();
    this.projector.setInput(this.dvdPlayer)
    this.dvdPlayer.playDVD(movie);
  }
}

let amplifier = new Amplifier();
let dvdPlayer = new DVDPlayer();
let projector = new Projector();
let lights = new Lights();

let homeTheater = new HomeTheaterFacade(
  amplifier,
  dvdPlayer,
  projector,
  lights
);

homeTheater.watchMovie('Top Gun', 10, 5);

/*
  When to Consider:
  * Rampant Dependencies: High coupling and complex interactions between classes/subsystems
  * Overwhelming Complexity: Complex subsystems with multiple interdependent classes or operations
  * Overexposure of Inner Workings: Client code is overexposed to the internals of a subsystem
  * Need for a Layered Architecture: Requirement for multi-layered or tiered architectural structures
  * Need for Simplified API: Building libraries or APIs with a simple, user-friendly interface

  Facade Advantages:
  + Simplified Interface: Provides a simple interface to complex subsystems
  + Reduced Dependencies: Reduces dependencies from client code to subsystem classes
  + Decoupling of Subsystems and Client: Changes in subsystems have minimal effect on client code
  + Easier to Use: Hides the complexities and makes subsystems easier to use
  + Promoties Layering: Promotes a layered architecture in your code

  Facade Disadvantges:
  - Over-abstraction: Can lead to unnecessary level of abstraction
  - Limited Flexibility: Facades limit access to full functionality of the subsystem
  - Hiding Useful Information: Encapsulation might hide beneficial subsystem behavior

  Facade Use Cases:
  * Ecommerce Systems: Simplifies client transactions with subsystems like inventory management, payment processing, shipping
  * Banking Systems: Handles operations like authentication, balance checks, transactions in a simplified manner
  * Game Engines: Provides simplified API to game devs, hiding complexities of underlying engine subsystems
*/