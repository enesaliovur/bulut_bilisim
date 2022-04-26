const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const bodyParser = require('body-parser');
const dynamoService = require('./services/dynamo-service');
const s3Service = require('./services/s3-service');
const uuid = require('uuid');
require("dotenv").config();
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
    const { password, adminPassword, title, base64Img, fileType } = req.body;

    if (base64Img) {
        try {
            const id = uuid.v4();
            const uploadedImgUrl = await s3Service.uploadFile(base64Img, id, fileType);
            const result = await dynamoService.createImage({
                id,
                password,
                adminPassword,
                title,
                imgUrl: uploadedImgUrl
            });
            console.log(result);
            res.send(result);
            return;

        } catch (e) {
            console.log(e);
            res.send({ status: false, message: 'Resim oluşturulamadı.' });
            return;
        }
    }
    res.status(400).send({ status: false, message: 'İşlem başarısız.' });
    return;
});

app.put('/update-image', async (req, res) => {
    const { password, adminPassword, title, id, base64Img, fileType, imgUrl } = req.body;

    if (password) {
        try {
            const updatedItem = await dynamoService.updatePost({
                id,
                password,
                adminPassword,
                title,
                imgUrl,
            });
            await s3Service.uploadFile(base64Img, id, fileType);
            res.send(updatedItem);
            return;

        } catch (e) {
            console.log(e);
            res.status(400).send({ status: false, message: 'Resim degismedi.' });
            return;
        }
    }
    res.status(400).send({ status: false, message: 'İşlem başarısız.' });
    return;
});

app.post('/get-image', async (req, res) => {
    const { id, password } = req.body;

    if (password && id) {
        try {
            const result = await dynamoService.getImage({
                id,
                password
            });
            res.send(result);
            return;

        } catch (e) {
            res.status(400).send({ status: false, message: 'Resim gelmedi.' });
            return;
        }
    }
    res.status(400).send({ status: false, message: 'İşlem başarısız.' });
    return;
});

app.get('/get-images', async (req, res) => {
    try {
        const result = await dynamoService.getImages();
        res.send(result);
        return;

    } catch (e) {
        res.status(400).send({ status: false, message: 'Resim gelmedi.' });
        return;
    }
})


app.post('/delete-image', async (req, res) => {
    const id = req.body.id;
    if (id) {
        try {
            await dynamoService.deleteImage(id);
            console.log("DB'den silindi.");
            await s3Service.deleteBucket(id);
            console.log("S3'ten silindi.");
            res.send({ status: true });
            return;
        } catch (e) {
            console.log(e);
            res.status(400).send({ status: false, message: 'Resim silinemedi.' });
            return;
        }
    }
    res.status(400).send({ status: false, message: 'İşlem başarısız.' });
    return;
});