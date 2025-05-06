import mongoose from "mongoose";

export const connectDB = async () => {

    try {

        mongoose.connect(process.env.MONGO_URL)
        const Connection = mongoose.connection

        Connection.on('connected', () => {
            console.log('mongodb connected');

        })

        Connection.on('error', (error) => {
            console.log(`mongodb connection error , 
                please make sure db is up and down`+ error);
            process.exit(1)


        })


    } catch (error) {
        console.log('error of database connection:', error)
        process.exit(1)
    }



}