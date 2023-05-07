class PrayerTime {
  constructor() {
    this.setDbManager(DbManager.instance)

    this.bindConfigBtn()
    this.bindRefreshBtn()
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

  bindConfigBtn() {
    const configBtn = document.getElementById('config-btn')
    configBtn.addEventListener('click', () => {
      window.open('settings.html', '_blank', 'top=100,left=200,height=300,width=300,frame=true,nodeIntegration=no')
    })
  }

  bindRefreshBtn() {
    const refreshBtn = document.getElementById('refresh-btn')
    refreshBtn.addEventListener('click', () => {
      this.renderMethod()
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

  render() {
    this.renderClock()
    this.renderMethod()
  }
}

new PrayerTime().render()