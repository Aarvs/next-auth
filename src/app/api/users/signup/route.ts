import { connect } from "@/dbConfig/dbConnect";
import Person from "@/models/personModel"
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(req: NextRequest){
      try {
        const body = await req.json()
        const {username, email, password} = body
        //validation
        console.log(body)
        const user = await Person.findOne({email})
        if(user){
            return NextResponse.json({error: "Person identity already exist"},
                {status: 400}
            )
        }

        const salt: any = await bcryptjs.genSalt(8)

        const hashedPassword = await bcryptjs.hash(password, salt)

        const newPerson = new Person({
            username,
            email,
            password: hashedPassword
        })

        const savedPerson = await newPerson.save()
        console.log(savedPerson)

        //send verification email
        await sendEmail({email, emailType: "VERIFY", personId: savedPerson._id})

        return NextResponse.json({
            message: "User signup successful",
            succes: true,
            savedPerson
        })

      } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
      }
}