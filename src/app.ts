import express from "express";
import router from "./routes";
import { Server } from "socket.io"
import http from "http"
import cors from "cors"

const app = express()
app.use(cors())

const serverHttp = http.createServer(app)

const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
})

io.on("connection", socket => {
    console.log(`[socket.io] User connected on socket ${socket.id}`)
})

app.use(express.json())
app.use(router)

export { serverHttp, io }