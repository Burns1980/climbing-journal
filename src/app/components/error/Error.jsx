/* eslint-disable react/prop-types */
export default function Error({ message }) {
  return (
    <div className="error-message">
      <div>An error occurred</div>
      <p>{message}</p>
    </div>
  );
}
