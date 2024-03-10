/* eslint-disable react/prop-types */
import './error.css';

export default function Error({ title, message }) {
  return (
    <div className="error-message text-md">
      <div className="text-lg">{title}</div>
      <p>{message}</p>
    </div>
  );
}
