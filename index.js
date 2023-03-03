const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(express.static('public'));

app.set('trust proxy', true);
app.use(cors({origin: '*'}));

app.use(express.json());
app.use(express.urlencoded({extended : true}));

const port = process.env.PORT || 3500

app.use('/', require('./router/router'));


app.listen(port, ()=>{
    console.log(`Servidor corriendo en puerto ${port}`);
})