import classNames from 'classnames/bind'
import styles from './Welcome.module.scss'
import Robot from '../../assets/robot.gif'
const cx = classNames.bind(styles)

function Welcome({currentUser}) {
    return <div className={cx('wrapper')}>
        <img src={Robot} alt="rbot"/>
        <h1>Welcome <span>{currentUser?.username} !</span></h1>
        <h3>Pls select a chat to messaging</h3>

    </div>
}

export default Welcome;