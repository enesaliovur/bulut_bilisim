const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const bodyParser = require('body-parser');
const dynamoService = require('./services/dynamo-service');
const s3Service = require('./services/s3-service');

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
            res.send(result);
            return;

        } catch (e) {
            res.send({ status: false, message: 'Resim oluşturulamadı.' });
            return;
        }
    }
    res.status(400).send({ status: false, message: 'İşlem başarısız.' });
    return;
});
app.patch('/update-image/:id', async (req, res) => {
    const { key, password, adminPassword, title } = req.body;
    const id = req.query.id;

    if (key && password) {
        try {
            const result = await dynamoService.updatePost({
                key,
                password,
                adminPassword,
                title
            });
            console.log(result);

            res.send({ status: true });
            return;

        } catch (e) {
            res.status(400).send({ status: false, message: 'Resim degismedi.' });
            return;
        }
    }
    res.status(400).send({ status: false, message: 'İşlem başarısız.' });
    return;
});

app.get('/get-image', async (req, res) => {
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
        console.log(result);

        res.send({ status: true });
        return;

    } catch (e) {
        res.status(400).send({ status: false, message: 'Resim gelmedi.' });
        return;
    }
})


app.delete('/delete-image/:id', async (req, res) => {
    const id = req.body.id;
    if (id) {
        try {
            const result = await dynamoService.delete({ id });
            console.log(result);

            res.send({ status: true });
            return;
        } catch (e) {
            res.status(400).send({ status: false, message: 'Resim silindi.' });
            return;
        }
    }
    res.status(400).send({ status: false, message: 'İşlem başarısız.' });
    return;
});