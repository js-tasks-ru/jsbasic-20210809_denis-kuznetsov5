function toggleText() {
  let btn = document.querySelector('button');
  let text = document.querySelector('#text');

  btn.onclick = function () {
    if (text.hidden === false) {
      text.hidden = true;
    } else {
      text.hidden = false;
    }
  };
}
