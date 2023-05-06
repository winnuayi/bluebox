class Setting {
  constructor() {
    this.bindApplyBtn()
  }

  bindApplyBtn() {
    const applyBtn = document.getElementById('apply-btn')
    applyBtn.addEventListener('click', () => {
      const methodSelect = document.getElementById('method-select')
      localStorage.setItem('selectedMethod', methodSelect.value)
      this.setDisabledBtn('apply-btn')
    })
  }

  setDisabledBtn(tag) {
    const btn = document.getElementById(tag)
    btn.addEventListener('click', () => {
      btn.setAttribute('disabled', '')
    })
  }
}

new Setting()