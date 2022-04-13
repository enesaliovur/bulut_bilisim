      
var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIAZ3C6IPOVUR2FRLGN", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let save = function () {

    var input = {
        "image_id": 3, 
        "key": "key22", 
        "title": "deneme 007", 
        "fileKey": "filekey22", 
        "password": "qwerty", 
        "adminPassword": "qwerty123"
    };
    var params = {
        TableName: "image-crud-bucket",
        Item:  input
    };
    docClient.put(params, function (err, data) {

        if (err) {
            console.log("image::save::error - " + JSON.stringify(err, null, 2));                      
        } else {
            console.log("image::save::success" );                      
        }
    });
}

save();