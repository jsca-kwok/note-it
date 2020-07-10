import React from 'react';
import { Link } from "react-router-dom";
import './headers.scss';
import logo from '../../assets/note-it.png';

function Header() {
    return (
        <div className='header'>
            <Link className="link" to="/">
                <img className='header__logo' alt='note it logo' src={logo} />
            </Link>
            <h1 className='header__text'>ote-It!</h1>
        </div>
    )
}
export default Header;