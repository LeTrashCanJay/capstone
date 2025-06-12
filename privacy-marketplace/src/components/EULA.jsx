import axios from 'axios';

export default function EULA({ onAccept }) {
  const handleAccept = async () => {
    await axios.post('/api/eula', { user_id: 1, accepted: 1 });
    onAccept();
  };

  return (
    <div className="container">
      <h2>End User License Agreement</h2>
      <p>[ Insert your mock EULA text here ]</p>
      <button className="btn btn-primary mt-4" onClick={handleAccept}>
        Accept and Continue
      </button>
    </div>
  );
}
