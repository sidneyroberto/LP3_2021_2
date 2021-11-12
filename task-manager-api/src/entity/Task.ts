import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

export enum PriorityLevel {
    LOW, MEDIUM, HIGH,
}

export namespace PriorityLevel {
    export function isValid(v: number): boolean {
        return Object.values(PriorityLevel).includes(v)
    }
}

export enum STATUS {
    BAD_DESCRIPTION = 'The description must contain at least 5 characters',
    BAD_DEADLINE = 'The deadline must be a date after or equals today',
    BAD_PRIORITY_LEVEL = 'Invalid priority level',
    NOT_FOUND = 'Task not found',
    OK = 'Task OK'
}

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    deadline: Date

    @Column({ default: false })
    finished: boolean

    @Column()
    priorityLevel: PriorityLevel

    @ManyToOne(() => User)
    user: User

    constructor(
        description: string,
        deadline: Date,
        priorityLevel: PriorityLevel,
        user?: User) {
        this.description = description
        this.deadline = deadline
        this.priorityLevel = priorityLevel
        this.user = user
    }

    validate(): STATUS[] {
        let statuses = []

        if (this.description.length < 5) {
            statuses.push(STATUS.BAD_DESCRIPTION)
        }

        if (!this._isDeadlineValid()) {
            statuses.push(STATUS.BAD_DEADLINE)
        }

        if (!PriorityLevel.isValid(this.priorityLevel)) {
            statuses.push(STATUS.BAD_PRIORITY_LEVEL)
        }

        if (statuses.length == 0) {
            statuses.push(STATUS.OK)
        }

        return statuses
    }

    private _isDeadlineValid(): boolean {
        const currentDate = new Date(new Date().toDateString())
        const dateToBeCompared = new Date(this.deadline.toDateString())
        return dateToBeCompared.getTime() >= currentDate.getTime()
    }
}