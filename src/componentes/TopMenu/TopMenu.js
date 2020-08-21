import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { ReactComponent as Logo } from '../../assets/svg/ice-cream.svg'

import './TopMenu.scss'

export default function TopMenu () {
    return (
        <Navbar bg="dark" variant="dark" className="top-menu">
            <Container style={{ 'margin-left': 0 }}>
                <BrandNav />
                <MenuNav />
            </Container>
        </Navbar>
    )
}

function BrandNav () {
    return (
        <Navbar.Brand>
            <Logo />
            <h2>IceCream's House</h2>
        </Navbar.Brand>
    )
}

function MenuNav () {
    //dejamos el componente preparado por si queremos añadir páginas en el futuro
    return (
        <Nav className="mr-auto">
            <Nav.Link href="#">Los Nuevos</Nav.Link>
            <Nav.Link href="#">Los Celíacos</Nav.Link>
            <Nav.Link href="#">Los clásicos</Nav.Link>
        </Nav>
    )
}
