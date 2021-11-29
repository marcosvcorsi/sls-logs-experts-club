const AWSXray = require('aws-xray-sdk-core')
const AWS = AWSXray.captureAWS(require('aws-sdk'))

const deleteAccount = async event => {
  const sns = new AWS.SNS()

  const deleteAccountEvent = {
    ...event,
    timestamp: Math.floor(new Date().getTime() / 1000),
  }

  console.log(deleteAccountEvent)

  return sns.publish({
    Message: JSON.stringify(deleteAccountEvent),
    TopicArn: process.env.SNS_TOPIC,
  }).promise()
}

module.exports = {
  deleteAccount,
}
