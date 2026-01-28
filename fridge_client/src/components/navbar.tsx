import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import './Navbar.css'

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button onClick={() => loginWithRedirect()}>Login</button>
}

const LogoutButton = () => {
    const { logout } = useAuth0();
    return <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
}

export default function Navbar() {
    const { user } = useAuth0();

    return (
            <div className="navbar"> 
                <Link to='/' className='title'>EnergyAI</Link>
                <ul>
                    <li><Link to='/leaderboard' className='leaderboard-btn'>Leaderboard</Link></li>
                    <li><p>User: {user?.name}</p></li>
                    <li><LoginButton /></li>
                    <li><LogoutButton /></li>
                </ul>
            </div>
    )
}