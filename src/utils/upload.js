var QRCode = require('qrcode')

QRCode.toString('I am a pony!', function (err, url) {
    console.log(url)
})