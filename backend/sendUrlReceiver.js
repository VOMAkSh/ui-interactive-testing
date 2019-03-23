const getChannel = require("./rabbitmq");
const getSourceCode = require("./websiteCode");
const SEND_URL = "sendUrl";
const SEND_SOURCE_CODE = "sendSourceCode";

getChannel
  .then(channel => {
    channel.consume(
      SEND_URL,
      async url => {
        const pageSource = await getSourceCode(url.content.toString());
        channel.sendToQueue(
          SEND_SOURCE_CODE,
          new Buffer.from(pageSource.toString())
        );
      },
      { noAck: true }
    );
  })
  .catch(error => {
    console.log("In receiver, " + error);
  });
