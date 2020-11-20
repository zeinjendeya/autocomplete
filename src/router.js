const fs = require("fs");
const path = require("path");
const { publicHandle, serverHandle, apiHandle } = require("./handler");

const router = (req, res) => {
  const endpoint = req.url;
  if (endpoint === "/") {
    serverHandle(req, res);
  } else if(endpoint.includes('/search')){
    apiHandle(req, res);
  } else if (endpoint.includes("/")) {
    publicHandle(req, res, endpoint);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>PAGE NOT FOUND!</h1>");
  }
};

module.exports = router;
