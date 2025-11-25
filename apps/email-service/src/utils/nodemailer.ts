import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "kardam409@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

const sendMail = async ({
  email,
  subject,
  content,
}: {
  email: string;
  subject: string;
  content: string;
}) => {
  const res = await transporter.sendMail({
    from: '"Tapestry" <kardam409@gmail.com>',
    to: email,
    subject,
    text: content,
  });

  console.log("MAIL SENT:", res);
};

export default sendMail;
