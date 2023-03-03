const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(express.static('public'));

var  MyAllowSpecificOrigins = ["https://beanscene.netlify.app", "http://localhost:5173"];

var corsOptions = {
    origin: MyAllowSpecificOrigins,
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.use('/', require('./router/router'));


app.listen(4000, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.APP_PORT}`);
})