const AWS = require("aws-sdk");
const { dynamoConfig } = require('../aws-config');
const uuid = require('uuid');
require("dotenv").config();
const docClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const imagesTable = 'images';

const createImage = ({ id, title, imgUrl, password, adminPassword }) => {
  const imgObject = { id, title, imgUrl, password, adminPassword };

  const params = {
    TableName: imagesTable,
    Item: imgObject,
  };

  console.log('item:', params.Item);

  const writeProcess = new Promise((resolve, reject) => {
    docClient.put(params, function (err, data) {
      if (err) {
        console.log(err);
        reject(undefined);
      } else {
        resolve(params.Item);
      }
    });
  });
  return writeProcess;
}



const deleteImage = (id) => {

  const params = {
    TableName: imagesTable,
    Key: {
      id: id,
    },
  };

  const deleteProcess = new Promise((resolve, reject) => {
    docClient.delete(params, function (err, data) {
      if (err) {
        reject(undefined);
      } else {
        resolve({ status: true });
      }
    });
  });
  return deleteProcess;
}

const getImage = ({ password, id }) => {
  const readProcess = new Promise((resolve, reject) => {
    docClient.scan({
      TableName: imagesTable,
      FilterExpression: "id = :i and password = :p",
      ExpressionAttributeValues: {
        ":i": id,
        ":p": password,
      }
    }, function (err, data) {
      if (err) {
        console.log(err);
        reject(undefined);
      } else {
        const item = data.Items?.[0];
        if (item) {
          resolve(item);
        } else {
          reject(undefined);
        }
      }
    });
  });
  return readProcess;
}

const getImages = () => {
  const params = {
    TableName: imagesTable,
  };

  const readProcess = new Promise((resolve, reject) => {
    docClient.scan(params, function (err, data) {
      if (err) {
        console.log(err);
        reject(undefined);
      } else {
        console.log(data);
        resolve(data.Items);
      }
    });
  });
  return readProcess;
}

const getAllPosts = async () => {

  const params = {
    TableName: imagesTable
  };

  const readProcess = new Promise((resolve, reject) => {
    docClient.scan(params, function (err, data) {
      if (err) {
        reject(undefined);
      } else {
        resolve({ status: true });
      }
    });
  });
  return readProcess;
};

const updatePost = async ({ id, password, adminPassword, title, imgUrl }) => {
  const imgObject = { password, adminPassword, title, id, imgUrl };

  const params = {
    TableName: imagesTable,
    Key: {
      id: id
    },
    UpdateExpression: "set password = :p, adminPassword = :a, title = :t, imgUrl =:i",
    ExpressionAttributeValues: {
      ':p': imgObject.password,
      ':a': imgObject.adminPassword,
      ':t': imgObject.title,
      ':i': imgObject.imgUrl,
    },
    ReturnValues: "UPDATED_NEW",
  };
  const updateProcess = new Promise((resolve, reject) => {
    docClient.update(params, function (err, data) {
      if (err) {
        console.log(err);
        reject(undefined);
      } else {
        resolve(imgObject);
      }
    });
  });
  return updateProcess;

};

module.exports = {
  createImage,
  deleteImage,
  getImage,
  getAllPosts,
  updatePost,
  getImages,
};