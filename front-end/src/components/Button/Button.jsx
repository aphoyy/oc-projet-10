import PropTypes  from 'prop-types';

export function Button({ content, onClick }) {
    return (
        <button className='edit-button' onClick={onClick}>{content}</button>
    )
}

Button.propTypes = {
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}