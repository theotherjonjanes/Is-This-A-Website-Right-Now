const express = require('express')
const fs = require('fs')
const app = express()

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

let yes = 0
let no = 0

const isIt = function makeDelete() {
    if (getRandom() >= 0.5) {
        fs.writeFile('index.html', indexHTML, (err) => {
            if (err) throw err
                ++yes
            console.log(`How many times has this has been a website? ${yes}`)
            return console.log('Is it right now? Yes it is')
        })
    } else {
        fs.writeFile('index.html', indexHTML, (err) => {
            if (err) throw err
            fs.unlink('index.html', (err) => {
                if (err) throw err
                    ++no
                console.log(`How many times has this has not been a website? ${no}`)
                return console.log('Is it right now? No it is not')
            })
        })
    }
}

app.listen(8088, () => {
    console.log('Is this a website right now?')
})

app.use(express.static('./'))

setInterval(isIt, 3000)

app.get('./', (req, res) => {
    res.sendFile('index.html')
})

app.get('*', function (req, res) {
    res.sendStatus(404)
})

function getRandom() {
    return Math.random()
}