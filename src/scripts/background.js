import io from 'socket.io-client';

chrome.browserAction.onClicked.addListener((tab) => {
  const {title, url} = tab;
  let socket = io('http://localhost:53825', {
    reconnection: false,
  });

  socket.emit('open', {title, url});

  socket.on('disconnect', () => {
    socket = null;
  });

  socket.on('connect_error', showNotification);
});

function showNotification() {
  chrome.notifications.create('reffist', {
    type: 'basic',
    iconUrl: '/icons/icon48-red.png',
    title: 'Reffist [Chrome]',
    message: chrome.i18n.getMessage('error'),
  }, () => {});
}

chrome.notifications.onClicked.addListener((id) => {
  if (id !== 'reffist') return;
  chrome.notifications.clear(id, () => {});
});
