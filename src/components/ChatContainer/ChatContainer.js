
import classNames from 'classnames/bind'
import { useCallback, useEffect, useState } from 'react';
import ChatInput from '../ChatInput/';
import Logout from '../Logout';
import Message from '../Message';
import styles from './ChatContainer.module.scss'
import axios from 'axios';
import { getAllMsgRouter, sendMsgRouter } from '../../utils/APIroutes';

const cx = classNames.bind(styles)

function ChatContainer({currentUser,currentChat}) {
    const [message,setMessage] = useState([])
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

    const handleSendMsg = useCallback( async(msg)=>{
       await axios.post(sendMsgRouter,{
        from:currentUser._id,
        to:currentChat._id,
        message:msg,
       })
    },[])

    console.log(currentChat);
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
        <div className='chat-mess'>
            {message.map((msg,index)=>{
                return <div key={index} className={cx('mess')}>
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