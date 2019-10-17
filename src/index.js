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

  const index = projects.findIndex((element) => { return element.id == id });
  projects[index].title = title;

  return res.send('Project updated.');
});

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex((element) => { return element.id == id });
  projects.splice(index, 1);

  return res.send('Project deleted.');
});

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const requestedProject = projects.find((element) => { return element.id == id });
  requestedProject.tasks.push(title);

  return res.send('Project updated');
});

server.listen(3000);
