const AWS = require("aws-sdk");
const { dynamoConfig } = require('../aws-config');
const uuid = require('uuid');

const docClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const imagesTable = 'images';

const createImage = ({ key, title, imgUrl, password, adminPassword }) => {
  const imgObject = { key, title, imgUrl, password, adminPassword };

  const params = {
    TableName: imagesTable,
    Item: {
      id: uuid.v4(),
      ...imgObject,
    },
  };


  const writeProcess = new Promise((resolve, reject) => {
    docClient.put(params, function (err, data) {
      if (err) {
        reject(undefined);
      } else {
        resolve({ status: true });
      }
    });
  });
  return writeProcess;
}



const deletImage = () => {

  const id = req.query.id
  console.log(id)
  const params = {
    TableName: imagesTable,
    Key: {
      id: id
    }

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

const getImage = ({ password, key }) => {
  const imgObject = { password, key };
  // const id = req.query.id
  // key = req.body.key;

  const params = {
    TableName: imagesTable,
    Item: {
      id: id,
      ...imgObject
    },
    // Key: {
    //   id:id
    // }

  };
  const readProcess = new Promise((resolve, reject) => {
    docClient.query(params, function (err, data) {
      if (err) {
        reject(undefined);
      } else {
        resolve({ status: true });
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

const updatePost = async (password, adminPassword, title, key) => {
  const imgObject = { password, adminPassword, title, key };
  //imgObject =req.body
  // const id = req.query.id

  const params = {
    TableName: imagesTable,
    Item: {
      id: req.query.id,
      ...imgObject
    },
    // Key: {
    //   id: id
    // }

  };
  const updateProcess = new Promise((resolve, reject) => {
    docClient.update(params, function (err, data) {
      if (err) {
        reject(undefined);
      } else {
        resolve({ status: true });
      }
    });
  });
  return updateProcess;

};

module.exports = {
  createImage,
  deletImage,
  getImage,
  getAllPosts,
  updatePost,
};