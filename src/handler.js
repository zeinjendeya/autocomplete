const fs = require("fs");
const path = require("path");

const serverHandle = (req, res) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filePath, (err, file) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>Internal Server Error</h1>");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(file);
    }
  });
};

const publicHandle = (req, res, endpoint) => {
  const ext = endpoint.split(".")[1];
  const extensions = {
    html: "text/html",
    css: "text/css",
    js: "text/js",
    png: "image/png",
    json: "application/json",
  };
  const url = endpoint.split("/")[1];
  const filePath = path.join(__dirname, "..", "public", url);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>error</h1>");
    } else {
      res.writeHead(200, { "Content-Type": extensions[ext] });
      res.end(file);
    }
  });
};

const apiHandle = (req, res) => {
  const filePath = path.join(__dirname, 'words.json');
  fs.readFile(filePath, (err, file) => {
    if(err){
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>error</h1>");
    } else {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(file);
    }
  });
};

module.exports = {
  publicHandle,
  serverHandle,
  apiHandle
};
