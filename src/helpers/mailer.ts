import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId } : any ) => {
    try {
      const hashedToken = await bcryptjs.hash(userId.toString(), 10 )

      if(emailType === "VERIFY"){
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken, 
        verifiedTokenExpiry: Date.now() + 3600000}
    )} else if (emailType === "RESET"){
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken, 
        forgotPasswordTokenExpiry: Date.now() + 3600000})
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5852c0444c04ee",
          pass: "7e2f3017367cf9"
      }
    });

    const mailOptions = {
      from: "fake@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : 
      "Reset your password",
      html: `Hello , thanks for joining. `
    }

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse; 

    } catch (error: any) {
      throw new Error(error.message)
    }
};