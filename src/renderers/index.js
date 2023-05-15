class PrayerTime {
  constructor() {
    // so class can call database manager
    this.setDbManager(DbManager.instance)

    // set event to buttons
    this.bindSettingsBtn()
    this.bindRefreshBtn()

    // receive from main process to render method
    window.electronAPI.onCloseSettings(() => {
      this.render()
    })
  }

  setDbManager(dbm) {
    this.dbm = dbm
  } 

  // get selected method from IndexedDB
  async getSelectedMethod() {
    // query a selected method from settings
    const selectedMethod = await this.dbm.db.global.get({ key: 'selectedMethod'})

    // query method by id
    return await this.dbm.db.methods.get({ id: selectedMethod.value })
  }

  // get selected method from IndexedDB
  async getSelectedCity() {
    // query a selected method from settings
    const selectedCity = await this.dbm.db.global.get({ key: 'selectedCity'})

    // query city by id
    return await this.dbm.db.city.get({ id: selectedCity.value })
  }

  bindSettingsBtn() {
    const configBtn = document.getElementById('config-btn')
    configBtn.addEventListener('click', () => {
      // one way, tell main process to open settings window
      window.electronAPI.openSettings()
    })
  }

  bindRefreshBtn() {
    const refreshBtn = document.getElementById('refresh-btn')

    refreshBtn.addEventListener('click', () => {
      const method = this.getSelectedMethod()
      const city = this.getSelectedCity()

      // wait until all promises resolved
      Promise.all([method, city]).then(params => {
        // one way, tell main process to update data from remote server
        window.electronAPI.getPrayerTimeList(params)
          .then(items => {
            items.forEach(item => {
              this.dbm.db.timings.put({
                methodId: params[0].id,
                cityId: params[1].id,
                gregorian: item.date.gregorian.date,
                hijri: item.date.hijri.date,
                fajr: this.cleanTiming(item.timings.Fajr),
                dhuhr: this.cleanTiming(item.timings.Dhuhr),
                asr: this.cleanTiming(item.timings.Asr),
                maghrib: this.cleanTiming(item.timings.Maghrib),
                isha: this.cleanTiming(item.timings.Isha),
              })
            })
          })
      })
    })
  }

  renderClock() {
    let clock = document.getElementById('clock');
  
    function time() {
      var d = new Date();
      var s = d.getSeconds();
      var m = d.getMinutes();
      var h = d.getHours();

      // render clock in main window
      clock.textContent =
        ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
    }
  
    // every 1 second, render clock
    setInterval(time, 1000);
  }

  renderMethod() {
    const selected = document.getElementById('selected-method')

    // render method name in main window
    this.getSelectedMethod().then(method => selected.innerText = method.name)
  }

  renderPrayerTimes() {
    const gregorian = moment().format('DD-MM-YYYY')
    const method = this.getSelectedMethod()
    const city = this.getSelectedCity()

    Promise.all([method, city]).then(params => {
      const methodId = params[0].id
      const cityId = params[1].id

      this.dbm.db.timings.get({ methodId: methodId, cityId: cityId, gregorian: gregorian})
        .then(timings => {
          // render prayer times in main window
          document.querySelector('.fajr-time').innerText = this.cleanTiming(timings.fajr)
          document.querySelector('.dhuhr-time').innerText = this.cleanTiming(timings.dhuhr)
          document.querySelector('.asr-time').innerText = this.cleanTiming(timings.asr)
          document.querySelector('.maghrib-time').innerText = this.cleanTiming(timings.maghrib)
          document.querySelector('.isha-time').innerText = this.cleanTiming(timings.isha)
        })
    })
  }

  // remove timezone string. ex: 11:25 (WIB)
  cleanTiming(timing) {
    return timing.split(' ')[0]
  }

  render() {
    this.renderClock()
    this.renderMethod()
    this.renderPrayerTimes()
  }
}

new PrayerTime().render()