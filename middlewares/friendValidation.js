const { body } = require("express-validator");
const fs = require("fs")
let data = "./../database/data.json";

const validations = [
    body("name").notEmpty().withMessage("El campo de nombre no puede quedar vacío"),
    body('mail')
    .notEmpty().withMessage('El campo email no puede quedar vacío.').bail()
    .isEmail().withMessage('El email debe tener un formato válido.').bail()
    .custom((value, {req})=>{
        let repeated = false;

        const db = JSON.parse(fs.readFileSync(__dirname + data,'utf8'));
        const mail = req.body.mail;

        db.forEach(friend => {
           if(friend.mail == mail){
            repeated = true;
           } 
        });

        if(repeated){
            throw new Error("Mail ya registrado")
        }
        return true;
    })
];

module.exports = validations;