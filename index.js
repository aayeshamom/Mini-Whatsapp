const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const path = require("path");
const methodeOverRide = require("method-override");

app.set("views",path.join(__dirname, "views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodeOverRide("_method"));

main()
.then(
    () => {console.log("connection successful")})
.catch(err => console.log(err));


 


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

//index route
app.get("/chats", async (req,res) => {
   let chats = await Chat.find();
   
   res.render("index.ejs", { chats });
})

//new route

app.listen(8080,() => {
    console.log("server is listing to port 8080")
});

app.get("/", (req,res) => {
    res.send("i am root");
});

app.get("/chats/new", (req,res) => {
    res.render("new.ejs")
});

 app.post("/chats", (req,res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    newChat
    .save()
    .then((res) => {console.log("chat saved");

    } )
    .catch((err) =>{console.log(err);

    });
    res.redirect("/chats");
});

//edit route

app.get("/chats/:id/edit",async(req,res)=>{
    let {id} = req.params;
   let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

//update route
app.put("/chats/:id", async(req,res)=>{
    let {id} = req.params;
    let { msg :newMsg } = req.body;
    let updateChat = await Chat.findByIdAndUpdate(id, 
        {msg:newMsg},
        {runValidators : true, new : true}
    );
    console.log(updateChat);
    res.redirect("/chats");
});

//destory route
app.delete("/chats/:id", async(req,res)=>{
    let {id} = req.params;
    let deleteChat = await Chat.findByIdAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats");
})