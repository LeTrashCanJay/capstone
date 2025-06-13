import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CookieModal from '@/components/CookieModal';
import Marketplace from './components/Marketplace';
import StoreHome from './components/StoreHome';
import Checkout from '@/components/Checkout';
import Cart from './components/Cart';
import { getCheckoutSummary } from './api/cookies';
import { getEulaStatus } from './api/eula';
import EULA from './components/EULA';
import './App.css';
import './index.css';
import axios from 'axios';

function App() {
  const [showModal, setShowModal] = useState(true);
  const [cart, setCart] = useState([]);
  const [prefs, setPrefs] = useState({});
  const [eulaAccepted, setEulaAccepted] = useState(false);

  useEffect(() => {
    getCheckoutSummary(1).then(data => {
      if (data?.basedOn) { 
        setPrefs(data.basedOn);
        setShowModal(false);
      }
    });
    getEulaStatus(1).then(setEulaAccepted);
  }, []);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);

    if (prefs.analytics) {
      console.log(`[analytics] Added to cart: ${item.name}`);
      axios.post('/api/log', { item, user_id: 1});
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Privacy Marketplace</h1>
        <p>Learn what you give away with each click</p>
        <nav>
          <Link to="/">Marketplace</Link> | <Link to="/cart">Cart</Link> | <Link to="/checkout">Checkout</Link>
          <br></br>
          <button onClick={() => setShowModal(true)}>Edit Cookie Preferences</button>
        </nav>
      </header>

      {showModal && <CookieModal onClose={() => setShowModal(false)} />}
      {!eulaAccepted ? (
        <EULA onAccept={() => setEulaAccepted(true)} />
      ) : (

      <main>
        <Routes>
          <Route path="/" element={<StoreHome />} />
          <Route path="/store/:category" element={<Marketplace addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      )}
    </div>
  );
}

export default App
