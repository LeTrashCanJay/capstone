import { useEffect, useState } from 'react';
import { getCheckoutSummary } from '@/api/cookies';

export default function Checkout() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getCheckoutSummary(1).then(setSummary);
  }, []);

  return (
    <div className="container">
      <h2>Checkout Summary</h2>
      {summary ? (
        <div>
          <h3 className="font-semibold">Data Given Away:</h3>
          <ul className="list-disc ml-6 mt-2">
            {summary.givenAway.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading summary...</p>
      )}
    </div>
  );
}
