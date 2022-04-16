var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIAZ3C6IPOVUR2FRLGN", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let modify = function () {

    
    var params = {
        TableName: "image-crud-bucket",
        Key: { "image_id": 3 },
        UpdateExpression: "set title = :title, adminPassword = :adminPassword",
        ExpressionAttributeValues: {
            ":title": "007 Deneme",
            ":adminPassword": '123qwerty'
        },
        ReturnValues: "UPDATED_NEW"

    };
    docClient.update(params, function (err, data) {

        if (err) {
            console.log("users::update::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("users::update::success "+JSON.stringify(data) );
        }
    });
}

modify();