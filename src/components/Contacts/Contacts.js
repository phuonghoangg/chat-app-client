
import classNames from 'classnames/bind'
import { memo, useEffect, useState } from 'react'
import styles from './Contact.module.scss'
import Logo from "../../assets/logo.svg"
const cx = classNames.bind(styles)

function Contact({contacts,currentUser,changeChat}) {
    const [currentUserName,setCurrentUserName] =  useState()
    const [currentUserImage,setCurrentUserImage ] = useState()
    const [currentSelected,setCurrentSelected] = useState()
    useEffect(()=>{
        if(currentUser){
            setCurrentUserName(currentUser.username)
            setCurrentUserImage(currentUser.avataImage)
        }
    },[currentUser])

    const changeCurrentChat  = (index,contact)=>{
        setCurrentSelected(index);
        changeChat(contact)
    }

    
    return <>
        {currentUserImage && currentUserName && (
            <div className={cx('wrapper')}>
                <div className={cx('brand')}>
                    <img src={Logo} alt="logo"/>
                    <h3>snappy</h3>
                </div>
                <div className={cx('contacts')}>
                    {
                       contacts.data && contacts.data.map((contact,index)=>{
                            return <div key={index} className={index === currentSelected ? cx('selected'): cx('contact')} 
                                onClick={()=>changeCurrentChat(index,contact)}
                            >
                                    <div className={cx('avatar')}>
                                    <img src={`data:image/svg+xml;base64,${contact.avataImage}`} alt="avatar"/>
                                    </div>
                                    <div className={cx('username')}>
                                        <h3>{contact.username}</h3>
                                    </div>
                            </div>
                        })
                        
                    }
                   
                </div>
                <div className={cx('current-user')}>
                    <div className={cx('avatar-user')}>
                        <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar"/>
                    </div>
                    <div className={cx('username')}>
                        <h3>{currentUserName}</h3>
                    </div>
                </div>
            </div>
        )}
    </>
}

export default memo(Contact);