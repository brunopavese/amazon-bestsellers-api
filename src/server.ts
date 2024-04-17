import express from 'express'

async function bootstrap() {
  const app = express()

  app.use(express.json())

  app.listen('3333', () => {
    console.log(`🚀 Server ready at: http://localhost:3333`)
  })
}

bootstrap()
