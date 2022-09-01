// Import statements
const express = require ("express");
const path = require ("path");
const bodyParser = require ("body-parser");
const { Console } = require("console");

// Setting up the project
const app = express();
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var blogs = {};

// Manage Routes
app.get("/", function(req, res){
    var blogNames = Object.keys(blogs);
    console.log(blogNames);
    return res.render("index", {blogs: blogNames, statusMessage: req.query.status});
})

app.get("/about", function(req, res){
    return res.render("about");
})

app.get("/newblog", function(req, res){
    return res.render("newblog");
})

app.get("/blog/:blogname", function(req, res){
    console.log(req.params.blogname)
    
    return res.render("blog", {name: req.params.blogname, text: blogs[req.params.blogname]});
})

app.get("/editblog", function(req, res){
    return res.render("editblog", {name: req.params.blogname, text: blogs[req.params.blogname]});
})

app.post("/editblog", function(req, res){
    var blogname = req.body.blogname;
    var blogtext = req.body.blogtext;
    blogs[blogname] = blogtext;
    console.log(blogs);
    return res.redirect("/?status=Blog Successfully Edited")
})

app.post("/newblog", function(req, res){
    var blogname = req.body.blogname;
    var blogtext = req.body.blogtext;
    if (blogs[blogname] != undefined){
        return res.redirect("/?status=Error: Name already exists")
    }
    blogs[blogname] = blogtext;
    console.log(blogs);
    return res.redirect("/?status=Blog Successfully Created")

})

// Listen on port 8000
app.listen(8000, ()=>{
    console.log("app started");
})