import { useCallback, useEffect, useState,useRef } from 'react'
import {useNavigate}  from 'react-router-dom'
// import {ToastContainer,toast} from 'react-toastify'
// import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import {io} from 'socket.io-client'

import classNames from 'classnames/bind'
import styles from './Chat.module.scss'
import { allUserRoute, host } from '../../utils/APIroutes'
import Contact from '../../components/Contacts'
import Welcome from '../../components/Welcome'
import ChatContainer from '../../components/ChatContainer'

const cx = classNames.bind(styles)


function Chat() {
    const socket = useRef()
    const navigate = useNavigate()
    const [contacts,setContacts] = useState([])
    const [currentUser,setCurrentUser] = useState()
    const [currentChat,setCurrentChat] = useState()
    useEffect(()=>{
        async function fetchData() {
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login")
        }else{
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))

        }
        }
        fetchData()
    },[])
    useEffect(()=>{
        if(currentUser){
            socket.current = io(host)
            socket.current.emit("add-user",currentUser._id);
        }
    },[currentUser])
    useEffect(()=>{
        async function fetchData() {
            if(currentUser){
                if(currentUser.isAvatarImageSet){
                    const data = await axios.get(`${allUserRoute}/${currentUser._id}`)
                    setContacts(data)
                }else{
                    navigate('/setavatar')
                }
            }
        }
        fetchData()
    },[currentUser,navigate])

    const handleChatChange = useCallback((chat) =>{
        setCurrentChat(chat)
    })
   
    return <div className={cx('wrapper')}>
        <div className={cx('container')}>
            <Contact currentUser={currentUser} contacts={contacts} changeChat={handleChatChange}/>
            {currentChat ? <ChatContainer socket={socket} currentUser={currentUser} currentChat={currentChat}/> : <Welcome currentUser = {currentUser}/>}
        </div>
    </div>
}

export default Chat;