const http = require("http");
const fs = require("fs");
var url = require('url');

const PORT = 8000;

const myServer = http.createServer((req, res) => {
  console.log("new req recived");

  //url parsing
  const myUrl = url.parse(req.url,true);
  console.log(myUrl.query);
  
  var log = `\n${Date.now()} ${req.url}`;
  fs.appendFile("./log.txt", log, () => {
    switch (myUrl.pathname) {
      case "/":
        res.end("welcome to home\n"+myUrl.query.name+"  "+myUrl.query.id);
        break;

      case "/about":
        res.end("i am rajat");
        break;

      case "/results":
       res.end(`your search rersults for ${myUrl.query.search_query} are >>>`);

      default:
        res.end("it 404 error\n"+myUrl.query.name+"  "+myUrl.query.id);
        break;
    }
  });
});

myServer.listen(PORT, () => console.log(`server started at PORT=${PORT}`));
