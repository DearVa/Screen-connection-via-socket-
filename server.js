var ip = require("./ip");
var http = require("http");
var fs = require("fs");
var html = fs.readFileSync("index.html", "utf8")
var deltaH = 0;

addr = ip.getIPAdress();
console.log(addr);

var onRequest = function(request, response){
    response.writeHead(200, {"Content-Type":"text/html"});
    response.end("<script type=\"text/javascript\">var deltaH = " + deltaH + ";</script>" + html);
    console.log("Client Connected");
}

var server = http.createServer(onRequest);
server.listen(8080, addr);

var io = require("socket.io").listen(server);
io.sockets.on("connection", function (socket) {
    socket.on("pos", function (data) {
        io.sockets.send(data);
    });
    socket.on("dh", function (data) {
        deltaH += data;
        console.log(deltaH);
    });
});

console.log("server started on localhost port 8080");