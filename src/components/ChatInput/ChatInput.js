
import classNames from 'classnames/bind'
import styles from './ChatInput.module.scss'
import styled from "styled-components";
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
import { memo, useState } from 'react'

const cx = classNames.bind(styles)

function ChatInput({handleSendMsg}) {
    const [showEmojiPicker,setShowEmojiPicker] = useState(false)
    const [msg,setMsg] = useState("")


    const handleEmojiPickerHideShow = () =>{
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (e,emoji) =>{
        let message = msg
        message += emoji.emoji
        setMsg(message)
    }

    const sendChat = (e) =>{
        e.preventDefault()
        if(msg.length>0)
        {
            handleSendMsg(msg)
            setMsg('')
        }
    }
    console.log(msg);
    return <div className={cx('wrapper')}>
        <div className={cx('button-container')}>
            <div className={cx('emoji')}>
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                {
                    showEmojiPicker && <div className={cx('picker')}>
                       <Pickerr> <Picker onEmojiClick={handleEmojiClick} /></Pickerr>
                        </div>
                }
            </div>
        </div>
        
        <form className={cx('input-container')} onSubmit={(e)=>sendChat(e)}>
            <input type="text" placeholder='type mess here' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
            <button className={cx("submit")}><IoMdSend /></button>
        </form>
    </div>
}
const Pickerr = styled.div`
    .emoji-picker-react{
        background-color:#080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
            background-color: #080420;
            width: 5px;
            &-thumb {
              background-color: #9a86f3;
            }
          }
        .emoji-categories {
            button {
              filter: contrast(0);
            }
        }
        .emoji-search {
            background-color: transparent;
            border-color: #9a86f3;
          }
          .emoji-group:before {
            background-color: #080420;
        }
    }
`;
export default memo(ChatInput);