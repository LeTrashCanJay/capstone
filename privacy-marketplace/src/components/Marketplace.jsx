import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Marketplace({ addToCart }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/api/items').then(res => setItems(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Marketplace</h2>
      <div className="store-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="item-card"
          >
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            <button onClick={() => addToCart(item)} className="btn btn-primary">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
