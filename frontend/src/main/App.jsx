import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
    faHome,
    faHeart,
    faUsers,
    faTrash,
    faEdit
}
    from '@fortawesome/free-solid-svg-icons'

import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Footer from '../components/template/Footer'

// import { Button } from 'react-bootstrap'

library.add(fab,
    faHome,
    faHeart,
    faUsers,
    faEdit,
    faTrash)

export default props =>
    <BrowserRouter>
        <div className="app">
            <Logo />
            <Nav />
            <Routes />
            <Footer />
        </div>
    </BrowserRouter>