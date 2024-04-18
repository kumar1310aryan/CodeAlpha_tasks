const express=require("express");
const app=express();
let port=8080;
const path =require("path");

app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.static(path.join(__dirname,"images")));


app.listen(port,()=>{
    console.log(`app is listening to ${port}`);
});

app.get("/",(req,res)=>{
    res.render("index1.ejs");
});

app.get("/tasks",(req,res)=>{
    res.render("index.ejs");
});

app.get("/tasks/history",(req,res)=>{
    res.render("history.ejs");
});