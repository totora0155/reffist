let window = null;

chrome.browserAction.onClicked.addListener((tab) => {
  const {url} = tab;
  const width = 320;
  const height = 480;
  const type = 'popup';

  (async function() {
    window = await createWindow({url, width, height, type});
    const {id: tabId} = window.tabs[0];
    const message = 'tabId'
    executeScript(tabId).then(() => {
      chrome.runtime.sendMessage({message, tabId}, () => {});
    });
  })();
});

function createWindow(data) {
  return new Promise((resolve) => {
    chrome.windows.create(data, (window) => {
      return resolve(window);
    });
  });
}

function executeScript(tabId) {
  const file = 'scripts/executer.js';
  return new Promise((resolve) => {
    console.log(9);
    chrome.tabs.executeScript(tabId, {
      code: `var __reffist__tabId = ${tabId};`,
    }, () => {
      console.log(111);
      chrome.tabs.executeScript(tabId, {
        file,
        runAt: 'document_end',
      }, () => {return resolve()});
    });

  });
}
