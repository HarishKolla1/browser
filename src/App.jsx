import { useState } from 'react'
import './App.css'
import Tabs from './components/Tabs.jsx'
import BrowserNavBar from './components/BrowserNavBar.jsx'
import MainContent from './components/MainContent.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

function App() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="h-screen flex flex-col">
      <Tabs/>

    <BrowserNavBar
      onSearch={(q) => {
        console.log("Search:", q);
        setQuery(q);
      }}
    />

    <div className='flex-1 overflow-auto'>
      <MainContent query={query} url={activeTab?.url} />
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </div>
    </div>
  );
}

export default App

