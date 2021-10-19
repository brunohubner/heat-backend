import { Request, Response } from "express"
import GetLast3MessageService from "../services/GetLast3MessagesService"

class GetLast3MessageController {
    async handle(req: Request, res: Response) {
        const service = new GetLast3MessageService()

        const resp = await service.execute()

        return res.json(resp)
    }
}

export default GetLast3MessageController