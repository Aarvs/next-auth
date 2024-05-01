import mongoose from "mongoose"

const personSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Field can't be empty"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Field can't be empty"]
    },
    password: {
        type: String,
        required: [true, "Field can't be empty"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const Person = mongoose.models.people || mongoose.model("people", personSchema)

export default Person