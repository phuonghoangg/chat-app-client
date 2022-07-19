
import classNames from 'classnames/bind'
import { useCallback, useEffect, useRef, useState } from 'react';
import ChatInput from '../ChatInput/';
import Logout from '../Logout';
import styles from './ChatContainer.module.scss'
import axios from 'axios';
import {v4 as uuidv4} from 'uuid'
import { getAllMsgRouter, sendMsgRouter } from '../../utils/APIroutes';

const cx = classNames.bind(styles)

function ChatContainer({currentUser,currentChat,socket}) {
    const [message,setMessage] = useState([])
    const [arrivalMess,setArrivalMess] = useState(null)
    const scrollRef = useRef()
    console.log(message);
    useEffect( ()=>{

        async function fetchData() {
                const res = await axios.post(getAllMsgRouter,{
                    from:currentUser._id,
                    to:currentChat._id
                })
        setMessage(res.data)
        }

        fetchData()
    },[currentChat])

    const handleSendMsg =  async(msg)=>{
       await axios.post(sendMsgRouter,{
        from:currentUser._id,
        to:currentChat._id,
        message:msg,
       })
       socket.current.emit("send-msg",{
        to:currentChat._id,
        from:currentUser._id,
        message:msg
       })
       const msgs = [...message]
       msgs.push({fromSelf:true,message:msg})
       setMessage(msgs);
    }

    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieved",(msg)=>{
                console.log(msg);
                setArrivalMess({fromSelf:false,message:msg})

            })
        }
    },[])

    useEffect(()=>{
        arrivalMess && setMessage((prev)=>[...prev,arrivalMess])
    },[arrivalMess])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"})
    },[message])

    return <div className={cx('wrapper')}>
        <div className={cx('chat-header')}>
            <div className={cx('user-detail')}>
                <div className={cx('avatar')}>
                 <img src={`data:image/svg+xml;base64,${currentChat.avataImage}`} alt="avatar"/>
                </div>
                <div className={cx('username')}>
                    <h3>{currentChat.username}</h3>
                </div>
            </div>
                <Logout />
        </div>
        <div className={cx('chat-mess')}>
            {message.map((msg,index)=>{
                return <div key={uuidv4()} className={cx('mess')} ref={scrollRef}>
                    <div className={msg.fromSelf ? cx("sended"):cx("recieved")}>
                        <div className={cx('content')}>
                            <p>{msg.message}</p>
                        </div>
                    </div>
                </div>
            })}
        </div>
        <ChatInput handleSendMsg = {handleSendMsg}/>
    </div>
}

export default ChatContainer;