import { Request, Response } from "express"


class RedirectGitHubAuthController {
    async handle(req: Request, res: Response) {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
    }
}

export default RedirectGitHubAuthController