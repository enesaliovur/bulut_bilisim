const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const bodyParser = require('body-parser');
const dynamoService = require('./dynamo-service');
const AWS = require('aws-sdk');
const { s3Config } = require('./aws-config');
const s3Service = require('./s3-service');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const response = {
        status: true
    };
    res.send(response);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.post('/create-image', async (req, res) => {
    const { key, password, adminPassword, title, base64Img } = req.body;

    if (base64Img && key) {
        try {
            const uploadedImgUrl = await s3Service.uploadFile(base64Img, key);
            const result = await dynamoService.createImage({
                key,
                password,
                adminPassword,
                title,
                imgUrl: uploadedImgUrl
            });
            console.log(result);

            res.send({ status: true });
            return;

        } catch (e) {
            res.send({ status: false, message: 'Resim oluşturulamadı.' });
            return;
        }
    }
    res.send({ status: false, message: 'İşlem başarısız.' });
    return;
});

app.post('/create-image', async (req, res) => {
    res.send({ status: false, message: 'Parola uyuşmuyor' });
});