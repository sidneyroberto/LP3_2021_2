import { Router } from 'express'
import { TaskController } from '../controller/TaskController'
import { Task } from '../entity/Task'

const taskCtrl = new TaskController()
export const taskRouter = Router()

/**
 * Salva uma nova tarefa
 */
taskRouter.post('/', async (req, res) => {
    const { description, deadline, priorityLevel } = req.body
    console.log({ description, deadline, priorityLevel })
    const task = new Task()
    task.description = description
    task.deadline = new Date(deadline)
    task.priorityLevel = priorityLevel
    const savedTask = await taskCtrl.save(task)
    return res.json(savedTask)
})

/**
 * Recupera todas as tarefas
 */
taskRouter.get('/', async (req, res) => {
    const tasks = await taskCtrl.findAll()
    return res.json(tasks)
})

/**
 * Dá baixa em uma tarefa
 */
taskRouter.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const finished = await taskCtrl.finishTask(id)
    return res.json({ finished })
})
