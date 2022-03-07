import './Header.scss';
import ReactLogo from '../logo.svg';
import FirebaseLogo from '../firebase-icon.svg';
import { getAuth, signOut } from 'firebase/auth';

export default function Header() {
    return (
        <div className="Header">
            <div>
                <img src={ReactLogo} alt="" />
                <img src={FirebaseLogo} alt="" />
            </div>
            <button onClick={ () => {
                   getAuth().signOut();
            }}>Logout</button>
        </div>
    )
}