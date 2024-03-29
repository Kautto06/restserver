const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Base de datos online')
    } catch(error) {
        console.log(error)
        throw error
    }


}



module.exports = {
    dbConnection
}