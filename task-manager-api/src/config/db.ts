import { createConnection } from 'typeorm'

export const connectToDB = async () => {
    const connection = await createConnection()

    console.log(`App connected to DB ${connection.options.database}`)

    process.on('SIGINT', async () => {
        await connection.close()
        console.log('Connection to DB closed')
    })
}