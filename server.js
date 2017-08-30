const express = require('express')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 8088

const indexHTML =
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="style.css">
        <title>Is this a website right now?</title>
    </head>
    <body class="Body">
        <span class="Yes">Yes it is</span>
    </body>
    </html>`

const isIt = function makeDelete() {

    let today = new Date()
    let date = `${(today.getMonth() + 1)}-${today.getDate()}-${today.getFullYear()}`
    let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    let dateTime = `${time} | ${date}`

    if (getRandom() >= 0.5) {
        fs.writeFile('index.html', indexHTML, (err) => {
            if (err) throw err
            console.log('Is it right now? Yes it is')
        })
        fs.appendFile('yesitis.txt', 
        `
This was a website on | ${dateTime} |
        `, (err) => {
            if (err) throw err
            console.log(dateTime)
        })
    } else {
        fs.writeFile('index.html', indexHTML, (err) => {
            if (err) throw err
            fs.unlink('index.html', (err) => {
                if (err) throw err
                console.log('Is it right now? No it is not')
            })
        })
        fs.appendFile('noitisnot.txt', 
        `
This was not a website on | ${dateTime} |
        `, (err) => {
            if (err) throw err
            console.log(dateTime)
        })
    }
}

app.listen(port, () => {
    console.log('Is this a website right now?')
})

app.use(express.static('./'))

setInterval(isIt, 3000)

app.get('/', (req, res) => {
    res.sendFile('/index.html')
})

app.get('*', function (req, res) {
    res.sendStatus(404)
})

function getRandom() {
    return Math.random()
}