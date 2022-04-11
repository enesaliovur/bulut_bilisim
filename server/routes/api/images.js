const AWS = require('aws-sdk');
const config = require('../../../config/config.js');
const isDev = process.env.NODE_ENV !== 'production';
module.exports = (app) => {
  
    // Add new client
  app.post('/image/add', (req, res, next) => {
    if (isDev) {
      AWS.config.update(config.aws_local_config);
    } else {
      AWS.config.update(config.aws_remote_config);
    }
    const { title, base64_url, password, admin_password } = req.paramsbody;
    // Generate random string ID
    const imageId = (Math.random() * 1000).toString();
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: config.aws_table_name,
      Item: {
        imageId: imageId,
        title: title,
        base64_url: base64_url,
        password: password ? password : '',
        admin_password: admin_password
      }
    };
    docClient.put(params, function(err, data) {
      if (err) {
        res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else {
        console.log('data', data);
        const { Items } = data;
        res.send({
          success: true,
          message: 'Add client',
          imageId: imageId
        });
      }
    });
  });

    // Get all clients
  app.get('/image/get', (req, res, next) => {
    if (isDev) {
      AWS.config.update(config.aws_local_config);
    } else {
      AWS.config.update(config.aws_remote_config);
    }
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: config.aws_table_name
    };
    docClient.scan(params, function(err, data) {
      if (err) {
        res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else {
        const { Items } = data;
        res.send({
          success: true,
          message: 'Loaded clients',
          clients: Items
        });
      }
    });
  });
  
  // Get by id
  app.get('/api/client', (req, res, next) => {
    if (isDev) {
      AWS.config.update(config.aws_local_config);
    } else {
      AWS.config.update(config.aws_remote_config);
    }
    const imageId = req.query.id;
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: config.aws_table_name,
      KeyConditionExpression: 'imageId = :i',
      ExpressionAttributeValues: {
        ':i': imageId
      }
    };
    docClient.query(params, function(err, data) {
      if (err) {
        res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else {
        console.log('data', data);
        const { Items } = data;
        res.send({
          success: true,
          message: 'Loaded clients',
          clients: Items
        });
      }
    });
  });

  // delete by id
  app.delete('/image/delete', ( req, res, next) => {
    if (isDev) {
      AWS.config.update(config.aws_local_config);
    } else {
      AWS.config.update(config.aws_remote_config);
    }
    const imageId = req.query.id;
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: config.aws_table_name,
      Key:{
        imageId: imageId
      }
    };
    console.log('deleting item');
    docClient.delete(params, function(err, data) {
      if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else {
        console.log('deleted');
        res.send({
          success: true,
          message: 'Deleted clients',
        });
      }
    });
  });

  // Update by id
  app.patch('/image/update', ( req, res, next) => {
    if (isDev) {
      AWS.config.update(config.aws_local_config);
    } else {
      AWS.config.update(config.aws_remote_config);
    }
    const { title, admin_password } = req.body;
    const imageId = req.query.id;
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: config.aws_table_name,
      Key:{
        imageId: imageId
      },
      UpdateExpression: "set title = :n, admin_password = :u",
      ExpressionAttributeValues: {
        ':n': title,
        ':u': admin_password
      },
      ReturnValues: "UPDATED_NEW"
    };
    console.log({title, admin_password})
    console.log('updating item');
    docClient.update(params, function(err, data) {
      if (err) {
        res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else {
        console.log('data', data);
        const { Items } = data;
        res.send({
          success: true,
          message: 'Updated clients',
          clients: Items
        });
      }
    });
  });
};