import React, { useState, useEffect } from 'react';
import { itemsAPI } from '../services/api';
import ItemCard from './ItemCard';
import SearchFilter from './SearchFilter';

const ItemsBoard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    condition: '',
    status: ''
  });

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await itemsAPI.getItems(filters);
      setItems(data.data);
    } catch (err) {
      setError('Failed to load items. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItems();
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <div className="items-board">
      <div className="board-header">
        <h2>Community Items</h2>
        <p>Discover items shared by your community</p>
      </div>

      <SearchFilter filters={filters} setFilters={setFilters} />

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading items...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📦</span>
          <h3>No items found</h3>
          <p>Try adjusting your filters or be the first to add an item!</p>
        </div>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} onStatusUpdate={fetchItems} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemsBoard;