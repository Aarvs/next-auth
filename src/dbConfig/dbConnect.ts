import mongoose from "mongoose"

export const connect = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log("Mongo DB connected")
        })
        
        connection.on('error', (err: string) => {
            console.log('Mongodb connection error' + err) 
            process.exit()
        })
    } catch (error) {
        console.log("Error connecting mongo DB")
        console.log(error)
    }
}