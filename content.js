chrome.storage.sync.get(Object.keys(DEFAULT_OPTIONS), (savedOptions) => {
    Object.keys(DEFAULT_OPTIONS).forEach(id => savedOptions[id] = savedOptions[id] || DEFAULT_OPTIONS[id]);
    const preElements = document.querySelectorAll('pre');
    preElements.forEach(pre => {
        const lines = pre.innerText.split('\n');
        const highlightedLines = lines.map(line => highlightLine(line, savedOptions));
        pre.innerHTML = highlightedLines.filter(line => line.trim()).join('<br>');
    });
})
