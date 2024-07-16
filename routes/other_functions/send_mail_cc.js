
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
        
      //   for deployment purpous
        to: to,

        //this is for testing pupous 
        // to: 'khileshnature28@gmail.com', 

        // list of receivers for deployment 
        cc: `pulkit.upadhyay@deepeigen.com, ${cc}`, 
       
       // list of receivers for testing
        // cc: `pulkit.upadhyay@deepeigen.com`,  

        subject: subject, // Subject line
        text: text, // plain text body
        // html body
      });
    }
  
    main1();
  }

  module.exports = sendMailcc;