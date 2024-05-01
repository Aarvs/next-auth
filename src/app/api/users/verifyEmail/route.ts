import { connect } from "@/dbConfig/dbConnect";
import Person from "@/models/personModel"
import { verify } from "crypto";
import {NextRequest, NextResponse} from 'next/server'
// import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const {token} = body
        console.log(token)

        const person = await Person.findOne({verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}}
        )

        if(!person){
            return NextResponse.json({error: "Invalid token"},
                {status: 400}
            )
        }

        console.log(person)

        person.isVerified = true
        person.verifyToken = undefined
        person.verifyTokenExpiry = undefined 

        await person.save()

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        }, {status: 201})

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}