const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(express.static('public'));

app.set('trust proxy' true)
app.use(cors({origin: '*'}));

app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.use('/', require('./router/router'));


app.listen(process.env.APP_PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.APP_PORT}`);
})