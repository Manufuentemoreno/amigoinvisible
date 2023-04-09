const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

const mailValidation = require("../middlewares/friendValidation");

// listar amigos
router.get("/", mainController.index);

router.post("/create", mainController.create)

router.get("/:id", mainController.home)

// agregar amigos
router.post("/:id", mailValidation,  mainController.addFiend);

// modificar amigos
router.put("/", mainController.modifyFriend);

// eliminar amigos
router.delete("/", mainController.deleteFriend);

// sortear
router.post("/sorteo", mainController.sorteo);

module.exports = router;