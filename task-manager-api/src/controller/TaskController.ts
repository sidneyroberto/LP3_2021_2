import { getManager } from "typeorm";
import { Task } from "../entity/Task";

export class TaskController {

    async save(task: Task) {
        const savedTask = await getManager().save(task)
        return savedTask
    }

    async findAll() {
        const tasks = await getManager().find(Task, { finished: false })
        return tasks
    }

    async finishTask(id: number) {
        const task: Task = await getManager().findOne(Task, id)
        task.finished = true
        await this.save(task)
        return true
    }
}