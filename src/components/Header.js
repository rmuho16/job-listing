import {Link} from "react-router-dom";
import '../App.css'
import {isLoggedIn, signOut} from "../services/auth";

const Header = () => {
    return (
        <div className="container sticky-top">
            <header className="d-flex flex-wrap justify-content-center py-3 bg-white border-bottom">
                <Link to="/"
                      className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <span className="fs-4 fw-semibold color-theme ">CareerPool</span>
                </Link>

                {!isLoggedIn() ?
                    <ul className="nav nav-pills">
                        <li className="nav-item"><p className="nav-link text-black cursor-pointer">
                            <Link to='/login' className='text-decoration-none text-black fw-semibold'>Log in </Link>
                        </p></li>
                        <li className="nav-item">
                            <Link to='/register' className='text-decoration-none text-white'>
                                <p className="nav-link cursor-pointer color-theme fw-semibold">
                                    Sign up
                                </p>
                            </Link>
                        </li>
                    </ul>
                    :
                    <ul className="nav nav-pills">
                        <li>
                            <Link to='/profile' className='text-decoration-none text-white'>
                                <p className="nav-link text-black cursor-pointer fw-semibold">Profile</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/login' className='text-decoration-none text-white'
                                  onClick={signOut}>
                                <p className="nav-link cursor-pointer fw-semibold color-theme">Log out</p>
                            </Link>
                        </li>
                    </ul>
                }
            </header>
        </div>

    )
}

export default Header