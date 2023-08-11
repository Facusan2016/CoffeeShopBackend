const {Schema, model} = require('mongoose');

const CoffeeSchema = Schema({

    id:{
        type : String,

    },

    title:{
        type : String
    },

    description: {
        type : String
    },

    ingredients:{
        type : Array
    },

    price : {
        type : Number
    },

}, {collection : 'CoffeeData'})

module.exports = model('Coffee', CoffeeSchema);