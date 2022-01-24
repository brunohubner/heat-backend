import { Router } from "express"
import AuthenticateUserController from "./controllers/AuthenticateUserController"
import CreateMessageController from "./controllers/CreateMessageContoller"
import RedirectGitHubAuthController from "./controllers/RedirectGitHubAuthController"
import GetLast3MessageController from "./controllers/GetLast3MessageController"
import ProfileUserController from "./controllers/ProfileUserController"
import ensureAuthenticated from "./middlewares/ensureAuthenticated"
import GetGitHubCodeController from "./controllers/GetGitHubCodeController"

const router = Router()

router.get("/github", new RedirectGitHubAuthController().handle)

router.get("/signin/callback", new GetGitHubCodeController().handle)

router.get("/messages/last3", new GetLast3MessageController().handle)

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle)

router.post("/authenticate", new AuthenticateUserController().handle)

router.post(
    "/messages",
    ensureAuthenticated,
    new CreateMessageController().handle
)

export default router
