import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { validate } from 'email-validator'

export enum STATUS {
    BAD_FULL_NAME = 'The full name must have at least 5 characters',
    BAD_EMAIL = 'Invalid e-mail',
    OK = 'User OK'
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;

    constructor(fullName: string, email: string) {
        this.fullName = fullName
        this.email = email
    }

    validate(): STATUS[] {
        let statuses: STATUS[] = []

        if (this.fullName.length < 5) {
            statuses.push(STATUS.BAD_FULL_NAME)
        }

        if (!validate(this.email)) {
            statuses.push(STATUS.BAD_EMAIL)
        }

        if (statuses.length == 0) {
            statuses.push(STATUS.OK)
        }

        return statuses
    }
}
