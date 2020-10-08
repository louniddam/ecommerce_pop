const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(cors());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use('/', require('./routes/routes'));

app.listen(port, ()=>{
    console.log(`http://localhost:${port}/`);
});