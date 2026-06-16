const QRCode = require("qrcode");
const fs = require("fs");

function makeQR(text, filePath) {
  return QRCode.toFile(filePath, text, {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 1,
    width: 900
  });
}

module.exports = { makeQR };