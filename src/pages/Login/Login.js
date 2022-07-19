import {Link,useNavigate} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'

import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import Logo from '../../assets/logo.svg'
import { loginRouter } from '../../utils/APIroutes'

const cx = classNames.bind(styles)

function Login() {
    const navigate = useNavigate()
    const [values,setValues ] = useState({
        username:"",
        password:"",
    })
    const toastOption ={
        theme:"dark",
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true
    }
    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(handleValidation()){
            const {username,password} = values;
          const {data} =  await axios.post(loginRouter,{
                username,password
            })
            if(data.status === false){
                toast.error(data.msg,toastOption);
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user',JSON.stringify(data.user))
            }
            navigate("/")
        }
    }

   
    const handleValidation = () =>{
        const {username,password,} = values;
        if(password ===""){
                toast.error("username and password is required",toastOption)
                return false
        }else if(username.length ===""){
            toast.error("username and password is required ",toastOption)
                return false
        }
        
        return true
    }

    const handleChange = (e) =>{
        setValues({...values,[e.target.name]:e.target.value})
    }
    return <>
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit}>
                <div className={cx('brand')}>
                    <img src={Logo} alt="logo"/>
                    <h1>Snappy</h1>
                </div>
                <input type="text" placeholder="UserName" name="username" onChange={(e)=>handleChange(e)} min="3"/>
                <input type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)}/>
                <button type="submit">Login</button>
                <span>Don't have an account ? <Link to='/register'>Register here!</Link></span>
            </form>
    
        </div>
        <ToastContainer />
    </>
}

export default Login;