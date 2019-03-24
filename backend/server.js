const cors = require("cors");
const fs = require("fs");
const stripJs = require("strip-js");
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
        pageData => {
          const pageDataParsed = JSON.parse(pageData.content.toString());
          let { url, sourceCode } = pageDataParsed;
          if (url.endsWith("/")) {
            url = url.slice(0, url.length - 1);
          }
          while (url.indexOf("/") !== -1) {
            url = url.replace("/", "-");
          }
          while (url.indexOf("?") !== -1) {
            url = url.replace("?", "-");
          }
          const folder = `${url}-${new Date().getTime()}`;
          console.log(folder);
          try {
            fs.mkdirSync("snapshots/" + folder);
          } catch (error) {
            console.log(error);
            return;
          }
          sourceCode = stripJs(sourceCode);
          sourceCode += `<script type='text/javascript'>
          document.querySelectorAll("a").forEach(element => {
            element.removeAttribute("href");
          });
          document.addEventListener('click', event => {
            event.preventDefault();
          });
          document.addEventListener('keypress', event => {
            event.preventDefault();
          })
        </script>`;
          fs.writeFile(
            "snapshots/" + folder + "/index.html",
            sourceCode,
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
