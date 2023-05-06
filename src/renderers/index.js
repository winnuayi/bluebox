// CALCULATION METHOD
const methods = [
  { value: 1, name: 'University of Islamic Sciences, Karachi' },
  { value: 2, name: 'Islamic Society of North America' },
  { value: 3, name: 'Muslim World League' },
]

const INITIAL_METHOD = 3

class PrayerTime {
  constructor() {
    // store variables
    localStorage.setItem('methods', JSON.stringify(methods))
    localStorage.setItem('selectedMethod', INITIAL_METHOD)

    this.bindConfigBtn()
    this.bindRefreshBtn()
  }

  getSelectedMethodName() {
    const methodValue = parseInt(localStorage.getItem('selectedMethod'))  
    const methods = JSON.parse(localStorage.getItem('methods'))
  
    let methodName = null;
    for (let i = 0; i < methods.length; i++) {
      if (methods[i].value === methodValue) {
        methodName = methods[i].name
        break;
      }
    }
  
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
    selected.innerText = this.getSelectedMethodName()
  }

  render() {
    this.renderClock()
    this.renderMethod()
  }
}

new PrayerTime().render()