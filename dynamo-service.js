const AWS = require("aws-sdk");
const { dynamoConfig } = require('./aws-config');
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

const editImage = () => {

}

const deletImage = () => {

}

const getImage = ({ password, key }) => {
  // const result = docClient.get()
  // if (result.password) {
  //   password === result.password {

  //   } else {
  //     return { status: false, message: 'Parola uyuşmuyor.'}
  //   }
  //  }
}
module.exports = {
  createImage,
  editImage,
  deletImage
};