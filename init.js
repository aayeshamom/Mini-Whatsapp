const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const path = require("path");


main().then(
    () => {console.log("connection successful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChat =[
    {
    from : "siya",
    to : "zoya",
    msg : "give me my pencil",
    created_at :new Date()
},
{
    from : "rina",
    to : "roya",
    msg : "give me my pen",
    created_at :new Date()
},
{
    from : "nina",
    to : "moya",
    msg : "give me my rubber",
    created_at :new Date()},
{
    from : "tina",
    to : "hoya",
    msg : "give me my notes",
    created_at :new Date()},
{
    from : "sina",
    to : "foya",
    msg : "give me my scale",
    created_at :new Date()
}

];

Chat.insertMany(allChat);