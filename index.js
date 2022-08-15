// Import statements
const express = require ("express");
const path = require ("path");
const bodyParser = require ("body-parser")

// Setting up the project
const app = express();
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Manage Routes
app.get("/", function(req, res){
    return res.render("index")
})

app.get("/about", function(req, res){
    return res.render("about")
})

app.get("/newblog", function(req, res){
    return res.render("newblog")
})

app.post("/newblog", function(req, res){
    var blogtext = req.body.blogtext;
    console.log(blogtext);
    return res.render("newblog")
})

// Listen on port 8000
app.listen(8000, ()=>{
    console.log("app started")
})