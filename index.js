//import library
const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')

//variable
const app = express()
const port = 3000

//use cors
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json({
    limit: "4mb"
}))

//import routes
const postsRouter = require('./routes/posts')
app.use('/api/posts',postsRouter);

//running app
app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`)
})