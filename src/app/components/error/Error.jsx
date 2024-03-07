/* eslint-disable react/prop-types */
import './error.css';

export default function Error({ message }) {
  return (
    <div className="error-message text-md">
      <div className="text-lg">An error occurred</div>
      <p>{message}</p>
    </div>
  );
}
