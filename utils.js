const formatANSI = (line) => {
    return line
        .replace(/\[0;30m/g, `<span style="color: #2e3436">`)
        .replace(/\[0;31m/g, `<span style="color: #cc0000">`)
        .replace(/\[0;32m/g, `<span style="color: #4e9a06">`)
        .replace(/\[0;33m/g, `<span style="color: #c4a000">`)
        .replace(/\[0;34m/g, `<span style="color: #3465a4">`)
        .replace(/\[0;35m/g, `<span style="color: #75507b">`)
        .replace(/\[0;36m/g, `<span style="color: #06989a">`)
        .replace(/\[0;37m/g, `<span style="color: #d3d7cf">`)
        .replace(/\[0;90m/g, `<span style="color: #555753">`)
        .replace(/\[0;91m/g, `<span style="color: #ef2929">`)
        .replace(/\[0;92m/g, `<span style="color: #8ae234">`)
        .replace(/\[0;93m/g, `<span style="color: #fce94f">`)
        .replace(/\[0;94m/g, `<span style="color: #729fcf">`)
        .replace(/\[0;95m/g, `<span style="color: #ad7fa8">`)
        .replace(/\[0;96m/g, `<span style="color: #34e2e2">`)
        .replace(/\[0;97m/g, `<span style="color: #eeeeec">`)
        .replace(/\[0m/g, `</span>`);
}

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
    if (options.hidePlus && line.match(/^ +\+.*/)) return ''
    exclusiveFormatInLine(/^ +\+.*/, options.plus)

    // start and end of stage
    exclusiveFormatInLine(/^ +\[Pipeline\][\/ ]*stage.*/, options.stage)

    // lines starting with [Pipeline]
    if (options.hidePipeline && line.match(/ +\[Pipeline\].*/)) return ''
    exclusiveFormatInLine(/^ +\[Pipeline\].*/, options.pipeline)

    // ASCI colors
    const newLine = formatANSI(line);
    if (newLine !== line) {
        highlighted += newLine;
        line = '';
    }

    // brackets
    const matchBrackets = [...line.matchAll(/\[.*?]/g)].filter(match => match[0].length < 100);
    matchBrackets.forEach(match => {
        line = line.replace(match[0], `<span style="color: ${options.brackets}">${match[0]}</span>`);
    })

    return highlighted + line;
}