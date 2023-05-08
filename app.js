const http=require('node:http');

const hostname = '127.0.0.1'
const port = 6000

let comments = [{id: 1, name: "Lisa"}, {id:2, name: "Nastya"}];
let stats = {};


const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, world!');
    }
    else if (req.url === "/comments"){
      res.statusCode=200;
      res.setHeader("Content-Type","application/json")
      res.end(JSON.stringify(comments))
    }
    else if (req.url === '/stats') {
      const user_agent = req.headers['user-agent'];
      if (user_agent in stats) {
      stats[user_agent] += 1;
      }
      else {
      stats[user_agent] = 1;
      }
      let html = '<html><head><title>Stats</title></head><body><table><tr><th>User-Agent</th><th>Requests</th></tr>';
      for (let agent in stats) {
      html += `<tr><td>${agent}</td><td>${stats[agent]}</td></tr>`;
      }
      html += '</table></body></html>';
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      }
      else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');}
      
    }
      else if (req.method === 'POST') {
        // Если запрос идет на /comments
        if (req.url === '/comments') {
        body = "";
        req.on('data', chunk => {
          body += chunk.toString();
        })
        req.on("end", ()=>{
          comments.push(JSON.parse(body));
          res.end(JSON.stringify(comments));
          console.log(comments);
    })
      } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
      }

  } 
    
});

server.on("request", (req,res)=>{
  console.log("Новый запрос")
})

server.on("connection", () =>{
    console.log("Подключение")
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})