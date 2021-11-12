import { Router } from 'express'
import { User, STATUS } from '../entity/User'
import { UserController } from '../controller/UserController'

export const userRouter = Router()
const userCtrl = new UserController()

/**
 * Salva um novo usuário
 */
userRouter.post('/', async (req, res) => {
    const { fullName, email } = req.body

    const user = new User(fullName, email)
    const statuses: STATUS[] = user.validate()
    if (statuses.length == 1 && statuses[0] == STATUS.OK) {
        const savedUser = await userCtrl.save(user)
        return res.json(savedUser)
    }

    return res.status(400).json({ statuses })
})