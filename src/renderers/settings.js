class Setting {
  constructor() {
    this.setDbManager(DbManager.instance)

    this.bindApplyBtn()

    this.renderMethodSelect()
  }

  setDbManager(dbm) {
    this.dbm = dbm
  }

  bindApplyBtn() {
    const applyBtn = document.getElementById('apply-btn')
    applyBtn.addEventListener('click', () => {
      const methodSelect = document.getElementById('method-select')

      // store selected method to db
      this.dbm.db.global.update(1, { key: 'selectedMethod', value: parseInt(methodSelect.value) })
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
}

new Setting()