import { useState } from 'react'
import './App.css'
import Tabs from './components/Tabs.jsx'
import BrowserNavbar from './components/BrowserNavbar.jsx'
import SearchBar from './components/SearchBar.jsx'

function App() {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Tab 1', url: 'https://bing.com' }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
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
    <BrowserNavbar/>
    </div>
  );
}

export default App

