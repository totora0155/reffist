document.body.addEventListener('keydown', (e) => {
  if (e.metaKey) {
    switch (e.keyCode) {
      case 49:
        window.resizeTo(320, 480);
        break;
      case 50:
        window.resizeTo(768, 1024);
        break;
    }
  }
})
