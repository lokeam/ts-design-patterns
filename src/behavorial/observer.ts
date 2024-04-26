interface ObserverExample {
  update(subject: SubjectExample): void;
}

interface SubjectExample {
  addObserver(observer: ObserverExample): void;
  removeObserver(observer: ObserverExample): void;
  notifyObservers():void;
  getState(): number;
  setState(state: number): void;
}

class ConcreteObserver implements ObserverExample {
  constructor(private id: number) {}

  public update(subject: SubjectExample): void {
    console.log(`Observer ${this.id} updated, new state: ${subject.getState()}`)
  }
}

class ConcreteSubject implements SubjectExample {
  private observers: ObserverExample[] = [];
  private state: number = 0;

  public addObserver(observer: ObserverExample): void {
    const isExists = this.observers.includes(observer);
    if (isExists) {
      return console.log('Observer already exists');
    }

    this.observers.push(observer);
    console.log('Observer successfully added');
  }

  public removeObserver(observer: ObserverExample): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Observer does not exist');
    }

    this.observers.splice(observerIndex, 1);
    console.log('Observer successfully removed');
  }

  public notifyObservers(): void {
    this.observers.forEach((observer) => observer.update(this));
  }

  public getState(): number {
    return this.state;
  }

  public setState(state: number): void {
    this.state = state;
    console.log('Setting state...');

    this.notifyObservers();
  }
}

const subject = new ConcreteSubject();

const observer1 = new ConcreteObserver(1);
subject.addObserver(observer1);

const observer2 = new ConcreteObserver(2);
subject.addObserver(observer2);

subject.setState(123);


/*
  Example use case:
*/

interface Observer {
  updateState(temperature: number, humidity: number, pressure: number): void;
}

interface Subject {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers():void;
}

class WeatherData implements Subject {
  private observers: Observer[] = [];
  private temperature: number | undefined;
  private humidity: number | undefined;
  private pressure: number | undefined;

  public registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);

    if(index >= 0) {
      this.observers.splice(index, 1);
    }
  }

  public notifyObservers(): void {
    if (this.temperature !== undefined && this.humidity !== undefined && this.pressure !== undefined) {
      for (let observer of this.observers) {
        observer.updateState(this.temperature, this.humidity, this.pressure);
      }
    }
  }

  public setMeasurements(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notifyObservers();
  }
}

class CurrentConditionsDisplay implements Observer {
  private temperature: number | undefined;
  private humidity: number | undefined;
  private pressure: number | undefined;

  constructor(private weatherData: Subject) {
    this.weatherData.registerObserver(this);
  }

  public updateState(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.display();
  }

  public display(): void {
    if (this.temperature !== undefined && this.humidity !== undefined && this.pressure !== undefined) {
      console.log(`Temp: ${this.temperature} | Humidity: ${this.humidity} | Pressure: ${this.pressure}`);
    } else {
      console.log('Weather data unavailable');
    }
  }
}

const weatherData = new WeatherData();
const currentDisplay = new CurrentConditionsDisplay(weatherData);

weatherData.setMeasurements(80, 65, 30.4);
weatherData.setMeasurements(82, 70, 30.4);

/*
  When to Consider:
  * Polling: If your code is constantly checking/polling an object whether its state has changed. Observer patterns allows
    an object to notify other objects directly when its state changes
  * Inefficient Updates: If an object is being updated too often, or if only some of its observers need to react to changes,
    yet its updating all of them anyway. Observer pattern can target specific observers, optimizing update process
  * Ineffective Communication Between Objects: If objects are communicating directly with many others to share their internal state, this
    may result in code that is difficult to maintain and understand.
    Implementing Observer pattern here ensures a clean way of communication between objects.
  * High component coupling: If components within system are highly dependant on each other, then changes in one might affect the others.
    Observer pattern provides a way to reduce dependencies between software components.

  Observer Advantages:
  + Decoupling of Subject and Observer: Subject doesn't need to know anything about its observers, only that they implement Observer interface
  + Dynamic Relationships: Pattern allows adding and removing of observers at runtime
  + Broadcase Communication: Subject may send updates to all observers when its state changes
  + Open-ended System Support: New observers may be added without modifying the subject's code

  Observer Disadvantages:
  - Unexpected Updates: Updates may be triggered when they are not needed or expected
  - Difficulty in Debugging: May lead to complex chains of reactions that may be hard to follow
  - Memory Leaks: Must remember to remove observers when they are no longer needed
  - Ordering Updates: Pattern does not specificy the order in which observers receive updates
  - Too many notifications: Any change results in all observers being notified, possible inefficiencies

  Observer Use Cases:
  * GUI Interactions: User actions as events with UI components acting as observers
  * MVC Architecture: Views act as observers to model
  * Stock Market Applications: Investment algorithms, trader dashboards, acting as observers to stock prices
  * Social Networks: Followers notified about updates or messages
*/
