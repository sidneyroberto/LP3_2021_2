import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

export enum PriorityLevel {
    LOW, MEDIUM, HIGH
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
}