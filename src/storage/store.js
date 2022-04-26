
class Store  {
    constructor() {
        this.entries = {}
    }
    
    addCount = (wordPair) => {
        this.entries[wordPair] = (this.entries[wordPair] || 0) + 1
    }

    getMultipleOccurrenceCount = () => {
        return Object.entries(this.entries).reduce((count, cur) => {
            if (cur[1] > 1) {  
                return count+1
            }
            return count
        }, 0)
    }

    getTotal = () => {
        return this.entries
    }
}

module.exports = Store