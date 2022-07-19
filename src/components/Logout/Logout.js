import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import {BiPowerOff} from 'react-icons/bi'
import classNames from 'classnames/bind'
import styles from './Logout.module.scss'

const cx = classNames.bind(styles)

function Logout() {
    const navigate =  useNavigate()
    const handleClick = async()=>{
        localStorage.clear()
        navigate('/login')
    }
    return <button className={cx('wrapper')} onClick={handleClick}>
        <BiPowerOff />
    </button>
}

export default Logout;