const amqp = require("amqplib/callback_api");
const SEND_URL = "sendUrl";
const SEND_SOURCE_CODE = "sendSourceCode";

module.exports = new Promise((resolve, reject) => {
  amqp.connect("amqp://localhost", (error, connection) => {
    if (error) {
      reject(error);
    } else {
      connection.createChannel((error, channel) => {
        if (error) {
          reject(error);
        } else {
          channel.assertQueue(SEND_URL, { durable: true });
          channel.assertQueue(SEND_SOURCE_CODE, { durable: true });
          resolve(channel);
        }
      });
    }
  });
});
