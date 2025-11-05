import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ItemsBoard from './components/ItemsBoard';
import AddItem from './components/AddItem';
import './styles/App.css';

function App() {
  const [currentView, setCurrentView] = useState('board');

  const handleItemAdded = () => {
    setCurrentView('board');
  };

  return (
    <div className="App">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="main-content">
        {currentView === 'board' ? (
          <ItemsBoard />
        ) : (
          <AddItem onItemAdded={handleItemAdded} />
        )}
      </main>
      <footer className="footer">
        <p>© 2025 EcoExchange - Promoting Sustainability Through Community Reuse</p>
      </footer>
    </div>
  );
}

export default App;