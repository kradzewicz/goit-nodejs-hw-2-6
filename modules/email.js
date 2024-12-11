const nodemailer = require("nodemailer");
require('dotenv').config();

const {M_HOST, M_USER, M_PASS}= process.env
const transporter = nodemailer.createTransport({
  host: M_HOST,
  port: 587,
  secure: false,
  auth: {
    user: M_USER,
    pass: M_PASS,
  },
});

const verificationMail = async (html, to) => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <contactcompany@gmail.com>',
    to,
    subject: "Email verification",
    html,
  });
}

// verificationMail().catch(console.error);
module.exports = verificationMail