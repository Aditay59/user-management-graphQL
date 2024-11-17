const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL).then(()=> {
            console.log(`Connected to mongoDb database 📊`);
        }).catch(err => {
            throw new Error(`Unable to connect to mongoDB:${err}`);
        })
    } catch(err) {
        throw new Error(err);
    }
};
module.exports = connect;