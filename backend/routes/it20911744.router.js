const express = require("express");
const chmRoutes = express.Router();
const { createOffsettingProject, 
        deleteOffsettingProject, 
        getAllOffsettingProjects, 
        getSingleOffsettingProject, 
        updateOffsettingProject} = require('../controllers/it20911744/OffsettingProjects.controller');

chmRoutes.post('/create', createOffsettingProject);
chmRoutes.get('/offsettingprojects', getAllOffsettingProjects);
chmRoutes.get('/offsettingprojects/:id', getSingleOffsettingProject);
chmRoutes.put('/update/:id', updateOffsettingProject);
chmRoutes.delete('/delete/:id', deleteOffsettingProject);

module.exports = chmRoutes;

