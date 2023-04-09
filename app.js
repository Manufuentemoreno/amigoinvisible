const express = require("express");
const app = express();

const path = require ("path");
const publicPath = path.resolve(__dirname, "./public"); 

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const routes = require("./routes/main");

app.use(express.static(publicPath));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use("/", routes);

const PortLocal = require("./modules/Port");
app.listen(process.env.PORT || PortLocal, () => console.log("Servidor ejecutándose en el puerto ", process.env.PORT || PortLocal));