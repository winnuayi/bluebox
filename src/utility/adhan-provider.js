// ensure running simple http server where json file exists
// `$ python3 -m http.server 9000`
// `$ python -m SimpleHTTPServer 9000`

// Sample API
// http://api.aladhan.com/v1/calendarByCity/2023/5?city=Jakarta&country=Indonesia&method=3

class AdhanProvider {
  constructor() {
    // so class can call database manager
    // this.setDbManager(DbManager.instance)
  }

  setDbManager(dbm) {
    this.dbm = dbm
  }

  async getPrayerTimeList(params) {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1

    const method = params[0].id
    const city = params[1].name
    
    const url = `http://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${city}&country=Indonesia&method=${method}`
    // const url = 'http://localhost:9000/2023-05-M03-JAKARTA.json'

    const response = await fetch(url)
    const x = await response.json()
    
    return await x.data
  }

  // get prayer time by date
  async getPrayerTime(day) {
    // using Fetch API to get data
    const response = await fetch('http://localhost:9000/2023-05-M03-JAKARTA.json')
    const x = await response.json()

    // async function has to return Promise, keep using await to return Promise
    return await x.data[day].timings
  }
}

// in electron, use module to export
module.exports.adhanProvider = new AdhanProvider()