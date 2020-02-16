function getIPAdress(){
    var interfaces = require('os').networkInterfaces();
    var iface = interfaces['以太网'];
    return iface[1].address;
}

module.exports = { getIPAdress };