var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIAZ3C6IPOVUR2FRLGN", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
let fetchOneByKey = function () {
    var params = {
        TableName: "image-crud-bucket",
        Key: {
            "image_id": 1
            
        }
    };
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("images::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("images::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
        }
    })
}


fetchOneByKey();