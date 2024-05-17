
const nodemailer = require("nodemailer");


async function sendMailcc(to, subject, text, cc,) {
    var config = {
      service: "gmail",
      auth: {
        // user: "photo.pulkitfourth@gmail.com",
        // pass: "daapxuseglvonuef",
        user: 'swaayatt.interviews@gmail.com', // Your Zoho Mail email address
        pass: 'zncx rxez hjcy hsny'
      },
    };
  
    const transporter = nodemailer.createTransport(config);
  
    async function main1() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"SWAAYATT" <swaayatt.interviews@gmail.com>', // sender address
        to: to,
        cc: `pulkit.upadhyay@deepeigen.com, ${cc}`, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        // html body
      });
    }
  
    main1();
  }

  module.exports = sendMailcc;