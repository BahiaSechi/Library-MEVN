const fs = require("fs");
const path = require("path")
module.exports = {
    devServer: {
        port: 443,
        https: {
            key: fs.readFileSync(path.resolve(__dirname, "./keys/client-key.pem")),
            cert: fs.readFileSync(path.resolve(__dirname, "./keys/client-cert.pem"))
        }
    }
}