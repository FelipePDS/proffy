//SERVER
const express = require('express')
const server = express()

//PAGES
const { pageLanding, pageStudy, pageGiveClasses, saveClasses, sucessPage } = require('./pages')

//CONFIGURE THE NUNJUNCKS (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true, //dont save changes
})

//SERVER START AND CONFIGURATION
server
//receive data from req.body
.use(express.urlencoded({ extended: true }))
//CONNFIGURE STATIC FILES (CSS, SCRIPTS, IMAGES)
.use(express.static("public"))
//APPLICATION ROUTES
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.get("/sucess-page", sucessPage)
//SERVER START
.listen(5500)