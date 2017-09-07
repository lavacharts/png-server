import express from "express";
import Nightmare from 'nightmare';
import bodyParser from "body-parser";

const nightmare = Nightmare({
    show: true
});

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Lavachart's PNG server is running.");
});

app.post('/', (req, res) => {
    if (! req.is('application/json')) {
        res.code(500).json({error: 'POST request must be "application/json".'});
    }

    return nightmare
        .viewport(800, 600)
        //.evaluate(selector => {
        //    return document.querySelector(selector).innerText;
        //}, selector)
        .goto('https://duckduckgo.com')
        //.wait(3000)
        .screenshot()
        .end(/*() => {
            res.json({message:'Saved screenshot to ' + chartImg);
        }*/)
        .then(buffer => {
            const image64 = buffer.toString('base64');
            const data = 'data:image/png;base64,' + image64;

            console.log(data);

            res.send(data);
        });


    //res.json();
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});