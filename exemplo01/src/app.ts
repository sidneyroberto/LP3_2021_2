import express from 'express'
import cors from 'cors'
import logger from 'morgan'

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

const clientes = [
    {
        id: 1,
        nome: 'Sidney Sousa',
        telefone: '9999-9999'
    },
    {
        id: 2,
        nome: 'Daiane Sampaio',
        telefone: '8888-8888'
    },
    {
        id: 3,
        nome: 'Leandro Magalhães',
        telefone: '7777-7777'
    }
]

/**
 * Serviço para retornar todos os clientes
 */
app.get("/clientes", (req, res) => {
    res.json(clientes)
})

/**
 * Serviço para retornar um cliente específico
 * Obs: precisa ser refatorado!
 */
app.get("/clientes/unico/:id", (req, res) => {
    // const id = req.params.id
    const { id } = req.params
    const idCliente: number = parseInt(id)
    const clienteEncontrado = clientes.find(c => c.id == idCliente)
    res.json(clienteEncontrado)
})


