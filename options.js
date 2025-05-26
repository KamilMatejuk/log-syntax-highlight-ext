
defaultOptions = {
    'date': '#07aa04',
    'plus': '#808080',
    'stage': '#ff0000',
    'pipeline': '#808080',
    'brackets': '#ff8800',
    'hidePipeline': false,
    'hidePlus': false,
    'hideAll': false,
};

function showExample(options) {
    ["example-light", "example-dark"].forEach(id => {
        const example = document.getElementById(id);
        const lines = example.innerText.split('\n');
        example.innerHTML = lines
            .map(line => highlightLine(line.trim(), options))
            .filter(line => line.trim())
            .join('<br>');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(Object.keys(defaultOptions), (savedOptions) => {
        // on change
        Object.entries(defaultOptions).forEach(o => {
            const [id, defaultValue] = o;
            const option = document.getElementById(id);
            if (id.startsWith("hide")) {
                option.checked = savedOptions[id] || defaultValue;
            } else {
                option.value = savedOptions[id] || defaultValue;
            }
            option.addEventListener('change', (event) => {
                const v = id.startsWith("hide") ? event.target.checked : event.target.value;
                showExample({...savedOptions, [id]: v})
            })
        })

        // reset
        document.getElementById("reset").addEventListener("click", () => {
            Object.entries(defaultOptions).forEach(o => {
                const [id, defaultValue] = o;
                const option = document.getElementById(id);
                if (id.startsWith("hide")) {
                    option.checked = defaultValue == "true";
                } else {
                    option.value = defaultValue;
                }
            });
            chrome.storage.sync.set(defaultOptions, () => alert('Options saved!'));
        })

        // save
        document.getElementById("save").addEventListener("click", () => {
            const newValues = Object.fromEntries(
                Object.keys(defaultOptions).map(id => 
                    [id, id.startsWith("hide") ? document.getElementById(id).checked : document.getElementById(id).value]
                )
            )
            chrome.storage.sync.set(newValues, () => alert('Options saved!'));
        })
            
        // example
        showExample(savedOptions)
    });
});
