class AdhanProvider {
  static getData() {
    // fetch('http://api.aladhan.com/v1/calendarByCity/2023/5?city=Jakarta&country=Indonesia&method=3')
    fetch('http://localhost:9000/adhan.json')
      .then(response => {
        response.json().then(result => {
          result.data.forEach(i => {
            console.log(i.date.readable, i.timings.Fajr, i.timings.Dhuhr, i.timings.Asr, i.timings.Maghrib, i.timings.Isha)
          });
        })
      }).catch(e => console.log(e))
  }

  static getPrayerTime(day) {
    fetch('http://localhost:9000/adhan.json')
      .then(response => {
        response.json().then(result => { 
          console.log(result.data[day].timings)
          return result
        })
        
        // return response.json()
        // const result = await response.json()
        // const prayerTimes = result.data[day].timings
        // console.log(prayerTimes)
        // return prayerTimes
      }).catch(e => console.log(e))
  }
}

module.exports.AdhanProvider = AdhanProvider