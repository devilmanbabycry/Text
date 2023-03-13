const PORT = 8080;

const express = require('express');
const multer = require('multer');
const sequelize = require('./db');

const app = express();

const start = async () => {
    app.use(express.json());
    app.use(multer({dest:"uploadsText"}).single("filedata"));

    /*try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log('Подключение к БД не удалось', e)
    } */

    app.get('/menu', (req, res) => {
        res.send('абоба');
    });

    app.post('/menu/upload', (req, res) => {
        let filedata = req.file;
        console.log(filedata);

        if(!filedata)
            res.send("Ошибка при загрузке файла");
        else
            res.send("Файл загружен");
    })

    app.listen(PORT, () => console.log('server started on PORT ' + PORT));
};

start();