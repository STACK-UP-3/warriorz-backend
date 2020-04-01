import nodemailer from 'nodemailer';

export default (message, subject, userEmail)=>{
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
      })
} 
