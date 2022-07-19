import Login from '../pages/Login'
import Register from '../pages/Register'
import Chat from '../pages/Chat'
import SetAvatar from '../pages/SetAvatar/SetAvatar'

const PublicRouter = [
    {path:"/register",element:Register},
    {path:"/login",element:Login},
    {path:"/",element:Chat},
    {path:"/setavatar",element:SetAvatar},
]

export {PublicRouter}