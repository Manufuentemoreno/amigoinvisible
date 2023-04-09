const path = require("path");
const fs = require("fs");
let data = "/database/data.json";

const dataIn = {name: "yo", mail: "mail"};
        
let list = JSON.parse(fs.readFileSync(__dirname + data,'utf8'));

const listB = list.concat(dataIn);

console.log(listB);
