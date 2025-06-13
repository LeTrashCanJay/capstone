import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Marketplace({ addToCart }) {
  const { category } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/api/items').then(res => {
        const all = res.data;

        console.log("Category from URL:", category);
        console.log("Categories from API:", all.map(i => i.category));

        const filtered = res.data.filter(item =>
          item.category.toLowerCase() === category.toLowerCase()
        );
        console.log("Filtered items for category:", category, filtered);
        setItems(filtered);
      })
      .catch(err => console.error("Error fetching items:", err));
  }, [category]);

  return (
    <div className="container">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Store</h2>
      <p>Debug: items.length = {items.length}</p>
      <div className="store-grid">
        {items.map(item => (
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
  );
}
