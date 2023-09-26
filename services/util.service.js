import fs from 'fs'

export const utilService = {
    readJsonFile,
    checkForAllDuplicates
}


function readJsonFile(path) {
    const str = fs.readFileSync(path, 'utf8')
    const json = JSON.parse(str)
    return json
}


function checkForAllDuplicates(tags1, tags2) {
    for (const tag1 of tags1) {
        if (!tags2.includes(tag1)) {
            return false; 
        }
    }
    return true;
}