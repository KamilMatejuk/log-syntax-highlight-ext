const highlightLine = (line, options) => {
    if (options.hideAll) return line

    let highlighted = '';

    const exclusiveFormatInLine = (pattern, color) => {
        const match = line.match(pattern);
        if (match) {
            highlighted += `<span style="color: ${color}">${match[0]}</span>`;
            line = line.replace(pattern, '');
        }
    }
    
    // date at the beginning of line
    exclusiveFormatInLine(/^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\]/, options.date);
    
    
    // lines starting with +
    if (options.hidePlus && line.match(/ +\+.*/)) return ''
    exclusiveFormatInLine(/ +\+.*/, options.plus)
    
    // start and end of stage
    exclusiveFormatInLine(/ +\[Pipeline\][\/ ]*stage.*/, options.stage)
    
    // lines starting with [Pipeline]
    if (options.hidePipeline && line.match(/ +\[Pipeline\].*/)) return ''
    exclusiveFormatInLine(/ +\[Pipeline\].*/, options.pipeline)

    // brackets
    line = line.replace(/\[.*?\]/g, match => `<span style="color: ${options.brackets}">${match}</span>`);

    return highlighted + line;
}