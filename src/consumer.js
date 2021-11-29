const AWSXray = require('aws-xray-sdk-core')
const AWS = AWSXray.captureAWS(require('aws-sdk'))

const getUuid = require('uuid-by-string')

const documentClient = new AWS.DynamoDB.DocumentClient()

const recordDeletedAccountInfo = event => {
  const [{ body }] = event.Records

  const { email, timestamp } = JSON.parse(body)

  console.log({ email, timestamp })

  return documentClient.put({
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      userId: getUuid(email, 'rocket'),
      deletedAt: timestamp,
    },
  }).promise()
}

module.exports = {
  recordDeletedAccountInfo,
}
