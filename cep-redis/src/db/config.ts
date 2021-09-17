import { createClient } from 'redis'

export const redisClient = createClient()
redisClient.connect().then(async () => {
    console.log('App connected to Redis')
    await redisClient.set('professor', 'Sidney Sousa')
    console.log(await redisClient.get('professor'))
})

process.on('SIGINT', () => {
    redisClient.disconnect()
    console.log('App disconnected from Redis')
})