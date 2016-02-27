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
});
