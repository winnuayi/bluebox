class PrayerTime {
  constructor() {
    this.setDbManager(DbManager.instance)

    this.bindSettingsBtn()
    this.bindRefreshBtn()

    window.electronAPI.onCloseSettings(() => {
      this.renderMethod()
    })
  }

  setDbManager(dbm) {
    this.dbm = dbm
  } 

  async getSelectedMethodName() {  
    const methods = await this.dbm.db.methods.toArray()
    const selectedMethod = await this.dbm.db.global.get({ key: 'selectedMethod'})

    let foundMethod = methods.filter((method => method.id == selectedMethod.value))
    
    let methodName = null;
    if (foundMethod.length === 1)
      methodName = foundMethod[0].name
    
    return methodName;
  }

  bindSettingsBtn() {
    const configBtn = document.getElementById('config-btn')
    configBtn.addEventListener('click', () => {
      // one way, renderer to main
      window.electronAPI.openSettings()
    })
  }

  bindRefreshBtn() {
    const refreshBtn = document.getElementById('refresh-btn')
    refreshBtn.addEventListener('click', () => {
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
      clock.textContent =
        ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
    }
  
    setInterval(time, 1000);
  }

  renderMethod() {
    const selected = document.getElementById('selected-method')
    this.getSelectedMethodName().then(result => selected.innerText = result)
  }

  async renderPrayerTimes() {
    // get the day starting from 0. need to find data in an array
    const day = new Date().getDate() - 1

    // TODO add parameter selectedMethod
    window.electronAPI.getPrayerTime(day).then(response => {
      const timings = response.data[day].timings
      
      document.querySelector('.fajr-time').innerText = this.cleanTiming(timings.Fajr)
      document.querySelector('.dhuhr-time').innerText = this.cleanTiming(timings.Dhuhr)
      document.querySelector('.asr-time').innerText = this.cleanTiming(timings.Asr)
      document.querySelector('.maghrib-time').innerText = this.cleanTiming(timings.Maghrib)
      document.querySelector('.isha-time').innerText = this.cleanTiming(timings.Isha)
    })
  }

  // remove timezone. ex: 11:25 (WIB)
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