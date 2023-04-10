const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

const mailValidation = require("../middlewares/friendValidation");
const adminValidation = require("../middlewares/adminValidation");

// INDEX - LANDING
router.get("/", mainController.index);

// INGRESAR A UNA SESION YA CREADA
router.post("/", mainController.login);

// Vista para crear una nueva sesion
router.get('/create', mainController.configurate)

// CREAR UNA NUEVA SESION
router.post("/create", adminValidation, mainController.create)

// LISTA DE AMIGOS
router.get("/:id", mainController.home)

// AGREGARSE A LA LISTA
router.post('/:id', mainController.addFiend)

// modificar data de amigos
router.put("/", mainController.modifyFriend);

// eliminar data de amigos
router.delete("/", mainController.deleteFriend);

// SORTEAR
router.post("/sorteo", mainController.sorteo);

module.exports = router;