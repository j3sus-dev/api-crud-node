import express from 'express'
import http from 'node:http'
import router from './router'

const PORT = 3000
const HOST = '127.0.0.1'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

http.createServer(app).listen(PORT, HOST, () => {
  console.log(`✅ Listening on ${HOST}:${PORT}`)
})
