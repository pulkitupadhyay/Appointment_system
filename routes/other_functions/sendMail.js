
const nodemailer = require("nodemailer");


async function sendMail(to, subject, text, html) {
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
        // for deployemet
        to: to, 
        // for testing
        // to: 'khileshnature28@gmail.com', //this is for testing pupous 
        cc: "pulkit.upadhyay@deepeigen.com", // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
      });
    }
  
    main1();
  }

  module.exports = sendMail;