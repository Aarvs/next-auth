import { connect } from "@/dbConfig/dbConnect";
import Person from "@/models/personModel"
import { verify } from "crypto";
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
// import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(req: NextResponse){
    try {
        const body = await req.json()
        const {email, password} = body
        console.log(body)

        const person = await Person.findOne({email})

        if(!person){
            return NextResponse.json({error: "Person does not exists"},
                {status: 500}
            )
        }

        console.log(person)

        const validPassword = await bcryptjs.compare(password, person.password)

        if(!validPassword){
            return NextResponse.json({error: "Wrong password"},
                {status: 400}
            )
        }

        const tokenData = {
            id: person._id,
            username: person.username,
            email: person.email
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn: '1h'})

        const response = NextResponse.json({
            message: "Logged in successfully",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}