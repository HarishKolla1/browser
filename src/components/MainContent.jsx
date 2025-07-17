import React from 'react';
import LogoScreen from './LogoScreen';

const MainContent = ({ query, url, onSearch }) => {


  return (
    <LogoScreen onSearch={onSearch} onShortcutClick={onSearch}/>
  );
};

export default MainContent;