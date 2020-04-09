import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default (message, subject, userEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    transporter.sendMail({
      from: process.env.EMAIL,
      to: `${userEmail}`,
      subject: `${subject}`,
      html: `${message}`,
    });

    const messageBacck = `Email sent to ${userEmail} successful`;
    return {
      status: 200,
      message: messageBacck,
    }
  }
  catch (err) {
    const error = `Failed sending email to ${userEmail}, Please try again!`;
    return {
      status: 500,
      message: error,
    }
  }
};
