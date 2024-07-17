/* eslint-disable @typescript-eslint/no-unused-vars */
import nodemailer from 'nodemailer'
//https://ethereal.email/
export async function getMailClient() {
    const account = await nodemailer.createTestAccount()

    const tranporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'oliveiraleonidas99@gmail.com',
            pass: 'app pasword google account'
        }
    })


    return tranporter
}