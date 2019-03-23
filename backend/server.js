const cors = require("cors");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const app = require("./config");
const createChannel = require("./rabbitmq");
const sendUrlReceiver = require("./sendUrlReceiver");
const io = require("./socketConfig");
const SEND_URL = "sendUrl";
const SEND_SOURCE_CODE = "sendSourceCode";

io.on("connection", socket => {
  console.log(socket.id, "is connected");
});

app.use(cors());
app.use(require("express").static("snapshots"));

app.get("/", (req, res) => {
  const { url } = req.query;
  console.log(url);
  createChannel
    .then(channel => {
      channel.sendToQueue(SEND_URL, new Buffer.from(url));
      channel.consume(
        SEND_SOURCE_CODE,
        pageSource => {
          const folder = `${url.split("//")[1]}-${new Date().getTime()}`;
          try {
            fs.mkdirSync("snapshots/" + folder);
          } catch (error) {
            console.log(error);
            return;
          }
          fs.writeFile(
            "snapshots/" + folder + "/index.html",
            pageSource.content.toString(),
            { flag: "w" },
            error => {
              if (error) {
                console.log(error);
                return io.emit("pageSource", error);
              }
              return io.emit("pageSource", folder);
            }
          );
        },
        { noAck: true }
      );
      res.send({
        url,
        comment: "Source code found successfully"
      });
    })
    .catch(error => {
      console.log(error);
      res.statusCode(400).send({
        error
      });
    });
});

app.get("/test1", (req, res) => {
  res.send({
    data: "Hello Chintu Ji!!!!!"
  });
});
