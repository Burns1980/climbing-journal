import PropTypes from 'prop-types';

function Select({ className, id, name, options, children, ...props }) {
  return (
    <select className={className} name={name} id={id} {...props}>
      {children}
      {options &&
        options.map((option) => (
          <option
            key={option}
            value={option.match(/--[a-z/A-Z ]*--/) ? '' : option}
          >
            {option}
          </option>
        ))}
    </select>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  children: PropTypes.node,
};

export default Select;
