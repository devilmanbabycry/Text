const PORT = 8080;

const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const fs = require('fs');
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

    // Запрос (главное)
    app.get('/menu', (req, res) => {
        // из базы вытащить name и передать его
    });

    //Запрос к серверу Python для обработки текста
    app.get('/menu/python', (req, res) => {
        let file = req.file, name = req.name;
        console.log(file);
        console.log(name);

        /* создать новую запись name в БД*/

        if(!file)
            res.send("Ошибка при загрузке файла");
        else
            res.send("Файл загружен");

        fs.readFile(req.file, 'utf8', (error, data) => {
            if(error) console.log(error);

            fetch( 'http://localhost:9999/server', {
                method: 'POST',
                body: JSON.stringify({
                    text: data
                }),
                headers: { 'Content-Type': 'application/json'}
            });
        });

        res.send('Запрос на обработку отправлен')
    });

    //Запрос на добавление обработанного текста в БД
    app.post('/menu/uploadFile', (req, res) => {
        let file = req.file, name = req.name;
        console.log(file);
        console.log(name);

        if(!file)
            res.send("Ошибка при загрузке файла");
        else
            res.send("Файл загружен");

        /* Добавление в БД обработааного текста */
    })

    // post/put для отображения текста и его замены
    app.post('/menu/description', () => {

    })

    app.put('/menu/description', () => {

    })

    app.listen(PORT, () => console.log('server started on PORT ' + PORT));
};

start();