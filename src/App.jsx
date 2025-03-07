import { useState } from 'react'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChefClaude from './Chef Claude/ChefClaude'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChefClaude />
    </>
  )
}

export default App
