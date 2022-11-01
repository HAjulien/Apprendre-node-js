//on instancie express
const express = require("express")
const app = express()

const path = require("path")

//On autorise le dossier "public"
app.use(express.static(path.join(__dirname, "public")))

const http = require("http").createServer(app)
const io = require("socket.io")(http)

//on charge sequelize
const Sequelize = require('sequelize')

//lien de la base de données
const dbPath = path.resolve(__dirname, "chat.sqlite")

//connection base de donnée pas besoin mdp username pour sqlite
const sequelize = new Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    //sqlite only
    storage: dbPath
})

//modele chargement de la bdd
const Chat = require("./Models/Chat")(sequelize, Sequelize.DataTypes)
Chat.sync();

//On crée la route /
app.get("/", (req, res)=> {
    //res.send("bonjour tout le monde")
    res.sendFile(`${__dirname}/index.html`)
})

//on écoute event connection socket.io
io.on("connection", (socket) => {
    console.log("une connection s'active");

    socket.on("disconnect", ()=>{
        console.log("Un utilisateur s'est déconnecté");
    })

    socket.on("enter_room", (room) =>{
        socket.join(room)
        console.log(socket.rooms);

        //on envoie tout les messages de la room
        Chat.findAll({
            attributes: ["id", "name", "message", "room", "createdAt"],
            where: {
                room: room
            }
        }).then(list =>{
            socket.emit("init_message", {message: JSON.stringify(list)})
        })
    })

    socket.on("leave_room", (room) =>{
        socket.leave(room)
        console.log(socket.rooms);

    })

    //on gere le chat et on relaie les messages
    socket.on("chat_message", (msg) =>{
        //console.log(msg);
        const message = Chat.create({
            name: msg.name,
            message: msg.message,
            room: msg.room,
            createdAt : msg.createdAt
        }).then(()=>{
            //on relay le msg a tout les utilisateur dans le salon
            io.in(msg.room).emit("received_message", msg)
        }).catch(e => {
            console.log(e);
        })

        //io.emit("received_message", msg)
    })
    //relay le typing
    socket.on("typing", msg =>{
        socket.to(msg.room).emit("user_typing", msg)
    })
})

http.listen(3000, ()=> {
    console.log("J'écoute le port 3000")
} )
