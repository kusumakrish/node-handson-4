const express = require("express");
const app = express();
const authentication = require("./Routes/authentication");



app.use(express.json());

app.use("/Auth",authentication);


app.get("/",(req,res)=>{
    console.log("Hello");

})

app.listen(9090, function(){
    console.log("server is running");
})
