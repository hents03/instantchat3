(function(){
    const app=document.querySelector(".app");


    const socket=io();
    const d=new Date();
    
    let uname;

    app.querySelector(".join-screen #join-user").addEventListener("click",function(){
        let username=app.querySelector(".join-screen #username");
        /*let roominput=document.querySelector(".roominput");*/
        if(username.value==""){
            return;
        }
        else{
        socket.emit("newuser",username.value);
        uname=username;
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
        }
        chatroom();
    });

    app.querySelector(".chat-screen #send-message").addEventListener("click",function(){
         let message=app.querySelector(".chat-screen #message-input").value;
         if(message.length==0){
            return;
         }
         renderMessage("my",{
            username:uname,
            text:message
            
         });
         socket.emit("chat",{
            username:uname,
            text:message
            
         });
         app.querySelector(".chat-screen #message-input").value="";
    });
    app.querySelector(".chat-screen #exit-chat").addEventListener("click",function(){
      socket.emit("exituser",uname);
      window.location.href=window.location.href;
    });
   
    socket.on("update",function(update){
      renderMessage("update",update);
    });
    

    socket.on("chat",function(message){
      renderMessage("other",message);
    });

    function renderMessage(type,message){
        let messageContainer=app.querySelector(".chat-screen .messages");
        if(type=="my"){   
           let el=document.createElement("div");
           el.setAttribute("class","message my-message");
           el.innerHTML=`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}/${d.getHours()} et ${d.getMinutes()} mn:${d.getSeconds()}s
           <br></br>

              <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
              </div>
           `;
           messageContainer.appendChild(el);
        }else if(type=="other"){
            let el=document.createElement("div");
            el.setAttribute("class","message other-message")
            el.innerHTML=`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}/${d.getHours()} et ${d.getMinutes()} mn:${d.getSeconds()}s

            <br></br>
              <div>
                     <div class="name">${message.username}</div>
                     <div class="text">${message.text}</div>
               </div>
            `;
            messageContainer.appendChild(el);
        }else if(type=="update"){ 
            let el=document.createElement("div");
            el.setAttribute("class","update");
            el.innerHTML=`${d.getFullYear()}-${d.getMonth()}-${d.getDate()} / ${d.getHours()} et ${d.getMinutes()} mn :${d.getSeconds()} s ${message}`
            messageContainer.appendChild(el);
        }
       
        messageContainer.scrollTop=messageContainer.scrollHeight - messageContainer.clientHeight;
    }const roomButtons = document.querySelectorAll(".room-button");
    roomButtons.forEach(button => {
        button.addEventListener("click", function() {
            room = button.value;
            console.log("Room:", room);
        });
    });
    
    app.querySelector(".join-screen #join-user").addEventListener("click", function() {
        let username = app.querySelector(".join-screen #username");
        if (username.value === "") {
            return;
        } else {
            socket.emit("newuser", username.value, room);
            uname = username;
            app.querySelector(".join-screen").classList.remove("active");
            app.querySelector(".chat-screen").classList.add("active");
        }
        chatroom();
    });
const userList = document.getElementById("user-list");

socket.on("update", function(update) {
    renderMessage("update", update);
    updateUserList(update.username, true); 
});

socket.on("exituser", function(username) {
    renderMessage("update", username + " left the conversation");
    updateUserList(username, false); 
});

function updateUserList(username, isConnected) {
    const userItem = document.createElement("li");
    userItem.textContent = username;
    if (isConnected) {
        userItem.classList.add("connected");
    } else {
        userItem.classList.remove("connected");
    }

    const existingUser = userList.querySelector(`li[data-username="${username}"]`);
    if (existingUser) {
        userList.replaceChild(userItem, existingUser);
    } else {
        userItem.setAttribute("data-username", username);
        userList.appendChild(userItem);
    }
}

let audio = new Audio();
audio.src = "C:/Users/ASUS/Downloads/348924__cabled_mess__glockenspiel_46_f4_04.wav";
audio.load();
audio.play();

    
    
    
    
    
    
})();
function toggleTheme(){
   var body = document.getElementsByTagName('body')[0];
   body.classList.toggle('dark');
   //app.querySelector(".chat-screen").innerHTML+=room.value;
}

