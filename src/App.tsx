import React from 'react';
import Main from './components/pages/main/Main'
import './style/App.scss'
import Info from './components/elements/info/info'

function App() {
  return (
    <div className="app">
      <Main />
      <Info/>
    </div>
  );
}

export default App;
