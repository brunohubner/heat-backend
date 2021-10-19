import { Request, Response } from "express"
import AuthenticateUserService from "../services/AuthenticateUserService"

class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        const { code } = req.body

        const service = new AuthenticateUserService

        try {
            const resp = await service.execute(code)
            return res.json(resp)
        } catch (err) {
            res.status(401).json(err.message)
        }
    }
}

export default AuthenticateUserController