const nodemailer = require("nodemailer");

const sendInquiryToOwner = async (inquiry) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: userEmail,
    to: process.env.EMAIL_USER,
    subject: `Inquiry about ${inquiry.productName}`,
    html:
      ` <p>Hi ${inquiry.ownerName},</p> ` +
      ` <p>message : </p> ` +
      ` ${inquiry.message},`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendInquiryToOwner;
