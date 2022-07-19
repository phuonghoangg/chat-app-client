import {Link,useNavigate} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'

import classNames from 'classnames//bind'
import styles from './Register.module.scss'
import Logo from '../../assets/logo.svg'
import { registerRoute } from '../../utils/APIroutes'

const cx = classNames.bind(styles)

function Register() {
    const navigate = useNavigate()
    const [values,setValues ] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
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
            const {email,username,password} = values;
          const {data} =  await axios.post(registerRoute,{
                username,password,email
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
        const {email,username,password,confirmPassword} = values;
        if(password !== confirmPassword){
                toast.error("password and  confirm password should be same ",toastOption)
                return false
        }else if(username.length <3){
            toast.error(" your username should be greater than 3 characters ",toastOption)
                return false
        }else if(password.length <5){
            toast.error("your password should be greater than 5 characters ",toastOption)
            return false
        }else if(email.length ===""){
            toast.error("email is required",toastOption)
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
                <input type="text" placeholder="UserName" name="username" onChange={(e)=>handleChange(e)}/>
                <input type="email" placeholder="Email" name="email" onChange={(e)=>handleChange(e)}/>
                <input type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)}/>
                <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(e)=>handleChange(e)}/>
    
                <button type="submit">create user</button>
                <span>already have an account ? <Link to='/login'>Login here!</Link></span>
            </form>
    
        </div>
        <ToastContainer />
    </>
}

export default Register;