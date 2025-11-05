import React from 'react';

const Navbar = ({ currentView, setCurrentView }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="logo">♻️</span>
          <h1>EcoExchange</h1>
        </div>
        <div className="nav-links">
          <button
            className={currentView === 'board' ? 'active' : ''}
            onClick={() => setCurrentView('board')}
          >
            Items Board
          </button>
          <button
            className={currentView === 'add' ? 'active' : ''}
            onClick={() => setCurrentView('add')}
          >
            Add Item
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;