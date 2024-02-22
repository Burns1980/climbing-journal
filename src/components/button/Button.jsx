/* eslint-disable react/prop-types */

export default function Button({
  className = 'btn text-md',
  type = 'button',
  children,
  ...props
}) {
  return (
    <button className={className} type={type} {...props}>
      {children}
    </button>
  );
}
