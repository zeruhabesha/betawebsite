import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="notfound">
      <div>
        <h1 className="grad">404</h1>
        <p className="lead">This page drifted outside the perimeter.</p>
        <p style={{ marginTop: 20 }}>
          <Link to="/" className="btn btn--primary">Back to safety</Link>
        </p>
      </div>
    </section>
  );
}
