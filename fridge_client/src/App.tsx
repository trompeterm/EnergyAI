import Main from './pages/Main'
import Leaderboard from './pages/Leaderboard'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
      </Routes>
    </>
  )
}

export default App
