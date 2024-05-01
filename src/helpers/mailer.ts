import Person from "@/models/personModel";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"

export const sendEmail = async({email, emailType, personId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(personId.toString(), 8)

        if(emailType === "VERIFY"){
            await Person.findByIdAndUpdate(personId,{
                $set: {
                    verifyToken: hashedToken, 
                    verifyTokenExpiry: new Date(Date.now() +
                    3600000)  // 1 hour
                }
            })

        }else if(emailType === "RESET"){
            await Person.findByIdAndUpdate(personId,{
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
           })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "364314a05ec12d",
              pass: "16d6c9f3a4f09f"
            }
        });

        const mailOptions = {
            from: 'Akaarv@ai',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>Tap <a href="${process.env.URL}/
            verifyemail?token=${hashedToken}">here</a> to $
            ${emailType === "VERIFY" ? "verify your email" :
                "reset your password"}
            <br> ${process.env.URL}/verifyemial?token=${hashedToken}
            </p>`,
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse

    } catch (error: any) {
        throw new Error(error.message)
    }
}