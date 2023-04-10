const { body } = require("express-validator");

const validations = [
    body("title")
        .notEmpty().withMessage("El sorteo debe tener título"),
    body("mail")
        .notEmpty().withMessage("Se necesita ingresar un mail").bail()
        .isEmail().withMessage("Mail no válido"),
    body("name")
        .notEmpty().withMessage("Se debe ingresar un nombre para el sorteo"),
    body("password")
        .notEmpty().withMessage("Se debe ingresar una contraseña"),
    body("repassword")
        .notEmpty().withMessage("Repetí la contraseña").bail()
        .custom((value, {req})=>{
            const password = req.body.password;

            if(password !== value){
                throw new Error("Las contraseñas no coinciden")
            }
            return true;
        })
];

module.exports = validations;