import ProblemMainPage from './Pages/ProblemMainPage'
import './globals.css'
import CodingPlayground from './Pages/CodingPlayground'
import Navbar from './Components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Contribute from './Pages/Contribute'
import ProblemList from './Pages/ProblemList'
import CodingBattleground from './Pages/CodingBattleground'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/play" element={<CodingPlayground />} />
      <Route path="/problemdesc/:id" element={<ProblemMainPage/>} />
        <Route path="/arena" element={<ProblemList />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/battleground" element={<CodingBattleground/>} />

      </Routes>

    </>
  )
}

export default App
