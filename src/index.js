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
var requestCount = 0;

server.use((req, res, next) => {
  console.log('Request count: ' + ++requestCount);

  next();
});

function checkIfIdInParams(req, res, next) {
  const { id } = req.params;
  const indexOfId = projects.findIndex((element) => { return element.id == id });

  if(indexOfId === -1) {
    return res.status(404).send('Project with requested id not found.');
  }

  next();
}

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

server.delete('/projects/:id', checkIfIdInParams, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex((element) => { return element.id == id });
  projects.splice(index, 1);

  return res.send('Project deleted.');
});

server.post('/projects/:id/tasks', checkIfIdInParams, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const requestedProject = projects.find((element) => { return element.id == id });
  requestedProject.tasks.push(title);

  return res.send('Project updated');
});

server.listen(3000);
