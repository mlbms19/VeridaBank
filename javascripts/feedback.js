(function () {
  function bindFeedback() {
    const root = document.querySelector('.feedback-footer');
    if (!root) return;

    const msg = root.querySelector('#feedback-message');
    const yes = root.querySelector('#feedback-yes');
    const no  = root.querySelector('#feedback-no');

    function show(text) {
      if (!msg) return;

      // Set the message text
      msg.textContent = text;

      // 🔒 Enforce the exact look regardless of theme CSS
      msg.style.color = '#bbb';       // lighter grey than body text
      msg.style.fontStyle = 'italic'; // italicized
      msg.style.fontWeight = '100';   // force non-bold
      msg.style.marginTop = '1rem';   // keep the gap

      // Replay the fade-in
      msg.classList.remove('show');
      void msg.offsetWidth;
      msg.classList.add('show');
    }

    // Rebind cleanly to avoid duplicate listeners
    function rebind(anchor, handler) {
      if (!anchor) return null;
      const clone = anchor.cloneNode(true);
      anchor.replaceWith(clone);
      clone.addEventListener('click', (e) => {
        e.preventDefault();
        handler();
      });
      return clone;
    }

    rebind(yes, () => show("We're glad we could help! 🙂"));
    rebind(no,  () => show("We heard you. We’ll work on making this article better."));
  }

  // Works with Material's navigation.instant
  if (window.document$) {
    window.document$.subscribe(bindFeedback);
  } else {
    document.addEventListener('DOMContentLoaded', bindFeedback);
  }
})();
