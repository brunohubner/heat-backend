import { Request, Response } from "express"


class GetGitHubCodeController {
    async handle(req: Request, res: Response) {
        const { code } = req.query
        res.json({ code: code })
    }
}

export default GetGitHubCodeController