//SERVIDOR
const express = require('express')
const server = express()

//PAGES
const { pageLanding, pageStudy, pageGiveClasses, saveClasses, sucessPage } = require('./pages')

//CONFIGURAR O NUNJUCKS (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true, //não guardar as alterações
})

//INICIO E CONFIGURAÇÃO DO SERVIDOR
server
//receber os dados do req.body
.use(express.urlencoded({ extended: true }))
//CONFIGURAR ARQUIVOS ESTÁTICOS (CSS, SCRIPTS, IMAGES)
.use(express.static("public"))
//ROTAS DE APLICAÇÃO
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.get("/sucess-page", sucessPage)
//START DO SERVIDOR
.listen(5500)