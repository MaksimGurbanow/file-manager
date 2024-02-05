const formatTable = async (data) => {
    const header = 'Index\t\tName\t\tType\n------------------------------' + 
    '---------------------------------------------\n';
    const rows = data
        .map((item, index) => `${index.toString().padEnd(20)}\t\t\x1b[34m${item[0].padEnd(20)}\x1b[0m\t\t\x1b[32m${item[1].padEnd(20)}\x1b[0m`)
        .join('\n');

    return `${header}${rows}`;
};



export { formatTable };
