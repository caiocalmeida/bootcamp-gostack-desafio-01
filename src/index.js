const express = require('express');
const server = express();
server.use(express.json());

class Project {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.tasks = [];
  }
}

const projects = [];

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = new Project(id, title);

  projects.push(project);

  return res.status(201).send('Project created.');
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects', (req, res) => {
  const { id, title } = req.body;

  projects[id].title = title;

  return res.send('Project updated.');
});

server.delete('/projects/:index', (req, res) => {
  const { index } = req.params;

  projects.splice(index, 1);

  return res.send('Project deleted.');
});

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].tasks.push(title);

  return res.send('Project updated');
});

server.listen(3000);
