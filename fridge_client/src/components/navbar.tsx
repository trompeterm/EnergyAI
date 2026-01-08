import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    return (
            <div className="navbar"> 
                <Link to='/' className='title'>EnergyAI</Link>
                <ul>
                    <li><Link to='/leaderboard' className='leaderboard-btn'>Leaderboard</Link></li>
                    <li><p>User: username</p></li>
                    <li><button>Login</button></li>
                </ul>
            </div>
    )
}