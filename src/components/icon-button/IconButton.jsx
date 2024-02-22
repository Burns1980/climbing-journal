/* eslint-disable react/prop-types */
import './iconButton.css';

export default function IconButton({ className, onClick }) {
  return (
    <button onClick={onClick}>
      <i className={className}></i>
    </button>
  );
}
