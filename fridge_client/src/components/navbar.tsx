import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import './Navbar.css'

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button onClick={() => loginWithRedirect()}>Login</button>
}

export default function Navbar() {
    return (
            <div className="navbar"> 
                <Link to='/' className='title'>EnergyAI</Link>
                <ul>
                    <li><Link to='/leaderboard' className='leaderboard-btn'>Leaderboard</Link></li>
                    <li><p>User: username</p></li>
                    <li><LoginButton /></li>
                </ul>
            </div>
    )
}