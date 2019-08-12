const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.get('/', function (req, res) {
    res.send('<h1>Work Tenders server!</h1>');
 });
 
 var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("app listening at http://%s:%s", host, port)
 });