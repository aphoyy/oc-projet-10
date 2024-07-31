import PropTypes from 'prop-types';

export function Item({ image, title, text }) {
    return (
        <div className="feature-item">
            <img
                src={image}
                alt="Chat Icon"
                className="feature-icon"
            />
            <h3 className="feature-item-title">{title}</h3>
            <p>{text}</p>
        </div>
    )
}

Item.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}