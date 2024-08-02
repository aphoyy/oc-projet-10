import PropTypes from 'prop-types';

export function Input({ title, id, wrapperClass, type, position, isDisabled, placeholder }) {
    return (
        <>
           {position === "before" ? (
                <div className={wrapperClass}>
                    <input type={type} id={id} disabled={isDisabled} placeholder={placeholder} />
                    <label htmlFor={id}>{title}</label>
                </div>
            ) : (
                <div className={wrapperClass}>
                    <label htmlFor={id}>{title}</label>
                    <input type={type} id={id} disabled={isDisabled} placeholder={placeholder} />
                </div>
            )}
        </>
    )
}

Input.propTypes = {
    title : PropTypes.string.isRequired,
    id : PropTypes.string.isRequired,
    wrapperClass : PropTypes.string,
    type : PropTypes.string.isRequired,
    position : PropTypes.string,
    isDisabled : PropTypes.bool,
    placeholder : PropTypes.string,
}