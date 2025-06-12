export default function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <div>
          <ul className="mb-2">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="font-semibold">Total: ${total.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}
