class Setting {
  constructor() {
    this.setDbManager(DbManager.instance)

    this.bindApplyBtn()
    this.bindCancelBtn()

    this.renderMethodSelect()
    this.renderCitySelect()
  }

  setDbManager(dbm) {
    this.dbm = dbm
  }

  bindApplyBtn() {
    const applyBtn = document.getElementById('apply-btn')
    applyBtn.addEventListener('click', () => {
      const methodSelect = document.getElementById('method-select')
      const citySelect = document.getElementById('city-select')

      // store selected method to db      
      this.dbm.db.global.bulkPut([
        { id: 1, key: 'selectedMethod', value: parseInt(methodSelect.value) },
        { id: 2, key: 'selectedCity', value: parseInt(citySelect.value) }
      ])

      window.close()
    })
  }

  bindCancelBtn() {
    const cancelBtn = document.getElementById('cancel-btn')
    cancelBtn.addEventListener('click', () => {
      window.close()
    })
  }

  setDisabledBtn(tag) {
    const btn = document.getElementById(tag)
    btn.addEventListener('click', () => {
      btn.setAttribute('disabled', '')
    })
  }

  async renderMethodSelect() {
    const methodSelect = document.getElementById('method-select')
    
    const selectedMethod = await this.dbm.db.global.get({ key: 'selectedMethod'})
    const methods = await this.dbm.db.methods.toArray()
    
    methods.forEach(method => {
      let option = document.createElement('option')
      option.value = method.id
      option.innerHTML = method.name
      
      // set selected
      if (method.id === selectedMethod.value)
        option.setAttribute('selected', 'selected')
      
        methodSelect.appendChild(option)
    })
  }

  async renderCitySelect() {
    const citySelect = document.getElementById('city-select')
    
    const selectedCity = await this.dbm.db.global.get({ key: 'selectedCity'})
    const cities = await this.dbm.db.city.toArray()
    
    cities.forEach(city => {
      let option = document.createElement('option')
      option.value = city.id
      option.innerHTML = city.name
      
      // set selected
      if (city.id === selectedCity.value)
        option.setAttribute('selected', 'selected')
      
        citySelect.appendChild(option)
    })
  }
}

new Setting()