/* eslint-disable @typescript-eslint/no-unused-vars */
import nodemailer from 'nodemailer'
//https://ethereal.email/
export async function getMailClient() {
    const account = await nodemailer.createTestAccount()

    const tranporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass
        }
    })


    return tranporter
}