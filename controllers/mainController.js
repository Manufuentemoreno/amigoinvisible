const path = require("path");
const fs = require("fs");
let data = "./../database/data.json";

const { validationResult } = require("express-validator");

module.exports = {
    index: (req, res)=>{
        res.render("index");
    },

    create: (req, res)=>{
        const mail = req.body.mail;
        const name = req.body.name;
        const titulo = req.body.title;

        let bd = JSON.parse(fs.readFileSync(__dirname + data,'utf8'));
        const id = bd.length;

        const newList = {
            id: id,
            mail: mail,
            title: titulo,
            friends: [{
                name: name,
                mail: mail,
                category: "admin"
            }]
        };

        bd.push(newList);

        fs.writeFileSync(__dirname + data, JSON.stringify(bd));
        res.redirect("/"+id);
        
    },

    home: (req, res)=>{
        let dataDB = JSON.parse(fs.readFileSync(__dirname + data,'utf8'));

        console.log(dataDB[req.params.id])
        res.render("home", {data: dataDB[req.params.id], friends: dataDB[req.params.id].friends});
    },
    
    addFiend: (req, res)=>{
        const dataIn = req.body;
        let list = JSON.parse(fs.readFileSync(__dirname + data,'utf8'));
        
        const errors = validationResult(req);
        console.log(errors.mapped());
        if (!errors.isEmpty()){
            res.render("home", { "errors" : errors.mapped(), friends: list});
            return 
        }
        
        dataIn.category = "friend";        
        const listActualized = list.concat(dataIn);
        fs.writeFileSync(__dirname + data, JSON.stringify(listActualized));
        
        res.redirect("/")
    },

    modifyFriend: (req, res)=>{
        res.send(req.body)
    },

    deleteFriend: (req, res)=>{
        res.send("deleted")
    },

    sorteo: (req, res)=>{
        res.send("sorteo")
    }
};