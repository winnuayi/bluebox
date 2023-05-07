// CALCULATION METHOD
const METHODS_SEED = [
  { id: 1, name: 'University of Islamic Sciences, Karachi' },
  { id: 2, name: 'Islamic Society of North America' },
  { id: 3, name: 'Muslim World League' },
]

const MUSLIM_WORLD_LEAGUE_METHOD = 3
const GLOBAL_SEED = { id: 1, key: 'selectedMethod', value: MUSLIM_WORLD_LEAGUE_METHOD }


// using a simpleton pattern with getter, one of creational design pattern
// ex: no need to instantiate, just use `DbManager.instance`
class DbManager {
  static simpletonInstance

  static get instance() {
    if (!this.simpletonInstance) {
      this.simpletonInstance = new this()
    }

    return this.simpletonInstance
  }

  constructor() {
    // create a database
    this.db = new Dexie('prayertime')

    // create tables
    this.db.version(1).stores({
      methods: '++id, name',
      global: '++id, key, value'
    })

    // this.db.open()

    // populate with initial data
    this.insertSeed()
  }

  insertSeed() {
    this.db.methods.bulkPut(METHODS_SEED)
    this.db.global.add(GLOBAL_SEED)
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