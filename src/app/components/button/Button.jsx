import PropTypes from 'prop-types';

function Button({
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

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  children: PropTypes.node.isRequired,
};

export default Button;
