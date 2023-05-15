// CALCULATION METHOD
const METHODS_SEED = [
  { id: 1, name: 'University of Islamic Sciences, Karachi' },
  { id: 2, name: 'Islamic Society of North America' },
  { id: 3, name: 'Muslim World League' },
]

const CITY_SEED = [
  { id: 1, name: 'Jakarta' },
  { id: 2, name: 'Depok' },
  { id: 3, name: 'Bandung' },
]

const JAKARTA = 1
const MUSLIM_WORLD_LEAGUE_METHOD = 3

const GLOBAL_SEED = [
  { id: 1, key: 'selectedMethod', value: MUSLIM_WORLD_LEAGUE_METHOD },
  { id: 2, key: 'selectedCity', value: JAKARTA },
]

// DATABASE CONFIGURATION
const DB = 'prayertime'
const TABLES = {
  methods: '++id, name',
  global: '++id, key, value',
  city: '++id, name',
  timings: '++id, [methodId+cityId+gregorian], hijri, fajr, dhuhr, asr, maghrib, isha'
}


// using a simpleton pattern with getter, one of creational design pattern
// no need to instantiate, just use `DbManager.instance`
// if no instance exists, the class will instantiate automatically
// otherwise, use the existing instance
class DbManager {
  static simpletonInstance

  static get instance() {
    if (!this.simpletonInstance) {
      // instantiate DbManager. it means no need to instatiate in any files
      this.simpletonInstance = new this()
    }

    return this.simpletonInstance
  }

  constructor() {
    // create a database
    this.db = new Dexie(DB)

    // create tables
    // everytime adding a new table, version should increment
    this.db.version(1).stores(TABLES)

    // this.db.open()

    // populate with initial data
    this.insertSeed()
  }

  insertSeed() {
    // global changes based on user settings. bulkAdd to ensure when refresh
    // main window, global doesn't change
    this.db.global.bulkAdd(GLOBAL_SEED)

    this.db.methods.bulkPut(METHODS_SEED)
    this.db.city.bulkPut(CITY_SEED)
  }

  runSample() {
    // get all schemas
    this.db.tables.forEach((table) => {
      console.log('Schema of ' + table.name + ': ' + JSON.stringify(table.schema))
    })

    // query all
    this.db.methods.toArray().then(item => console.log(item))
    this.db.global.toArray().then(item => console.log(item))

    // query using where
    this.db.global.where({ key: 'selectedMethod' }).toArray().then(item => console.log(item))

    // query using get with id
    this.db.global.get(1).then(item => console.log(item))

    // query using get with attribute
    this.db.global.get({ key: 'selectedMethod' }).then(item => console.log(item))
  }
}