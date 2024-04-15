interface MediaPlayerImplementation {
  playAudio(): void;
  playVideo(): void;
}

class WindowsMediaPlayer implements MediaPlayerImplementation {
  public playAudio(): void {
    console.log('Playing audio on Windows Media Player');
  }

  public playVideo(): void {
    console.log('Playing video on Windows Media Player');
  }
}

class MacOSMediaPlayer implements MediaPlayerImplementation {
  public playAudio(): void {
    console.log('Playing audio on MacOS Media Player');
  }

  public playVideo(): void {
    console.log('Playing video on MacOS Media Player');
  }
}

abstract class MediaPlayerAbstraction {
  constructor(protected implementation: MediaPlayerImplementation) {}

  abstract playFile(): void;
}

class AudioPlayer extends MediaPlayerAbstraction {
  public playFile(): void {
    this.implementation.playAudio();
  }
}

class VideoPlayer extends MediaPlayerAbstraction {
  public playFile(): void {
    this.implementation.playVideo();
  }
}

let windowsAudioPlayer = new AudioPlayer(new WindowsMediaPlayer());
windowsAudioPlayer.playFile();

let macOSVideoPlayer = new VideoPlayer(new MacOSMediaPlayer());
macOSVideoPlayer.playFile();


/*
  Example use case:
*/

/* Implementation Layer */
interface Database {
  connect(): void;
  query(query: string): void;
  close(): void;
}

class PostgreSQLDatabase implements Database {
  public connect(): void {
    console.log('Connecting to PostgreSql');
  }

  public query(query: string): void {
    console.log(`Executing query: ${query}`);
    // some detailed implementation here
  }

  public close(): void {
    console.log('Closing connection to PostgreSql');
  }
}

class MongoDBDatabase implements Database {
  public connect(): void {
    console.log('Connecting to MongoDB');
  }

  public query(query: string): void {
    console.log(`Executing query: ${query}`);
    // some detailed implementation here
  }

  public close(): void {
    console.log('Closing connection to MongoDB');
  }
}

abstract class DatabaseService {
  constructor(protected database: Database){}

  abstract fetchData(query: string): void;
}

class ClientDatabaseService extends DatabaseService {
  public fetchData(query: string): void {
    this.database.connect();
    this.database.query(query);
    this.database.close();
  }
}

let postgreService = new ClientDatabaseService(new PostgreSQLDatabase());
postgreService.fetchData('USERS');

let MongoDBService = new ClientDatabaseService(new MongoDBDatabase());
postgreService.fetchData('USERS');

/*
  When to Consider:
  * Hide Implementation Details from End User: If implementation-specific behavior needed
  * Switch Implementations at Runtime: If you need to switch environments/situations at run time
  * Code Structure Static but Dynamic Behavior: Classes are static in nature and neither are related to concrete implementation

  Bridge Advantages:
  + Decoupling of Abstraction FROM Implementation: If you want to change the latter without affecting the former
  + Improved Readability/Maintainability of Code: Separates high level logic from low level abstraction. Each piece of code has its own set of responsibilities. No classes are overlapping in responsibility
  + Runtime Binding: Able to make changes on the fly at runtime if you want to use one feature or another

  Bridge Disadvantges:
  - Over-engineering: May add unnecessary complexity in simple, stable software
  - Design Difficulty: Deciding on the correct abstraction and future changes may be challenging
  - Performance Overhead: Extra level of indirection can slow down the system
  - Development and Maintenance Costs: Refactorying and maintenance may be costly

  Bridge Use Cases:
  * Graphics Libraries: Works with multiple rendering APIs
  * Cross Platform Apps: Runs on multiple platforms
  * Different DB Systems: Interacts with different types of databases
