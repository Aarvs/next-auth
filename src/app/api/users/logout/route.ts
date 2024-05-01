import { connect } from "@/dbConfig/dbConnect";
import {NextRequest, NextResponse} from 'next/server'
// import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(req: NextResponse){
    try {
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true, 
            expires: new Date(0)
        })

        return response

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}