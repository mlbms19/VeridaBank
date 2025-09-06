(function () {
  function bindFeedback() {
    const root = document.querySelector('.feedback-footer');
    if (!root) return;

    const msg = root.querySelector('#feedback-message');
    const yes = root.querySelector('#feedback-yes');
    const no  = root.querySelector('#feedback-no');

    function show(text) {
      if (!msg) return;

      // Set the message text (allow HTML)
      msg.innerHTML = text;

      // 🔒 Enforce the exact look regardless of theme CSS
      msg.style.color = '#bbb';       // lighter grey than body text
      msg.style.fontStyle = 'italic'; // italicized text
      msg.style.fontWeight = '100';   // very light
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

    rebind(yes, () => show(
      "We're happy we could help! <span class='no-italic' style=\"font-style:normal;font-weight:400;font-family:'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji','Twemoji Mozilla','EmojiOne Color',sans-serif\">🙂</span>"
    ));
    rebind(no,  () => show("We heard you. We’ll work on making this article better."));
  }

  // Works with Material's navigation.instant
  if (window.document$) {
    window.document$.subscribe(bindFeedback);
  } else {
    document.addEventListener('DOMContentLoaded', bindFeedback);
  }
})();
