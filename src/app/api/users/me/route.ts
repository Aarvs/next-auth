import { connect } from "@/dbConfig/dbConnect";
import Person from "@/models/personModel"
import { verify } from "crypto";
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
// import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(req: NextRequest){
    //extract data from token
    const personId = await getDataFromToken(req)

    const person = await Person.findOne({_id: personId}).select("-password")

    if(!person){
        return NextResponse.json({
            message: "Person not found"
        })
    }

    return NextResponse.json({
        message: "Person found",
        data: person
    })

}