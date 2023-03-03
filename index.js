const express = require('express');
const app = express();
const cors = require('cors');

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors())

app.use('/', require('./router/router'));


app.listen(4000, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.APP_PORT}`);
})