const CryptoJS = require('crypto-js');
const secretKey = 'BuL.utBilisimOdEV.$!';

function decryptText(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

module.exports = {
  decrypt(req, res, next) {
    if (!req.body?.data) { next(); }
    console.log('[BACKEND] Gelen şifreli data: ', req.body.data);

    const reqBodyText = decryptText(req.body.data);
    const reqBodyObject = JSON.parse(reqBodyText);
    
    req.body = reqBodyObject;
    console.log('[BACKEND] Çözülen şifreli data: ', reqBodyObject);
    next();
  }
};