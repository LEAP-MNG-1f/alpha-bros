import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const sendMail = async (req, res) => {
  console.log("Ajilah bnaaa");
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.MAIL}`,
      pass: `${process.env.MAIL_PASSWORD}`,
    },
  });
  const { toSentMail, Subject, mailText } = req.body;

  console.log(req.body);

  let mailDetails = {
    from: `${process.env.MAIL}`,
    to: `${toSentMail}`,
    subject: `${Subject}`,
    text: `${mailText}`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs", err.message);
    } else {
      console.log("Email sent successfully");
    }
  });
};

export { sendMail };
