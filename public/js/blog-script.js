(function() {
  const headings = document.querySelectorAll('.blog-entry');

  Array.prototype.forEach.call(headings, entry => {
    let btn = entry.querySelector('button');
    let target = entry.nextElementSibling;

    btn.onclick = () => {
      let expanded = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', !expanded);
      target.hidden = expanded;
    }
  });
})()
