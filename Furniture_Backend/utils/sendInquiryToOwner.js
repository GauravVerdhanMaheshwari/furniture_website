const nodemailer = require("nodemailer");

const sendInquiryToOwner = async (productId, message, userName, userEmail) => {
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
    subject: `Inquiry about ${productId}`,
    html:
      ` <p>${userName} send an inquiry,</p> ` +
      ` <p> Following is the message send by the user </p>` +
      ` <p>message : </p> ` +
      ` ${message},`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendInquiryToOwner;
