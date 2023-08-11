const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

const dbConection = async() =>{

    try {

        await mongoose.connect(
            process.env.DB_CNN , {
            useNewUrlParser : true,
            useUnifiedTopology : true}
        );

        console.log('DB Online');

    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    dbConection,
}