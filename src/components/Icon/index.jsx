import './icon.scss';

// eslint-disable-next-line react/prop-types
const Icon = ({ children, className = null, isFilled = false }) => {

  let css;
  switch (isFilled) {
    case true:
      css = `material-icon material-symbols-filled ${className || ''}`;
      break;

    default:
      css = `material-icon material-symbols-outlined ${className || ''}`;
  }

  return (
    <span className={ css }>
      { children }
    </span>
  );
};

export default Icon;
