import { useState } from 'react'
import './App.css'
import Tabs from './components/Tabs.jsx'
import BrowserNavBar from './components/BrowserNavbar.jsx'
import MainContent from './components/MainContent.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

function App() {

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

