import './load-spinner.css';

export default function LoadSpinner({ className }) {
  return <div className={`${className ? className : 'size-lg'} spinner`}></div>;
}
