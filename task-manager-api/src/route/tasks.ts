import { Router } from 'express'
import { UserController } from '../controller/UserController'
import { TaskController } from '../controller/TaskController'
import { PriorityLevel, STATUS, Task } from '../entity/Task'
import { User } from '../entity/User'

const taskCtrl = new TaskController()
const userCtrl = new UserController()
export const taskRouter = Router()

/**
 * Lista todos os níveis de prioridade
 */

taskRouter.get('/priority-levels', (req, res) => {
    let levels = []
    for (let value in Object.values(PriorityLevel)) {
        const key = PriorityLevel[value]
        if (typeof key == 'string') {
            levels.push({
                description: key,
                value: parseInt(value)
            })
        }
    }

    return res.json({ priorityLevels: levels })
})

/**
 * Salva uma nova tarefa
 */
taskRouter.post('/', async (req, res) => {
    const { description, deadline, priorityLevel, userId } = req.body

    let user: User = null
    if (userId) {
        user = await userCtrl.findById(userId)
    }

    const task = new Task(description, new Date(deadline), priorityLevel, user)
    const statuses: STATUS[] = task.validate()
    if (statuses.length == 1 && statuses[0] == STATUS.OK) {
        const savedTask = await taskCtrl.save(task)
        return res.json(savedTask)
    }

    return res.status(400).json({ statuses })

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
    const task = await taskCtrl.findById(id)
    if (task) {
        taskCtrl.finishTask(task)
        return res.json({ status: STATUS.OK })
    }

    return res.status(400).json({ status: STATUS.NOT_FOUND })
})


