import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

    constructor(description: string, deadline: Date, priorityLevel: PriorityLevel) {
        this.description = description
        this.deadline = deadline
        this.priorityLevel = priorityLevel
    }

    isValid(): STATUS[] {
        let statuses = []

        if (this.description.length < 5) {
            statuses.push(STATUS.BAD_DESCRIPTION)
        }

        if (this.deadline < new Date()) {
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
}