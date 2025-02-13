import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import './App.css'
import Home from "./Components/Home/Home"
import Artworks from "./Components/Artworks/Artworks"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/artworks" element={<Artworks/>} />
      </Routes>
    </Router>
  )
}

export default App
