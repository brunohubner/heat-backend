import { serverHttp } from "./app"

const host = `localhost`
const port = 3333

serverHttp.listen(port, () =>
    console.log(`[backend] Running in ${host}:${port}`)
)
