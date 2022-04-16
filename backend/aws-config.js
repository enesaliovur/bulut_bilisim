const dynamoConfig = {
  region: 'us-east-1',
  endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
  accessKeyId: "AKIAZ3C6IPOVUR2FRLGN",
  secretAccessKey: "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",
}

const s3Config = {
  accessKeyId: "AKIAZ3C6IPOVUR2FRLGN",
  secretAccessKey: "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",
  params: {
    Bucket: 'image-crud-bucket'
  }
}

module.exports = {
  s3Config,
  dynamoConfig,
};