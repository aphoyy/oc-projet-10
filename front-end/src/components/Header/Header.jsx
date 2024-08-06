import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { signOut } from '../../redux/profileSlice';
import { clearToken } from '../../redux/tokenSlice';
import { useNavigate } from 'react-router-dom';

export function Header({ logged, firstName }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function SignOut(e) {
        e.preventDefault();
        dispatch(signOut());
        dispatch(clearToken());
        navigate('/');
    }

    return (
        <header>
            <nav className="main-nav">
                <a className="main-nav-logo" href="/">
                <img
                    className="main-nav-logo-image"
                    src="src/assets/img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
                </a>
                {logged ? (
                    <div className="main-nav-item-wrapper">
                        <a className="main-nav-item" href="/user">
                            <i className="fa fa-user-circle"></i>
                            {firstName}
                        </a>
                        <a className="main-nav-item" href="/" onClick={SignOut}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </a>        
                    </div>
                ) : (
                    <div>
                        <a className="main-nav-item" href="/sign-in">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </a>
                    </div>
                )}
            </nav>       
        </header>
    )
}

Header.propTypes = {
    logged: PropTypes.bool,
    firstName: PropTypes.string,
}