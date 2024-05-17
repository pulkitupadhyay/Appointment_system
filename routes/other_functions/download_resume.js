
const user_scheema = require('./../../models/user_module')
const {S3Client,GetObjectCommand} = require('@aws-sdk/client-s3')
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner')
require('dotenv').config();
const axios = require('axios');
const s3Client = new S3Client({

  region:process.env.BUCKETREGION,
  credentials:{
    accessKeyId:process.env.ACCESSKEYID,
    secretAccessKey:process.env.SECRETACCESSKEY
  }

})

async function getObjectURL(key){
  console.log(key)
  const command =  new GetObjectCommand({
    Bucket:process.env.BUCKETNAME,
    Key: key
  })
const url = await getSignedUrl(s3Client,command) 
return url;
}

const downloadResume = async (req, res, next) => {
    try {
      // Fetch the user by ID
      const user = await user_scheema.findOne({ _id: req.params.id });
  
      if (user) {
        // Get the URL for the PDF file
        const url = await getObjectURL(`resumes/${user.email}`);
  
        // Fetch the file from the remote URL
        const response = await axios.get(url, { responseType: 'stream' });
  
        // Check if the response status is successful (status code 200)
        if (response.status === 200) {
          // Set headers for file download
          res.setHeader('Content-Disposition', `attachment; filename="resume-${user.name}.pdf"`);
          res.setHeader('Content-Type', 'application/pdf');
  
          // Pipe the response data stream to the client response
          response.data.pipe(res);
        } else {
          // If the response status is not successful, send an error response
          req.flash('error', 'Resume Not Found!!')
          res.redirect('back')
        }
      } else {
        // If user not found, send a 404 Not Found response
        req.flash('error', 'Resume Not Found!!')
        res.redirect('back')
      }
    } catch (error) {
      // Handle any errors that occur during the download process
      req.flash('error', 'Resume Not Found!!')
          res.redirect('back')
    }
  }

  module.exports = downloadResume;