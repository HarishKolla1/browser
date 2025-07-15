import { useState, useEffect} from 'react'
import './App.css'
import Tabs from './components/Tabs.jsx'
import BrowserNavBar from './components/BrowserNavBar.jsx'
import MainContent from './components/MainContent.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

function App() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("light");
  const [activeTabId, setActiveTabId] = useState(null);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const handleTabCreated = (tab) => {
      setTabs(prev => [...prev, { ...tab, query: "" }]);
      setActiveTabId(tab.id);
    };

    const handleTabUpdated = ({ id, title}) => {
      setTabs(prev => prev.map(t => t.id === id ? { ...t, title} : t));
    };

    const handleTabActivated = (id) => {
      setActiveTabId(id);
    };
    
    const handleTabClosed = (id) => {
      setTabs(prev => prev.filter(t => t.id !== id));
    };

    window.electronAPI.onTabCreated(handleTabCreated);
    window.electronAPI.onTabUpdated(handleTabUpdated);
    window.electronAPI.onTabActivated(handleTabActivated);
    window.electronAPI.onTabClosed(handleTabClosed);
    window.electronAPI.onTabUrlUpdated(({id, url}) => {
      setTabs(prev => prev.map(t => t.id === id? {...t, url} : t));
    });

    return () =>{
      window.electronAPI.removeAllListeners('tab-created');
      window.electronAPI.removeAllListeners('tab-updated');
      window.electronAPI.removeAllListeners('tab-activated');
      window.electronAPI.removeAllListeners('tab-closed');
      window.electronAPI.removeAllListeners('tab-url-updated');
    };


  }, []);

  const handleSearch =(q) => {
    setTabs(prev =>
      prev.map(tab =>
        tab.id === activeTabId ? {...tab, query: q} : tab
      )
    );
    window.electronAPI.sendSearch(q);
  };

  const activeTab =tabs.find(t => t.id === activeTabId);

  return (
    <div className="h-screen flex flex-col">
      <Tabs
        tabs={tabs}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />

      <BrowserNavBar
        onSearch={handleSearch}
        query={activeTab?.query || ''}
        setQuery={(q) => {
          setTabs(prev => prev.map(tab => tab.id === activeTabId ? {...tab, query:q}: tab));
        }}
      />

      <div className='flex-1 overflow-auto'>
        <MainContent 
          query={activeTab?.query || ''} 
          url={activeTab?.url}
          onSearch={handleSearch}
        />
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}

export default App

