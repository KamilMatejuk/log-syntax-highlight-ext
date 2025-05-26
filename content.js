chrome.storage.sync.get(
    ['date', 'plus', 'stage', 'pipeline', 'brackets', 'hidePipeline', 'hidePlus', 'hideAll'],
    (savedOptions) => {
        const preElements = document.querySelectorAll('pre');
        preElements.forEach(pre => {
            const lines = pre.innerText.split('\n');
            const highlightedLines = lines.map(line => highlightLine(line, savedOptions));
            pre.innerHTML = highlightedLines.filter(line => line.trim()).join('<br>');
        });
    }
)