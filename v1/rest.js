const express = require('express');
const router= express.Router();
const http=require('node:http');
//const server = http.createServer(app2);
const bodyParser = require('body-parser');
const bodyJson = bodyParser.json({
    extended:false,
})

function checkAutorization(req, res, next){
    const apiKey = req.query.apiKey;
    if (apiKey == 'SAPR')
{
    next();
}else{
    res.status(401).send('Unauthorized')
}
}

function validateInput(req, res, next) {
    const { id, name } = req.body;
    if (!id || !name) {
    res.status(401).send('Bad Request: Missing id or name');
    } else {
    next();
    }
    }

const hostname = '127.0.0.1';
const port = 5500;

let comments = [{id: 1, name: "Lisa"}, {id:2, name: "Nastya"}];
let stats = {};


router.get('/', (req, res) => {
res.send('Hello, world!');
res.status(200);
});

router.get('/comments', checkAutorization, (req, res) => {
res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify(comments));
res.status(200);
});

router.get('/stats', (req, res) => {
const user_agent = req.headers['user-agent'];
if (user_agent in stats) {
stats[user_agent] += 1;
} else {
stats[user_agent] = 1;
}
let html = '<html><head><title>Stats</title></head><body><table><tr><th>User-Agent</th><th>Requests</th></tr>';
for (let agent in stats) {
html += `<tr><td>${agent}</td><td>${stats[agent]}</td></tr>`;
}
html += '</table></body></html>';
res.setHeader('Content-Type', 'text/html');
res.send(html);
res.status(200);
});



// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

router.post('/comments', bodyJson, validateInput, (req, res) => {
let body = req.body
comments.push(body);
console.log(comments);
res.status(200);
res.send(comments);
});

// router.use((req,res,next)=>{
//     res.status(400).send('Bad Request')
//     next();
// })


// server.on('request', (req,res) => {
// console.log('Новый запрос');
// });

// server.on('connection', () => {
// console.log('Подключение');
// });

module.exports = router