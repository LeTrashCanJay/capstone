import { Link } from 'react-router-dom';

export default function StoreHome() {
  const sections = ['Movies', 'E-Books', 'Web Apps', 'Video Games'];

  return (
    <div className="store-grid">
      {sections.map(section => (
        <Link
          key={section}
          to={`/store/${section.toLowerCase().replace(/\s/g, '')}`}
          className="item-card btn btn-primary"
        >
          <h2>{section}</h2>
        </Link>
      ))}
    </div>
  );
}
