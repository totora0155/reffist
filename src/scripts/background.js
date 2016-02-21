import io from 'socket.io-client';

chrome.browserAction.onClicked.addListener((tab) => {
  const {url} = tab;
  let socket = io('http://localhost:53825', {
    reconnection: false,
  });
  socket.emit('open', {url});
  socket.on('disconnect', () => {
    socket = null;
  });
});
