import { Link } from 'react-router-dom';

export function HomeSection({ 
  title, 
  icon, 
  linkTo, 
  linkText = "Ver todos", 
  emptyMessage, 
  emptyAction,
  items = [],
  children 
}) {
  return (
    <section className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{icon} {title}</h3>
        {linkTo && <Link to={linkTo} className="btn btn-outline-info btn-sm">{linkText}</Link>}
      </div>
      {items.length === 0 ? (
        <div className="alert alert-info">
          {emptyMessage} {emptyAction && <Link to={emptyAction.link}>{emptyAction.text}</Link>}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
