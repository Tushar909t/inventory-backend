const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASS_USER,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailOption = {
    from: "Inventory Management <playergtax6@gmail.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };
  return await transporter.sendMail(mailOption);
};
module.exports = SendEmailUtility;
