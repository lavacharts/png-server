"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _nightmare = require("nightmare");

var _nightmare2 = _interopRequireDefault(_nightmare);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nightmare = (0, _nightmare2.default)({
    show: true
});

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());

app.get('/', function (req, res) {
    res.send("Lavachart's PNG server is running.");
});

app.post('/', function (req, res) {
    if (!req.is('application/json')) {
        res.code(500).json({ error: 'POST request must be "application/json".' });
    }

    return nightmare.viewport(800, 600)
    //.evaluate(selector => {
    //    return document.querySelector(selector).innerText;
    //}, selector)
    .goto('https://duckduckgo.com')
    //.wait(3000)
    .screenshot().end().then(function (buffer) {
        var image64 = buffer.toString('base64');
        var data = 'data:image/png;base64,' + image64;

        console.log(data);

        res.send(data);
    });

    //res.json();
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=index.js.map