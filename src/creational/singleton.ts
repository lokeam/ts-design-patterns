class Singleton {
  /* `static` allows the ability to access property without instantiating class */
  private static instance: Singleton;

  /* prefix value with underscore for consistent naming convents with getters/setters */
  private static _value: number;

  /* No instantiation through use of `new` keyword */
  private constructor() {}

  /* Heart of singleton operation. Checks if instance already exists. If not, creates*/
  public static getInstance(): Singleton {
    if (!Singleton.instance){
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  /* Declare getter and setter */
  get value() {
    return Singleton._value;
  }

  set value(value: number) {
    Singleton._value = value;
  }
}

/*
  Implementation in action: creating two Singletons only instantiates on class
*/
let instance1 = Singleton.getInstance();
let instance2 = Singleton.getInstance();
instance1.value = 10;

/* both instance1 and instance2 refer to the same instance of Singleton class*/
console.log(instance1.value);
console.log(instance2.value);
console.log(instance1 === instance2);

/*
  Example use case:
*/

class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance():Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(message: string):void {
    const timestamp = new Date();
    console.log(`[ ${timestamp.toLocaleDateString} - ${message} ]`);
  }
}

let logger1 = Logger.getInstance();
logger1.log('This is the first message');

let logger2 = Logger.getInstance();
logger2.log('This is the second message');

/*
  When to Consider:
  * If using global variables that always need same value
  * Objects with multiple access points with a single control
  * Code includes repeated, expensive intialization of classes
  * If cannot have duplicate instances of same class
  * If you need to pass data to deeply nested objects/classes

  Singleton Advantages:
  + File Access Issues: Mitigates conflicts when writing to same file
  + Peformance: Optimizes resources by sharing the same file connection
  + Consistency: Ensures uniform logging format/destination
  + Configuration: Simplifies changes to logging format/level
  + Thread Safety: Prevents issues of concurrent writes to a file/db

  Singleton Disadvantges:
  - Global state: Leads to shared state and increased coupling
  - Testing Difficulty: Preserved state between tests may cause unexpected results
  - Concurrency Issues: Must ensure thread safety in multi-threaded env
  - Subclassing: Difficult to subclass due to static methods ans semantics of inheritance
  - Memory Management: Singleton instance remains in memory until app shuts down

  Uses Cases:
  * Caching: Prevents data dupes within cache
  * Service Proxies: Manages efficient server comms
  * Shred Resources: Ensures single access point to shared resource
  * Configuration Data: Centralzies access to config
  * Logger: Ensures Consistency in logging
*/
