var table = document.querySelectorAll('ul')[4],
    items = table.querySelectorAll('li'),
    testsList = [];

items.forEach(li => {
  const match = li.textContent.match(/bozik-\d*/);
  if (match) {
    testsList.push(match[0]);
  }
  
});
console.log(testsList);
chrome.runtime.sendMessage({ type: 'RESULTS', data: testsList });