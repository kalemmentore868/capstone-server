import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (
  email: string,
  subject: string,
  text: string
) => {
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject,
    text,
  };

  try {
    const emailRes = await transporter.sendMail(mailOptions);
    console.log("message sent", emailRes.messageId);
    return "Email Sent";
  } catch (error) {
    console.log(error);
    return error;
  }
};