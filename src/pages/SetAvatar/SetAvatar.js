
import {useNavigate}  from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { Buffer } from 'buffer'


import classNames from 'classnames/bind'
import styles from './SetAvatar.module.scss'
import { setAvatarRouter } from '../../utils/APIroutes'
import loader from '../../assets/loader.gif'
import { useEffect, useState } from 'react'
import axios from 'axios'

const cx = classNames.bind(styles)

function SetAvatar() {
    const api = "https://api.multiavatar.com/45678945"
    const navigate = useNavigate()
    
    const [avatars,setAvatars] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [selectedAvatar,setSelectedAvatar] = useState(undefined)
    const toastOption ={
        theme:"dark",
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true
    }

    const setProfilePicture = async() =>{
        if(selectedAvatar ===undefined)
        {
            toast.error("pls set avatar",toastOption)
        }else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"))
            const {data} = await axios.post(`${setAvatarRouter}/${user._id}`,{
                image:avatars[selectedAvatar],
            })
            console.log(data.isSet);

            if(data.isSet){
                user.isAvatarImageSet = true
                user.avataImage = data.image
                localStorage.setItem("chat-app-user",JSON.stringify(user))
                navigate("/")
            }else{
                toast.error("Error setting avata. Pls try again",toastOption)
            }
        }
    }
        useEffect(()=>{
            async function fetchData() {
                if(!localStorage.getItem("chat-app-user")){
                    navigate("/login")
                }
            }
            fetchData()
        },[])

        useEffect(()=>{
            async function fetchData() {
                const data = []
                for(let i=0;i<4;i++){
                    const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`)
                    const buffer = new Buffer(image.data);
                    data.push(buffer.toString("base64"));
                }
                setAvatars(data)
                setIsLoading(false);
            }
            fetchData();
        },[])

    return  <>
        {isLoading ? <div className={cx('wrapper')}>
                <img src={loader} alt="loader" className={cx('loader')}/>
        </div> : 
        <div className={cx('wrapper')}>
            <div className={cx('title-container')}>
                <h1>Pick an avata as your  profile picture</h1>
            </div>
            <div className={cx('avatars')}>
                    {
                        avatars.map((avatar,index)=>{
                           
                           
                            return <div key={index} className={selectedAvatar === index ? cx("avatar-selected") : cx('avatar')}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar"
                                 onClick={()=>setSelectedAvatar(index)}/>
                            </div>
                        })
                    }
            </div>
            <button className={cx('submit-btn')} onClick={setProfilePicture}>Set As profile picture</button>
        </div>
        }
        
        <ToastContainer /> 
    </>
}

export default SetAvatar;