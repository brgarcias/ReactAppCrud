import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
            <FontAwesomeIcon icon="home" /> Start
            </Link>
            <Link to="/users">
            <FontAwesomeIcon icon="users" /> Users
            </Link>
        </nav>
    </aside>