/* Nodejs raw server file */

const $http = require("http");
const port = 3000;

const routes = {
  '/': 'Express Server',
  '/books': 'Books page',
  '/authors': 'Author list',
  '/editor': 'Editor',
  '/sobre': 'Project Info',
}

const server = $http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type' : 'text/plain'});
  response.end(routes[request.url]);
});

server.listen(port, () => {
  console.log(`Server Listening on port http://localhost:${port}`)
});