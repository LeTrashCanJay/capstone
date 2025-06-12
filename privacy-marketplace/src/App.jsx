import { useState, useEffect } from 'react'
import CookieModal from '@/components/CookieModal';
import Marketplace from './components/Marketplace';
import Checkout from '@/components/Checkout';
import Cart from './components/Cart';
import { getCheckoutSummary } from './api/cookies';
import { getEulaStatus } from './api/eula';
import './App.css';
import axios from 'axios';

function App() {
  const [showModal, setShowModal] = useState(true);
  const [cart, setCart] = useState([]);
  const [prefs, setPrefs] = useState({});
  const [eulaAccepted, setEulaAccepted] = useState(false);

  useEffect(() => {
    getCheckoutSummary(1).then(data => {
      if (data?.basedOn) setPrefs(data.basedOn);
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
      </header>

      {showModal && <CookieModal onClose={() => setShowModal(false)} />}
      {!eulaAccepted ? (
        <EULA onAccept={() => setEulaAccepted(true)} />
      ) : (

      <main>
        <Marketplace addToCart={addToCart} />
        <Cart cart={cart} />
        <Checkout />
      </main>
      )}
    </div>
  );
}

export default App
