const express = require('express');

const app = express();

app.use(express.json());

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

app.get('/users', (req, res) => {
  res.status(200).json(users.map((user, index) => ({ ...user, id: index })));
});

app.get('/users/:id', (req, res) => {
  res.status(200).json(users[req.params.id]);
});

app.post('/users', (req, res) => {
  users.push(req.body);
  res.status(201).json(req.body);
});

app.put('/users/:id', (req, res) => {
  users[req.params.id] = req.body;
  res.status(200).json(req.body);
});

app.patch('/users/:id', (req, res) => {
  users[req.params.id] = { ...users[req.params.id], ...req.body };
  res.status(200).json({ ...users[req.params.id], ...req.body });
});

app.delete('/users/:id', (req, res) => {
  users.splice(req.params.id, 1);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
