var express = require('express');
var app = express();

app.get('/', function(req, res){
   res.send("Hello User!");
});

app.listen(3000);