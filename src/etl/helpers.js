const { CHAPTER_PREFIX } = require('./constants')

const getChapterStartingLineIndex = (lines) => {
    const chapterStartingLines = []
    lines.forEach((line, index) => {
        if (line.startsWith(CHAPTER_PREFIX)) {
            chapterStartingLines.push(index++)
        }
    })
    return chapterStartingLines
}


const getChapterText = (lines, chapterStartingLineIndices, chapterNumber) => {
    const startLine = chapterStartingLineIndices[chapterNumber]
    const endline = chapterStartingLineIndices[chapterNumber + 1] || lines.length - 1
    if (startLine < endline) {
        return lines.slice(startLine + 1, endline)
    }
    return []
}

const getSanitizedText = (lines) => {
    const a = lines.join(' ')
        .toLowerCase()
        .replace(/[^\w\s]|_/g, " ")
    const b = a.replace(/\s+/g, " ")
    return b
}

const getWordPairs = (text) => {
    const words = text.trim().split(' ')
    const wordPairArr = []
    words.forEach((word, index) => {
        if (index < words.length - 1) {
            wordPairArr.push(`${word} ${words[index + 1]}`)
        }
    })

    return wordPairArr
}


module.exports = {
    getChapterStartingLineIndex,
    getChapterText,
    getSanitizedText,
    getWordPairs
}
