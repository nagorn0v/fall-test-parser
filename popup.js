let collectedItems = [];

document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab.id) return;
  
  var siteUrl = 'jenkins-py.bars.group';
  if (!tab.url.includes(siteUrl)) {
    document.getElementById('results').textContent = `Расширение работает только на ${siteUrl}`;
    document.getElementById('copyBtn').disabled = true;
    return;
  }

  chrome.runtime.onMessage.addListener(function handler(message) {
    if (message.type === 'RESULTS') {
      collectedItems = message.data;
      renderResults(message.data);
      
      if (!message.data.length) {
        document.getElementById('copyBtn').disabled = true;
      }
      chrome.runtime.onMessage.removeListener(handler);
    }
  });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['scripts/content.js']
  });
});

document.getElementById('copyBtn').addEventListener('click', () => {
  if (collectedItems.length === 0) return;

  const text = collectedItems.join(',');
  navigator.clipboard.writeText(text).then(() => {
    document.getElementById('copyBtn').textContent = 'Скопировано ✓';
  });
});

function renderResults(items) {
  const container = document.getElementById('results');
  container.innerHTML = '';

  if (items.length === 0) {
    container.textContent = 'Ничего не найдено';
    return;
  }

  const ul = document.createElement('ul');
  items.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
  });
  container.appendChild(ul);
}