window.addEventListener('DOMContentLoaded', () => {
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
})