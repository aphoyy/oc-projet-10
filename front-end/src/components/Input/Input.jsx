import PropTypes from 'prop-types';

export function Input({ title, id, wrapperClass, type, position }) {
    return (
        <>
           {position === "before" ? (
                <div className={wrapperClass}>
                    <input type={type} id={id} />
                    <label htmlFor={id}>{title}</label>
                </div>
            ) : (
                <div className={wrapperClass}>
                    <label htmlFor={id}>{title}</label>
                    <input type={type} id={id} />
                </div>
            )}
        </>
    )
}

Input.propTypes = {
    title : PropTypes.string.isRequired,
    id : PropTypes.string.isRequired,
    wrapperClass : PropTypes.string.isRequired,
    type : PropTypes.string.isRequired,
    position : PropTypes.string,
}