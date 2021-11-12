import * as express from 'express'
import * as cors from 'cors'
import * as logger from 'morgan'

import { taskRouter } from './route/tasks'
import { userRouter } from './route/users'
import { connectToDB } from './config/db'

/**
 * Cria uma aplicação com express
 */
export const app = express()

/**
 * Libera o acesso aos serviços
 */
app.use(cors())

/**
 * Habilitar os logs avançados
 */
app.use(logger('dev'))

/**
 * Habilitar respostas em formato JSON
 */
app.use(express.json())

connectToDB()

/**
 * Registra os endpoints de tarefas
 */
app.use('/tasks', taskRouter)

/**
 * Registra os endpoints de usuários
 */
app.use('/users', userRouter)