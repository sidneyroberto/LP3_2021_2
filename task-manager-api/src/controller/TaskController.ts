import { getManager } from "typeorm";
import { STATUS, Task } from "../entity/Task";

export class TaskController {

    async save(task: Task): Promise<Task> {
        const savedTask = await getManager().save(task)
        return savedTask
    }

    async findAll(): Promise<Task[]> {
        const tasks = await getManager().find(Task, { finished: false })
        return tasks
    }

    async findById(id: number): Promise<Task> {
        const task = await getManager().findOne(Task, id)
        return task
    }

    async finishTask(task: Task) {
        task.finished = true
        await this.save(task)
    }
}