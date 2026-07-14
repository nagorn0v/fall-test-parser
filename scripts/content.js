var tables = document.querySelectorAll('ul');
var table = tables[tables.length - 1],
    items = table.querySelectorAll('li'),
    testsList = [];

items.forEach(li => {
  const match = li.textContent.match(/bozik-\d*/);
  if (match) {
    testsList.push(match[0]);
  }
  
});
chrome.runtime.sendMessage({ type: 'RESULTS', data: testsList });
