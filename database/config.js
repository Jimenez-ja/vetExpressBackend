const mongoose = require('mongoose');

const dbConnection =  async()=>{

    try{

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Conexion a la base de datos correcta!');
    }catch(err){
        console.log(err);
        throw new Error('Error en la conexion a la base de datos');
    }


}

module.exports = dbConnection;