class Setting {
  constructor() {
    this.bindApplyBtn()
  }

  setDbManager(dbm) {
    this.dbm = dbm
  }

  bindApplyBtn() {
    const applyBtn = document.getElementById('apply-btn')
    applyBtn.addEventListener('click', () => {
      const methodSelect = document.getElementById('method-select')
      this.dbm.db.global.update(1, { key: 'selectedMethod', value: methodSelect.value })
    })
  }

  setDisabledBtn(tag) {
    const btn = document.getElementById(tag)
    btn.addEventListener('click', () => {
      btn.setAttribute('disabled', '')
    })
  }
}

let s = new Setting()
s.setDbManager(DbManager.instance)