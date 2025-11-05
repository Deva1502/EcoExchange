import React, { useState } from 'react';
import { itemsAPI } from '../services/api';

const ItemCard = ({ item, onStatusUpdate }) => {
  const [loading, setLoading] = useState(false);

  const toggleStatus = async () => {
    setLoading(true);
    try {
      const newStatus = item.status === 'available' ? 'exchanged' : 'available';
      await itemsAPI.updateItem(item._id, { status: newStatus });
      if (onStatusUpdate) onStatusUpdate();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`item-card ${item.status === 'exchanged' ? 'exchanged' : ''}`}>
      <div className="item-image">
        <img src={item.image} alt={item.name} />
        <span className={`status-badge ${item.status}`}>
          {item.status === 'available' ? '✓ Available' : '✗ Exchanged'}
        </span>
      </div>

      <div className="item-content">
        <h3>{item.name}</h3>
        <p className="item-description">{item.description}</p>

        <div className="item-details">
          <div className="detail-item">
            <span className="label">Condition:</span>
            <span className="value condition-badge">{item.condition}</span>
          </div>
          <div className="detail-item">
            <span className="label">Location:</span>
            <span className="value">📍 {item.location}</span>
          </div>
          <div className="detail-item">
            <span className="label">Posted:</span>
            <span className="value">{formatDate(item.createdAt)}</span>
          </div>
        </div>

        <button
          className={`btn-status ${item.status}`}
          onClick={toggleStatus}
          disabled={loading}
        >
          {loading ? 'Updating...' : `Mark as ${item.status === 'available' ? 'Exchanged' : 'Available'}`}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;