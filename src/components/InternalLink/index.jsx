import { useNavigate } from 'react-router-dom';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const InternalLink = React.forwardRef(({
  to = null,
  onClick = null,
  className = null,
  children = null,
  clickThrough = false,
  type = 'a',
  noFollow = false,
  title = null,
}, ref) => {
  const navigate = useNavigate();

  const handleClick = useCallback((e) => {
    const link = e.target.tagName !== 'a' ? e.target.closest('a') : e.target;
    const url = link?.href || null;

    e.stopPropagation();
    e.preventDefault();

    if (onClick) {
      onClick(e);
      if (!clickThrough) {
        return;
      }
    }

    if (to) {
      navigate(to);
      return;
    }

    if (!url) {
      return;
    }

    if (url.indexOf('http') === 0) {
      const temp = new URL(url);
      if (window.location.host === temp.host) {
        navigate(temp.pathname);
        return;
      }
    } else {
      navigate(url);
      return;
    }

    window.location.href = url;
  }, [clickThrough, navigate, onClick, to]);

  if (type === 'button') {
    return (
      <button type="button" className={ `button--link ${className || ''} ` } ref={ ref } onClick={ handleClick }>
        { children || null }
      </button>
    );
  }

  return (
    <a
      rel = { noFollow ? 'noopener noreferrer nofollow': '' }
      className={ className || '' } ref={ ref } href={ to || '#' } onClick={ handleClick } title={ title || null }>
      { children || null }
    </a>
  );
});

InternalLink.propTypes = {
  type: PropTypes.oneOf(['button', 'a']),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.oneOf([null])]).isRequired,
  onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
  href: PropTypes.string,
  to: PropTypes.string,
  className: PropTypes.string,
  clickThrough: PropTypes.bool,
  noFollow: PropTypes.bool,
  title: PropTypes.string,
};

export default InternalLink;
