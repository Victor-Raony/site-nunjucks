const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    const about = {
        avatar_url: "https://avatars.githubusercontent.com/u/67339446?s=460&u=32ba747f1f1bbd7a7a0fd761c1c2cb1453c11e07&v=4",
        name: "Victor Raony",
        role: "Analista de Sistemas",
        description: 'Estudando programação com a <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>, focado em HTML, CSS, JAVASCRIPT, REACT, REACT NATIVE, TYPESCRIPT, NODE.JS',
        links: [
            {name: "Github", url: "https://github.com/Victor-Raony" },
            {name: "Twitter", url: "/" },
            {name: "Linkedin", url: "https://www.linkedin.com/in/victor-raony-10a385132" },            
        ]
    }


    return res.render("about", { about})
})

server.get("/portfolio", function(req, res){
    return res.render("portfolio", {items: videos})
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id ==id
    })
        if (!video) {
            return res.send("Video not found!")
        }

    return res.render("video", { item: video })
})

server.listen(5000, function(){
    console.log("server is running")
})