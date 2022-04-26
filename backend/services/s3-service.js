const AWS = require('aws-sdk');
const { s3Config } = require('../aws-config');
require("dotenv").config();
const s3 = new AWS.S3(s3Config);

const uploadFile = (base64Img, id, fileType) => {
  const file = Buffer.from(base64Img.replace(/^data:image\/\w+;base64,/, ""), 'base64')

  const uploadParams = {
    Key: id, // Name by which you want to save it
    Body: file, // Local file 
    ContentType: fileType,
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

const deleteBucket = (id) => {
  const deleteParams = {
    Key: id,
  };
  return s3.deleteObject(deleteParams).promise();
}

module.exports = {
  uploadFile,
  deleteBucket
};
