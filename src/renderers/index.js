class PrayerTime {
  constructor() {
    // so class can call database manager
    this.setDbManager(DbManager.instance)

    // set event to buttons
    this.bindSettingsBtn()
    this.bindRefreshBtn()

    // receive from main process to render method
    window.electronAPI.onCloseSettings(() => {
      this.renderMethod()
    })
  }

  setDbManager(dbm) {
    this.dbm = dbm
  } 

  // get selected method from IndexedDB
  async getSelectedMethodName() {
    // query all methods
    const methods = await this.dbm.db.methods.toArray()

    // query a selected method
    const selectedMethod = await this.dbm.db.global.get({ key: 'selectedMethod'})

    // find a selected method from methods array
    let foundMethod = methods.filter((method => method.id == selectedMethod.value))
    
    // get selected method name
    let methodName = null;
    if (foundMethod.length === 1)
      methodName = foundMethod[0].name
    
    return methodName;
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
      // one way, tell main process to update data from remote server
      window.electronAPI.updateData()
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
    this.getSelectedMethodName().then(result => selected.innerText = result)
  }

  renderPrayerTimes() {
    // get the day starting from 0. need to find data in an array
    const day = new Date().getDate() - 1

    // TODO add parameter selectedMethod
    window.electronAPI.getPrayerTime(day).then(timings => {
      // render prayer times in main window
      document.querySelector('.fajr-time').innerText = this.cleanTiming(timings.Fajr)
      document.querySelector('.dhuhr-time').innerText = this.cleanTiming(timings.Dhuhr)
      document.querySelector('.asr-time').innerText = this.cleanTiming(timings.Asr)
      document.querySelector('.maghrib-time').innerText = this.cleanTiming(timings.Maghrib)
      document.querySelector('.isha-time').innerText = this.cleanTiming(timings.Isha)
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