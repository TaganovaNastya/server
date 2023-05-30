const express = require("express")

const restApi = require('./v3/rest3')

const app = express();
const helmet = require('helmet');
const logger = require('morgan');


app.use(logger("dev"));
app.use(helmet());

app.use(express.static('public'))
app.use('/v3', restApi);

app.use((err, req, res, next)=>{
        res.status(400);
        res.json({
                status:"Error",
                message: "Bad requare",
        });
})

const bodyParser = require('body-parser');



app.listen(5500, '127.0.0.1', ()=>{
        console.log("server is running http://127.0.0.1:5500/");
})