import { useState } from 'react';
import { saveCookiePreferences } from '@/api/cookies';

export default function CookieModal({ onClose }) {
  const [prefs, setPrefs] = useState({
    user_id: 1,
    strictly_necessary: 1,
    performance: 0,
    analytics: 0,
    advertising: 0
  });

  const handleToggle = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: prev[key] ? 0 : 1 }));
  };

  const handleSave = async () => {
    try {
    await saveCookiePreferences(prefs);
    onClose(); // only run if save was successful
  } catch (error) {
    console.error("Failed to save cookie prefs:", error);
    alert("An error occurred saving preferences. Please try again.");
  }
};

  return (
    <div className="container">
      <div className="item-card">
        <h2>Cookie Preferences</h2>
        {['performance', 'analytics', 'advertising'].map((key) => (
          <div key={key} className="mb-2">
            <label>
              <input
                type="checkbox"
                checked={!!prefs[key]}
                onChange={() => handleToggle(key)}
              />{' '}
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          </div>
        ))}
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="btn">Cancel</button>
          <button onClick={handleSave} className="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
