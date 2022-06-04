const CryptoJS = require('crypto-js');
const secretKey = 'BuL.utBilisimOdEV.$!';

function decryptText(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

module.exports = {
  decryptBody(req, res, next) {
    if (!req.body?.data) { next(); return; }
    console.log('[BACKEND] Gelen şifreli data:\n', req.body.data);

    const reqBodyText = decryptText(req.body.data);
    const reqBodyObject = JSON.parse(reqBodyText);
    console.log('--------------------------------------------------------');
    req.body = reqBodyObject;
    console.log('[BACKEND] Çözülen şifreli data: ');
    console.log(reqBodyObject);
    next();
  },
  decryptQuery(req, res, next) {
    if (Object.entries(req.query).length <= 0) { next(); return; }
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    for (let param in req.query) {
      console.log('[BACKEND] Gelen Şifreli query:', param, ' =>', req.query[param]);
      req.query[param] = decryptText(req.query[param]);
      console.log('--------------------------------------------------------');
      console.log('[BACKEND] Çözülen şifreli query:', param, ' =>', req.query[param]);
    }
    next();
  }
};