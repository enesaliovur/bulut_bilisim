const AWS = require('aws-sdk');
const { s3Config } = require('../aws-config');

const s3 = new AWS.S3(s3Config);

const uploadFile = (base64Img, keyName) => {
  const file = Buffer.from(base64Img.replace(/^data:image\/\w+;base64,/, ""), 'base64')

  const uploadParams = {
    Key: keyName, // Name by which you want to save it
    Body: file // Local file 
  };

  const uploadProcess = new Promise((resolve, reject) => {
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.log("Upload Error", err);
        reject(undefined);
      }
      if (data) {
        console.log("Upload Success", data.Location);
        resolve(data.Location);
      }
    });
  });
  return uploadProcess;
};

const deleteBucket = (bucketName) => {
  // Create params for S3.deleteBucket
  var bucketParams = {
    Bucket: bucketName
  };

  // Call S3 to delete the bucket
  s3.deleteBucket(bucketParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
}

module.exports = {
  uploadFile,
};
