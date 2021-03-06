import axios from "axios"
import prismaClient from "../prisma"
import { sign } from "jsonwebtoken"

interface IAccessTokenResponse {
    access_token: string
}
interface IUserResponse {
    login: string
    id: number
    name: string
    avatar_url: string
}

class AuthenticateUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token"

        const { data: accessTokenResponse } =
            await axios.post<IAccessTokenResponse>(url, null, {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code
                },
                headers: {
                    Accept: "application/json"
                }
            })

        const resp = await axios.get<IUserResponse>(
            "https://api.github.com/user",
            {
                headers: {
                    authorization: `Bearer ${accessTokenResponse.access_token}`
                }
            }
        )

        const { id, name, login, avatar_url } = resp.data

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    name,
                    avatar_url
                }
            })
        }

        const token = sign(
            {
                user: {
                    id: user.id,
                    name: user.name,
                    avatar_url: user.avatar_url
                }
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "3d"
            }
        )

        return { token, user }
    }
}

export default AuthenticateUserService
