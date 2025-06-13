import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Marketplace({ addToCart }) {
  const [groupedItems, setGroupedItems] = useState({});

  useEffect(() => {
    axios.get('/api/items').then(res => {
      const groups = res.data.reduce((acc, item) => {
        const category = item.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
      }, {});
      setGroupedItems(groups);
    });
  }, []);

  return (
    <div className="container">
      <h2>Marketplace</h2>
      {Object.entries(groupedItems).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold capitalize">{category}s</h3>
          <div className="store-grid">
            {items.map((item) => (
              <div key={item.id} className="item-card">
                <h4>{item.name}</h4>
                <p>${item.price.toFixed(2)}</p>
                <button className="btn btn-primary" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
