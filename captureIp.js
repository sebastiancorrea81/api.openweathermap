const ipapi = require('ipapi.co');

async function captureIp() {
    return new Promise((resolve, reject) => {
        ipapi.location(function(res) {
            resolve(res)
        })
    })
}

module.exports = captureIp;