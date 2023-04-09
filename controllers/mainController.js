const path = require("path");
const fs = require("fs");
let data = "./../database/data.json";

const { validationResult } = require("express-validator");
const { urlencoded } = require("express");

module.exports = {
    index: (req, res)=>{
        res.render("index");
    },

    create: (req, res)=>{
        const mail = req.body.mail;
        const name = req.body.name;
        const titulo = req.body.title;
        const pass = req.body.password;
        const repass = req.body.repassword;
        
        if(pass && pass!=repass){
            return res.render("create", {error: "Las contraseñas no coinciden", oldData:{title: titulo,name: name,mail: mail}})
        }

        res.send(req.body)

        // let bd = JSON.parse(fs.readFileSync(__dirname + data,'utf8'));
        // const id = bd.length;

        // const newList = {
        //     id: id,
        //     mail: mail,
        //     title: titulo,
        //     password: "",
        //     friends: [{
        //         name: name,
        //         mail: mail,
        //         category: "admin"
        //     }]
        // };

        // bd.push(newList);

        // fs.writeFileSync(__dirname + data, JSON.stringify(bd));
        // res.redirect("/"+id);
    },

    configurate: (req, res)=>{
        res.render('create')
    },

    login: (req, res) =>{
        const idUser = Number(req.body.id);
        const passUser = req.body.password;
        let bd = JSON.parse(fs.readFileSync(__dirname + data,'utf8'));
        
        const userById = bd.filter(data => data.id === idUser);
        const user = userById[0];
        
        let result = '';
        if(user){
            if(user && passUser == user.password){
                result = true;
            }else{
                result = false;
            }
        }else{
            result = false;
        }

        
        if(result){
            res.redirect('/'+idUser)
        }else{
            res.render('index', {error: 'contraseña o id incorrecto'})
        }

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