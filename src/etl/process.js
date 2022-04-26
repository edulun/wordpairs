const { getChapterStartingLineIndex, getSanitizedText, getChapterText, getWordPairs } = require( "./helpers")

class WordProcessor {
    constructor(store) {
        this.store = store
    }

    processWordCount = (text, range) => {
        const lines = text.split(/\r?\n/).map(line => line.trim())
        console.log('line count ' + lines.length)
        const chapterStartingLines = getChapterStartingLineIndex(lines)
        console.log('chapter lines: ' + JSON.stringify(chapterStartingLines))
        // Default to every chapter if no range is provided.
        console.log('range', JSON.stringify(range))
        const selectedRange = (Array.isArray(range)) ? range : chapterStartingLines.map((_val, index) => index + 1)

        selectedRange.forEach(chapterNumber => {
            // zero-indexed
            const chapterLines = getChapterText(lines, chapterStartingLines, chapterNumber - 1)
            const sanitizedText = getSanitizedText(chapterLines)
            const wordPairs = getWordPairs(sanitizedText)
            wordPairs.forEach(this.store.addCount)
        })
        const count = this.store.getMultipleOccurrenceCount()
        return {
            repeatedPairCount: count,
            wordPairs: this.store.getTotal()
        }
    }
}

module.exports = WordProcessor