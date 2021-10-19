import prismaClient from "../prisma"
import { io } from "../app"

class CreateMessageService {
    async execute(message: string, user_id: string) {
        const userMessage = await prismaClient.message.create({
            data: {
                message,
                user_id
            },
            include: {
                user: true
            }
        })

        const infoWS = {
            message: userMessage.message,
            user_id: userMessage.user_id,
            created_at: userMessage.created_at,
            user: {
                name: userMessage.user.name,
                avatar_url: userMessage.user.avatar_url
            }
        }

        io.emit("new_message", infoWS)

        return userMessage
    }
}

export default CreateMessageService