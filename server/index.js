const express =require("express");
const app = express();
const baseQuery = "/api/";
const path = require("path");

app.use(express.json())

app.get(baseQuery, (req,res)=>{
    res.json({
        success:true
    })
})

app.use(baseQuery+"department", require("../department"))
app.use(baseQuery+"employees", require("../employees"))


app.listen(8080, ()=>{
    console.log("App is Running at port 8080")
})