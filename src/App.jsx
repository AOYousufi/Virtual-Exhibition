import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import './App.css'
import Home from "./Components/Home/Home"
import Artworks from "./Components/Artworks/Artworks"
import SingleArt from "./Components/SingleArt"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/artworks" element={<Artworks/>} />
        <Route path="/artworks/:id" element={<SingleArt/>}/>
      </Routes>
    </Router>
  )
}

export default App
