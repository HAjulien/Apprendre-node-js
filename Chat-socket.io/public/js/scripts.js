const socket = io()

//arrivé d'un nv utilisateur
socket.on("connect", ()=>{
    socket.emit("enter_room", "general")
})

function publishMessages(msg) {
    let created = new Date(msg.createdAt)
    let texte = `<div>
    <p>${msg.name} <small>${created.toLocaleDateString()}</small></p><p>${msg.message}</p>
    </div>`
    document.querySelector('#messages').innerHTML += texte
}

window.addEventListener('load', function (){

    socket.on("init_message", msg => {
        //console.log(msg);
        let data = JSON.parse(msg.message)
        if(data != []){
            data.forEach( donnee => {
                publishMessages(donnee)
            })
        }
    })


    //ecouteur evenement submit
    document.querySelector('form').addEventListener('submit', e =>{
        e.preventDefault()
        const name = document.querySelector("#name")
        const message = document.querySelector("#message")
        const room = document.querySelector('#tabs li.active').dataset.room
        const createdAt = new Date()

        socket.emit("chat_message", {name: name.value, message: message.value, room, createdAt } )
        message.value = ""
    })

    //on ecoute even chat message
    socket.on("received_message", (msg) =>{
        //console.log(msg);
        publishMessages(msg)
    })

    document.querySelectorAll('#tabs li').forEach( (tab) => {
        tab.addEventListener("click", function(){
            if(!this.classList.contains("active")){
                const actif = document.querySelector('#tabs li.active')
                actif.classList.remove("active")
                this.classList.add("active")
                document.querySelector('#messages').innerHTML = "";

                //quitte ancienne sale
                socket.emit("leave_room", actif.dataset.room)
                //entre nv salle
                socket.emit("enter_room", this.dataset.room)
            }
        })
    })

    document.querySelector('#message').addEventListener("input", ()=>{
        const name = document.querySelector('#name').value
        const room = document.querySelector('#tabs li.active').dataset.room

        socket.emit("typing", {
            name: name,
            room: room
        })
    })

    socket.on("user_typing", msg => {
        const writting = document.querySelector('#writting')
        writting.innerHTML = `${msg.name} tape un message...`

        setTimeout(function(){
            writting.innerHTML = ""
        }, 5000)
    })
})