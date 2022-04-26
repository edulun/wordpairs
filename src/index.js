const express = require('express')
const path = require('path');
const WordProcessor = require('./etl/process')
const Store = require('./storage/store')
const app = express()
const port = 3000
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.post('/', (req, res) => {
    const { range, rawText } = req.body
    console.log(req.body)
    const wordProcessor = new WordProcessor(new Store());
    const result = wordProcessor.processWordCount(rawText, range)
    res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})