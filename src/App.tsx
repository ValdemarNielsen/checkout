import {FormEvent, useState} from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import reactLogo from './assets/react.svg'
import './App.css'
import Shop from './pages/shop'
import Checkoutç from './pages/checkout'


function App() {
  const [count, setCount] = useState(0)

  return (
      <html lang="en">
      
    <div className="App">
    <Shop/>
    </div>
      </html>
  )
}

export default App
