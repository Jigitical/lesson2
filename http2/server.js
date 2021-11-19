const http = require('http');

const port = 3000;

const users = [{
  email: 'fwoge@gmail.com',
  name: 'Viquo',
},
{
  email: 'asgas@gmail.com',
  name: 'Qas',
}, {
  email: 'opeq@gmail.com',
  name: 'Req',
},
];

const getBody = (req) => new Promise((resolve, reject) => {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(body);
    });
  } catch (error) {
    reject(error);
  }
});

const server = http.createServer(async (req, res) => {
  if (req.url === '/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users.map((user, index) => ({ ...user, id: index }))));
  }

  else if (req.url.match(/\/users\/(\d+)/) && req.method === 'GET') {
    const id = req.url.split('/')[2];

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users[id]));
  }

  else if (req.url === '/users' && req.method === 'POST') {
    const body = await getBody(req);

    users.push(JSON.parse(body));

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(body);
  }

  else if (req.url.match(/\/users\/(\d+)/) && req.method === 'PUT') {
    const body = await getBody(req);

    const id = req.url.split('/')[2];

    users[id] = JSON.parse(body);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(body);
  }

  else if (req.url.match(/\/users\/(\d+)/) && req.method === 'PATCH') {
    const body = await getBody(req);

    const id = req.url.split('/')[2];

    users[id] = { ...users[id], ...JSON.parse(body) };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ...users[id], ...JSON.parse(body) }));
  }

  else if (req.url.match(/\/users\/(\d+)/) && req.method === 'DELETE') {
    const id = req.url.split('/')[2];

    users.splice(id, 1);

    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
