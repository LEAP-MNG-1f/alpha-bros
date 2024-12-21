import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendMail = async (req, res) => {
  try {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.MAIL}`,
        pass: `${process.env.MAIL_PASSWORD}`,
      },
    });
    const { toSentMail, Subject, mailText } = req.body;
    let mailDetails = {
      from: `${process.env.MAIL}`,
      to: `${toSentMail}`,
      subject: `${Subject}`,
      text: `${mailText}`,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        return res.status(500).json({ err });
      } else {
        return res.status(201).json({ success: true });
      }
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

export { sendMail };
