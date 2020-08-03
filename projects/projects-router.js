const express = require('express')
const projectDb = require('./projects-model')
const router = express.Router()


// ### Projects ###
router.get('/', (req, res) => {
    projectDb.getAll('projects')
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({ error: `There was an internal server error.`})
    })
})

router.post('/', (req, res) => {
    let projectData = req.body
    let dateKey = 'createdAt'
    let dateVal = Date.now()

    projectData[dateKey] = dateVal

    projectDb.add('projects', projectData)
    .then(newProjectEntry => {
        res.status(201).json(newProjectEntry)
    })
    .catch(err => {
        res.status(500).json({ error: `There was an internal server error. ${err}`})
    })
})


// ### Tasks ###
router.get('/tasks', (req, res) => {
    projectDb.getAll('tasks')
    .then(resource => {
        res.status(200).json(resource)
    })
    .catch(err => {
        res.status(500).json({ error: `There was an internal server error.`})
    })
})

router.post('/tasks', (req, res) => {
    let taskData = req.body
    let dateKey = 'createdAt'
    let dateVal = Date.now()

    taskData[dateKey] = dateVal

    projectDb.add('tasks', taskData)
    .then(newTaskEntry => {
        res.status(201).json(newTaskEntry)
    })
    .catch(err => {
        res.status(500).json({ error: `There was an internal server error.`})
    })
})

router.get('/:projectId/tasks', (req, res) => {
    const {projectId} = req.params
    projectDb.getAllTasksById(projectId)
    .then(tasks => {
        res.status(200).json({tasks})
    })
})


// ### Resources ###
router.get('/resources', (req, res) => {
    projectDb.getAll('resources')
    .then(resource => {
        res.status(200).json(resource)
    })
    .catch(err => {
        res.status(500).json({ error: `There was an internal server error.`})
    })
})

router.post('/resources', (req, res) => {
    let resourceData = req.body
    let dateKey = 'createdAt'
    let dateVal = Date.now()

    resourceData[dateKey] = dateVal

    projectDb.add('resources', resourceData)
    .then(newResourceEntry => {
        res.status(201).json(newResourceEntry)
    })
    .catch(err => {
        res.status(500).json({ error: `There was an internal server error.`})
    })
})

router.get('/:projectId/resources', (req, res) => {
    const { projectId } = req.params

    projectDb.getAllResourcesById(projectId)
    .then(resources => {
        res.status(200).json(resources)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: `There was an internal server error.`})
    })
})


module.exports = router