import { useState } from 'react'
import './App.css'
import Tabs from './components/Tabs.jsx'
import BrowserNavBar from './components/BrowserNavbar.jsx'
import MainContent from './components/MainContent.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

function App() {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Tab 1', url: '' }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);

  const [query, setQuery] = useState('');

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const [theme, setTheme] = useState('light');

  return (
    <div className="h-screen flex flex-col">
      <Tabs
        tabs={tabs}
        activeTabId={activeTabId}
        onTabClick={setActiveTabId}
        onNewTab={() => {
          const newTabId = tabs.length + 1;
      const newTab = {
        id: newTabId,
        title: `New Tab ${newTabId}`,
        url: 'https://example.com',
      };
      setTabs([...tabs, newTab]);
      setActiveTabId(newTabId);
    }}
    />

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

