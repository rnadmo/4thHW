const axios = require('axios');
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/plain');
 
let query = querystring.parse(url.parse(req.url).query);
let repo = query.repo;
if(!repo) repo = 'nodejs.node';

axios.get("https://api.github.com/repos/" + repo)
 .then(function (response){
   res.end("Repo: " + repo + "\n" + "stargazers_count: " + response.data.stargazers_count + "\n" + "open_issues_count: " + response.data.open_issues_count);
 })
 .catch(function (error){
   if(url.parse(req.url).pathname != '/'){
    res.end('Page Not found!');
  }
  else if(!query.repo){
    res.end("Invalid Query!");
  }
  else{
    res.end("Repository not found!");
  }
 })

});

server.listen(port, hostname, () => {
 console.log(`Server running at http://${hostname}:${port}/`);
});