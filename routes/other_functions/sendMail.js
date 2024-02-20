
const nodemailer = require("nodemailer");


async function sendMail(to, subject, text, html) {
    var config = {
      service: "gmail",
      auth: {
        user: "photo.pulkitfourth@gmail.com",
        pass: "daapxuseglvonuef",
      },
    };
  
    const transporter = nodemailer.createTransport(config);
  
    async function main1() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"SWAAYATT" <photo.pulkitfourth@gmail.com>', // sender address
        to: to,
        cc: "soumya@swaayatt.com", // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
      });
    }
  
    main1();
  }

  module.exports = sendMail;