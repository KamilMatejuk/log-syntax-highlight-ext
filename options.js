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
    // load options
    chrome.storage.sync.get(Object.keys(DEFAULT_OPTIONS), (savedOptions) => {
        // load default options if not set
        savedOptions = Object.fromEntries(
            Object.keys(DEFAULT_OPTIONS).map(id => [id, savedOptions[id] || DEFAULT_OPTIONS[id]])
        )
        chrome.storage.sync.set(savedOptions);
        // on change
        Object.entries(DEFAULT_OPTIONS).forEach(o => {
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
            chrome.storage.local.clear(() => alert('Options reset to default'));
            chrome.storage.sync.clear();
        })

        // save
        document.getElementById("save").addEventListener("click", () => {
            const newValues = Object.fromEntries(
                Object.keys(DEFAULT_OPTIONS).map(id => 
                    [id, id.startsWith("hide") ? document.getElementById(id).checked : document.getElementById(id).value]
                )
            )
            chrome.storage.sync.set(newValues, () => alert('Options saved'));
        })
            
        // example
        showExample(savedOptions)
    });
});
