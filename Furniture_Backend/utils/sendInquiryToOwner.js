const nodemailer = require("nodemailer");

const sendInquiryToOwner = async (productId, inquiryMessage, userEmail) => {
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
    subject: `Inquiry about product ID: ${productId}`,
    html: inquiryMessage,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendInquiryToOwner;
