import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <iframe 
        src="https://www.wikipedia.org/"
        title="Search Engine"
        className="w-full h-full border-0"
        sandbox="allow-scripts"
      />
    </div>
  );
}

export default App
