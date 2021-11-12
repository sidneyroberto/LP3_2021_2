import { getManager } from "typeorm";
import { User } from "../entity/User";

export class UserController {

    async save(user: User): Promise<User> {
        const savedUser = await getManager().save(user)
        return savedUser
    }

    async findById(id: number): Promise<User> {
        const user = await getManager().findOne(User, id)
        return user
    }
}