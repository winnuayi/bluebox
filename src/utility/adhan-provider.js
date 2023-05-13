// ensure running simple http server where json file exists
// `$ python3 -m http.server 9000`
// `$ python -m SimpleHTTPServer 9000`

// Sample API
// http://api.aladhan.com/v1/calendarByCity/2023/5?city=Jakarta&country=Indonesia&method=3

class AdhanProvider {
  static getPrayerTimes() {
    fetch('http://localhost:9000/adhan.json')
      .then(response => {
        response.json().then(result => {
          result.data.forEach(i => {
            console.log(i.date.readable, i.timings.Fajr, i.timings.Dhuhr,
                        i.timings.Asr, i.timings.Maghrib, i.timings.Isha)
          });
        })
      }).catch(e => console.log(e))
  }

  // get prayer time by date
  static async getPrayerTime(day) {
    // using Fetch API to get data
    const response = await fetch('http://localhost:9000/adhan.json')
    const x = await response.json()

    // async function has to return Promise, keep using await to return Promise
    return await x.data[day].timings
  }
}

// in electron, use module to export
module.exports.AdhanProvider = AdhanProvider